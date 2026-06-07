// MyStocky: Sophisticated Tamagotchi Logic (Localized & Improved Newsroom)

const ARCHETYPES = [
    { type: "puffy", feature: "none", animation: "walking" },
    { type: "sparky", feature: "horns", animation: "bouncing" },
    { type: "boxy", feature: "antenna", animation: "walking" },
    { type: "lovey", feature: "none", animation: "walking" },
    { type: "star", feature: "none", animation: "bouncing" }
];

const POP_COLORS = ["#ffccd5", "#fffffc", "#d8e2dc", "#ece4db", "#ffead0", "#e2ece9", "#f0efeb", "#def1f9"];

// Korean translations for stock info
const TRANSLATIONS = {
    "EQUITY": "주식",
    "ETF": "ETF",
    "INDEX": "지수",
    "CURRENCY": "환율",
    "Market": "시장"
};

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = data.name;
        this.ticker = data.ticker;
        this.color = data.color || "#ffffff";
        this.archetype = data.archetype || ARCHETYPES[0];
        this.condition = parseFloat(data.condition) || 0;
        this.news = data.news || [];
        this.rawNewsData = data.rawNewsData || [];
        
        this.x = Math.random() * (window.innerWidth - 120);
        this.y = Math.random() * (window.innerHeight - 350);
        this.vx = (Math.random() - 0.5) * 0.2; // Slower movement
        this.vy = (Math.random() - 0.5) * 0.2;
        
        this.element = null;
        this.characterContainer = null;
        this.bubble = null;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        const animClass = this.archetype.animation;
        wrapper.className = `stocky-wrapper ${animClass}`;
        wrapper.id = `stocky-${this.id}`;
        
        let featuresHTML = '';
        if (this.archetype.feature === 'antenna') featuresHTML = '<div class="feature-antenna"></div>';
        if (this.archetype.feature === 'horns') featuresHTML = '<div class="feature-horns"><div class="horn"></div><div class="horn"></div></div>';

        wrapper.innerHTML = `
            <div class="stocky-bubble">소식 전하는 중...</div>
            <div class="stocky-character-container">
                <div class="stocky-features">${featuresHTML}</div>
                <div class="stocky-body type-${this.archetype.type}" style="background-color: ${this.color}">
                    <div class="face-container">
                        <div class="stocky-eyes">
                            <div class="stocky-eye"></div>
                            <div class="stocky-eye"></div>
                        </div>
                        <div class="stocky-mouth"></div>
                    </div>
                </div>
            </div>
            <div class="stocky-name-tag">${this.name}</div>
        `;
        
        wrapper.onclick = (e) => { e.stopPropagation(); this.react(); };
        this.element = wrapper;
        this.characterContainer = wrapper.querySelector('.stocky-character-container');
        this.bubble = wrapper.querySelector('.stocky-bubble');
        document.getElementById('village').appendChild(wrapper);
        this.updateElementPosition();
    }

    updateElementPosition() {
        if (!this.element || !this.characterContainer) return;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        if (this.vx > 0) this.characterContainer.style.transform = 'scaleX(1)';
        else if (this.vx < 0) this.characterContainer.style.transform = 'scaleX(-1)';
    }

    move(bounds) {
        const speedMultiplier = 1 + Math.abs(this.condition) * 0.02;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > bounds.width - 120) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 120)); }
        if (this.y < 0 || this.y > bounds.height - 140) { this.vy *= -1; this.y = Math.max(0, Math.min(this.y, bounds.height - 140)); }
        this.updateElementPosition();
    }

    react() {
        this.element.style.transform = 'scale(1.2)';
        this.showNews();
        setTimeout(() => { this.element.style.transform = 'scale(1)'; }, 200);
    }

    async fetchNewsAndMood() {
        try {
            // Priority: Search in Korean first
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(this.name + " " + this.ticker)}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes && data.quotes.length > 0) {
                this.condition = (Math.random() * 10 - 5).toFixed(2);
            }
            if (data.news && data.news.length > 0) {
                this.news = data.news.map(n => n.title);
                this.rawNewsData = data.news.map(n => ({
                    title: n.title,
                    source: n.publisher,
                    link: n.link,
                    stockName: this.name
                }));
            }
        } catch (e) { console.error("Fetch failed", this.ticker); }
    }

    showNews() {
        if (!this.bubble) return;
        const cuteGreetings = [
            "오늘 분위기 어때요? ✨",
            "무슨 좋은 일 있나 궁금해요!",
            "주인님, 소식 들으셨나요?",
            "헤헤, 마을 산책이 즐거워요!",
            "오늘은 어떤 일이 생길까요?💓"
        ];
        const msg = this.news.length > 0 ? this.news[Math.floor(Math.random() * this.news.length)] : cuteGreetings[Math.floor(Math.random() * cuteGreetings.length)];
        this.bubble.innerText = msg;
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
        document.getElementById('btn-news-center').onclick = () => this.openNewsroom();
        
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { 
                this.toggleModal('market-modal', false); 
                this.toggleModal('naming-modal', false);
                this.toggleModal('news-modal', false);
            };
        });

        const searchInput = document.getElementById('market-search');
        searchInput.oninput = (e) => {
            const rawQuery = e.target.value.trim();
            clearTimeout(this.searchTimeout);
            if (rawQuery === "") { this.renderSearchResults([]); return; }
            this.searchTimeout = setTimeout(() => this.searchGlobal(rawQuery), 400);
        };

        document.getElementById('btn-adopt-confirm').onclick = () => this.confirmAdoption();
    }

    toggleModal(id, show) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = show ? 'flex' : 'none';
        if (show && id === 'market-modal') document.getElementById('market-search').focus();
    }

    async searchGlobal(query) {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=15&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes) {
                const results = data.quotes.filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF")
                    .map(q => ({
                        name: q.shortname || q.longname || q.symbol,
                        ticker: q.symbol,
                        country: q.exchange && (q.exchange.includes("KS") || q.exchange.includes("KOE")) ? "🇰🇷" : "🇺🇸",
                        type: TRANSLATIONS[q.quoteType] || q.quoteType
                    }));
                this.renderSearchResults(results);
            }
        } catch (e) { console.error("Search failed"); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) { list.innerHTML = '<p style="padding:20px; text-align:center;">주식을 찾지 못했어요 😢</p>'; return; }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;">
                    <strong style="font-size:1.1rem; display:block;">${q.country || ""} ${q.name}</strong>
                    <div style="font-size:0.8rem; color:#666;">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">입양</span>
            </div>
        `).join('');
    }

    openNewsroom() {
        const list = document.getElementById('news-list');
        const allNews = [];
        this.stockies.forEach(s => {
            if (s.rawNewsData) allNews.push(...s.rawNewsData);
        });

        if (allNews.length === 0) {
            list.innerHTML = '<p style="padding:40px; color:#888;">아직 우리 친구들이 소식을 물어오지 못했어요.</p>';
        } else {
            // Sort by latest (simulated)
            list.innerHTML = allNews.map(n => `
                <div class="news-item">
                    <span class="news-source">📢 ${n.stockName} • ${n.source}</span>
                    <span class="news-title">${n.title}</span>
                    <a href="${n.link}" target="_blank" class="news-link">원본 보기 →</a>
                </div>
            `).join('');
        }
        this.toggleModal('news-modal', true);
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) { alert("마을에는 최대 5마리까지만 살 수 있어요!"); return; }
        this.pendingAdoption = { ticker, fullName };
        this.candidates = [];
        for (let i = 0; i < 3; i++) {
            this.candidates.push({
                archetype: ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)],
                color: POP_COLORS[Math.floor(Math.random() * POP_COLORS.length)]
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
        container.innerHTML = this.candidates.map((c, idx) => {
            let featuresHTML = '';
            if (c.archetype.feature === 'antenna') featuresHTML = '<div class="feature-antenna"></div>';
            if (c.archetype.feature === 'horns') featuresHTML = '<div class="feature-horns"><div class="horn"></div><div class="horn"></div></div>';
            
            return `
                <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                    <div class="stocky-character-container" style="transform: scale(0.6);">
                        <div class="stocky-features">${featuresHTML}</div>
                        <div class="stocky-body type-${c.archetype.type}" style="background-color: ${c.color}">
                            <div class="face-container">
                                <div class="stocky-eyes"><div class="stocky-eye"></div><div class="stocky-eye"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        this.selectedCandidateIdx = 0;
    }

    selectCandidate(idx, el) {
        document.querySelectorAll('.candidate-item').forEach(item => item.classList.remove('selected'));
        el.classList.add('selected');
        this.selectedCandidateIdx = idx;
    }

    confirmAdoption() {
        const nickname = document.getElementById('naming-input').value.trim();
        if (!nickname) { alert("이름을 꼭 지어주세요!"); return; }
        const choice = this.candidates[this.selectedCandidateIdx];
        const newStocky = new Stocky({ name: nickname, ticker: this.pendingAdoption.ticker, color: choice.color, archetype: choice.archetype }, this);
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
        const count = document.getElementById('stocky-count');
        const empty = document.getElementById('empty-message');
        if (count) count.innerText = this.stockies.length;
        if (empty) empty.style.display = this.stockies.length > 0 ? 'none' : 'block';
    }

    saveVillage() {
        const data = this.stockies.map(s => ({ name: s.name, ticker: s.ticker, color: s.color, archetype: s.archetype, condition: s.condition, id: s.id, rawNewsData: s.rawNewsData }));
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
