const STOCK_DATABASE = [
    // KR Market
    { name: "삼성전자", ticker: "005930", price: 72500, change: 1.2, pos: "DF", cap: "Large", div: 2.5, grow: 1.5 },
    { name: "SK하이닉스", ticker: "000660", price: 125400, change: 2.5, pos: "MF", cap: "Large", div: 1.2, grow: 3.5 },
    { name: "LG에너지솔루션", ticker: "373220", price: 450000, change: -1.1, pos: "MF", cap: "Large", div: 0.5, grow: 4.5 },
    { name: "삼성바이오로직스", ticker: "207940", price: 780000, change: 0.8, pos: "MF", cap: "Large", div: 0.0, grow: 4.0 },
    { name: "NAVER", ticker: "035420", price: 210500, change: -0.5, pos: "MF", cap: "Mid", div: 0.8, grow: 3.0 },
    { name: "카카오", ticker: "035720", price: 48200, change: 0.8, pos: "MF", cap: "Mid", div: 0.3, grow: 3.2 },
    { name: "현대차", ticker: "005380", price: 195000, change: 1.5, pos: "DF", cap: "Large", div: 4.5, grow: 1.2 },
    { name: "기아", ticker: "000270", price: 85000, change: 1.1, pos: "DF", cap: "Large", div: 5.2, grow: 1.4 },
    { name: "포스코홀딩스", ticker: "005490", price: 480000, change: 3.2, pos: "MF", cap: "Large", div: 2.5, grow: 2.8 },
    { name: "에코프로", ticker: "086520", price: 650000, change: -4.5, pos: "FW", cap: "Mid", div: 0.1, grow: 5.0 },
    
    // US Market
    { name: "Apple", ticker: "AAPL", price: 189.43, change: 0.4, pos: "MF", cap: "Large", div: 0.5, grow: 2.5 },
    { name: "Microsoft", ticker: "MSFT", price: 374.07, change: 1.1, pos: "MF", cap: "Large", div: 0.8, grow: 3.0 },
    { name: "Alphabet", ticker: "GOOGL", price: 135.20, change: -0.8, pos: "MF", cap: "Large", div: 0.0, grow: 3.5 },
    { name: "Amazon", ticker: "AMZN", price: 145.18, change: 1.2, pos: "MF", cap: "Large", div: 0.0, grow: 4.0 },
    { name: "Nvidia", ticker: "NVDA", price: 465.20, change: 3.2, pos: "FW", cap: "Large", div: 0.1, grow: 5.0 },
    { name: "Tesla", ticker: "TSLA", price: 238.45, change: -2.1, pos: "FW", cap: "Large", div: 0.0, grow: 4.8 },
    { name: "Meta", ticker: "META", price: 325.40, change: 1.5, pos: "FW", cap: "Large", div: 0.0, grow: 4.2 },
    { name: "Berkshire Hathaway", ticker: "BRK.B", price: 360.50, change: 0.2, pos: "DF", cap: "Large", div: 0.0, grow: 1.0 },
    { name: "Visa", ticker: "V", price: 250.12, change: 0.5, pos: "DF", cap: "Large", div: 0.8, grow: 2.0 },
    { name: "JPMorgan Chase", ticker: "JPM", price: 155.40, change: 0.3, pos: "DF", cap: "Large", div: 2.5, grow: 1.5 },
    { name: "Coca-Cola", ticker: "KO", price: 58.40, change: 0.1, pos: "DF", cap: "Large", div: 3.2, grow: 0.8 },
    { name: "PepsiCo", ticker: "PEP", price: 168.20, change: -0.2, pos: "DF", cap: "Large", div: 2.8, grow: 1.0 },
    
    // GK (Safe Havens)
    { name: "S&P 500 ETF", ticker: "SPY", price: 450.20, change: 0.5, pos: "GK", cap: "Index", div: 1.5, grow: 1.5 },
    { name: "Nasdaq 100 ETF", ticker: "QQQ", price: 385.15, change: 1.2, pos: "GK", cap: "Index", div: 0.5, grow: 3.5 },
    { name: "Gold ETF", ticker: "GLD", price: 188.40, change: -0.1, pos: "GK", cap: "Asset", div: 0.0, grow: 0.5 },
    { name: "US 10Y Bond", ticker: "TLT", price: 92.40, change: 0.2, pos: "GK", cap: "Asset", div: 3.0, grow: 0.0 }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; // positionIndex: stockObject
        this.init();
    }

    init() {
        this.renderField();
        this.setupEventListeners();
        this.renderMarketList(STOCK_DATABASE);
    }

    setupEventListeners() {
        document.getElementById('formation-select').addEventListener('change', (e) => {
            this.formation = e.target.value;
            this.squad = {}; // Reset squad on formation change for simplicity in MVP
            this.renderField();
            this.updateStats();
        });

        document.getElementById('market-search').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = STOCK_DATABASE.filter(s => 
                s.name.toLowerCase().includes(query) || s.ticker.toLowerCase().includes(query)
            );
            this.renderMarketList(filtered);
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('selection-modal').style.display = 'none';
        });
    }

    renderField() {
        const field = document.getElementById('squad-field');
        field.innerHTML = '';
        
        const rows = this.getFormationRows();
        rows.forEach((count, rowIdx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'formation-row';
            
            for (let i = 0; i < count; i++) {
                const posIdx = `${rowIdx}-${i}`;
                const slot = document.createElement('div');
                slot.className = 'player-slot';
                slot.dataset.pos = posIdx;
                slot.dataset.role = this.getRoleByRow(rowIdx);
                
                if (this.squad[posIdx]) {
                    slot.innerHTML = this.createCardHTML(this.squad[posIdx]);
                } else {
                    slot.innerHTML = `
                        <div class="plus-icon">+</div>
                        <span class="pos-tag">${slot.dataset.role}</span>
                    `;
                }

                slot.onclick = () => this.openSelection(posIdx, slot.dataset.role);
                rowDiv.appendChild(slot);
            }
            field.appendChild(rowDiv);
        });
    }

    getFormationRows() {
        // Returns [FW, MF, DF, GK] counts
        switch(this.formation) {
            case "4-4-2": return [2, 4, 4, 1];
            case "4-3-3": return [3, 3, 4, 1];
            case "3-5-2": return [2, 5, 3, 1];
            case "4-2-3-1": return [1, 5, 4, 1];
            default: return [3, 3, 4, 1];
        }
    }

    getRoleByRow(rowIdx) {
        return ["FW", "MF", "DF", "GK"][rowIdx];
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.addStock('${stock.ticker}')">
                <div class="item-info">
                    <span class="m-name">${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.pos}]</span>
                </div>
                <div class="item-stats">
                    <span class="m-price">${this.formatPrice(stock)}</span>
                    <span class="m-change ${stock.change >= 0 ? 'up' : 'down'}">
                        ${stock.change >= 0 ? '+' : ''}${stock.change}%
                    </span>
                </div>
            </div>
        `).join('');
    }

    formatPrice(stock) {
        if (typeof stock.price === 'number') {
            return stock.ticker.length > 6 ? `$${stock.price}` : `${stock.price.toLocaleString()}원`;
        }
        return stock.price;
    }

    openSelection(posIdx, role) {
        this.activePosIdx = posIdx;
        const modal = document.getElementById('selection-modal');
        const filtered = STOCK_DATABASE.filter(s => s.pos === role);
        this.renderMarketList(filtered, 'modal-market-list');
        
        // Override modal item clicks
        const items = document.querySelectorAll('#modal-market-list .market-item');
        items.forEach((item, idx) => {
            item.onclick = () => {
                this.addStock(filtered[idx].ticker);
                modal.style.display = 'none';
            };
        });

        modal.style.display = 'flex';
    }

    addStock(ticker) {
        const stock = STOCK_DATABASE.find(s => s.ticker === ticker);
        if (this.activePosIdx) {
            this.squad[this.activePosIdx] = stock;
            this.renderField();
            this.updateStats();
        } else {
            alert("필드의 '+' 버튼을 먼저 클릭하여 포지션을 정해주세요!");
        }
    }

    createCardHTML(stock) {
        return `
            <div class="stock-card">
                <span class="ticker">${stock.ticker}</span>
                <span class="name">${stock.name}</span>
                <span class="price">${this.formatPrice(stock)}</span>
                <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                    ${stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change)}%
                </span>
            </div>
        `;
    }

    updateStats() {
        const players = Object.values(this.squad);
        if (players.length === 0) {
            this.setBars(0, 0, 0, 0);
            return;
        }

        const atk = players.reduce((sum, s) => sum + s.grow, 0) / players.length;
        const def = players.reduce((sum, s) => sum + s.div, 0) / players.length;
        const link = players.length / 11; // Squad completion

        this.setBars(atk * 20, link * 100, def * 20);
        
        const totalValue = players.length > 0 ? "포트폴리오 구성 중..." : "0";
        document.getElementById('total-price').innerText = totalValue;
    }

    setBars(atk, link, def) {
        document.getElementById('stat-atk').style.width = `${Math.min(atk, 100)}%`;
        document.getElementById('stat-link').style.width = `${Math.min(link, 100)}%`;
        document.getElementById('stat-def').style.width = `${Math.min(def, 100)}%`;
    }
}

window.squadApp = new SquadManager();
