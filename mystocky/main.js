// MyStocky: Advanced Virtual Pet Logic (Neo-Kawaii Style)

const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", type: "주식", icon: "📱" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", type: "주식", icon: "📟" },
    { name: "엔비디아", ticker: "NVDA", country: "🇺🇸", type: "주식", icon: "📟" },
    { name: "테슬라", ticker: "TSLA", country: "🇺🇸", type: "주식", icon: "⚡" },
    { name: "애플", ticker: "AAPL", country: "🇺🇸", type: "주식", icon: "🍎" },
    { name: "마이크로소프트", ticker: "MSFT", country: "🇺🇸", type: "주식", icon: "💻" }
];

const SPECIES = ["round", "box", "tall"];
const COLORS = ["#ffccd5", "#fffffc", "#d8e2dc", "#ece4db", "#ffead0", "#e2ece9", "#f0efeb", "#def1f9"];

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = data.name;
        this.ticker = data.ticker;
        this.color = data.color || "#ffffff";
        this.species = data.species || "round";
        this.condition = data.condition || 0;
        this.news = data.news || [];
        
        // Slower, smoother movement
        this.x = Math.random() * (window.innerWidth - 110);
        this.y = Math.random() * (window.innerHeight - 350);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
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
            <div class="stocky-bubble">안녕! 나 ${this.name}야!</div>
            <div class="stocky-character-container">
                <div class="stocky-ears">
                    <div class="ear left"></div>
                    <div class="ear right"></div>
                </div>
                <div class="stocky-body species-${this.species} ${moodClass}" style="background-color: ${this.color}">
                    <div class="face-container">
                        <div class="stocky-eyes">
                            <div class="stocky-eye"></div>
                            <div class="stocky-eye"></div>
                        </div>
                        <div class="stocky-blush-container">
                            <div class="blush"></div>
                            <div class="blush"></div>
                        </div>
                        <div class="stocky-mouth"></div>
                    </div>
                    <div class="stocky-hands">
                        <div class="hand left"></div>
                        <div class="hand right"></div>
                    </div>
                </div>
                <div class="stocky-feet">
                    <div class="foot"></div>
                    <div class="foot"></div>
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
        const speedMultiplier = 1 + Math.abs(this.condition) * 0.03;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > bounds.width - 110) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 110)); }
        if (this.y < 0 || this.y > bounds.height - 130) { this.vy *= -1; this.y = Math.max(0, Math.min(this.y, bounds.height - 130)); }
        this.updateElementPosition();
    }

    react() {
        this.element.style.transform = 'scale(1.3) rotate(10deg)';
        this.showNews();
        setTimeout(() => { this.element.style.transform = 'scale(1) rotate(0)'; }, 300);
    }

    async fetchNewsAndMood() {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${this.ticker}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes && data.quotes.length > 0) {
                // Real data if available, else simulated for mood
                this.condition = (Math.random() * 6 - 3).toFixed(2);
            }
            if (data.news && data.news.length > 0) {
                this.news = data.news.map(n => n.title);
            }
        } catch (e) { console.error("Fetch failed", this.ticker); }
    }

    showNews() {
        if (!this.bubble) return;
        if (this.news.length > 0) {
            const randomNews = this.news[Math.floor(Math.random() * this.news.length)];
            this.bubble.innerText = randomNews;
        } else {
            this.bubble.innerText = `${this.ticker} 소식 찾는 중... ☁️`;
        }
        this.bubble.style.display = 'block';
        setTimeout(() => { if (this.bubble) this.bubble.style.display = 'none'; }, 6000);
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
    }

    async searchGlobal(query, localResults) {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes) {
                const globalResults = data.quotes.filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF")
                    .map(q => ({
                        name: q.shortname || q.longname || q.symbol,
                        ticker: q.symbol,
                        country: q.exchange && (q.exchange.includes("KS") || q.exchange.includes("KOE")) ? "🇰🇷" : "🇺🇸",
                        type: q.quoteType === "EQUITY" ? "주식" : "ETF"
                    }));
                const seen = new Set(localResults.map(s => s.ticker));
                const combined = [...localResults];
                globalResults.forEach(s => { if (!seen.has(s.ticker)) { combined.push(s); seen.add(s.ticker); } });
                this.renderSearchResults(combined);
            }
        } catch (e) { console.error("Search failed"); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) { list.innerHTML = '<p style="padding:20px;">결과가 없어요!</p>'; return; }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;">
                    <strong style="font-size:1rem;">${q.country || ""} ${q.name}</strong>
                    <div style="font-size:0.8rem; color:#888;">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">데려오기</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) { alert("마을이 꽉 찼어요!"); return; }
        this.pendingAdoption = { ticker, fullName };
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
                <div class="stocky-character-container" style="transform: scale(0.6);">
                    <div class="stocky-ears">
                        <div class="ear left"></div>
                        <div class="ear right"></div>
                    </div>
                    <div class="stocky-body species-${c.species}" style="background-color: ${c.color}">
                        <div class="face-container">
                            <div class="stocky-eyes"><div class="stocky-eye"></div><div class="stocky-eye"></div></div>
                        </div>
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
        const newStocky = new Stocky({ name: nickname, ticker: this.pendingAdoption.ticker, color: choice.color, species: choice.species }, this);
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
        const data = this.stockies.map(s => ({ name: s.name, ticker: s.ticker, color: s.color, species: s.species, condition: s.condition, id: s.id }));
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
