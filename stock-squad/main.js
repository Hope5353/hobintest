const STOCK_DATABASE = [
    // KR Market
    { name: "삼성전자", ticker: "005930", country: "🇰🇷", price: 72500, change: 1.2, mainPos: "DF", subPos: "리베로", beta: 0.8, yield: 2.8, trait: "우량주" },
    { name: "SK하이닉스", ticker: "000660", country: "🇰🇷", price: 125400, change: 2.5, mainPos: "MF", subPos: "공격형 미드필더", beta: 1.4, yield: 1.2, trait: "반도체" },
    { name: "LG에너지솔루션", ticker: "373220", country: "🇰🇷", price: 450000, change: -1.1, mainPos: "MF", subPos: "수비형 미드필더", beta: 1.2, yield: 0.0, trait: "2차전지" },
    { name: "현대차", ticker: "005380", country: "🇰🇷", price: 195000, change: 1.5, mainPos: "DF", subPos: "오른쪽 풀백", beta: 0.7, yield: 4.8, trait: "자동차/가치주" },
    { name: "기아", ticker: "000270", country: "🇰🇷", price: 85000, change: 1.1, mainPos: "DF", subPos: "왼쪽 풀백", beta: 0.7, yield: 5.2, trait: "자동차/가치주" },
    { name: "NAVER", ticker: "035420", country: "🇰🇷", price: 210500, change: -0.5, mainPos: "MF", subPos: "중앙 미드필더", beta: 1.1, yield: 0.8, trait: "플랫폼" },
    { name: "카카오", ticker: "035720", country: "🇰🇷", price: 48200, change: 0.8, mainPos: "MF", subPos: "중앙 미드필더", beta: 1.3, yield: 0.3, trait: "플랫폼" },
    { name: "에코프로", ticker: "086520", country: "🇰🇷", price: 650000, change: -4.5, mainPos: "FW", subPos: "왼쪽 윙어", beta: 2.5, yield: 0.1, trait: "초고성장주" },
    { name: "에코프로비엠", ticker: "247540", country: "🇰🇷", price: 280000, change: -3.2, mainPos: "FW", subPos: "오른쪽 윙어", beta: 2.3, yield: 0.2, trait: "초고성장주" },
    { name: "셀트리온", ticker: "068270", country: "🇰🇷", price: 175000, change: 0.2, mainPos: "MF", subPos: "수비형 미드필더", beta: 0.9, yield: 0.0, trait: "바이오" },
    { name: "신한지주", ticker: "055550", country: "🇰🇷", price: 38000, change: 0.4, mainPos: "DF", subPos: "센터백", beta: 0.5, yield: 5.5, trait: "고배당/금융" },
    { name: "KB금융", ticker: "105560", country: "🇰🇷", price: 55000, change: 0.6, mainPos: "DF", subPos: "센터백", beta: 0.5, yield: 5.2, trait: "고배당/금융" },
    { name: "삼성화재", ticker: "000810", country: "🇰🇷", price: 250000, change: 0.2, mainPos: "DF", subPos: "스토퍼", beta: 0.4, yield: 6.2, trait: "철벽방어/금융" },

    // US Market
    { name: "Nvidia", ticker: "NVDA", country: "🇺🇸", price: 465.20, change: 3.2, mainPos: "FW", subPos: "타겟형 스트라이커", beta: 2.1, yield: 0.0, trait: "AI 대장주" },
    { name: "Tesla", ticker: "TSLA", country: "🇺🇸", price: 238.45, change: -2.1, mainPos: "FW", subPos: "쉐도우 스트라이커", beta: 2.4, yield: 0.0, trait: "전기차/성장주" },
    { name: "Apple", ticker: "AAPL", country: "🇺🇸", price: 189.43, change: 0.4, mainPos: "MF", subPos: "공격형 미드필더", beta: 1.1, yield: 0.5, trait: "빅테크" },
    { name: "Microsoft", ticker: "MSFT", country: "🇺🇸", price: 374.07, change: 1.1, mainPos: "MF", subPos: "공격형 미드필더", beta: 1.0, yield: 0.8, trait: "빅테크/AI" },
    { name: "Amazon", ticker: "AMZN", country: "🇺🇸", price: 145.18, change: 1.2, mainPos: "FW", subPos: "오른쪽 윙어", beta: 1.3, yield: 0.0, trait: "전자상거래" },
    { name: "Meta", ticker: "META", country: "🇺🇸", price: 325.40, change: 1.5, mainPos: "FW", subPos: "왼쪽 윙어", beta: 1.4, yield: 0.0, trait: "소셜미디어" },
    { name: "Coca-Cola", ticker: "KO", country: "🇺🇸", price: 58.40, change: 0.1, mainPos: "DF", subPos: "센터백", beta: 0.6, yield: 3.2, trait: "배당귀족" },
    { name: "PepsiCo", ticker: "PEP", country: "🇺🇸", price: 168.20, change: -0.2, mainPos: "DF", subPos: "센터백", beta: 0.6, yield: 2.8, trait: "배당귀족" },
    { name: "Johnson & Johnson", ticker: "JNJ", country: "🇺🇸", price: 155.10, change: -0.1, mainPos: "DF", subPos: "리베로", beta: 0.5, yield: 3.0, trait: "헬스케어" },
    { name: "Visa", ticker: "V", country: "🇺🇸", price: 250.12, change: 0.5, mainPos: "MF", subPos: "수비형 미드필더", beta: 1.0, yield: 0.8, trait: "결제망" },
    { name: "ExxonMobil", ticker: "XOM", country: "🇺🇸", price: 102.40, change: -1.2, mainPos: "DF", subPos: "스토퍼", beta: 0.8, yield: 3.8, trait: "에너지" },

    // Safe Havens (GK)
    { name: "S&P 500 ETF", ticker: "SPY", country: "🇺🇸", price: 450.20, change: 0.5, mainPos: "GK", subPos: "골키퍼", beta: 1.0, yield: 1.5, trait: "지수 추종" },
    { name: "Nasdaq 100 ETF", ticker: "QQQ", country: "🇺🇸", price: 385.15, change: 1.2, mainPos: "GK", subPos: "골키퍼", beta: 1.3, yield: 0.5, trait: "나스닥 추종" },
    { name: "KOSPI 200 ETF", ticker: "KODEX 200", country: "🇰🇷", price: 32500, change: 0.4, mainPos: "GK", subPos: "골키퍼", beta: 1.0, yield: 1.8, trait: "국내지수" },
    { name: "Gold ETF", ticker: "GLD", country: "🇺🇸", price: 188.40, change: -0.1, mainPos: "GK", subPos: "골키퍼", beta: 0.1, yield: 0.0, trait: "안전자산" },
    { name: "US Treasury 20Y+", ticker: "TLT", country: "🇺🇸", price: 92.40, change: 0.2, mainPos: "GK", subPos: "골키퍼", beta: -0.2, yield: 3.5, trait: "미국채" }
];

class SquadManager {
    constructor() {
        this.formation = "4-3-3";
        this.squad = {}; // posIndex: stock
        this.init();
    }

    init() {
        this.renderField();
        this.setupEventListeners();
        this.renderMarketList(STOCK_DATABASE);
        this.updateStats();
    }

    setupEventListeners() {
        document.getElementById('formation-select').addEventListener('change', (e) => {
            this.formation = e.target.value;
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
        
        const rows = this.getFormationRows(); // [FW, MF, DF, GK]
        rows.forEach((count, rowIdx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'formation-row';
            const role = ["FW", "MF", "DF", "GK"][rowIdx];
            
            for (let i = 0; i < count; i++) {
                const posKey = `${role}-${i}`;
                const slot = document.createElement('div');
                slot.className = 'player-slot';
                
                if (this.squad[posKey]) {
                    slot.innerHTML = this.createCardHTML(this.squad[posKey]);
                    slot.onclick = () => this.removeStock(posKey);
                } else {
                    slot.innerHTML = `<div class="plus-icon">+</div><span class="pos-tag">${role}</span>`;
                    slot.onclick = () => this.openMarketForPos(role, posKey);
                }
                rowDiv.appendChild(slot);
            }
            field.appendChild(rowDiv);
        });
    }

    getFormationRows() {
        switch(this.formation) {
            case "4-4-2": return [2, 4, 4, 1];
            case "4-3-3": return [3, 3, 4, 1];
            case "3-5-2": return [2, 5, 3, 1];
            case "4-2-3-1": return [1, 5, 4, 1];
            default: return [3, 3, 4, 1];
        }
    }

    createCardHTML(stock) {
        const condIcon = stock.change >= 1.0 ? '🔥' : (stock.change <= -1.0 ? '📉' : '➡️');
        const condClass = stock.change >= 1.0 ? 'up' : (stock.change <= -1.0 ? 'down' : '');
        
        return `
            <div class="stock-card">
                <span class="flag">${stock.country}</span>
                <span class="condition ${condClass}">${condIcon}</span>
                <span class="role-badge">${stock.subPos}</span>
                <span class="name">${stock.name}</span>
                <span class="price">${this.formatPrice(stock)}</span>
                <span class="change ${stock.change >= 0 ? 'up' : 'down'}">
                    ${stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change)}%
                </span>
            </div>
        `;
    }

    formatPrice(stock) {
        return stock.country === "🇰🇷" ? `${stock.price.toLocaleString()}원` : `$${stock.price}`;
    }

    renderMarketList(data, containerId = 'market-list') {
        const list = document.getElementById(containerId);
        list.innerHTML = data.map(stock => `
            <div class="market-item" onclick="window.squadApp.autoAssign('${stock.ticker}')">
                <div class="item-info">
                    <span class="m-name">${stock.country} ${stock.name}</span>
                    <span class="m-ticker">${stock.ticker} [${stock.subPos}]</span>
                </div>
                <div class="item-stats">
                    <span class="m-price">${this.formatPrice(stock)}</span>
                    <span class="m-change ${stock.change >= 0 ? 'up' : 'down'}">${stock.change}%</span>
                </div>
            </div>
        `).join('');
    }

    openMarketForPos(role, posKey) {
        this.targetPosKey = posKey;
        const modal = document.getElementById('selection-modal');
        const filtered = STOCK_DATABASE.filter(s => s.mainPos === role);
        this.renderMarketList(filtered, 'modal-market-list');
        
        const items = document.querySelectorAll('#modal-market-list .market-item');
        items.forEach((item, idx) => {
            item.onclick = () => {
                this.squad[this.targetPosKey] = filtered[idx];
                this.finishAssign();
            };
        });
        modal.style.display = 'flex';
    }

    autoAssign(ticker) {
        const stock = STOCK_DATABASE.find(s => s.ticker === ticker);
        const role = stock.mainPos;
        const rows = this.getFormationRows();
        const roleIdx = ["FW", "MF", "DF", "GK"].indexOf(role);
        const count = rows[roleIdx];
        
        for (let i = 0; i < count; i++) {
            const posKey = `${role}-${i}`;
            if (!this.squad[posKey]) {
                this.squad[posKey] = stock;
                this.finishAssign();
                return;
            }
        }
        alert(`${role} 포지션이 꽉 찼습니다! 기존 선수를 클릭해 방출 후 영입하세요.`);
    }

    finishAssign() {
        document.getElementById('selection-modal').style.display = 'none';
        this.renderField();
        this.updateStats();
    }

    removeStock(posKey) {
        delete this.squad[posKey];
        this.renderField();
        this.updateStats();
    }

    updateStats() {
        const players = Object.values(this.squad);
        const count = players.length;
        
        if (count === 0) {
            this.setBars(0, 0, 0, 0, 0);
            this.updateCoach("포트폴리오가 비어 있습니다. 선수를 영입하여 스쿼드를 구성해 보세요!");
            return;
        }

        const avgBeta = players.reduce((sum, s) => sum + s.beta, 0) / count;
        const avgYield = players.reduce((sum, s) => sum + s.yield, 0) / count;
        
        // Atk = Growth (Proxy by Beta & High Vol)
        const atkScore = players.filter(p => p.mainPos === 'FW').length * 20 + (avgBeta * 15);
        const defScore = players.filter(p => p.mainPos === 'DF' || p.mainPos === 'GK').length * 15 + (avgYield * 10);
        const linkScore = (count / 11) * 100;

        this.setBars(atkScore, linkScore, defScore, avgBeta, avgYield);
        this.analyzeSquad(players, avgBeta, avgYield);
    }

    setBars(atk, link, def, beta, yieldVal) {
        document.getElementById('stat-atk').style.width = `${Math.min(atk, 100)}%`;
        document.getElementById('stat-link').style.width = `${Math.min(link, 100)}%`;
        document.getElementById('stat-def').style.width = `${Math.min(def, 100)}%`;
        document.getElementById('avg-beta').innerText = beta.toFixed(2);
        document.getElementById('avg-yield').innerText = yieldVal.toFixed(1) + '%';
        
        const badge = document.getElementById('current-strategy');
        if (beta > 1.3) { badge.innerText = "공격형"; badge.style.background = "var(--accent-red)"; }
        else if (beta < 0.7) { badge.innerText = "안정형"; badge.style.background = "var(--secondary-neon)"; }
        else { badge.innerText = "밸런스형"; badge.style.background = "var(--primary-neon)"; }
    }

    analyzeSquad(players, beta, yieldVal) {
        let message = "";
        let recs = [];

        if (beta > 1.5) {
            message = "포트폴리오가 매우 공격적입니다! 하락장에서 큰 타격을 입을 수 있으니 수비 보강이 시급합니다.";
            recs = ["신한지주", "Coca-Cola", "Gold ETF", "US Treasury 20Y+"];
        } else if (beta < 0.6) {
            message = "매우 안정적인 스쿼드입니다. 하지만 시장 상승기에는 소외될 수 있으니 공격수 영입을 고려해 보세요.";
            recs = ["Nvidia", "Tesla", "에코프로"];
        } else if (yieldVal < 1.0) {
            message = "배당 수익률이 낮습니다. 현금 흐름 창출을 위해 고배당 수비수(금융/가치주) 영입을 추천합니다.";
            recs = ["현대차", "기아", "Johnson & Johnson", "ExxonMobil"];
        } else {
            message = "훌륭한 밸런스입니다! 현재의 스쿼드 컨디션을 유지하며 시장 흐름에 대응하세요.";
            recs = ["S&P 500 ETF", "Apple"];
        }

        this.updateCoach(message, recs);
    }

    updateCoach(msg, recs = []) {
        document.getElementById('coach-message').innerText = msg;
        const recArea = document.getElementById('recommendation-area');
        recArea.innerHTML = recs.map(r => `<span class="rec-tag">영입추천: ${r}</span>`).join('');
    }
}

window.squadApp = new SquadManager();
