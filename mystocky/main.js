// MyStocky: Stock Tamagotchi Village Logic

const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", type: "주식", icon: "📱" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", type: "주식", icon: "📟" },
    { name: "현대차", ticker: "005380.KS", country: "🇰🇷", type: "주식", icon: "🚗" },
    { name: "엔비디아", ticker: "NVDA", country: "🇺🇸", type: "주식", icon: "📟" },
    { name: "테슬라", ticker: "TSLA", country: "🇺🇸", type: "주식", icon: "⚡" },
    { name: "애플", ticker: "AAPL", country: "🇺🇸", type: "주식", icon: "🍎" },
    { name: "마이크로소프트", ticker: "MSFT", country: "🇺🇸", type: "주식", icon: "💻" },
    { name: "비트코인 ETF", ticker: "IBIT", country: "🇺🇸", type: "ETF", icon: "🪙" }
];

const SPECIES = ["round", "box", "tall"];
const COLORS = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43", "#ee5253", "#0abde3", "#10ac84", "#74b9ff", "#a29bfe"];

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = data.name;
        this.ticker = data.ticker;
        this.icon = data.icon || "📈";
        this.color = data.color || "#ffffff";
        this.species = data.species || "round";
        this.condition = data.condition || 0;
        this.news = data.news || [];
        
        this.x = Math.random() * (window.innerWidth - 100);
        this.y = Math.random() * (window.innerHeight - 300);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        
        this.element = null;
        this.bubble = null;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'stocky-wrapper walking';
        wrapper.id = `stocky-${this.id}`;
        
        const moodClass = this.condition > 3 ? 'mood-great' : (this.condition > 0 ? 'mood-happy' : (this.condition < 0 ? 'mood-sad' : ''));
        
        wrapper.innerHTML = `
            <div class="stocky-bubble">뉴스 소식을 기다리는 중...</div>
            <div class="stocky-character-container">
                <div class="stock-badge">${this.icon}</div>
                <div class="stocky-body species-${this.species} ${moodClass}" style="background-color: ${this.color}">
                    <div class="stocky-eyes">
                        <div class="stocky-eye"></div>
                        <div class="stocky-eye"></div>
                    </div>
                    <div class="stocky-blush">
                        <div class="blush"></div>
                        <div class="blush"></div>
                    </div>
                    <div class="stocky-mouth"></div>
                </div>
                <div class="stocky-feet">
                    <div class="stocky-foot"></div>
                    <div class="stocky-foot"></div>
                </div>
            </div>
            <div class="stocky-name-tag">${this.name}</div>
        `;
        
        wrapper.onclick = (e) => { e.stopPropagation(); this.react(); };
        this.element = wrapper;
        this.bubble = wrapper.querySelector('.stocky-bubble');
        document.getElementById('village').appendChild(wrapper);
        this.updateElementPosition();
    }

    updateElementPosition() {
        if (!this.element) return;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        if (this.vx > 0) this.element.classList.remove('facing-left');
        else if (this.vx < 0) this.element.classList.add('facing-left');
    }

    move(bounds) {
        const speedMultiplier = 1 + Math.abs(this.condition) * 0.05;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > bounds.width - 100) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 100)); }
        if (this.y < 0 || this.y > bounds.height - 120) { this.vy *= -1; this.y = Math.max(0, Math.min(this.y, bounds.height - 120)); }
        this.updateElementPosition();
    }

    react() {
        this.element.style.transform = 'scale(1.2)';
        this.showNews();
        setTimeout(() => { this.element.style.transform = 'scale(1)'; }, 200);
    }

    async fetchNewsAndMood() {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${this.ticker}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes && data.quotes.length > 0) this.condition = (Math.random() * 8 - 4).toFixed(2);
            if (data.news && data.news.length > 0) this.news = data.news.map(n => n.title);
        } catch (e) { console.error("Failed to fetch data", this.ticker, e); }
    }

    showNews() {
        if (this.news.length > 0) {
            const randomNews = this.news[Math.floor(Math.random() * this.news.length)];
            this.bubble.innerText = randomNews;
        } else {
            this.bubble.innerText = `${this.ticker} 소식을 찾고 있어요!`;
        }
        this.bubble.style.display = 'block';
        setTimeout(() => { if (this.bubble) this.bubble.style.display = 'none'; }, 5000);
    }
}

class MyStockyVillage {
    constructor() {
        this.stockies = [];
        this.searchTimeout = null;
        this.pendingAdoption = null;
        this.candidates = [];
        this.selectedCandidateIdx = 0;
        this.villageEl = document.getElementById('village');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadVillage();
        this.animate();
        this.refreshData();
    }

    setupEventListeners() {
        document.getElementById('btn-market').onclick = () => this.toggleModal('market-modal', true);
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { this.toggleModal('market-modal', false); this.toggleModal('naming-modal', false); };
        });

        const searchInput = document.getElementById('market-search');
        searchInput.oninput = (e) => {
            const rawQuery = e.target.value.trim();
            clearTimeout(this.searchTimeout);
            if (rawQuery === "") { this.renderSearchResults([]); return; }
            const query = rawQuery.toLowerCase();
            const localResults = LOCAL_TOP_STOCKS.filter(s => s.name.toLowerCase().includes(query) || s.ticker.toLowerCase().includes(query));
            this.renderSearchResults(localResults);
            this.searchTimeout = setTimeout(() => this.searchGlobal(rawQuery, localResults), 400);
        };

        document.getElementById('btn-adopt-confirm').onclick = () => this.confirmAdoption();
    }

    toggleModal(id, show) {
        document.getElementById(id).style.display = show ? 'flex' : 'none';
        if (show && id === 'market-modal') document.getElementById('market-search').focus();
    }

    async searchGlobal(query, localResults) {
        const list = document.getElementById('market-list');
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=15&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes) {
                const globalResults = data.quotes.filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "INDEX")
                    .map(q => ({
                        name: q.shortname || q.longname || q.symbol,
                        ticker: q.symbol,
                        country: q.exchange && (q.exchange.includes("KS") || q.exchange.includes("KOE")) ? "🇰🇷" : "🇺🇸",
                        type: q.quoteType === "EQUITY" ? "주식" : "ETF",
                        icon: "📈"
                    }));
                const seen = new Set(localResults.map(s => s.ticker));
                const combined = [...localResults];
                globalResults.forEach(s => { if (!seen.has(s.ticker)) { combined.push(s); seen.add(s.ticker); } });
                this.renderSearchResults(combined);
            }
        } catch (e) { console.error("Global search failed", e); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) { list.innerHTML = '<p style="padding:20px; color:#888;">검색 결과가 없어요 😢</p>'; return; }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}', '${q.icon || "📈"}')">
                <div style="flex: 1;">
                    <strong style="display:block;">${q.country || ""} ${q.name}</strong>
                    <div class="ticker">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">➕ 영입</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName, icon) {
        if (this.stockies.length >= 5) { alert("마을이 꽉 찼어요! 최대 5마리까지만 키울 수 있습니다."); return; }
        
        this.pendingAdoption = { ticker, fullName, icon };
        this.candidates = [];
        for (let i = 0; i < 3; i++) {
            this.candidates.push({
                species: SPECIES[Math.floor(Math.random() * SPECIES.length)],
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            });
        }
        
        this.renderCandidates();
        document.getElementById('naming-ticker-info').innerText = `${fullName} (${ticker})`;
        document.getElementById('naming-input').value = "";
        this.toggleModal('market-modal', false);
        this.toggleModal('naming-modal', true);
    }

    renderCandidates() {
        const container = document.getElementById('candidate-container');
        container.innerHTML = this.candidates.map((c, idx) => `
            <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                <div class="stocky-body species-${c.species}" style="background-color: ${c.color}; width: 50px; height: 55px; border-width: 3px;">
                    <div class="stocky-eyes" style="top: 15px; padding: 0 10px;">
                        <div class="stocky-eye" style="width: 5px; height: 5px;"></div>
                        <div class="stocky-eye" style="width: 5px; height: 5px;"></div>
                    </div>
                </div>
            </div>
        `).join('');
        this.selectedCandidateIdx = 0;
    }

    selectCandidate(idx, el) {
        document.querySelectorAll('.candidate-item').forEach(item => item.classList.remove('selected'));
        el.classList.add('selected');
        this.selectedCandidateIdx = idx;
    }

    confirmAdoption() {
        const nickname = document.getElementById('naming-input').value.trim();
        if (!nickname) { alert("이름을 지어주세요!"); return; }

        const choice = this.candidates[this.selectedCandidateIdx];
        const newStockyData = {
            name: nickname, ticker: this.pendingAdoption.ticker, icon: this.pendingAdoption.icon,
            color: choice.color, species: choice.species
        };

        const newStocky = new Stocky(newStockyData, this);
        this.stockies.push(newStocky);
        this.toggleModal('naming-modal', false);
        this.saveVillage();
        this.updateVillageStats();
        newStocky.fetchNewsAndMood();
    }

    animate() {
        const bounds = this.villageEl.getBoundingClientRect();
        this.stockies.forEach(s => s.move(bounds));
        requestAnimationFrame(() => this.animate());
    }

    updateVillageStats() {
        document.getElementById('stocky-count').innerText = this.stockies.length;
        document.getElementById('empty-message').style.display = this.stockies.length > 0 ? 'none' : 'block';
    }

    saveVillage() {
        const data = this.stockies.map(s => ({
            name: s.name, ticker: s.ticker, icon: s.icon, color: s.color, species: s.species, condition: s.condition, id: s.id
        }));
        localStorage.setItem('mystocky_village', JSON.stringify(data));
    }

    loadVillage() {
        const saved = localStorage.getItem('mystocky_village');
        if (saved) {
            const data = JSON.parse(saved);
            data.forEach(d => { this.stockies.push(new Stocky(d, this)); });
            this.updateVillageStats();
        }
    }

    refreshData() {
        this.stockies.forEach(s => s.fetchNewsAndMood());
        setInterval(() => {
            if (this.stockies.length > 0) {
                const randomStocky = this.stockies[Math.floor(Math.random() * this.stockies.length)];
                randomStocky.showNews();
            }
        }, 15000);
        setInterval(() => { this.stockies.forEach(s => s.fetchNewsAndMood()); }, 300000);
    }
}

window.game = new MyStockyVillage();
