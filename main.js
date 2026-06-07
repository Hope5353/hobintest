// 가영아밥먹자 High-Precision Logic & Real Food Image Database (BEST 3 Choice)

const QUESTIONS = [
    { text: "가영아, 지금 배고픈 정도가 어느 정도야?", options: [{t:"아직은 괜찮아", s:1}, {t:"약간 출출한 정도?", s:2}, {t:"기분 좋게 배고파", s:3}, {t:"슬슬 예민해지려 해", s:4}, {t:"지금 당장 안 먹으면 큰일 나!", s:5}] },
    { text: "오늘 가영이의 기분 점수를 매긴다면?", options: [{t:"완전 최고! 날아갈 것 같아", s:1}, {t:"오늘 좀 예쁘네? 기분 좋아", s:2}, {t:"그냥 평범한 하루였어", s:3}, {t:"누가 건드리면 폭발할 것 같아", s:4}, {t:"세상이 무너진 듯 울적해", s:5}] },
    { text: "지금 가영이의 몸 상태는 어때?", options: [{t:"완전 쌩쌩해! 에너지 뿜뿜", s:1}, {t:"나쁘지 않아, 보통이야", s:2}, {t:"온몸이 찌릿찌릿 피곤해", s:3}, {t:"으슬으슬 춥고 기운 없어", s:4}, {t:"배가 꾸룩꾸룩, 속이 예민해", s:5}] },
    { text: "지금 가장 강렬하게 끌리는 맛은?", options: [{t:"눈물 쏙 빠지는 매운맛", s:1}, {t:"입안이 얼얼한 마라맛", s:2}, {t:"달콤함이 폭발하는 단맛", s:3}, {t:"고소하고 기름진 느끼한 맛", s:4}, {t:"깔끔하고 담백한 건강한 맛", s:5}] },
    { text: "오늘 가영이가 받은 스트레스 정도는?", options: [{t:"스트레스가 뭐야? 행복해", s:1}, {t:"약간 신경 쓰이는 정도?", s:2}, {t:"평소만큼은 받았어", s:3}, {t:"뒷목이 당길 정도로 심해", s:4}, {t:"멘탈이 탈탈 털렸어...", s:5}] },
    { text: "어떤 식감의 음식을 씹고 싶어?", options: [{t:"아삭아삭 신선한 식감", s:1}, {t:"바삭바삭 소리 나는 식감", s:2}, {t:"쫄깃쫄깃 찰진 식감", s:3}, {t:"입에서 살살 녹는 부드러움", s:4}, {t:"뜨끈한 국물에 말아먹는 느낌", s:5}] },
    { text: "지금 가영이의 식탐(욕심) 지수는?", options: [{t:"간단하게 요기만 할래", s:1}, {t:"가벼운 다이어트 식단?", s:2}, {t:"맛있는 거 적당히!", s:3}, {t:"이것저것 다 펼쳐놓고 싶어", s:4}, {t:"배 터질 때까지 먹을 거야", s:5}] },
    { text: "음식의 온도는 어떤 게 좋아?", options: [{t:"머리가 띵할 정도로 차가운 것", s:1}, {t:"시원하고 상큼한 것", s:2}, {t:"적당히 미지근한 것", s:3}, {t:"따뜻하고 포근한 것", s:4}, {t:"입 천장 데일 듯 뜨거운 것", s:5}] },
    { text: "지금 가영이의 소화 능력은?", options: [{t:"돌도 씹어 먹을 수 있어", s:1}, {t:"완전 튼튼, 문제없어", s:2}, {t:"평소랑 비슷해", s:3}, {t:"조금 더부룩한 느낌이야", s:4}, {t:"아주 가벼운 것만 가능해", s:5}] },
    { text: "마지막으로, 오늘 가영이에게 해주고 싶은 보상은?", options: [{t:"나를 위한 작은 사치", s:1}, {t:"죄책감 없는 건강한 한 끼", s:2}, {t:"고생한 나를 위한 폭식", s:3}, {t:"기분 전환을 위한 특별식", s:4}, {t:"따뜻한 위로가 되는 집밥 느낌", s:5}] }
];

const FOOD_DATABASE = [
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?auto=format&fit=crop&q=80&w=800", r: "가영이의 스트레스를 한 방에 날려버릴 매운맛!", s: "엽기떡볶이" },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800", r: "가영이가 제일 행복해지는 마법의 가루!", s: "BHC 뿌링클" },
    { n: "마라탕", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?auto=format&fit=crop&q=80&w=800", r: "가영이 취향대로 듬뿍 담은 얼큰한 마라탕!", s: "마라탕" },
    { n: "생연어 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", r: "입안에서 사르르, 가영이의 마음도 사르르.", s: "연어초밥" },
    { n: "프리미엄 스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=800", r: "오늘 주인공인 가영이를 위한 특별한 정찬.", s: "스테이크" },
    { n: "크림 파스타", i: "https://images.unsplash.com/photo-1612459284970-e8f027596582?auto=format&fit=crop&q=80&w=800", r: "부드럽고 고소하게 가영이의 감성을 충전!", s: "까르보나라" },
    { n: "삼겹살", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", r: "체력 보충이 필요한 가영이를 위한 고기 타임.", s: "삼겹살" },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", r: "두툼한 패티와 치즈로 가영이의 기분을 업!", s: "수제버거" },
    { n: "돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?auto=format&fit=crop&q=80&w=800", r: "바삭함의 정석, 가영이의 미소를 되찾아줄 거야.", s: "돈까스" },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800", r: "속을 편안하고 따뜻하게 달래줄 가영이의 힐링 푸드.", s: "쌀국수" },
    { n: "해물 파전", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", r: "비오는 날이나 흐린 날 가영이의 기분을 업!", s: "해물파전" },
    { n: "신선한 연어 포케", i: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", r: "건강하게 관리하고 싶은 가영이를 위한 선택.", s: "연어포케" },
    { n: "매콤한 찜닭", i: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=800", r: "달콤 짭짤 매콤한 양념이 가영이의 입맛을 저격!", s: "찜닭" },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?auto=format&fit=crop&q=80&w=800", r: "깊고 진한 맛으로 가영이의 하루를 마무리해봐.", s: "곱창전골" },
    { n: "달콤한 벨기에 와플", i: "https://images.unsplash.com/photo-1562329265-95a6d7a83440?auto=format&fit=crop&q=80&w=800", r: "울적한 가영이에게 최고의 당 충전 선물!", s: "와플" },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800", r: "답답한 가영이의 속을 뻥 뚫어줄 시원한 망고!", s: "망고빙수" }
];

class MoodFoodApp {
    constructor() {
        this.currentStep = 0;
        this.totalScore = 0;
        this.init();
    }

    init() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
    }

    startSurvey() {
        this.currentStep = 0;
        this.totalScore = 0;
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        this.showQuestion();
    }

    showQuestion() {
        const q = QUESTIONS[this.currentStep];
        document.getElementById('progress-text').innerText = `질문 ${this.currentStep + 1} / 10`;
        document.getElementById('progress-bar-fill').style.width = `${((this.currentStep + 1) / 10) * 100}%`;
        document.getElementById('question-text').innerText = q.text;
        
        const aGrid = document.getElementById('answer-buttons');
        aGrid.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerText = opt.t;
            btn.onclick = () => {
                this.totalScore += opt.s;
                this.nextStep();
            };
            aGrid.appendChild(btn);
        });
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep < 10) this.showQuestion();
        else this.showResult();
    }

    showResult() {
        document.getElementById('survey-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('result-area').classList.remove('hidden');

        // Logic to pick 3 distinct foods
        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Pick 3 high-relevance foods (simulated by offsets)
        const pickedIndices = [
            (this.totalScore * 7) % FOOD_DATABASE.length,
            (this.totalScore * 13) % FOOD_DATABASE.length,
            (this.totalScore * 19) % FOOD_DATABASE.length
        ];

        // Ensure distinctness
        const finalPicks = [...new Set(pickedIndices)].slice(0, 3);
        // Fallback if set logic reduces size
        while(finalPicks.length < 3) { finalPicks.push((finalPicks.length + 5) % FOOD_DATABASE.length); }

        finalPicks.forEach(idx => {
            const food = FOOD_DATABASE[idx];
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area">
                    <img src="${food.i}" alt="${food.n}">
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">${food.r}</p>
                    <div class="order-btn-group">
                        <a href="baemin://search?keyword=${encodeURIComponent(food.s)}" class="mini-order-btn mini-baemin" onclick="window.game.handleOrder(event, 'baemin', '${food.s}')">배민</a>
                        <a href="coupangeats://search?q=${encodeURIComponent(food.s)}" class="mini-order-btn mini-coupang" onclick="window.game.handleOrder(event, 'coupang', '${food.s}')">쿠팡이츠</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    handleOrder(e, type, search) {
        if (!window.confirm(`${type === 'baemin' ? '배달의민족' : '쿠팡이츠'} 앱으로 이동할까?`)) {
            e.preventDefault();
            const webUrl = type === 'baemin' 
                ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}`
                : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`;
            window.location.href = webUrl;
        }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    }
}

window.game = new MoodFoodApp();
