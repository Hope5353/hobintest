// Essential local stocks for instant search & examples
const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", mainPos: "DF", subPos: "리베로", beta: 0.8, yield: 2.8, grow: 1.5, trait: "우량주" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.4, yield: 1.2, grow: 3.5, trait: "반도체" },
    { name: "현대차", ticker: "005380.KS", country: "🇰🇷", mainPos: "DF", subPos: "오른쪽 풀백", beta: 0.7, yield: 4.8, grow: 1.2, trait: "자동차" },
    { name: "두산", ticker: "000150.KS", country: "🇰🇷", mainPos: "MF", subPos: "중앙 미드필더", beta: 1.2, yield: 2.0, grow: 2.5, trait: "지주사" },
    { name: "두산로보틱스", ticker: "454910.KS", country: "🇰🇷", mainPos: "FW", subPos: "윙어", beta: 2.2, yield: 0.0, grow: 4.8, trait: "로봇" },
    { name: "두산에너빌리티", ticker: "034020.KS", country: "🇰🇷", mainPos: "DF", subPos: "센터백", beta: 1.3, yield: 0.0, grow: 3.0, trait: "원자력" },
    { name: "에코프로", ticker: "086520.KQ", country: "🇰🇷", mainPos: "FW", subPos: "왼쪽 윙어", beta: 2.5, yield: 0.1, grow: 5.0, trait: "2차전지" },
    { name: "에코프로비엠", ticker: "247540.KQ", country: "🇰🇷", mainPos: "FW", subPos: "오른쪽 윙어", beta: 2.3, yield: 0.2, grow: 5.0, trait: "2차전지" },
    { name: "포스코홀딩스", ticker: "005490.KS", country: "🇰🇷", mainPos: "MF", subPos: "수비형 미드필더", beta: 1.2, yield: 2.5, grow: 2.8, trait: "철강/소재" },
    { name: "HLB", ticker: "028300.KQ", country: "🇰🇷", mainPos: "FW", subPos: "쉐도우 스트라이커", beta: 1.8, yield: 0.0, grow: 4.5, trait: "바이오" },
    { name: "Nvidia", ticker: "NVDA", country: "🇺🇸", mainPos: "FW", subPos: "타겟형 스트라이커", beta: 2.1, yield: 0.0, grow: 5.0, trait: "AI 대장주" },
    { name: "Tesla", ticker: "TSLA", country: "🇺🇸", mainPos: "FW", subPos: "쉐도우 스트라이커", beta: 2.4, yield: 0.0, grow: 4.8, trait: "전기차" },
    { name: "Apple", ticker: "AAPL", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.1, yield: 0.5, grow: 2.5, trait: "빅테크" },
    { name: "Microsoft", ticker: "MSFT", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더", beta: 1.0, yield: 0.8, grow: 3.0, trait: "빅테크" },
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", mainPos: "MF", subPos: "중앙 미드필더(지수)", beta: 1.0, yield: 1.5, grow: 1.5, trait: "지수 추종" },
    { name: "Nasdaq 100 ETF", ticker: "QQQ", country: "🇺🇸", mainPos: "MF", subPos: "공격형 미드필더(지수)", beta: 1.3, yield: 0.5, grow: 3.5, trait: "기술지수" },
    { name: "Gold ETF", ticker: "GLD", country: "🇺🇸", mainPos: "GK", subPos: "스위퍼 키퍼(안전자산)", beta: 0.1, yield: 0.0, grow: 0.5, trait: "안전자산" },
    { name: "Silver ETF", ticker: "SLV", country: "🇺🇸", mainPos: "GK", subPos: "스위퍼 키퍼(안전자산)", beta: 0.3, yield: 0.0, grow: 1.0, trait: "안전자산" },
    { name: "US Treasury 20Y+", ticker: "TLT", country: "🇺🇸", mainPos: "GK", subPos: "골키퍼(채권)", beta: -0.2, yield: 3.5, grow: 0.0, trait: "안전자산" }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; // Active 11 (mapped by posKey like 'FW-0')
        this.myRoster = []; // User's pool
        this.searchTimeout = null;
        this.currentMarketData = [];
        this.init();
    }

    init() {
        this.renderField();
        this.setupEventListeners();
        this.renderMarketList(LOCAL_TOP_STOCKS);
        this.renderRoster();
        this.updateStats();
    }

    setupEventListeners() {
        document.getElementById('formation-select').addEventListener('change', (e) => {
            const oldPlayers = Object.values(this.squad);
            this.formation = e.target.value;
            this.squad = {}; 
            
            // Try to re-assign existing players to the new layout
            oldPlayers.forEach(stock => {
                this.autoAssign(stock.ticker, true); // Silent auto-assign
            });

            this.renderField();
            this.renderRoster();
            this.updateStats();
        });

        document.getElementById('market-search').addEventListener('input', (e) => {
            const rawQuery = e.target.value;
            const query = rawQuery.replace(/\s/g, '').toLowerCase();
            clearTimeout(this.searchTimeout);
            
            if (query === "") {
                this.renderMarketList(LOCAL_TOP_STOCKS);
                return;
            }

            const localFiltered = LOCAL_TOP_STOCKS.filter(s => 
                s.name.replace(/\s/g, '').toLowerCase().includes(query) || 
                s.ticker.toLowerCase().includes(query)
            );
            
            this.renderMarketList(localFiltered);
            this.searchTimeout = setTimeout(() => this.searchGlobal(rawQuery, localFiltered), 400);
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('selection-modal').style.display = 'none';
        });

        // Recommendation click delegator
        document.getElementById('recommendation-area').addEventListener('click', (e) => {
            if (e.target.classList.contains('rec-tag')) {
                const ticker = e.target.dataset.ticker;
                if (ticker) this.addToRoster(ticker);
            }
        });
    }

    async searchGlobal(query, localResults) {
        const list = document.getElementById('market-list');
        const statusMsg = document.createElement('div');
        statusMsg.id = 'search-status';
        statusMsg.style.cssText = 'padding:10px; font-size:0.75rem; color:var(--primary-neon); text-align:center; display:flex; align-items:center; justify-content:center;';
        statusMsg.innerHTML = '<div class="loading-spinner"></div> 🛰️ 실시간 주식 데이터 검색 중... 잠시만 기다려주세요.';
        if (!document.getElementById('search-status')) list.prepend(statusMsg);

        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=20&enableFuzzyQuery=true&lang=ko-KR&region=KR`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes && data.quotes.length > 0) {
                const globalResults = data.quotes
                    .filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "INDEX")
                    .map(q => this.mapYahooQuote(q));
                
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
                if (document.getElementById('search-status')) document.getElementById('search-status').innerText = `✅ 검색 완료 (${combined.length}개 발견)`;
            }
        } catch (e) {
            console.error("Global search failed", e);
        } finally {
            setTimeout(() => {
                const l = document.getElementById('search-status');
                if (l) { l.style.opacity = '0'; setTimeout(() => l?.remove(), 500); }
            }, 3000);
        }
    }

    mapYahooQuote(q) {
        const ticker = q.symbol;
        const exchange = q.exchange;
        const isKR = ticker.endsWith('.KS') || ticker.endsWith('.KQ') || exchange === "KSC" || exchange === "KOE";
        const country = isKR ? "🇰🇷" : (exchange === "NMS" || exchange === "NYQ" || exchange === "NYS" ? "🇺🇸" : "🌐");
        
        const name = q.shortname || q.longname || q.symbol;
        const type = q.quoteType || "";
        const sector = q.sector || "";
        const industry = q.industry || "";

        let mainPos = "MF";
        let subPos = "중앙 미드필더";
        let beta = 1.1;
        let yieldVal = 1.2;
        let grow = 2.5;

        // ETF and Asset specific logic
        const isLeverage = name.includes("Leverage") || name.includes("2x") || name.includes("3x") || ticker === "TQQQ" || ticker === "SOXL";
        const isSafeHaven = name.includes("Gold") || name.includes("GLD") || name.includes("Silver") || name.includes("Copper") || ticker === "IAU" || ticker === "TLT" || name.includes("Treasury");

        if (isSafeHaven) {
            mainPos = "GK";
            subPos = "스위퍼 키퍼(안전자산)";
            beta = 0.2; yieldVal = 3.5; grow = 0.5;
        } else if (isLeverage) {
            mainPos = "FW";
            subPos = "공격적 레버리지";
            beta = 3.0; yieldVal = 0.0; grow = 6.0;
        } else if (type === "ETF" || type === "INDEX") {
            mainPos = "MF"; // Standard index trackers are stable connectors
            subPos = "중앙 미드필더(지수)";
            beta = 1.0; yieldVal = 1.5; grow = 1.5;
        } else if (
            sector.includes("Technology") || 
            sector.includes("Communication") || 
            industry.toLowerCase().includes("semicon") ||
            name.toLowerCase().includes("tech") || 
            name.toLowerCase().includes("bio") ||
            name.toLowerCase().includes("energy solution")
        ) {
            mainPos = "FW";
            if (isKR && name.includes("에코프로")) { subPos = "왼쪽 윙어"; beta = 2.5; grow = 5.0; }
            else if (ticker === "NVDA" || ticker === "TSLA") { subPos = "타겟형 스트라이커"; beta = 2.2; grow = 5.0; }
            else { subPos = "쉐도우 스트라이커"; beta = 1.8; grow = 4.0; }
            yieldVal = 0.1;
        } else if (
            sector.includes("Financial") || 
            sector.includes("Utilities") || 
            sector.includes("Energy") ||
            industry.toLowerCase().includes("insurance") ||
            industry.toLowerCase().includes("bank") ||
            industry.toLowerCase().includes("beverages")
        ) {
            mainPos = "DF";
            if (industry.includes("Bank") || industry.includes("Insurance")) { subPos = "센터백"; beta = 0.5; yieldVal = 5.5; }
            else if (name.includes("현대차") || name.includes("기아")) { subPos = "윙백"; beta = 0.8; yieldVal = 4.5; }
            else { subPos = "리베로"; beta = 0.7; yieldVal = 3.5; }
            grow = 1.2;
        } else {
            if (name.includes("Apple") || name.includes("Microsoft")) { subPos = "공격형 미드필더"; beta = 1.2; grow = 3.5; }
            else { subPos = "중앙 미드필더"; beta = 1.1; yieldVal = 1.5; }
            grow = 2.5;
        }

        return {
            name: name, ticker: ticker, country: country,
            change: (Math.random() * 4 - 2).toFixed(1),
            mainPos: mainPos, subPos: subPos,
            beta: beta, yield: yieldVal, grow: grow,
            trait: sector || "KOSPI/NASDAQ"
        };
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        if (!data || data.length === 0) return;

        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.addToRoster('${stock.ticker}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats">
                    <span class="m-price">+ 영입</span>
                </div>
            </div>
        `).join('');
        this.currentMarketData = data;
    }

    addToRoster(ticker) {
        let stock = this.currentMarketData?.find(s => s.ticker === ticker) || 
                    LOCAL_TOP_STOCKS.find(s => s.ticker === ticker);
        
        if (!stock) {
            // Recommendation fallback: basic mapping
            stock = this.mapYahooQuote({ symbol: ticker, shortname: ticker });
        }

        if (this.myRoster.some(s => s.ticker === ticker)) {
            alert("이미 영입된 종목입니다!");
            return;
        }

        this.myRoster.push(stock);
        this.renderRoster();
    }

    renderRoster() {
        const list = document.getElementById('my-roster-list');
        if (this.myRoster.length === 0) {
            list.innerHTML = '<p style="padding:10px; color:#555; font-size:0.7rem;">영입된 종목이 없습니다.</p>';
            return;
        }

        list.innerHTML = this.myRoster.map(stock => {
            const inSquad = Object.values(this.squad).some(s => s.ticker === stock.ticker);
            return `
                <div class="roster-item ${inSquad ? 'active-in-squad' : ''}" onclick="window.squadApp.assignFromRoster('${stock.ticker}')">
                    <div class="item-info">
                        <span class="m-name">${stock.country} ${stock.name}</span>
                        <span class="m-ticker">${stock.subPos} ${inSquad ? '(배치완료)' : ''}</span>
                    </div>
                    <div class="item-stats" style="display:flex; align-items:center;">
                        <span class="m-change ${stock.change >= 0 ? 'up' : 'down'}">${stock.change}%</span>
                        <div class="release-btn" onclick="event.stopPropagation(); window.squadApp.releaseFromRoster('${stock.ticker}')">X</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    releaseFromRoster(ticker) {
        for (let key in this.squad) {
            if (this.squad[key].ticker === ticker) delete this.squad[key];
        }
        this.myRoster = this.myRoster.filter(s => s.ticker !== ticker);
        this.renderField();
        this.renderRoster();
        this.updateStats();
    }

    assignFromRoster(ticker) {
        const stock = this.myRoster.find(s => s.ticker === ticker);
        if (!stock) return;

        const inSquad = Object.values(this.squad).some(s => s.ticker === stock.ticker);
        if (inSquad) {
            alert("이미 스쿼드에 배치된 선수입니다!");
            return;
        }

        this.autoAssign(ticker);
    }

    autoAssign(ticker, silent = false) {
        const stock = this.myRoster.find(s => s.ticker === ticker);
        if (!stock) return false;

        const role = stock.mainPos;
        const rows = this.getFormationRows();
        const roleIdx = ["FW", "MF", "DF", "GK"].indexOf(role);
        const count = rows[roleIdx];
        
        for (let i = 0; i < count; i++) {
            const posKey = `${role}-${i}`;
            if (!this.squad[posKey]) {
                this.squad[posKey] = stock;
                if (!silent) {
                    this.renderField();
                    this.renderRoster();
                    this.updateStats();
                }
                return true;
            }
        }
        if (!silent) alert(`${role} 포지션에 빈 자리가 없습니다!`);
        return false;
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
                    slot.onclick = () => alert(`${role} 포지션입니다. 하단 영입 목록에서 선택해 배치하세요!`);
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
            case "3-4-3": return [3, 4, 3, 1];
            case "5-3-2": return [2, 3, 5, 1];
            case "5-4-1": return [1, 4, 5, 1];
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

    removeStock(posKey) {
        delete this.squad[posKey];
        this.renderField();
        this.renderRoster();
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
            recs = [
                { name: "신한지주", ticker: "055550.KS" },
                { name: "KO (Coca-Cola)", ticker: "KO" },
                { name: "GLD (Gold)", ticker: "GLD" }
            ];
        } else if (beta < 0.6) {
            message = "매우 안정적인 스쿼드입니다. 하지만 시장 상승기에는 소외될 수 있으니 공격수(Nvidia, Tesla) 영입을 고려해 보세요.";
            recs = [
                { name: "NVDA (Nvidia)", ticker: "NVDA" },
                { name: "TSLA (Tesla)", ticker: "TSLA" }
            ];
        } else if (yieldVal < 1.0) {
            message = "배당 수익률이 낮습니다. 현금 흐름 창출을 위해 고배당 수비수 영입을 추천합니다.";
            recs = [
                { name: "JPM (JPMorgan)", ticker: "JPM" },
                { name: "현대차", ticker: "005380.KS" },
                { name: "KO (Coca-Cola)", ticker: "KO" }
            ];
        } else {
            message = "훌륭한 밸런스입니다! 현재의 스쿼드 컨디션을 유지하며 시장 흐름에 대응하세요.";
            recs = [
                { name: "AAPL (Apple)", ticker: "AAPL" },
                { name: "SPY (S&P 500)", ticker: "SPY" }
            ];
        }
        this.updateCoach(message, recs);
    }

    updateCoach(msg, recs = []) {
        document.getElementById('coach-message').innerText = msg;
        const recArea = document.getElementById('recommendation-area');
        recArea.innerHTML = recs.map(r => `<span class="rec-tag" data-ticker="${r.ticker}" style="cursor:pointer;">영입추천: ${r.name}</span>`).join('');
    }
}
window.squadApp = new SquadManager();
