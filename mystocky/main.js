// MyStocky: High-End Pet Village Engine

// Asset Engine: Generates 30+ unique combinations of Dog/Cat breeds
class PetGenerator {
    static getSpecies() {
        return [
            { type: 'dog', ears: ['floppy', 'pointy', 'folded'], tails: ['stubby', 'curled'] },
            { type: 'cat', ears: ['pointy', 'small'], tails: ['long', 'stubby'] }
        ];
    }

    static generateCandidate() {
        const speciesPool = this.getSpecies();
        const spec = speciesPool[Math.floor(Math.random() * speciesPool.length)];
        const colors = ["#f5ebe0", "#e3d5ca", "#d5bdaf", "#edede9", "#d6ccc2", "#f5f5f5", "#ccb7ae", "#8d99ae"];
        const patterns = ["solid", "patch", "tuxedo", "siamese"];
        
        return {
            species: spec.type,
            earType: spec.ears[Math.floor(Math.random() * spec.ears.length)],
            tailType: spec.tails[Math.floor(Math.random() * spec.tails.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            pattern: patterns[Math.floor(Math.random() * patterns.length)],
            accentColor: "#3d405b"
        };
    }

    static getSVG(design) {
        const { species, earType, tailType, color, pattern, accentColor } = design;
        
        // Dynamic Ear SVG components
        let earsSVG = '';
        if (earType === 'pointy') {
            earsSVG = `<path d="M15,25 L25,5 L35,25 Z" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
                       <path d="M65,25 L75,5 L85,25 Z" fill="${color}" stroke="${accentColor}" stroke-width="3"/>`;
        } else if (earType === 'floppy') {
            earsSVG = `<path d="M10,25 Q5,25 5,45 Q15,55 25,40 L25,25 Z" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
                       <path d="M90,25 Q95,25 95,45 Q85,55 75,40 L75,25 Z" fill="${color}" stroke="${accentColor}" stroke-width="3"/>`;
        } else { // folded/small
            earsSVG = `<circle cx="25" cy="25" r="12" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
                       <circle cx="75" cy="25" r="12" fill="${color}" stroke="${accentColor}" stroke-width="3"/>`;
        }

        // Body with Pattern logic
        let bodyOverlay = '';
        if (pattern === 'patch') bodyOverlay = `<circle cx="30" cy="50" r="15" fill="rgba(0,0,0,0.1)"/>`;
        if (pattern === 'siamese') bodyOverlay = `<ellipse cx="50" cy="55" rx="15" ry="10" fill="rgba(0,0,0,0.2)"/>`;

        return `
            <svg viewBox="0 0 100 100" class="pet-svg">
                <!-- Tail -->
                <path d="M80,75 Q95,75 90,60" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="round"/>
                <!-- Ears -->
                ${earsSVG}
                <!-- Body -->
                <rect x="20" y="30" width="60" height="60" rx="25" fill="${color}" stroke="${accentColor}" stroke-width="4"/>
                ${bodyOverlay}
                <!-- Face -->
                <circle cx="40" cy="55" r="3" fill="${accentColor}"/>
                <circle cx="60" cy="55" r="3" fill="${accentColor}"/>
                <path d="M48,65 Q50,68 52,65" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>
                <!-- Whiskers for Cats -->
                ${species === 'cat' ? `
                    <line x1="15" y1="60" x2="30" y2="60" stroke="${accentColor}" stroke-width="1"/>
                    <line x1="70" y1="60" x2="85" y2="60" stroke="${accentColor}" stroke-width="1"/>
                ` : ''}
            </svg>
        `;
    }
}

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = data.name;
        this.ticker = data.ticker;
        this.design = data.design || PetGenerator.generateCandidate();
        this.condition = parseFloat(data.condition) || 0;
        this.news = data.news || [];
        
        this.x = Math.random() * (window.innerWidth - 120);
        this.y = 150 + Math.random() * (window.innerHeight - 450);
        this.vx = (Math.random() - 0.5) * 0.15; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.15;
        
        this.element = null;
        this.bubble = null;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'stocky-wrapper walking';
        wrapper.id = `stocky-${this.id}`;
        
        wrapper.innerHTML = `
            <div class="stocky-bubble">🐾</div>
            <div class="pet-svg-container">
                ${PetGenerator.getSVG(this.design)}
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
        const container = this.element.querySelector('.pet-svg-container');
        if (this.vx > 0) container.style.transform = 'scaleX(1)';
        else if (this.vx < 0) container.style.transform = 'scaleX(-1)';
    }

    move(bounds) {
        const speedMultiplier = 1 + Math.abs(this.condition) * 0.02;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > bounds.width - 100) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 100)); }
        if (this.y < 150 || this.y > bounds.height - 200) { this.vy *= -1; this.y = Math.max(150, Math.min(this.y, bounds.height - 200)); }
        this.updateElementPosition();
    }

    react() {
        this.element.classList.add('bouncing');
        this.showNews();
        setTimeout(() => { this.element.classList.remove('bouncing'); }, 2000);
    }

    async fetchNewsAndMood() {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(this.name + " " + this.ticker)}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.news && data.news.length > 0) {
                this.news = data.news.map(n => n.title);
                this.rawNewsData = data.news.map(n => ({ title: n.title, source: n.publisher, link: n.link, stockName: this.name }));
            }
        } catch (e) { console.error("Fetch failed"); }
    }

    showNews() {
        if (!this.bubble) return;
        const greets = ["오늘 날씨 어때? ☀️", "나랑 놀아줘! 🐾", "주인님 반가워요!", "마을이 참 예뻐요 🌿"];
        const msg = this.news.length > 0 ? this.news[Math.floor(Math.random() * this.news.length)] : greets[Math.floor(Math.random() * greets.length)];
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
        this.renderEnvironment();
        this.setupEventListeners();
        this.loadVillage();
        this.animate();
        this.refreshData();
    }

    renderEnvironment() {
        const layer = document.createElement('div');
        layer.className = 'grass-layer';
        for (let i = 0; i < 20; i++) {
            const tuft = document.createElement('span');
            tuft.className = 'tuft';
            tuft.innerText = Math.random() > 0.5 ? '🌿' : '🌱';
            tuft.style.left = Math.random() * 100 + '%';
            tuft.style.top = 30 + Math.random() * 60 + '%';
            layer.appendChild(tuft);
        }
        this.villageEl.appendChild(layer);
    }

    setupEventListeners() {
        document.getElementById('btn-market').onclick = () => this.toggleModal('market-modal', true);
        document.getElementById('btn-news-center').onclick = () => this.openNewsroom();
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { this.toggleModal('market-modal', false); this.toggleModal('naming-modal', false); this.toggleModal('news-modal', false); };
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
    }

    async searchGlobal(query) {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes) {
                const results = data.quotes.filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF")
                    .map(q => ({ name: q.shortname || q.longname || q.symbol, ticker: q.symbol, country: q.exchange && (q.exchange.includes("KS") || q.exchange.includes("KOE")) ? "🇰🇷" : "🇺🇸" }));
                this.renderSearchResults(results);
            }
        } catch (e) { console.error("Search failed"); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) { list.innerHTML = '<p style="padding:20px;">결과가 없어요!</p>'; return; }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;">
                    <strong>${q.country} ${q.name}</strong>
                    <div style="font-size:0.8rem; color:#888;">${q.ticker}</div>
                </div>
                <span class="adopt-badge">선택</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) { alert("마을이 꽉 찼어요!"); return; }
        this.pendingAdoption = { ticker, fullName };
        this.candidates = [];
        for (let i = 0; i < 3; i++) { this.candidates.push(PetGenerator.generateCandidate()); }
        this.renderCandidates();
        document.getElementById('naming-ticker-info').innerText = `${fullName} (${ticker})`;
        this.toggleModal('market-modal', false);
        this.toggleModal('naming-modal', true);
    }

    renderCandidates() {
        const container = document.getElementById('candidate-container');
        container.innerHTML = this.candidates.map((c, idx) => `
            <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                <div style="width:60px; height:60px;">${PetGenerator.getSVG(c)}</div>
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
        const design = this.candidates[this.selectedCandidateIdx];
        const newStocky = new Stocky({ name: nickname, ticker: this.pendingAdoption.ticker, design }, this);
        this.stockies.push(newStocky);
        this.toggleModal('naming-modal', false);
        this.saveVillage();
        this.updateVillageStats();
        newStocky.fetchNewsAndMood();
    }

    openNewsroom() {
        const list = document.getElementById('news-list');
        const allNews = [];
        this.stockies.forEach(s => { if (s.rawNewsData) allNews.push(...s.rawNewsData); });
        if (allNews.length === 0) list.innerHTML = '<p style="padding:40px;">아직 소식이 없어요.</p>';
        else list.innerHTML = allNews.map(n => `<div class="news-item"><span class="news-source">📢 ${n.stockName}</span><span class="news-title">${n.title}</span><a href="${n.link}" target="_blank" class="news-link">원본 보기 →</a></div>`).join('');
        this.toggleModal('news-modal', true);
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
        const data = this.stockies.map(s => ({ name: s.name, ticker: s.ticker, design: s.design, condition: s.condition, id: s.id, rawNewsData: s.rawNewsData }));
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
        setInterval(() => { if (this.stockies.length > 0) this.stockies[Math.floor(Math.random() * this.stockies.length)].showNews(); }, 15000);
        setInterval(() => { this.stockies.forEach(s => s.fetchNewsAndMood()); }, 300000);
    }
}

window.game = new MyStockyVillage();
