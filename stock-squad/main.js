// Essential local stocks for instant search & examples
const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", mainPos: "DF", subPos: "리베로", beta: 0.8, yield: 2.8, trait: "우량주" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.4, yield: 1.2, trait: "반도체" },
    { name: "Nvidia", ticker: "NVDA", country: "🇺🇸", mainPos: "FW", subPos: "타겟형 스트라이커", beta: 2.1, yield: 0.0, trait: "AI 대장주" },
    { name: "Tesla", ticker: "TSLA", country: "🇺🇸", mainPos: "FW", subPos: "쉐도우 스트라이커", beta: 2.4, yield: 0.0, trait: "전기차/성장주" },
    { name: "Apple", ticker: "AAPL", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.1, yield: 0.5, trait: "빅테크" },
    { name: "Microsoft", ticker: "MSFT", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.0, yield: 0.8, trait: "빅테크/AI" },
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", mainPos: "GK", subPos: "골키퍼", beta: 1.0, yield: 1.5, trait: "지수 추종" }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; 
        this.searchTimeout = null;
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
            const query = e.target.value;
            clearTimeout(this.searchTimeout);
            
            // Instant local search
            const localFiltered = LOCAL_TOP_STOCKS.filter(s => 
                s.name.toLowerCase().includes(query.toLowerCase()) || 
                s.ticker.toLowerCase().includes(query.toLowerCase())
            );
            this.renderMarketList(localFiltered);

            // Remote search after 500ms
            if (query.length >= 2) {
                this.searchTimeout = setTimeout(() => this.searchGlobal(query), 500);
            }
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('selection-modal').style.display = 'none';
        });
    }

    async searchGlobal(query) {
        try {
            // Using allorigins proxy to bypass CORS for Yahoo Finance Search API
            const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${query}&quotesCount=10`)}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.quotes) {
                const globalResults = data.quotes.map(q => this.mapYahooQuote(q));
                this.renderMarketList([...globalResults]);
            }
        } catch (e) {
            console.error("Global search failed", e);
        }
    }

    mapYahooQuote(q) {
        const ticker = q.symbol;
        const isKR = ticker.endsWith('.KS') || ticker.endsWith('.KQ');
        const country = isKR ? "🇰🇷" : (q.exchange === "NMS" || q.exchange === "NYQ" ? "🇺🇸" : "🌐");
        
        // Dynamic Positioning Logic
        let mainPos = "MF";
        let subPos = "중앙 미드필더";
        let beta = 1.0;
        let yieldVal = 1.0;
        let grow = 2.0;

        const name = q.shortname || q.longname || q.symbol;
        const type = q.quoteType || "";

        if (type.includes("ETF")) {
            mainPos = "GK";
            subPos = "골키퍼";
            beta = 1.0; yieldVal = 1.5; grow = 1.0;
        } else if (name.toLowerCase().includes("tech") || name.toLowerCase().includes("semi") || name.toLowerCase().includes("bio")) {
            mainPos = "FW";
            subPos = "윙어";
            beta = 1.8; yieldVal = 0.1; grow = 4.5;
        } else if (name.toLowerCase().includes("bank") || name.toLowerCase().includes("holdings") || name.toLowerCase().includes("insurance")) {
            mainPos = "DF";
            subPos = "센터백";
            beta = 0.6; yieldVal = 4.5; grow = 1.0;
        }

        return {
            name: name,
            ticker: ticker,
            country: country,
            price: 0, // In a full app, we'd fetch price separately
            change: (Math.random() * 4 - 2).toFixed(1), // Mocked condition
            mainPos: mainPos,
            subPos: subPos,
            beta: beta,
            yield: yieldVal,
            grow: grow,
            trait: q.sector || "상장종목"
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
                <span class="price">${stock.ticker}</span>
                <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                    ${stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change)}%
                </span>
            </div>
        `;
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        if (data.length === 0) {
            list.innerHTML = '<p style="padding:20px; color:#666;">검색 결과가 없습니다.</p>';
            return;
        }
        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.autoAssign('${stock.ticker}', '${stock.name}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats">
                    <span class="m-change ${stock.change >= 0 ? 'up' : 'down'}">${stock.change}%</span>
                </div>
            </div>
        `).join('');
        
        // Store current list in memory for autoAssign lookup
        this.currentMarketData = data;
    }

    openMarketForPos(role, posKey) {
        this.targetPosKey = posKey;
        const modal = document.getElementById('selection-modal');
        const filtered = LOCAL_TOP_STOCKS.filter(s => s.mainPos === role);
        this.renderMarketList(filtered, 'modal-market-list');
        
        const items = document.querySelectorAll('#modal-market-list .market-item');
        items.forEach((item, idx) => {
            item.onclick = () => {
                this.squad[this.targetPosKey] = filtered[idx];
                this.finishAssign();
            };
        });
        modal.style.display = 'flex';
    }

    autoAssign(ticker, name) {
        let stock = this.currentMarketData?.find(s => s.ticker === ticker);
        if (!stock) stock = LOCAL_TOP_STOCKS.find(s => s.ticker === ticker);
        
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
