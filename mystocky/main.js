// MyStocky: Stock Tamagotchi Village Logic

// Instant access to top stocks to make search feel "fast" like Stock Squad
const LOCAL_TOP_STOCKS = [
    { name: "삼성전자", ticker: "005930.KS", country: "🇰🇷", type: "주식" },
    { name: "SK하이닉스", ticker: "000660.KS", country: "🇰🇷", type: "주식" },
    { name: "현대차", ticker: "005380.KS", country: "🇰🇷", type: "주식" },
    { name: "기아", ticker: "000270.KS", country: "🇰🇷", type: "주식" },
    { name: "엔비디아", ticker: "NVDA", country: "🇺🇸", type: "주식" },
    { name: "테슬라", ticker: "TSLA", country: "🇺🇸", type: "주식" },
    { name: "애플", ticker: "AAPL", country: "🇺🇸", type: "주식" },
    { name: "마이크로소프트", ticker: "MSFT", country: "🇺🇸", type: "주식" },
    { name: "비트코인 ETF", ticker: "IBIT", country: "🇺🇸", type: "ETF" },
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", type: "ETF" },
    { name: "나스닥 100 ETF", ticker: "QQQ", country: "🇺🇸", type: "ETF" }
];

class Stocky {
    constructor(data, game) {
        this.game = game;
        this.id = data.id || Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = data.name;
        this.ticker = data.ticker;
        this.icon = data.icon || "🥚";
        this.color = data.color || "#ffffff";
        this.condition = data.condition || 0; // Daily change %
        this.news = data.news || [];
        
        // Random initial position within village bounds
        this.x = Math.random() * (window.innerWidth - 100);
        this.y = Math.random() * (window.innerHeight - 300);
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        
        this.element = null;
        this.bubble = null;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'stocky-wrapper floating';
        wrapper.id = `stocky-${this.id}`;
        
        const moodClass = this.condition > 3 ? 'mood-great' : (this.condition > 0 ? 'mood-happy' : (this.condition < 0 ? 'mood-sad' : ''));
        
        wrapper.innerHTML = `
            <div class="stocky-bubble">주가 소식을 기다리는 중...</div>
            <div class="stocky-body ${moodClass}" style="background-color: ${this.color}">
                ${this.icon}
            </div>
            <div class="stocky-name-tag">${this.name} (${this.ticker})</div>
        `;
        
        wrapper.onclick = (e) => {
            e.stopPropagation();
            this.react();
        };

        this.element = wrapper;
        this.bubble = wrapper.querySelector('.stocky-bubble');
        document.getElementById('village').appendChild(wrapper);
        this.updateElementPosition();
    }

    updateElementPosition() {
        if (!this.element) return;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    move(bounds) {
        const speedMultiplier = 1 + Math.abs(this.condition) * 0.1;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > bounds.width - 80) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(this.x, bounds.width - 80));
        }
        if (this.y < 0 || this.y > bounds.height - 100) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(this.y, bounds.height - 100));
        }

        this.updateElementPosition();
    }

    react() {
        this.element.classList.remove('floating');
        this.element.classList.add('bouncing');
        this.showNews();
        setTimeout(() => {
            this.element.classList.remove('bouncing');
            this.element.classList.add('floating');
        }, 2000);
    }

    async fetchNewsAndMood() {
        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${this.ticker}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes && data.quotes.length > 0) {
                this.condition = (Math.random() * 8 - 4).toFixed(2); // Simulated for now
            }

            if (data.news && data.news.length > 0) {
                this.news = data.news.map(n => n.title);
            }
        } catch (e) {
            console.error("Failed to fetch data", this.ticker, e);
        }
    }

    showNews() {
        if (this.news.length > 0) {
            const randomNews = this.news[Math.floor(Math.random() * this.news.length)];
            this.bubble.innerText = randomNews;
        } else {
            this.bubble.innerText = `${this.ticker} 소식을 찾고 있어요!`;
        }
        this.bubble.style.display = 'block';
        setTimeout(() => { this.bubble.style.display = 'none'; }, 5000);
    }
}

class MyStockyVillage {
    constructor() {
        this.stockies = [];
        this.searchTimeout = null;
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
        console.log("Setting up event listeners...");
        document.getElementById('btn-market').onclick = () => this.toggleModal('market-modal', true);
        
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => {
                this.toggleModal('market-modal', false);
                this.toggleModal('naming-modal', false);
            };
        });

        const searchInput = document.getElementById('market-search');
        const searchTrigger = document.getElementById('btn-search-trigger');

        const performSearch = () => {
            const rawQuery = searchInput.value.trim();
            console.log("Performing search for:", rawQuery);
            clearTimeout(this.searchTimeout);
            
            if (rawQuery === "") {
                this.renderSearchResults([]);
                return;
            }

            const query = rawQuery.toLowerCase();
            const localResults = LOCAL_TOP_STOCKS.filter(s => 
                s.name.toLowerCase().includes(query) || s.ticker.toLowerCase().includes(query)
            );
            this.renderSearchResults(localResults);
            this.searchGlobal(rawQuery, localResults);
        };

        // Fast instant search on input
        searchInput.oninput = (e) => {
            const rawQuery = e.target.value.trim();
            clearTimeout(this.searchTimeout);
            
            if (rawQuery === "") {
                this.renderSearchResults([]);
                return;
            }

            const query = rawQuery.toLowerCase();
            const localResults = LOCAL_TOP_STOCKS.filter(s => 
                s.name.toLowerCase().includes(query) || s.ticker.toLowerCase().includes(query)
            );
            this.renderSearchResults(localResults);

            this.searchTimeout = setTimeout(() => this.searchGlobal(rawQuery, localResults), 400);
        };

        // Handle Enter key
        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        };

        // Handle Search Button
        if (searchTrigger) {
            searchTrigger.onclick = performSearch;
        }

        document.getElementById('btn-adopt-confirm').onclick = () => this.confirmAdoption();
    }

    toggleModal(id, show) {
        document.getElementById(id).style.display = show ? 'flex' : 'none';
        if (show && id === 'market-modal') document.getElementById('market-search').focus();
    }

    async searchGlobal(query, localResults) {
        const list = document.getElementById('market-list');
        if (!document.getElementById('search-status')) {
            const status = document.createElement('p');
            status.id = 'search-status';
            status.style.cssText = 'padding:10px; font-size:0.75rem; color:var(--primary-color); text-align:center;';
            status.innerText = '🌐 글로벌 검색 중...';
            list.prepend(status);
        }

        try {
            const targetUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=15&enableFuzzyQuery=true`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            const data = JSON.parse(outerData.contents);
            
            if (data.quotes) {
                const globalResults = data.quotes
                    .filter(q => q.quoteType === "EQUITY" || q.quoteType === "ETF" || q.quoteType === "INDEX")
                    .map(q => ({
                        name: q.shortname || q.longname || q.symbol,
                        ticker: q.symbol,
                        country: q.exchange.includes("KS") || q.exchange.includes("KOE") ? "🇰🇷" : "🇺🇸",
                        type: q.quoteType === "EQUITY" ? "주식" : "ETF"
                    }));
                
                const seen = new Set(localResults.map(s => s.ticker));
                const combined = [...localResults];
                globalResults.forEach(s => { if (!seen.has(s.ticker)) { combined.push(s); seen.add(s.ticker); } });
                this.renderSearchResults(combined);
            }
        } catch (e) {
            console.error("Global search failed", e);
        } finally {
            const status = document.getElementById('search-status');
            if (status) status.remove();
        }
    }

    renderSearchResults(results) {
        const list = document.getElementById('market-list');
        if (results.length === 0) {
            list.innerHTML = '<p style="padding:20px; color:#888;">검색 결과가 없어요 😢</p>';
            return;
        }
        list.innerHTML = results.map(q => `
            <div class="search-item" onclick="window.game.prepareAdoption('${q.ticker}', '${q.name.replace(/'/g, "\\'")}')">
                <div style="flex: 1;">
                    <strong style="display:block;">${q.country} ${q.name}</strong>
                    <div class="ticker">${q.ticker} | ${q.type}</div>
                </div>
                <span class="adopt-badge">➕ 영입</span>
            </div>
        `).join('');
    }

    prepareAdoption(ticker, fullName) {
        if (this.stockies.length >= 5) {
            alert("마을이 꽉 찼어요! 최대 5마리까지만 키울 수 있습니다.");
            return;
        }
        
        this.pendingAdoption = { ticker, fullName };
        const emojis = ["🦊", "🐱", "🐰", "🐼", "🐻", "🐸", "🐷", "🐯", "🦁", "🐨"];
        const colors = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43", "#ee5253", "#0abde3", "#10ac84"];
        
        this.pendingAdoption.icon = emojis[Math.floor(Math.random() * emojis.length)];
        this.pendingAdoption.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.getElementById('naming-emoji').innerText = this.pendingAdoption.icon;
        document.getElementById('naming-preview').style.backgroundColor = this.pendingAdoption.color;
        document.getElementById('naming-ticker-info').innerText = `${fullName} (${ticker})`;
        document.getElementById('naming-input').value = "";
        
        this.toggleModal('market-modal', false);
        this.toggleModal('naming-modal', true);
    }

    confirmAdoption() {
        const nickname = document.getElementById('naming-input').value.trim();
        if (!nickname) { alert("이름을 지어주세요!"); return; }

        const newStockyData = {
            name: nickname, ticker: this.pendingAdoption.ticker,
            icon: this.pendingAdoption.icon, color: this.pendingAdoption.color
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
            name: s.name, ticker: s.ticker, icon: s.icon, color: s.color, condition: s.condition, id: s.id
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
