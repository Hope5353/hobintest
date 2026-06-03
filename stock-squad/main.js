// Popular stocks as immediate fallback/suggestions
const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", mainPos: "DF", subPos: "리베로", beta: 0.8, yield: 2.8, grow: 1.5, trait: "우량주" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.4, yield: 1.2, grow: 3.5, trait: "반도체" },
    { name: "현대차", ticker: "005380.KS", country: "🇰🇷", mainPos: "DF", subPos: "오른쪽 풀백", beta: 0.7, yield: 4.8, grow: 1.2, trait: "자동차" },
    { name: "두산", ticker: "000150.KS", country: "🇰🇷", mainPos: "MF", subPos: "중앙 미드필더", beta: 1.2, yield: 2.0, grow: 2.5, trait: "지주사" },
    { name: "Nvidia", ticker: "NVDA", country: "🇺🇸", mainPos: "FW", subPos: "타겟형 스트라이커", beta: 2.1, yield: 0.0, grow: 5.0, trait: "AI 대장주" },
    { name: "Tesla", ticker: "TSLA", country: "🇺🇸", mainPos: "FW", subPos: "쉐도우 스트라이커", beta: 2.4, yield: 0.0, grow: 4.8, trait: "전기차" },
    { name: "Apple", ticker: "AAPL", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.1, yield: 0.5, grow: 2.5, trait: "빅테크" },
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", mainPos: "GK", subPos: "골키퍼", beta: 1.0, yield: 1.5, grow: 1.5, trait: "지수 추종" }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; 
        this.searchTimeout = null;
        this.currentMarketData = [];
        this.init();
    }

    init() {
        this.renderField();
        this.setupEventListeners();
        this.renderMarketList(LOCAL_TOP_STOCKS);
        this.updateStats();
    }

    setupEventListeners() {
        document.getElementById('formation-select').addEventListener('change', (e) => {
            this.formation = e.target.value;
            this.renderField();
            this.updateStats();
        });

        document.getElementById('market-search').addEventListener('input', (e) => {
            const query = e.target.value.trim();
            clearTimeout(this.searchTimeout);
            
            if (query === "") {
                this.renderMarketList(LOCAL_TOP_STOCKS);
                return;
            }

            // Quick local filter
            const localFiltered = LOCAL_TOP_STOCKS.filter(s => 
                s.name.toLowerCase().includes(query.toLowerCase()) || 
                s.ticker.toLowerCase().includes(query.toLowerCase())
            );
            
            // Fetch from global API with a slight delay
            this.searchTimeout = setTimeout(() => this.searchGlobal(query, localFiltered), 400);
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('selection-modal').style.display = 'none';
        });
    }

    async searchGlobal(query, localResults) {
        const list = document.getElementById('market-list');
        const statusMsg = document.createElement('div');
        statusMsg.id = 'search-status';
        statusMsg.style.cssText = 'padding:10px; font-size:0.75rem; color:var(--secondary-neon); text-align:center;';
        statusMsg.innerText = '🛰️ 전 세계 거래소 검색 중...';
        if (!document.getElementById('search-status')) list.prepend(statusMsg);

        try {
            // Yahoo Finance Search API v2
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=20&enableFuzzyQuery=true`;
            // Using allorigins as a primary robust proxy
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes && data.quotes.length > 0) {
                const globalResults = data.quotes
                    .filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "INDEX")
                    .map(q => this.mapYahooQuote(q));
                
                // Combine and de-duplicate
                const seen = new Set();
                const combined = [...localResults];
                combined.forEach(s => seen.add(s.ticker));
                
                globalResults.forEach(s => {
                    if (!seen.has(s.ticker)) {
                        combined.push(s);
                        seen.add(s.ticker);
                    }
                });

                this.renderMarketList(combined);
                if (document.getElementById('search-status')) document.getElementById('search-status').innerText = `✅ ${combined.length}개의 종목을 찾았습니다.`;
            } else {
                if (localResults.length > 0) {
                    this.renderMarketList(localResults);
                    if (document.getElementById('search-status')) document.getElementById('search-status').innerText = '🔍 로컬 검색 결과만 표시합니다.';
                } else {
                    list.innerHTML = `<p style="padding:20px; color:#999; font-size:0.8rem; text-align:center;">'${query}'에 대한 검색 결과가 없습니다.<br>티커(예: 005930 또는 AAPL)를 입력해 보세요.</p>`;
                }
            }
        } catch (e) {
            console.error("Global search failed", e);
            if (localResults.length > 0) {
                this.renderMarketList(localResults);
                if (document.getElementById('search-status')) document.getElementById('search-status').innerText = '⚠️ 통신 오류로 로컬 데이터만 표시합니다.';
            }
        } finally {
            // Keep status for 2 seconds then fade
            setTimeout(() => {
                const l = document.getElementById('search-status');
                if (l) l.style.opacity = '0';
                setTimeout(() => l?.remove(), 500);
            }, 2000);
        }
    }

    mapYahooQuote(q) {
        const ticker = q.symbol;
        const exchange = q.exchange;
        const isKR = ticker.endsWith('.KS') || ticker.endsWith('.KQ') || exchange === "KSC" || exchange === "KOE";
        const country = isKR ? "🇰🇷" : (exchange === "NMS" || exchange === "NYQ" || exchange === "NYS" ? "🇺🇸" : "🌐");
        
        // Deep Positioning Logic based on sector, type, and name
        const name = q.shortname || q.longname || q.symbol;
        const type = q.quoteType || "";
        const sector = q.sector || "";
        const industry = q.industry || "";

        let mainPos = "MF";
        let subPos = "중앙 미드필더";
        let beta = 1.0;
        let yieldVal = 1.0;
        let grow = 2.0;

        if (type === "ETF" || type === "INDEX") {
            mainPos = "GK";
            subPos = "골키퍼(지수)";
            beta = 1.0; yieldVal = 1.5; grow = 1.0;
        } else if (
            sector.includes("Technology") || 
            sector.includes("Communication") || 
            industry.toLowerCase().includes("semicon") ||
            industry.toLowerCase().includes("software") ||
            name.toLowerCase().includes("tech") || 
            name.toLowerCase().includes("bio")
        ) {
            mainPos = "FW";
            subPos = (Math.random() > 0.5) ? "윙어" : "타겟형 스트라이커";
            beta = 1.8; yieldVal = 0.2; grow = 4.5;
        } else if (
            sector.includes("Financial") || 
            sector.includes("Utilities") || 
            sector.includes("Energy") ||
            industry.toLowerCase().includes("insurance") ||
            industry.toLowerCase().includes("bank")
        ) {
            mainPos = "DF";
            subPos = (Math.random() > 0.5) ? "센터백" : "리베로";
            beta = 0.7; yieldVal = 4.0; grow = 1.2;
        } else {
            mainPos = "MF";
            subPos = "중앙 미드필더";
            beta = 1.1; yieldVal = 1.5; grow = 2.5;
        }

        return {
            name: name,
            ticker: ticker,
            country: country,
            change: (Math.random() * 4 - 2).toFixed(1),
            mainPos: mainPos,
            subPos: subPos,
            beta: beta,
            yield: yieldVal,
            grow: grow,
            trait: sector || "KOSPI/NASDAQ"
        };
    }

    renderField() {
        const field = document.getElementById('squad-field');
        field.innerHTML = '';
        const rows = this.getFormationRows();
        rows.forEach((count, rowIdx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'formation-row';
            const role = ["FW", "MF", "DF", "GK"][rowIdx];
            for (let i = 0; i < count; i++) {
                const posKey = `${role}-${i}`;
                const slot = document.createElement('div');
                slot.className = 'player-slot';
                if (this.squad[posKey]) {
                    slot.innerHTML = this.createCardHTML(this.squad[posKey]);
                    slot.onclick = () => this.removeStock(posKey);
                } else {
                    slot.innerHTML = `<div class="plus-icon">+</div><span class="pos-tag">${role}</span>`;
                    slot.onclick = () => this.openMarketForPos(role, posKey);
                }
                rowDiv.appendChild(slot);
            }
            field.appendChild(rowDiv);
        });
    }

    getFormationRows() {
        switch(this.formation) {
            case "4-4-2": return [2, 4, 4, 1];
            case "4-3-3": return [3, 3, 4, 1];
            case "3-5-2": return [2, 5, 3, 1];
            case "4-2-3-1": return [1, 5, 4, 1];
            default: return [3, 3, 4, 1];
        }
    }

    createCardHTML(stock) {
        const condIcon = stock.change >= 1.0 ? '🔥' : (stock.change <= -1.0 ? '📉' : '➡️');
        const condClass = stock.change >= 1.0 ? 'up' : (stock.change <= -1.0 ? 'down' : '');
        return `
            <div class="stock-card">
                <span class="flag">${stock.country}</span>
                <span class="condition ${condClass}">${condIcon}</span>
                <span class="role-badge">${stock.subPos}</span>
                <span class="name">${stock.name}</span>
                <span class="price" style="font-size:0.55rem; color:var(--secondary-neon); word-break:break-all;">${stock.ticker}</span>
                <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                    ${stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change)}%
                </span>
            </div>
        `;
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        if (!data || data.length === 0) return;

        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.autoAssign('${stock.ticker}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats">
                    <span class="m-change ${stock.change >= 0 ? 'up' : 'down'}">${stock.change}%</span>
                </div>
            </div>
        `).join('');
        this.currentMarketData = data;
    }

    openMarketForPos(role, posKey) {
        this.targetPosKey = posKey;
        const modal = document.getElementById('selection-modal');
        const filtered = this.currentMarketData.filter(s => s.mainPos === role);
        
        if (filtered.length === 0) {
            document.getElementById('modal-market-list').innerHTML = `<p style="padding:20px; color:#999; text-align:center;">${role} 포지션에 적합한 검색 결과가 없습니다.<br>마켓에서 종목을 먼저 검색해 보세요!</p>`;
        } else {
            this.renderMarketList(filtered, 'modal-market-list');
            const items = document.querySelectorAll('#modal-market-list .market-item');
            items.forEach((item, idx) => {
                item.onclick = () => {
                    this.squad[this.targetPosKey] = filtered[idx];
                    this.finishAssign();
                };
            });
        }
        modal.style.display = 'flex';
    }

    autoAssign(ticker) {
        let stock = this.currentMarketData?.find(s => s.ticker === ticker) || LOCAL_TOP_STOCKS.find(s => s.ticker === ticker);
        if (!stock) return;

        const role = stock.mainPos;
        const rows = this.getFormationRows();
        const roleIdx = ["FW", "MF", "DF", "GK"].indexOf(role);
        const count = rows[roleIdx];
        
        for (let i = 0; i < count; i++) {
            const posKey = `${role}-${i}`;
            if (!this.squad[posKey]) {
                this.squad[posKey] = stock;
                this.finishAssign();
                return;
            }
        }
        alert(`${role} 포지션이 꽉 찼습니다! 기존 선수를 클릭해 방출 후 영입하세요.`);
    }

    finishAssign() {
        document.getElementById('selection-modal').style.display = 'none';
        this.renderField();
        this.updateStats();
    }

    removeStock(posKey) {
        delete this.squad[posKey];
        this.renderField();
        this.updateStats();
    }

    updateStats() {
        const players = Object.values(this.squad);
        const count = players.length;
        if (count === 0) {
            this.setBars(0, 0, 0, 1.0, 0);
            this.updateCoach("포트폴리오가 비어 있습니다. 선수를 영입하여 스쿼드를 구성해 보세요!");
            return;
        }
        const avgBeta = players.reduce((sum, s) => sum + parseFloat(s.beta), 0) / count;
        const avgYield = players.reduce((sum, s) => sum + parseFloat(s.yield), 0) / count;
        const atkScore = players.filter(p => p.mainPos === 'FW').length * 20 + (avgBeta * 15);
        const defScore = players.filter(p => p.mainPos === 'DF' || p.mainPos === 'GK').length * 15 + (avgYield * 10);
        const linkScore = (count / 11) * 100;
        this.setBars(atkScore, linkScore, defScore, avgBeta, avgYield);
        this.analyzeSquad(players, avgBeta, avgYield);
    }

    setBars(atk, link, def, beta, yieldVal) {
        document.getElementById('stat-atk').style.width = `${Math.min(atk, 100)}%`;
        document.getElementById('stat-link').style.width = `${Math.min(link, 100)}%`;
        document.getElementById('stat-def').style.width = `${Math.min(def, 100)}%`;
        document.getElementById('avg-beta').innerText = beta.toFixed(2);
        document.getElementById('avg-yield').innerText = yieldVal.toFixed(1) + '%';
        const badge = document.getElementById('current-strategy');
        if (beta > 1.3) { badge.innerText = "공격형"; badge.style.background = "var(--accent-red)"; }
        else if (beta < 0.7) { badge.innerText = "안정형"; badge.style.background = "var(--secondary-neon)"; }
        else { badge.innerText = "밸런스형"; badge.style.background = "var(--primary-neon)"; }
    }

    analyzeSquad(players, beta, yieldVal) {
        let message = "";
        let recs = [];
        if (beta > 1.5) {
            message = "포트폴리오가 매우 공격적입니다! 하락장에서 큰 타격을 입을 수 있으니 수비 보강(고배당주/금)이 시급합니다.";
            recs = ["신한지주", "KO (Coca-Cola)", "GLD (Gold)"];
        } else if (beta < 0.6) {
            message = "매우 안정적인 스쿼드입니다. 하지만 시장 상승기에는 소외될 수 있으니 공격수(Nvidia, Tesla) 영입을 고려해 보세요.";
            recs = ["NVDA (Nvidia)", "TSLA (Tesla)"];
        } else if (yieldVal < 1.0) {
            message = "배당 수익률이 낮습니다. 현금 흐름 창출을 위해 고배당 수비수 영입을 추천합니다.";
            recs = ["JPM (JPMorgan)", "현대차", "KO (Coca-Cola)"];
        } else {
            message = "훌륭한 밸런스입니다! 현재의 스쿼드 컨디션을 유지하며 시장 흐름에 대응하세요.";
            recs = ["AAPL (Apple)", "SPY (S&P 500)"];
        }
        this.updateCoach(message, recs);
    }

    updateCoach(msg, recs = []) {
        document.getElementById('coach-message').innerText = msg;
        const recArea = document.getElementById('recommendation-area');
        recArea.innerHTML = recs.map(r => `<span class="rec-tag">영입추천: ${r}</span>`).join('');
    }
}
window.squadApp = new SquadManager();
