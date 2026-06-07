// MyStocky: Premium 3-Character Pet Village Engine

const PET_TYPES = [
    { type: 'shiba', name: '진저 시바', icon: '🦊' },
    { type: 'snowcat', name: '스노우 냥이', icon: '🐱' },
    { type: 'beagle', name: '플로피 비글', icon: '🐶' }
];

class PetRenderer {
    static getHTML(type) {
        return `
            <div class="pet-body-main type-${type}">
                <div class="pet-ear left"></div>
                <div class="pet-ear right"></div>
                <div class="pet-face">
                    <div class="pet-eyes">
                        <div class="pet-eye"></div>
                        <div class="pet-eye"></div>
                    </div>
                    <div class="pet-blush">
                        <div class="blush-dot"></div>
                        <div class="blush-dot"></div>
                    </div>
                    <div class="pet-mouth"></div>
                </div>
            </div>
        `;
    }
}

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.nickname = data.name;
        this.ticker = data.ticker;
        this.petType = data.petType || PET_TYPES[0].type;
        this.lucky = data.lucky || 0;
        this.intel = data.intel || 0;
        this.condition = 0;
        this.news = [];
        this.rawNewsData = [];
        
        this.x = Math.random() * (window.innerWidth - 120);
        this.y = 180 + Math.random() * (window.innerHeight - 450);
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        this.element = null;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'stocky-wrapper walking';
        wrapper.id = `stocky-${this.id}`;
        wrapper.innerHTML = `
            <div class="stocky-stats-bubble">
                <div class="stat-bar-container">
                    <div class="bar-label">🍀 행운 <span>${this.lucky}%</span></div>
                    <div class="bar-bg"><div class="bar-fill fill-lucky" style="width: ${this.lucky}%"></div></div>
                </div>
                <div class="stat-bar-container">
                    <div class="bar-label">🎓 지능 <span>${this.intel}%</span></div>
                    <div class="bar-bg"><div class="bar-fill fill-intel" style="width: ${this.intel}%"></div></div>
                </div>
            </div>
            <div class="stocky-bubble">공부하는 중...</div>
            <div class="pet-visual-container">
                ${PetRenderer.getHTML(this.petType)}
            </div>
            <div class="stocky-name-tag">${this.nickname}</div>
        `;
        wrapper.onclick = (e) => { e.stopPropagation(); this.toggleStats(); };
        this.element = wrapper;
        this.statsBubble = wrapper.querySelector('.stocky-stats-bubble');
        this.bubble = wrapper.querySelector('.stocky-bubble');
        document.getElementById('village').appendChild(wrapper);
        this.updateElementPosition();
    }

    toggleStats() {
        const isVisible = this.statsBubble.style.display === 'flex';
        this.statsBubble.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            this.element.classList.add('bouncing');
            setTimeout(() => this.element.classList.remove('bouncing'), 1000);
        }
    }

    updateElementPosition() {
        if (!this.element) return;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        const visual = this.element.querySelector('.pet-visual-container');
        if (this.vx > 0) visual.style.transform = 'scaleX(1)';
        else if (this.vx < 0) visual.style.transform = 'scaleX(-1)';
    }

    move(bounds, clovers) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > bounds.width - 110) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 110)); }
        if (this.y < 180 || this.y > bounds.height - 200) { this.vy *= -1; this.y = Math.max(180, Math.min(this.y, bounds.height - 200)); }
        
        clovers.forEach((c, idx) => {
            const dist = Math.sqrt((this.x + 50 - c.x)**2 + (this.y + 50 - c.y)**2);
            if (dist < 40) {
                this.game.eatClover(idx);
                this.lucky = Math.min(100, this.lucky + 5);
                this.updateStatsUI();
                this.showTempMsg("🍀 행운이 올랐어!");
            }
        });
        this.updateElementPosition();
    }

    updateStatsUI() {
        this.element.querySelector('.fill-lucky').style.width = `${this.lucky}%`;
        this.element.querySelector('.fill-intel').style.width = `${this.intel}%`;
        this.element.querySelectorAll('.bar-label span')[0].innerText = `${this.lucky}%`;
        this.element.querySelectorAll('.bar-label span')[1].innerText = `${this.intel}%`;
    }

    showTempMsg(msg) {
        this.bubble.innerText = msg;
        this.bubble.style.display = 'block';
        setTimeout(() => { if (this.bubble) this.bubble.style.display = 'none'; }, 4000);
    }

    study(newsData) {
        this.intel = Math.min(100, this.intel + 5);
        this.rawNewsData = newsData;
        this.news = newsData.map(n => n.title);
        this.updateStatsUI();
        this.showTempMsg("🎓 뉴스 열공 완료!");
    }
}

class MyStockyVillage {
    constructor() {
        this.stockies = [];
        this.clovers = [];
        this.villageEl = document.getElementById('village');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadVillage();
        this.animate();
        this.startSpawning();
    }

    setupEventListeners() {
        document.getElementById('btn-market').onclick = () => this.toggleModal('market-modal', true);
        document.getElementById('btn-news-center').onclick = () => this.studyAndNews();
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); };
        });
        const searchInput = document.getElementById('market-search');
        searchInput.oninput = (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) return;
            this.searchGlobal(query);
        };
        document.getElementById('btn-adopt-confirm').onclick = () => this.confirmAdoption();
    }

    toggleModal(id, show) { document.getElementById(id).style.display = show ? 'flex' : 'none'; }

    async searchGlobal(query) {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            if (data.quotes) {
                const results = data.quotes.filter(q => q.quoteType === "EQUITY")
                    .map(q => ({ name: q.shortname || q.longname || q.symbol, ticker: q.symbol, country: q.exchange && q.exchange.includes("KS") ? "🇰🇷" : "🇺🇸" }));
                this.renderSearchResults(results);
            }
        } catch (e) { console.error("Search failed"); }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;"><strong>${q.country} ${q.name}</strong><div>${q.ticker}</div></div>
                <span class="adopt-badge">선택</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) return alert("마을이 꽉 찼어요!");
        this.pendingAdoption = { ticker, fullName };
        const container = document.getElementById('candidate-container');
        container.innerHTML = PET_TYPES.map((p, idx) => `
            <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                <div style="transform: scale(0.6)">${PetRenderer.getHTML(p.type)}</div>
                <p style="font-size:0.7rem; margin-top:5px;">${p.name}</p>
            </div>
        `).join('');
        this.selectedCandidateIdx = 0;
        document.getElementById('naming-ticker-info').innerText = `${fullName} (${ticker})`;
        this.toggleModal('market-modal', false);
        this.toggleModal('naming-modal', true);
    }

    selectCandidate(idx, el) {
        document.querySelectorAll('.candidate-item').forEach(item => item.classList.remove('selected'));
        el.classList.add('selected');
        this.selectedCandidateIdx = idx;
    }

    confirmAdoption() {
        const name = document.getElementById('naming-input').value.trim();
        if (!name) return alert("이름을 지어주세요!");
        const petType = PET_TYPES[this.selectedCandidateIdx].type;
        const stocky = new Stocky({ name, ticker: this.pendingAdoption.ticker, petType }, this);
        this.stockies.push(stocky);
        this.toggleModal('naming-modal', false);
        this.saveVillage();
    }

    async studyAndNews() {
        if (this.stockies.length === 0) return alert("먼저 스토키를 입양해 주세요!");
        
        // 1. Show Newsroom Modal
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '<p style="padding:20px;">뉴스 가져오는 중...</p>';
        this.toggleModal('news-modal', true);

        const allNews = [];
        for (let s of this.stockies) {
            try {
                const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(s.nickname + " " + s.ticker)}`;
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
                const response = await fetch(proxyUrl);
                const outerData = await response.json();
                const data = JSON.parse(outerData.contents);
                if (data.news) {
                    const mapped = data.news.slice(0, 2).map(n => ({ title: n.title, source: n.publisher, link: n.link, stockName: s.nickname }));
                    allNews.push(...mapped);
                    s.study(mapped);
                }
            } catch (e) { console.error("News fetch failed"); }
        }

        if (allNews.length === 0) newsList.innerHTML = '<p style="padding:20px;">최신 소식이 없습니다.</p>';
        else {
            newsList.innerHTML = allNews.map(n => `
                <div class="news-item">
                    <span class="news-source">📢 ${n.stockName} • ${n.source}</span>
                    <span class="news-title">${n.title}</span>
                    <a href="${n.link}" target="_blank" class="news-link">원본 보기 →</a>
                </div>
            `).join('');
        }
    }

    eatClover(idx) {
        const clover = this.clovers[idx];
        if (clover && clover.el) clover.el.remove();
        this.clovers.splice(idx, 1);
    }

    startSpawning() {
        setInterval(() => {
            if (this.clovers.length < 3) {
                const x = 50 + Math.random() * (window.innerWidth - 150);
                const y = 200 + Math.random() * (window.innerHeight - 450);
                const el = document.createElement('div');
                el.className = 'world-item';
                el.innerText = '🍀';
                el.style.left = `${x}px`; el.style.top = `${y}px`;
                this.villageEl.appendChild(el);
                this.clovers.push({ x, y, el });
            }
        }, 10000);
    }

    animate() {
        const bounds = this.villageEl.getBoundingClientRect();
        this.stockies.forEach(s => s.move(bounds, this.clovers));
        requestAnimationFrame(() => this.animate());
    }

    saveVillage() {
        const data = this.stockies.map(s => ({ name: s.nickname, ticker: s.ticker, petType: s.petType, lucky: s.lucky, intel: s.intel, id: s.id }));
        localStorage.setItem('mystocky_village_v3', JSON.stringify(data));
    }

    loadVillage() {
        const saved = localStorage.getItem('mystocky_village_v3');
        if (saved) JSON.parse(saved).forEach(d => this.stockies.push(new Stocky(d, this)));
    }
}

window.game = new MyStockyVillage();
