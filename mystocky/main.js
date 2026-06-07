// MyStocky: High-End Pet Village Engine with Lucky Clover & Study Systems

class PetGenerator {
    static generateCandidate() {
        const types = ['dog', 'cat'];
        const colors = ["#ffccd5", "#fffffc", "#d8e2dc", "#ece4db", "#ffead0", "#e2ece9", "#f0efeb", "#def1f9", "#ff9ff3", "#feca57"];
        return {
            type: types[Math.floor(Math.random() * types.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            earStyle: Math.random() > 0.5 ? 'floppy' : 'pointy'
        };
    }

    static getHTML(design) {
        const earClass = design.type === 'dog' ? 'ear-dog-floppy' : 'ear-cat-pointy';
        return `
            <div class="pet-body" style="background-color: ${design.color}">
                <div class="pet-ear ${earClass} left"></div>
                <div class="pet-ear ${earClass} right"></div>
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
        this.name = data.name;
        this.ticker = data.ticker;
        this.design = data.design || PetGenerator.generateCandidate();
        this.lucky = data.lucky || 0;
        this.intel = data.intel || 0;
        this.condition = 0;
        this.news = [];
        
        this.x = Math.random() * (window.innerWidth - 100);
        this.y = 180 + Math.random() * (window.innerHeight - 450);
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        this.element = null;
        this.statsBubble = null;
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
            <div class="stocky-bubble">뉴스 공부 중...</div>
            <div class="pet-container">${PetGenerator.getHTML(this.design)}</div>
            <div class="stocky-name-tag">${this.name}</div>
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
        if (this.vx > 0) this.element.classList.remove('facing-left');
        else if (this.vx < 0) this.element.classList.add('facing-left');
    }

    move(bounds, clovers) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > bounds.width - 100) { this.vx *= -1; this.x = Math.max(0, Math.min(this.x, bounds.width - 100)); }
        if (this.y < 180 || this.y > bounds.height - 200) { this.vy *= -1; this.y = Math.max(180, Math.min(this.y, bounds.height - 200)); }
        
        // Collision with clovers
        clovers.forEach((c, idx) => {
            const dist = Math.sqrt((this.x - c.x)**2 + (this.y - c.y)**2);
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
        this.element.querySelector('.stat-bar-container:nth-child(1) span').innerText = `${this.lucky}%`;
        this.element.querySelector('.stat-bar-container:nth-child(2) span').innerText = `${this.intel}%`;
    }

    showTempMsg(msg) {
        this.bubble.innerText = msg;
        this.bubble.style.display = 'block';
        setTimeout(() => this.bubble.style.display = 'none', 3000);
    }

    study() {
        this.intel = Math.min(100, this.intel + 10);
        this.updateStatsUI();
        this.showTempMsg("🎓 뉴스 열공 중!");
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
        document.getElementById('btn-news-center').onclick = () => this.studyAll();
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
                <span class="adopt-badge">영입</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) { alert("마을이 꽉 찼어요!"); return; }
        this.pendingAdoption = { ticker, fullName };
        this.candidates = [PetGenerator.generateCandidate(), PetGenerator.generateCandidate(), PetGenerator.generateCandidate()];
        const container = document.getElementById('candidate-container');
        container.innerHTML = this.candidates.map((c, idx) => `
            <div class="candidate-item ${idx === 0 ? 'selected' : ''}" onclick="window.game.selectCandidate(${idx}, this)">
                <div style="transform: scale(0.6)">${PetGenerator.getHTML(c)}</div>
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
        const stocky = new Stocky({ name, ticker: this.pendingAdoption.ticker, design: this.candidates[this.selectedCandidateIdx] }, this);
        this.stockies.push(stocky);
        this.toggleModal('naming-modal', false);
        this.saveVillage();
    }

    studyAll() {
        if (this.stockies.length === 0) return alert("공부할 스토키가 없어요!");
        this.stockies.forEach(s => s.study());
    }

    eatClover(idx) {
        const clover = this.clovers[idx];
        if (clover && clover.el) clover.el.remove();
        this.clovers.splice(idx, 1);
    }

    startSpawning() {
        setInterval(() => {
            if (this.clovers.length < 5) {
                const x = Math.random() * (window.innerWidth - 50);
                const y = 180 + Math.random() * (window.innerHeight - 400);
                const el = document.createElement('div');
                el.className = 'world-item';
                el.innerText = '🍀';
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
                this.villageEl.appendChild(el);
                this.clovers.push({ x, y, el });
            }
        }, 8000);
    }

    animate() {
        const bounds = this.villageEl.getBoundingClientRect();
        this.stockies.forEach(s => s.move(bounds, this.clovers));
        requestAnimationFrame(() => this.animate());
    }

    saveVillage() {
        const data = this.stockies.map(s => ({ name: s.name, ticker: s.ticker, design: s.design, lucky: s.lucky, intel: s.intel, id: s.id }));
        localStorage.setItem('mystocky_village_v2', JSON.stringify(data));
    }

    loadVillage() {
        const saved = localStorage.getItem('mystocky_village_v2');
        if (saved) JSON.parse(saved).forEach(d => this.stockies.push(new Stocky(d, this)));
    }
}

window.game = new MyStockyVillage();
