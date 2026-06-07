// MyStocky: Mobile Optimized Virtual Pet Engine

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
        this.petType = data.petType || 'shiba';
        this.lucky = data.lucky || 0;
        this.intel = data.intel || 0;
        
        // Dynamic boundary-safe initial positions
        const bounds = this.game.getVillageBounds();
        this.x = Math.random() * (bounds.width - 80);
        this.y = bounds.height * 0.4 + Math.random() * (bounds.height * 0.4);
        
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        this.element = null;
        this.statsBubble = null;
        this.bubble = null;
        this.news = [];
        this.rawNewsData = [];
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
            <div class="stocky-bubble">열공 중!</div>
            <div class="pet-visual-container">${PetRenderer.getHTML(this.petType)}</div>
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
        this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
        const visual = this.element.querySelector('.pet-visual-container');
        if (this.vx > 0) visual.style.transform = 'scaleX(1)';
        else if (this.vx < 0) visual.style.transform = 'scaleX(-1)';
    }

    move(bounds, clovers) {
        this.x += this.vx;
        this.y += this.vy;

        // Strict Mobile Bounds
        if (this.x < 0 || this.x > bounds.width - 80) { 
            this.vx *= -1; 
            this.x = Math.max(0, Math.min(this.x, bounds.width - 80)); 
        }
        if (this.y < bounds.height * 0.3 || this.y > bounds.height - 120) { 
            this.vy *= -1; 
            this.y = Math.max(bounds.height * 0.3, Math.min(this.y, bounds.height - 120)); 
        }
        
        // Clover collision with offset center
        clovers.forEach((c, idx) => {
            const dist = Math.sqrt((this.x + 40 - c.x)**2 + (this.y + 40 - c.y)**2);
            if (dist < 35) {
                this.game.eatClover(idx);
                this.lucky = Math.min(100, this.lucky + 10);
                this.updateStatsUI();
                this.showTempMsg("🍀 냠냠! 행운 UP");
            }
        });
        
        this.updateElementPosition();
    }

    updateStatsUI() {
        if (!this.element) return;
        this.element.querySelector('.fill-lucky').style.width = `${this.lucky}%`;
        this.element.querySelector('.fill-intel').style.width = `${this.intel}%`;
        const labels = this.element.querySelectorAll('.bar-label span');
        labels[0].innerText = `${this.lucky}%`;
        labels[1].innerText = `${this.intel}%`;
    }

    showTempMsg(msg) {
        if (!this.bubble) return;
        this.bubble.innerText = msg;
        this.bubble.style.display = 'block';
        setTimeout(() => { if (this.bubble) this.bubble.style.display = 'none'; }, 4000);
    }

    study(newsData) {
        this.intel = Math.min(100, this.intel + 5);
        this.rawNewsData = newsData;
        this.updateStatsUI();
        this.showTempMsg("🎓 지능 쑥쑥!");
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

    getVillageBounds() {
        return {
            width: this.villageEl.clientWidth || window.innerWidth,
            height: this.villageEl.clientHeight || (window.innerHeight - 150)
        };
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
            clearTimeout(this.searchTimeout);
            if (query.length === 0) {
                document.getElementById('market-list').innerHTML = '';
                return;
            }
            this.searchTimeout = setTimeout(() => this.searchGlobal(query), 400);
        };
        
        const searchTrigger = document.getElementById('btn-search-trigger');
        if (searchTrigger) {
            searchTrigger.onclick = () => {
                const query = searchInput.value.trim();
                if (query) this.searchGlobal(query);
            };
        }

        document.getElementById('btn-adopt-confirm').onclick = () => this.confirmAdoption();
    }

    toggleModal(id, show) {
        const m = document.getElementById(id);
        if (m) m.style.display = show ? 'flex' : 'none';
        if (show && id === 'market-modal') {
            const input = document.getElementById('market-search');
            if (input) input.focus();
        }
    }

    async searchGlobal(query) {
        const list = document.getElementById('market-list');
        list.innerHTML = '<p style="padding:20px; text-align:center; color: #ff7675;">🔍 주식 정보를 물어오는 중...</p>';
        
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=15&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes && data.quotes.length > 0) {
                const results = data.quotes.filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF")
                    .map(q => ({
                        name: q.shortname || q.longname || q.symbol,
                        ticker: q.symbol,
                        country: q.exchange && (q.exchange.includes("KS") || q.exchange.includes("KOE")) ? "🇰🇷" : "🇺🇸",
                        type: q.quoteType === "EQUITY" ? "주식" : "ETF"
                    }));
                this.renderSearchResults(results);
            } else {
                list.innerHTML = '<p style="padding:20px; text-align:center;">결과가 없어요 😢 다른 이름으로 검색해 보세요!</p>';
            }
        } catch (e) {
            console.error("Search failed", e);
            list.innerHTML = '<p style="padding:20px; text-align:center; color: #ff7675;">앗! 정보를 가져오지 못했어요. 잠시 후 다시 시도해 주세요.</p>';
        }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) {
            list.innerHTML = '<p style="padding:20px; text-align:center;">주식을 찾지 못했어요 😢</p>';
            return;
        }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="text-align: left;">
                    <strong style="font-size:1rem; display:block;">${q.country} ${q.name}</strong>
                    <div style="font-size:0.75rem; color:#666;">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">입양</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) return alert("마을 정원이 찼어요!");
        this.pendingAdoption = { ticker, fullName };
        const container = document.getElementById('candidate-container');
        container.innerHTML = PET_TYPES.map((p, idx) => `
            <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                <div style="transform: scale(0.6)">${PetRenderer.getHTML(p.type)}</div>
                <p style="font-size:0.75rem; font-weight:bold;">${p.name}</p>
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
        if (!name) return alert("이름을 정해주세요!");
        const petType = PET_TYPES[this.selectedCandidateIdx].type;
        const stocky = new Stocky({ name, ticker: this.pendingAdoption.ticker, petType }, this);
        this.stockies.push(stocky);
        this.toggleModal('naming-modal', false);
        this.saveVillage();
    }

    async studyAndNews() {
        if (this.stockies.length === 0) return alert("입양부터 시작해볼까요?");
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '<p style="padding:20px;">뉴스 찾는 중...</p>';
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
            } catch (e) {}
        }

        if (allNews.length === 0) newsList.innerHTML = '<p style="padding:20px;">공부할 내용이 아직 없어요.</p>';
        else {
            newsList.innerHTML = allNews.map(n => `
                <div class="news-item">
                    <span style="font-size:0.7rem; color:var(--ui-accent); font-weight:bold;">📢 ${n.stockName} • ${n.source}</span>
                    <span class="news-title">${n.title}</span>
                    <a href="${n.link}" target="_blank" class="news-link">자세히 보기 →</a>
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
            const bounds = this.getVillageBounds();
            if (this.clovers.length < 3) {
                const x = 50 + Math.random() * (bounds.width - 100);
                const y = bounds.height * 0.4 + Math.random() * (bounds.height * 0.4);
                const el = document.createElement('div');
                el.className = 'world-item';
                el.innerText = '🍀';
                el.style.left = `${x}px`; el.style.top = `${y}px`;
                this.villageEl.appendChild(el);
                this.clovers.push({ x, y, el });
            }
        }, 12000);
    }

    animate() {
        const bounds = this.getVillageBounds();
        this.stockies.forEach(s => s.move(bounds, this.clovers));
        requestAnimationFrame(() => this.animate());
    }

    saveVillage() {
        const data = this.stockies.map(s => ({ name: s.nickname, ticker: s.ticker, petType: s.petType, lucky: s.lucky, intel: s.intel, id: s.id }));
        localStorage.setItem('mystocky_village_v4', JSON.stringify(data));
    }

    loadVillage() {
        const saved = localStorage.getItem('mystocky_village_v4');
        if (saved) JSON.parse(saved).forEach(d => this.stockies.push(new Stocky(d, this)));
    }
}

window.game = new MyStockyVillage();
