// 가영아밥먹자 High-Precision Logic & Branching Database

const FOOD_DATABASE = [
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?auto=format&fit=crop&q=80&w=800", r: "스트레스가 확 풀리는 매운맛!", s: "엽기떡볶이", tags: ["stress", "spicy"] },
    { n: "삼겹살 구이", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", r: "기력 보충엔 역시 지글지글 고기!", s: "삼겹살", tags: ["exhausted", "meat"] },
    { n: "전복죽/본죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?auto=format&fit=crop&q=80&w=800", r: "속 편하게 먹고 푹 잠들기 좋아.", s: "본죽", tags: ["tired", "mild"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800", r: "행복해지는 마법의 시즈닝 치킨!", s: "BHC 뿌링클", tags: ["reward", "fried"] },
    { n: "마라탕", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?auto=format&fit=crop&q=80&w=800", r: "알싸한 맛으로 병원 냄새 싹 잊어버려!", s: "마라탕", tags: ["stress", "spicy"] },
    { n: "연어 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", r: "깔끔하고 고급스럽게 즐기는 한 끼.", s: "연어초밥", tags: ["mood_good", "light"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800", r: "지친 속을 따뜻하게 데워주는 힐링푸드.", s: "쌀국수", tags: ["after_night", "warm"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", r: "든든하게 채우는 입안 가득 행복!", s: "수제버거", tags: ["hungry", "heavy"] },
    { n: "등심 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?auto=format&fit=crop&q=80&w=800", r: "겉바속촉, 가영이의 미소 치트키.", s: "돈까스", tags: ["reward", "crispy"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", r: "진한 국물과 고소한 곱창의 조화.", s: "곱창전골", tags: ["stress", "heavy"] },
    { n: "에그 샌드위치", i: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=800", r: "근무 전, 가볍고 든든한 에너지.", s: "서브웨이", tags: ["before_work", "light"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800", r: "열 오르는 기분을 시원하게 식혀줘.", s: "망고빙수", tags: ["angry", "cold"] },
    { n: "매콤 해물찜", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", r: "푸짐한 해산물로 영양 보충!", s: "해물찜", tags: ["meat", "spicy"] },
    { n: "베트남 분짜", i: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", r: "상큼하고 쫄깃하게 입맛 돋우기.", s: "분짜", tags: ["mood_good", "light"] }
];

const BRANCHES = {
    root: {
        text: "가영아, 지금 상황이 어떤 거야?",
        options: [
            { t: "이제 막 근무 끝났어! (퇴근)", next: "after", s: "퇴근" },
            { t: "곧 근무 들어가야 해... (출근 전)", next: "before", s: "출근 전" },
            { t: "오늘은 달콤한 휴식 중! (오프)", next: "off", s: "오프" }
        ]
    },
    after: [
        { text: "오늘 근무 강도는 어땠어?", options: [
            { t: "평화로웠어, 천국 스테이션!", s: "mood_good" },
            { t: "정신없었어, 밥도 못 먹음", s: "hungry" },
            { t: "완전 헬파티... 탈탈 털렸어", s: "stress" },
            { t: "몸이 너무 부서질 것 같아", s: "exhausted" },
            { t: "그냥저냥 무난했어", s: "mild" }
        ]},
        { text: "어느 근무를 마친 거야?", options: [
            { t: "데이 (Day) 마쳤어", s: "energy" },
            { t: "이브닝 (Evening) 마쳤어", s: "tired" },
            { t: "나이트 (Night) 마쳤어", s: "after_night" },
            { t: "연속 근무 끝...", s: "heavy" }
        ]},
        { text: "지금 기분을 한마디로?", options: [
            { t: "매콤한 걸로 다 박살내고 싶어", s: "spicy" },
            { t: "달달한 게 너무 필요해", s: "reward" },
            { t: "기름진 걸로 속을 채울래", s: "fried" },
            { t: "입맛 없고 그냥 눕고 싶어", s: "light" },
            { t: "시원하게 원샷하고 싶어", s: "cold" }
        ]}
    ],
    before: [
        { text: "무슨 근무 들어가는 거야?", options: [
            { t: "데이 (Day)", s: "light" },
            { t: "이브닝 (Evening)", s: "energy" },
            { t: "나이트 (Night)", s: "heavy" }
        ]},
        { text: "지금 컨디션은 어때?", options: [
            { t: "가기 싫어서 눈물 나", s: "reward" },
            { t: "잠이 덜 깨서 몽롱해", s: "spicy" },
            { t: "아직 에너지가 좀 있어!", s: "meat" },
            { t: "그냥 아무 생각이 없어", s: "mild" }
        ]}
    ],
    off: [
        { text: "오늘 가영이의 오프 계획은?", options: [
            { t: "하루종일 집콕하며 쉴래", s: "mild" },
            { t: "친구들 만나서 놀 거야", s: "meat" },
            { t: "밀린 잠 다 자고 일어남", s: "reward" },
            { t: "대청소나 밀린 일 할래", s: "heavy" }
        ]}
    ]
};

class MoodFoodApp {
    constructor() {
        this.currentPath = 'root';
        this.stepIdx = -1;
        this.responses = [];
        this.selectedTags = [];
        this.init();
    }

    init() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
    }

    startSurvey() {
        this.currentPath = 'root';
        this.stepIdx = -1;
        this.responses = [];
        this.selectedTags = [];
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        this.nextStep();
    }

    nextStep(tag) {
        if (tag) this.selectedTags.push(tag);
        this.stepIdx++;

        let q;
        if (this.currentPath === 'root') {
            q = BRANCHES.root;
        } else {
            const branch = BRANCHES[this.currentPath];
            if (this.stepIdx < branch.length) {
                q = branch[this.stepIdx];
            } else {
                return this.showResult();
            }
        }

        this.renderQuestion(q);
    }

    renderQuestion(q) {
        const qText = document.getElementById('question-text');
        const aGrid = document.getElementById('answer-buttons');
        const pFill = document.getElementById('progress-bar-fill');
        
        // Progress (Simple estimation)
        const totalSteps = this.currentPath === 'root' ? 4 : BRANCHES[this.currentPath].length + 1;
        pFill.style.width = `${((this.stepIdx + 1) / totalSteps) * 100}%`;

        qText.innerText = q.text;
        aGrid.innerHTML = '';
        
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.innerText = opt.t;
            btn.onclick = () => {
                this.responses.push(opt.t);
                if (opt.next) {
                    this.currentPath = opt.next;
                    this.stepIdx = -1; // Start branch steps
                }
                this.nextStep(opt.s);
            };
            aGrid.appendChild(btn);
        });
    }

    showResult() {
        document.getElementById('survey-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('result-area').classList.remove('hidden');

        // Logic: Pick foods matching tags
        const scores = {};
        this.selectedTags.forEach(t => scores[t] = (scores[t] || 0) + 1);

        const candidates = FOOD_DATABASE.map(f => {
            let match = 0;
            f.tags.forEach(t => { if (scores[t]) match += scores[t]; });
            return { ...f, score: match + Math.random() * 0.1 }; // Slight random for variety
        }).sort((a, b) => b.score - a.score);

        const picks = candidates.slice(0, 3);
        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Final Summary Logic
        const situation = this.responses[0];
        const state = this.responses[1];
        document.getElementById('result-summary').innerText = 
            `가영아, 지금 "${situation}" 상태에서 "${state}"라니 고생이 많았어 😭\n이럴 땐 아래 3가지 메뉴가 가영이에게 최고의 에너지가 될 거야!`;

        picks.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area"><img src="${food.i}"></div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: 가영이가 오늘 ${state} 상황이라 ${food.r}</p>
                    <div class="order-btn-group">
                        <a href="#" class="mini-order-btn mini-baemin" onclick="window.game.goOrder('baemin', '${food.s}')">배민</a>
                        <a href="#" class="mini-order-btn mini-coupang" onclick="window.game.goOrder('coupang', '${food.s}')">쿠팡</a>
                        <a href="#" class="mini-order-btn mini-kakao" onclick="window.game.sendToBF('${food.n}')">사줘!</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    goOrder(type, search) {
        const url = type === 'baemin' ? `baemin://search?keyword=${encodeURIComponent(search)}` : `coupangeats://search?q=${encodeURIComponent(search)}`;
        window.location.href = url;
        setTimeout(() => { if (window.confirm("앱이 설치되어 있나요? 웹으로 이동할까요?")) window.location.href = type === 'baemin' ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`; }, 1500);
    }

    sendToBF(foodName) {
        const msg = `자기야 나 지금 ${this.responses[0]}인데 ${this.responses[1]}해서 너무 힘들어... 😭 분석해보니까 오늘 [${foodName}] 먹어야 한대! 이거 사주면 가영이 기분 싹 풀릴 듯? 💝`;
        if (navigator.share) { navigator.share({ title: '가영아밥먹자 🏥💝', text: msg, url: window.location.href }); }
        else { alert("메시지가 복사되었습니다! 남자친구에게 보내주세요:\n\n" + msg); }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

window.game = new MoodFoodApp();
