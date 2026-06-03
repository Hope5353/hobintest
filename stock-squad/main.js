// Mock stock data
const mockStocks = [
    { name: "삼성전자", code: "005930", price: "72,500", change: "+1.2%" },
    { name: "SK하이닉스", code: "000660", price: "125,400", change: "+2.5%" },
    { name: "NAVER", code: "035420", price: "210,500", change: "-0.5%" },
    { name: "카카오", code: "035720", price: "48,200", change: "+0.8%" },
    { name: "LG에너지솔루션", code: "373220", price: "450,000", change: "-1.1%" },
    { name: "애플", code: "AAPL", price: "$189.43", change: "+0.4%" },
    { name: "테슬라", code: "TSLA", price: "$238.45", change: "-2.1%" },
    { name: "엔비디아", code: "NVDA", price: "$465.20", change: "+3.2%" }
];

document.addEventListener('DOMContentLoaded', () => {
    initSquadGrid();
    setupSearch();
});

function initSquadGrid() {
    const grid = document.getElementById('squad-slots');
    // Simple 4-4-2 formation logic for visualization
    const formation = [1, 4, 4, 2]; // GK, DF, MF, FW
    
    grid.innerHTML = formation.map((count, rowIdx) => `
        <div class="formation-row" style="display: flex; justify-content: space-around; width: 100%;">
            ${Array(count).fill(0).map((_, colIdx) => `
                <div class="player-slot" onclick="selectSlot(${rowIdx}, ${colIdx})">
                    <div class="plus-icon">+</div>
                    <span class="slot-label">${getSlotLabel(rowIdx)}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function getSlotLabel(row) {
    const labels = ["FW", "MF", "DF", "GK"];
    return labels[row] || "PLAYER";
}

function setupSearch() {
    const input = document.getElementById('stock-search');
    const results = document.getElementById('search-results');

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 1) {
            results.innerHTML = '';
            return;
        }

        const filtered = mockStocks.filter(s => 
            s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query)
        );

        results.innerHTML = filtered.map(s => `
            <div class="stock-item" onclick="addStockToSquad('${s.name}')">
                <span class="stock-name">${s.name}</span>
                <span class="stock-code">${s.code}</span>
            </div>
        `).join('');
    });
}

function selectSlot(row, col) {
    alert(`${getSlotLabel(row)} 포지션을 선택하셨습니다. 옆에서 주식을 검색해 영입하세요!`);
}

function addStockToSquad(name) {
    alert(`${name} 종목이 스쿼드에 영입되었습니다! (기능 구현 중)`);
}
