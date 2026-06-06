// Popular stocks with 'Toss-style' friendly names including US stocks in Korean
const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", mainPos: "DF", subPos: "CB", beta: 0.8, yield: 2.8, grow: 1.5, trait: "우량주" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", mainPos: "MF", subPos: "CAM", beta: 1.4, yield: 1.2, grow: 3.5, trait: "반도체" },
    { name: "현대차", ticker: "005380.KS", country: "🇰🇷", mainPos: "DF", subPos: "RB", beta: 0.7, yield: 4.8, grow: 1.2, trait: "자동차" },
    { name: "기아", ticker: "000270.KS", country: "🇰🇷", mainPos: "DF", subPos: "LB", beta: 0.7, yield: 5.2, grow: 1.4, trait: "자동차" },
    { name: "두산", ticker: "000150.KS", country: "🇰🇷", mainPos: "MF", subPos: "CM", beta: 1.2, yield: 2.0, grow: 2.5, trait: "지주사" },
    { name: "두산로보틱스", ticker: "454910.KS", country: "🇰🇷", mainPos: "FW", subPos: "RW", beta: 2.2, yield: 0.0, grow: 4.8, trait: "로봇" },
    { name: "에코프로", ticker: "086520.KQ", country: "🇰🇷", mainPos: "FW", subPos: "LW", beta: 2.5, yield: 0.1, grow: 5.0, trait: "2차전지" },
    { name: "엔비디아", ticker: "NVDA", country: "🇺🇸", mainPos: "FW", subPos: "ST", beta: 2.1, yield: 0.0, grow: 5.0, trait: "AI 대장주" },
    { name: "테슬라", ticker: "TSLA", country: "🇺🇸", mainPos: "FW", subPos: "CF", beta: 2.4, yield: 0.0, grow: 4.8, trait: "전기차" },
    { name: "애플", ticker: "AAPL", country: "🇺🇸", mainPos: "MF", subPos: "CAM", beta: 1.1, yield: 0.5, grow: 2.5, trait: "빅테크" },
    { name: "마이크로소프트", ticker: "MSFT", country: "🇺🇸", mainPos: "MF", subPos: "CAM", beta: 1.0, yield: 0.8, grow: 3.0, trait: "빅테크" },
    { name: "퀄컴", ticker: "QCOM", country: "🇺🇸", mainPos: "FW", subPos: "RW", beta: 1.3, yield: 1.5, grow: 3.2, trait: "반도체" },
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", mainPos: "MF", subPos: "CM", beta: 1.0, yield: 1.5, grow: 1.5, trait: "지수 추종" },
    { name: "골드(금) ETF", ticker: "GLD", country: "🇺🇸", mainPos: "GK", subPos: "GK", beta: 0.1, yield: 0.0, grow: 0.5, trait: "안전자산" },
    { name: "미국채 20년+", ticker: "TLT", country: "🇺🇸", mainPos: "GK", subPos: "GK", beta: -0.2, yield: 3.5, grow: 0.0, trait: "안전자산" }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; 
        this.myRoster = []; 
        this.searchTimeout = null;
        this.currentMarketData = [];
        this.init();
    }

    init() {
        this.renderField();
        this.setupEventListeners();
        // Remove initial market rendering as requested
        this.renderMarketList([]); 
        this.renderRoster();
        this.updateStats();
        this.checkSharedSquad();
    }

    setupEventListeners() {
        document.getElementById('formation-select').addEventListener('change', (e) => {
            const oldPlayers = Object.values(this.squad);
            this.formation = e.target.value;
            this.squad = {}; 
            oldPlayers.forEach(stock => this.autoAssign(stock.ticker, true));
            this.renderField();
            this.renderRoster();
            this.updateStats();
        });

        document.getElementById('share-btn').addEventListener('click', () => this.shareSquad());
        document.getElementById('save-btn').addEventListener('click', () => this.saveSquadLocal());
        document.getElementById('load-btn').addEventListener('click', () => this.loadSquadLocal());
        document.getElementById('guide-btn').addEventListener('click', () => {
            document.getElementById('guide-modal').style.display = 'flex';
        });

        document.querySelector('.close-guide').addEventListener('click', () => {
            document.getElementById('guide-modal').style.display = 'none';
        });

        document.getElementById('market-search').addEventListener('input', (e) => {
            const rawQuery = e.target.value;
            const query = rawQuery.replace(/\s/g, '').toLowerCase();
            clearTimeout(this.searchTimeout);
            if (query === "") {
                this.renderMarketList([]); // Clear when query is empty
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

        document.getElementById('recommendation-area').addEventListener('click', (e) => {
            if (e.target.classList.contains('rec-tag')) {
                const ticker = e.target.dataset.ticker;
                if (ticker) {
                    this.addToRoster(ticker);
                    // Refresh coach advice immediately after adding to roster
                    this.updateStats(); 
                }
            }
        });
    }

    async searchGlobal(query, localResults) {
        const list = document.getElementById('market-list');
        const statusMsg = document.createElement('div');
        statusMsg.id = 'search-status';
        statusMsg.style.cssText = 'padding:10px; font-size:0.75rem; color:var(--primary-neon); text-align:center; display:flex; align-items:center; justify-content:center;';
        statusMsg.innerHTML = '<div class="loading-spinner"></div> 🛰️ 글로벌 종목 검색 중...';
        if (!document.getElementById('search-status')) list.prepend(statusMsg);

        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=20&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes) {
                const globalResults = data.quotes
                    .filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "INDEX")
                    .map(q => this.mapYahooQuote(q));
                
                const seen = new Set();
                const combined = [...localResults];
                combined.forEach(s => seen.add(s.ticker));
                globalResults.forEach(s => { if (!seen.has(s.ticker)) { combined.push(s); seen.add(s.ticker); } });
                this.renderMarketList(combined);
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

        let mainPos = "MF", subPos = "CM", beta = 1.1, yieldVal = 1.2, grow = 2.5;

        const isLeverage = name.includes("Leverage") || name.includes("2x") || name.includes("3x") || ticker === "TQQQ" || ticker === "SOXL";
        const isSafeHaven = name.includes("Gold") || name.includes("GLD") || name.includes("Silver") || name.includes("Copper") || ticker === "IAU" || ticker === "TLT" || name.includes("Treasury");

        if (isSafeHaven) { mainPos = "GK"; subPos = "GK"; beta = 0.2; yieldVal = 3.5; grow = 0.5; }
        else if (isLeverage) { mainPos = "FW"; subPos = "ST"; beta = 3.0; yieldVal = 0.0; grow = 6.0; }
        else if (type === "ETF" || type === "INDEX") { mainPos = "MF"; subPos = "CM"; beta = 1.0; yieldVal = 1.5; grow = 1.5; }
        else if (sector.includes("Technology") || sector.includes("Communication") || industry.toLowerCase().includes("semicon") || name.toLowerCase().includes("tech") || name.toLowerCase().includes("bio")) {
            mainPos = "FW";
            if (isKR && name.includes("에코프로")) { subPos = "LW"; beta = 2.5; grow = 5.0; }
            else if (ticker === "NVDA" || ticker === "TSLA" || name.toLowerCase().includes("nvidia")) { subPos = "ST"; beta = 2.2; grow = 5.0; }
            else { subPos = "RW"; beta = 1.8; grow = 4.0; }
            yieldVal = 0.1;
        } else if (sector.includes("Financial") || sector.includes("Utilities") || sector.includes("Energy") || industry.toLowerCase().includes("insurance") || industry.toLowerCase().includes("bank")) {
            mainPos = "DF";
            if (industry.includes("Bank") || industry.includes("Insurance")) { subPos = "CB"; beta = 0.5; yieldVal = 5.5; }
            else if (name.includes("현대차") || name.includes("기아")) { subPos = (name.includes("현대차") ? "RB" : "LB"); beta = 0.8; yieldVal = 4.5; }
            else { subPos = "CB"; beta = 0.7; yieldVal = 3.5; }
            grow = 1.2;
        } else {
            if (name.includes("Apple") || name.includes("Microsoft")) { subPos = "CAM"; beta = 1.2; grow = 3.5; }
            else { subPos = "CM"; beta = 1.1; yieldVal = 1.5; }
            grow = 2.5;
        }

        return { name, ticker, country, change: (Math.random() * 4 - 2).toFixed(1), mainPos, subPos, beta, yield: yieldVal, grow, trait: sector || "KOSPI/NASDAQ" };
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        if (!data) return;
        if (data.length === 0) {
            list.innerHTML = "";
            return;
        }
        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.addToRoster('${stock.ticker}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats"><span class="m-price">+ 영입</span></div>
            </div>
        `).join('');
        this.currentMarketData = data;
    }

    addToRoster(ticker) {
        let stock = LOCAL_TOP_STOCKS.find(s => s.ticker === ticker) || this.currentMarketData?.find(s => s.ticker === ticker);
        if (!stock) stock = this.mapYahooQuote({ symbol: ticker, shortname: ticker });
        if (this.myRoster.some(s => s.ticker === ticker)) { alert("이미 영입된 종목입니다!"); return; }
        this.myRoster.push(stock);
        
        // Clear search input and results after adding to roster
        document.getElementById('market-search').value = "";
        this.renderMarketList([]); 

        this.renderRoster();
    }

    renderRoster() {
        const list = document.getElementById('my-roster-list');
        if (this.myRoster.length === 0) { list.innerHTML = '<p style="padding:10px; color:#555; font-size:0.7rem;">영입된 종목이 없습니다.</p>'; return; }
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
        for (let key in this.squad) { if (this.squad[key].ticker === ticker) delete this.squad[key]; }
        this.myRoster = this.myRoster.filter(s => s.ticker !== ticker);
        this.renderField(); this.renderRoster(); this.updateStats();
    }

    async shareSquad() {
        const players = Object.entries(this.squad).map(([pos, stock]) => `${pos}:${stock.ticker}`).join(',');
        if (!players) { alert("공유할 스쿼드가 없습니다! 선수를 배치해 주세요."); return; }
        
        const shareData = {
            title: 'STOCK SQUAD | 나의 주식 드림팀',
            text: `나의 전략적 주식 스쿼드(OVR ${document.getElementById('squad-ovr').innerText})를 확인해보세요!`,
            url: `${window.location.origin}${window.location.pathname}?f=${this.formation}&s=${encodeURIComponent(players)}`
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert("공유 링크가 클립보드에 복사되었습니다!");
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    }

    saveSquadLocal() {
        const players = Object.entries(this.squad).map(([pos, stock]) => `${pos}:${stock.ticker}`).join(',');
        if (!players) { alert("저장할 스쿼드가 없습니다! 선수를 배치해 주세요."); return; }
        
        const squadName = prompt("스쿼드 이름을 입력하세요 (예: 나의 공격팀, 2026 베스트 등)", `스쿼드 ${new Date().toLocaleDateString()}`);
        if (!squadName) return;

        const saveData = {
            id: Date.now(),
            name: squadName,
            formation: this.formation,
            squadStr: players,
            date: new Date().toLocaleString()
        };
        
        const savedList = JSON.parse(localStorage.getItem('savedStockSquads') || '[]');
        savedList.push(saveData);
        localStorage.setItem('savedStockSquads', JSON.stringify(savedList));
        
        alert(`"${squadName}" 스쿼드가 저장되었습니다!`);
    }

    async loadSquadLocal() {
        const savedList = JSON.parse(localStorage.getItem('savedStockSquads') || '[]');
        if (savedList.length === 0) { alert("저장된 스쿼드가 없습니다. 먼저 스쿼드를 구성하고 SAVE 해주세요!"); return; }
        
        const modal = document.getElementById('selection-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalList = document.getElementById('modal-market-list');
        
        modalTitle.innerText = "저장된 스쿼드 불러오기";
        modalList.innerHTML = savedList.map(s => `
            <div class="market-item" onclick="window.squadApp.applySavedSquad(${s.id})">
                <div class="item-info">
                    <span class="m-name">📁 ${s.name}</span>
                    <span class="m-ticker">${s.formation} | ${s.date}</span>
                </div>
                <div class="item-stats">
                    <span class="m-price" style="color:var(--accent-red)" onclick="event.stopPropagation(); window.squadApp.deleteSavedSquad(${s.id})">삭제</span>
                </div>
            </div>
        `).join('');
        
        modal.style.display = 'flex';
    }

    async applySavedSquad(squadId) {
        const savedList = JSON.parse(localStorage.getItem('savedStockSquads') || '[]');
        const data = savedList.find(s => s.id === squadId);
        if (!data) return;

        if (confirm(`"${data.name}" 스쿼드를 불러오시겠습니까? 현재 스쿼드는 사라집니다.`)) {
            document.getElementById('selection-modal').style.display = 'none';
            this.formation = data.formation;
            document.getElementById('formation-select').value = data.formation;
            
            const statusMsg = document.createElement('div');
            statusMsg.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.8); padding:20px; border-radius:10px; z-index:1000; color:var(--secondary-neon); border:1px solid var(--secondary-neon);';
            statusMsg.innerHTML = `📂 "${data.name}" 스쿼드를 불러오는 중...`;
            document.body.appendChild(statusMsg);

            this.squad = {}; 
            const playerPairs = data.squadStr.split(',');
            for (const pair of playerPairs) {
                const [pos, ticker] = pair.split(':');
                if (pos && ticker) {
                    const stock = await this.loadStockByTicker(ticker);
                    if (stock) {
                        if (!this.myRoster.some(s => s.ticker === ticker)) this.myRoster.push(stock);
                        this.squad[pos] = stock;
                    }
                }
            }
            this.renderField();
            this.renderRoster();
            this.updateStats();
            statusMsg.remove();
        }
    }

    deleteSavedSquad(squadId) {
        if (!confirm("정말 이 스쿼드를 삭제하시겠습니까?")) return;
        let savedList = JSON.parse(localStorage.getItem('savedStockSquads') || '[]');
        savedList = savedList.filter(s => s.id !== squadId);
        localStorage.setItem('savedStockSquads', JSON.stringify(savedList));
        this.loadSquadLocal(); // Refresh list
    }

    async checkSharedSquad() {
        const urlParams = new URLSearchParams(window.location.search);
        const formation = urlParams.get('f');
        const squadStr = urlParams.get('s');

        if (formation) {
            this.formation = formation;
            document.getElementById('formation-select').value = formation;
        }

        if (squadStr) {
            const statusMsg = document.createElement('div');
            statusMsg.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.8); padding:20px; border-radius:10px; z-index:1000; color:var(--primary-neon); border:1px solid var(--primary-neon);';
            statusMsg.innerHTML = '🛰️ 공유받은 스쿼드를 불러오는 중...';
            document.body.appendChild(statusMsg);

            const playerPairs = squadStr.split(',');
            for (const pair of playerPairs) {
                const [pos, ticker] = pair.split(':');
                if (pos && ticker) {
                    const stock = await this.loadStockByTicker(ticker);
                    if (stock) {
                        if (!this.myRoster.some(s => s.ticker === ticker)) this.myRoster.push(stock);
                        this.squad[pos] = stock;
                    }
                }
            }
            this.renderField();
            this.renderRoster();
            this.updateStats();
            statusMsg.remove();
            
            // Clear URL params without refreshing
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    async loadStockByTicker(ticker) {
        let stock = LOCAL_TOP_STOCKS.find(s => s.ticker === ticker);
        if (stock) return stock;

        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(ticker)}&quotesCount=1`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes && data.quotes.length > 0) {
                return this.mapYahooQuote(data.quotes[0]);
            }
        } catch (e) {
            console.error("Failed to load shared stock", ticker, e);
        }
        return null;
    }

    assignFromRoster(ticker) {
        const stock = this.myRoster.find(s => s.ticker === ticker);
        if (!stock) return;
        if (Object.values(this.squad).some(s => s.ticker === stock.ticker)) { alert("이미 스쿼드에 배치된 선수입니다!"); return; }
        this.autoAssign(ticker);
    }

    autoAssign(ticker, silent = false) {
        const stock = this.myRoster.find(s => s.ticker === ticker);
        if (!stock) return false;
        const role = stock.mainPos;
        const rows = this.getFormationRows();
        const roleIdx = ["FW", "MF", "DF", "GK"].indexOf(role);
        const count = rows[roleIdx];
        
        let targetIndices = Array.from({ length: count }, (_, i) => i);
        if (stock.subPos.includes("R")) targetIndices = targetIndices.reverse();
        else if (stock.subPos.includes("L")) targetIndices = targetIndices;
        else {
            const mid = Math.floor(count / 2);
            targetIndices.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
        }

        for (let i of targetIndices) {
            const posKey = `${role}-${i}`;
            if (!this.squad[posKey]) {
                this.squad[posKey] = stock;
                if (!silent) { this.renderField(); this.renderRoster(); this.updateStats(); }
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
                    const displayPos = this.getDisplayPos(role, i, count);
                    slot.innerHTML = `<div class="plus-icon">+</div><span class="pos-tag">${displayPos}</span>`;
                    slot.onclick = () => this.openSelectionModal(role, posKey);
                }
                rowDiv.appendChild(slot);
            }
            field.appendChild(rowDiv);
        });
    }

    openSelectionModal(role, posKey) {
        const modal = document.getElementById('selection-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalList = document.getElementById('modal-market-list');
        
        modalTitle.innerText = `${role} 포지션 추천 종목`;
        
        const recs = LOCAL_TOP_STOCKS.filter(s => s.mainPos === role);
        
        modalList.innerHTML = recs.map(stock => `
            <div class="market-item" onclick="window.squadApp.directAssign('${stock.ticker}', '${posKey}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats"><span class="m-price">+ 바로배치</span></div>
            </div>
        `).join('');
        
        modal.style.display = 'flex';
    }

    directAssign(ticker, posKey) {
        let stock = LOCAL_TOP_STOCKS.find(s => s.ticker === ticker);
        if (!stock) return;
        
        // Add to roster if not already there
        if (!this.myRoster.some(s => s.ticker === ticker)) {
            this.myRoster.push(stock);
        }
        
        // Remove ticker from any other position first to prevent duplicates in squad
        for (let key in this.squad) {
            if (this.squad[key].ticker === ticker) delete this.squad[key];
        }

        this.squad[posKey] = stock;
        document.getElementById('selection-modal').style.display = 'none';
        this.renderField();
        this.renderRoster();
        this.updateStats();
    }

    getDisplayPos(role, i, total) {
        if (role === 'FW') {
            if (total === 1) return 'ST';
            if (total === 2) return i === 0 ? 'LS' : 'RS';
            if (total === 3) return i === 0 ? 'LW' : (i === 1 ? 'ST' : 'RW');
        }
        if (role === 'MF') {
            if (total === 3) return i === 0 ? 'LCM' : (i === 1 ? 'CAM' : 'RCM');
            if (total === 4) return i === 0 ? 'LM' : (i === 1 ? 'LCM' : (i === 2 ? 'RCM' : 'RM'));
            if (total === 5) return i === 0 ? 'LM' : (i === 1 ? 'LCM' : (i === 2 ? 'CDM' : (i === 3 ? 'RCM' : 'RM')));
        }
        if (role === 'DF') {
            if (total === 3) return i === 0 ? 'LCB' : (i === 1 ? 'CB' : 'RCB');
            if (total === 4) return i === 0 ? 'LB' : (i === 1 ? 'LCB' : (i === 2 ? 'RCB' : 'RB'));
            if (total === 5) return i === 0 ? 'LWB' : (i === 1 ? 'LB' : (i === 2 ? 'CB' : (i === 3 ? 'RB' : 'RWB')));
        }
        return role;
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
        const colorClass = `card-${stock.mainPos.toLowerCase()}`;
        const countryName = stock.country === "🇰🇷" ? "KR" : (stock.country === "🇺🇸" ? "US" : "GL");
        return `
            <div class="stock-card ${colorClass}">
                <div class="card-header">
                    <span class="pos-label">${stock.subPos}</span>
                    <span class="country-tag">${stock.country} ${countryName}</span>
                </div>
                <div class="card-body">
                    <span class="name">${stock.name}</span>
                    <span class="ticker-sub">${stock.ticker}</span>
                </div>
                <div class="card-footer">
                    <span class="change-val ${stock.change >= 0 ? 'up' : 'down'}">
                        ${condIcon} ${Math.abs(stock.change)}%
                    </span>
                </div>
            </div>
        `;
    }

    removeStock(posKey) { delete this.squad[posKey]; this.renderField(); this.renderRoster(); this.updateStats(); }

    updateStats() {
        const players = Object.values(this.squad);
        const count = players.length;
        if (count === 0) { this.setBars(0, 0, 0, 1.0, 0, 0); this.updateCoach("포트폴리오가 비어 있습니다. 선수를 영입하여 스쿼드를 구성해 보세요!"); return; }
        const avgBeta = players.reduce((sum, s) => sum + parseFloat(s.beta), 0) / count;
        const avgYield = players.reduce((sum, s) => sum + parseFloat(s.yield), 0) / count;
        const avgChange = players.reduce((sum, s) => sum + parseFloat(s.change), 0) / count;
        const atkScore = players.filter(p => p.mainPos === 'FW').length * 20 + (avgBeta * 15);
        const defScore = players.filter(p => p.mainPos === 'DF' || p.mainPos === 'GK').length * 15 + (avgYield * 10);
        const linkScore = (count / 11) * 100;
        let balanceScore = 100 - Math.abs(1.0 - avgBeta) * 40;
        let perfScore = 50 + (avgChange * 10);
        let depthScore = (count / 11) * 100;
        const ovr = (balanceScore * 0.4 + perfScore * 0.3 + depthScore * 0.3);
        this.setBars(atkScore, linkScore, defScore, avgBeta, avgYield, Math.round(ovr));
        this.analyzeSquad(players, avgBeta, avgYield);
    }

    setBars(atk, link, def, beta, yieldVal, ovr) {
        document.getElementById('stat-atk').style.width = `${Math.min(atk, 100)}%`;
        document.getElementById('stat-link').style.width = `${Math.min(link, 100)}%`;
        document.getElementById('stat-def').style.width = `${Math.min(def, 100)}%`;
        document.getElementById('avg-beta').innerText = beta.toFixed(2);
        document.getElementById('avg-yield').innerText = yieldVal.toFixed(1) + '%';
        document.getElementById('squad-ovr').innerText = ovr;
        const badge = document.getElementById('current-strategy');
        if (beta > 1.3) { badge.innerText = "공격형"; badge.style.background = "var(--accent-red)"; badge.style.color = "#fff"; }
        else if (beta < 0.7) { badge.innerText = "안정형"; badge.style.background = "var(--secondary-neon)"; badge.style.color = "#000"; }
        else { badge.innerText = "밸런스형"; badge.style.background = "var(--primary-neon)"; badge.style.color = "#000"; }
    }

    analyzeSquad(players, beta, yieldVal) {
        let message = "", recs = [];
        const fwCount = players.filter(p => p.mainPos === 'FW').length;
        const mfCount = players.filter(p => p.mainPos === 'MF').length;
        const dfCount = players.filter(p => p.mainPos === 'DF').length;
        const gkCount = players.filter(p => p.mainPos === 'GK').length;

        // helper to get top stocks by position that are not in squad/roster
        const getTopRecs = (pos, count = 3) => {
            return LOCAL_TOP_STOCKS
                .filter(s => s.mainPos === pos && !this.myRoster.some(r => r.ticker === s.ticker))
                .slice(0, count)
                .map(s => ({ name: s.name, ticker: s.ticker }));
        };

        // 1. Critical Gap Analysis (Primary Priority)
        if (fwCount === 0) {
            message = "전방 공격진이 비어 있습니다! 수익률 극대화를 위해 화끈한 공격수 영입을 추천합니다.";
            recs = getTopRecs("FW");
            if (recs.length === 0) recs = [{ name: "엔비디아", ticker: "NVDA" }, { name: "테슬라", ticker: "TSLA" }];
        } else if (mfCount === 0) {
            message = "중원을 책임질 미드필더가 없습니다! 팀의 중심을 잡아줄 핵심 종목 영입을 추천합니다.";
            recs = getTopRecs("MF");
            if (recs.length === 0) recs = [{ name: "애플", ticker: "AAPL" }, { name: "마이크로소프트", ticker: "MSFT" }];
        } else if (dfCount === 0) {
            message = "방어선이 구축되지 않았습니다! 하락장에 대비해 안정적인 수비수를 배치하세요.";
            recs = getTopRecs("DF");
            if (recs.length === 0) recs = [{ name: "삼성전자", ticker: "005930.KS" }, { name: "현대차", ticker: "005380.KS" }];
        } else if (gkCount === 0) {
            message = "골키퍼(안전자산)가 없습니다. 리스크 관리를 위해 안전자산 영입을 추천합니다.";
            recs = getTopRecs("GK");
            if (recs.length === 0) recs = [{ name: "금(Gold)", ticker: "GLD" }, { name: "미국채 20년+", ticker: "TLT" }];
        } 
        // 2. Strategic Balance Analysis
        else if (beta > 1.7) {
            message = "현재 스쿼드는 매우 공격적입니다. 변동성 조절을 위해 안정적인 수비수 보강을 추천합니다.";
            recs = getTopRecs("DF", 2);
        } else if (beta < 0.6) {
            message = "방어 중심의 구성입니다. 시장 상승에 대비해 공격수 영입을 고려해 보세요.";
            recs = getTopRecs("FW", 2);
        } else if (yieldVal < 0.8) {
            message = "수비력(배당 수익률)이 부족합니다. 배당 성향이 강한 종목으로 밸런스를 맞추세요.";
            recs = LOCAL_TOP_STOCKS.filter(s => s.yield > 3.0 && !this.myRoster.some(r => r.ticker === s.ticker)).slice(0, 2).map(s => ({name: s.name, ticker: s.ticker}));
        } else {
            message = "스쿼드 밸런스가 아주 좋습니다! 추가로 영입할 만한 주요 종목들을 확인해 보세요.";
            recs = LOCAL_TOP_STOCKS.filter(s => !this.myRoster.some(r => r.ticker === s.ticker)).slice(0, 3).map(s => ({name: s.name, ticker: s.ticker}));
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
