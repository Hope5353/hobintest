// MyStocky: Improved Tamagotchi Logic (Fixed Text & Korean Support)

const ARCHETYPES = [
    { type: "puffy", feature: "none", animation: "walking" },
    { type: "sparky", feature: "horns", animation: "bouncing" },
    { type: "boxy", feature: "antenna", animation: "walking" },
    { type: "lovey", feature: "none", animation: "walking" },
    { type: "star", feature: "none", animation: "bouncing" }
];

const POP_COLORS = ["#ff7675", "#fdcb6e", "#00cec9", "#0984e3", "#6c5ce7", "#fab1a0", "#55efc4", "#81ecec", "#74b9ff", "#a29bfe"];

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
        
        this.x = Math.random() * (window.innerWidth - 120);
        this.y = Math.random() * (window.innerHeight - 350);
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        
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
        
        // Flip ONLY the character visual, not the whole wrapper (to keep text readable)
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
        this.element.classList.add('bouncing');
        this.showNews();
        setTimeout(() => { if (this.archetype.animation !== 'bouncing') this.element.classList.remove('bouncing'); }, 2000);
    }

    async fetchNewsAndMood() {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${this.ticker}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes && data.quotes.length > 0) {
                // Fetch mood based on condition (simulated change %)
                this.condition = (Math.random() * 10 - 5).toFixed(2);
            }
            if (data.news && data.news.length > 0) {
                this.news = data.news.map(n => n.title);
            }
        } catch (e) { console.error("Fetch failed", this.ticker); }
    }

    showNews() {
        if (!this.bubble) return;
        const msg = this.news.length > 0 ? this.news[Math.floor(Math.random() * this.news.length)] : `${this.ticker} 관련 한국어 소식을 찾는 중이에요! ☁️`;
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
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { this.toggleModal('market-modal', false); this.toggleModal('naming-modal', false); };
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
        document.getElementById(id).style.display = show ? 'flex' : 'none';
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
                        type: q.quoteType === "EQUITY" ? "주식" : "ETF"
                    }));
                this.renderSearchResults(results);
            }
        } catch (e) { console.error("Search failed"); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) { list.innerHTML = '<p style="padding:20px; text-align:center;">찾으시는 주식이 없어요 😢</p>'; return; }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;">
                    <strong style="font-size:1rem; display:block;">${q.country || ""} ${q.name}</strong>
                    <div style="font-size:0.8rem; color:#666;">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">입양하기</span>
            </div>
        `).join('');
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
        document.getElementById('stocky-count').innerText = this.stockies.length;
        document.getElementById('empty-message').style.display = this.stockies.length > 0 ? 'none' : 'block';
    }

    saveVillage() {
        const data = this.stockies.map(s => ({ name: s.name, ticker: s.ticker, color: s.color, archetype: s.archetype, condition: s.condition, id: s.id }));
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
