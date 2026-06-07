// MyStocky Game Manager
class MyStockyGame {
    constructor() {
        this.stock = null;
        this.level = 1;
        this.hp = 100;
        this.hunger = 100;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadGame();
        this.startTick();
    }

    setupEventListeners() {
        document.getElementById('btn-feed').onclick = () => this.feed();
        document.getElementById('btn-play').onclick = () => this.play();
        document.getElementById('btn-clean').onclick = () => this.clean();
        document.getElementById('btn-market').onclick = () => this.showMarket();
        
        document.querySelector('.close-modal').onclick = () => {
            document.getElementById('market-modal').style.display = 'none';
        };
    }

    showMarket() {
        const modal = document.getElementById('market-modal');
        const list = document.getElementById('market-list');
        const stocks = [
            { name: "삼성전자", icon: "📱" },
            { name: "엔비디아", icon: "📟" },
            { name: "애플", icon: "🍎" },
            { name: "테슬라", icon: "⚡" }
        ];

        list.innerHTML = stocks.map(s => `
            <div class="market-item" onclick="window.game.adopt('${s.name}', '${s.icon}')">
                <span style="font-size: 2rem;">${s.icon}</span>
                <p>${s.name}</p>
            </div>
        `).join('');

        modal.style.display = 'flex';
    }

    adopt(name, icon) {
        this.stock = { name, icon };
        this.hp = 100;
        this.hunger = 100;
        this.level = 1;
        
        document.getElementById('market-modal').style.display = 'none';
        this.updateUI();
        this.showMessage(`반가워! 나는 ${name} 스토키야!`);
        this.saveGame();
    }

    feed() {
        if (!this.stock) return this.showMessage("먼저 종목을 입양해주세요!");
        this.hunger = Math.min(100, this.hunger + 20);
        this.showMessage("냠냠! 맛있다!");
        this.updateUI();
        this.saveGame();
    }

    play() {
        if (!this.stock) return this.showMessage("먼저 종목을 입양해주세요!");
        this.hp = Math.min(100, this.hp + 10);
        this.showMessage("헤헤, 즐거워!");
        this.updateUI();
        this.saveGame();
    }

    clean() {
        if (!this.stock) return this.showMessage("먼저 종목을 입양해주세요!");
        this.showMessage("반짝반짝 깨끗해졌어!");
        this.updateUI();
    }

    showMessage(msg) {
        document.getElementById('message').innerText = msg;
    }

    updateUI() {
        if (this.stock) {
            document.getElementById('stock-name').innerText = this.stock.name;
            document.querySelector('.character-placeholder').innerText = this.stock.icon;
        }
        document.getElementById('stock-level').innerText = `Lv. ${this.level}`;
        document.getElementById('hp').innerText = this.hp;
        document.getElementById('hunger').innerText = this.hunger;
    }

    startTick() {
        setInterval(() => {
            if (this.stock) {
                this.hunger = Math.max(0, this.hunger - 1);
                if (this.hunger < 20) this.hp = Math.max(0, this.hp - 1);
                this.updateUI();
            }
        }, 10000); // Decrement stats every 10 seconds
    }

    saveGame() {
        const data = { stock: this.stock, level: this.level, hp: this.hp, hunger: this.hunger };
        localStorage.setItem('mystocky_save', JSON.stringify(data));
    }

    loadGame() {
        const saved = localStorage.getItem('mystocky_save');
        if (saved) {
            const data = JSON.parse(saved);
            this.stock = data.stock;
            this.level = data.level;
            this.hp = data.hp;
            this.hunger = data.hunger;
            this.updateUI();
        }
    }
}

window.game = new MyStockyGame();
