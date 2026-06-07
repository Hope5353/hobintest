// 괜찮아, 밥먹자 🏥💝 High-Precision Branching Logic (Realistic Nurse Insights) - Universal Edition

const FOOD_DATABASE = [
    { n: "마라탕 & 꿔바로우", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?q=80&w=800", r: "알싸한 맛으로 병원 냄새와 스트레스를 싹!", s: "마라탕", tags: ["stress", "spicy", "heavy"] },
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?q=80&w=800", r: "빌런 때문에 오른 혈압을 매운맛으로!", s: "엽기떡볶이", tags: ["angry", "spicy", "heavy"] },
    { n: "삼겹살 구이", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "온종일 스테이션 지킨 체력을 고기로 보충!", s: "삼겹살", tags: ["exhausted", "meat", "heavy"] },
    { n: "전복죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?q=80&w=800", r: "밤샘 후 지친 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild", "warm"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995?q=80&w=800", r: "인계 성공적으로 마친 나를 위한 셀프 선물.", s: "BHC 뿌링클", tags: ["reward", "fried", "stable"] },
    { n: "연어 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", r: "깔끔하고 고급스럽게 기분 전환하고 싶을 때.", s: "연어초밥", tags: ["stable", "light", "reward"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800", r: "퇴근 후 으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm", "tired"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", r: "든든하게 입안 가득 채우는 육즙의 행복.", s: "수제버거", tags: ["hungry", "heavy", "meat"] },
    { n: "바삭한 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?q=80&w=800", r: "겉바속촉, 우울함을 날리는 바삭한 소리.", s: "돈까스", tags: ["stable", "crispy", "mild"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", r: "오늘 받은 스트레스, 진한 국물에 소주 한 잔.", s: "곱창전골", tags: ["stress", "heavy", "warm"] },
    { n: "에그 샌드위치", i: "https://images.unsplash.com/photo-1539252554452-da001b2d1531?q=80&w=800", r: "출근 전 가볍고 빠르게, 일할 에너지 충전!", s: "샌드위치", tags: ["light", "energy", "before"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800", r: "열 오르는 기분을 시원하게 식혀줘.", s: "망고빙수", tags: ["angry", "cold", "reward"] },
    { n: "직화 보쌈 세트", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "기름기 뺀 단백질로 오늘 하루 고생한 나에게!", s: "보쌈", tags: ["meat", "heavy", "stable"] },
    { n: "스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800", r: "나이트 전, 최후의 만찬으로 든든하게!", s: "스테이크", tags: ["reward", "meat", "before"] },
    { n: "해물 파전", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800", r: "비오는 오프날, 막걸리와 함께하는 힐링.", s: "해물파전", tags: ["off", "fried", "mild"] }
];

const BRANCHES = {
    root: {
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (지침)", next: "after", s: "after" },
            { t: "이제 곧 출근해야 해 (긴장)", next: "before", s: "before" },
            { t: "행복한 오프(Off) 중!", next: "off", s: "off" }
        ]
    },
    after: [
        { text: "오늘 스테이션 상황은 어땠어?", options: [
            { t: "완전 스테이블(Stable)! 평화로웠어", s: "stable" },
            { t: "조금 바빴지만 인계는 잘 끝냈어", s: "mild" },
            { t: "신규/빌런 듀오 때문에 멘탈 나감", s: "stress" },
            { t: "완전 헬파티... 물 한 모금 못 마심", s: "exhausted" },
            { t: "이벤트 터져서 뒷수습 하느라 고생", s: "angry" }
        ]},
        { text: "지금 몸에서 어디가 제일 힘들어?", options: [
            { t: "종일 서 있어서 다리가 무거워", s: "exhausted" },
            { t: "인계 주느라 목이 다 쉬었어", s: "warm" },
            { t: "차팅 하느라 눈이 침침하고 머리 아파", s: "mild" },
            { t: "그냥 전체적으로 기절 직전이야", s: "heavy" },
            { t: "배고파서 손이 다 떨려", s: "hungry" }
        ]},
        { text: "오늘 제일 짜증 났던 포인트는?", options: [
            { t: "말 안 듣는 환자/보호자", s: "angry" },
            { t: "이해 안 가는 의사/오더", s: "stress" },
            { t: "끝나지 않는 차팅과 잡일", s: "tired" },
            { t: "갑자기 터진 응급 상황", s: "stress" },
            { t: "내 실수 아닐까 하는 걱정", s: "mild" }
        ]},
        { text: "식사하고 바로 잠들 예정이야?", options: [
            { t: "씻고 바로 기절하고 싶어", s: "mild" },
            { t: "넷플릭스 보며 스트레스 풀래", s: "heavy" },
            { t: "잠이 안 와서 술 한잔 생각나", s: "fried" },
            { t: "이제 막 밤을 지새워야 해", s: "energy" },
            { t: "수다 떨면서 스트레스 풀래", s: "reward" }
        ]},
        { text: "나이트 근무를 마친 거야?", options: [
            { t: "응, 밤새고 아침 햇살 보는 중", s: "warm" },
            { t: "아니, 데이나 이브닝이었어", s: "meat" }
        ]},
        { text: "밥 먹을 여유는 좀 있었어?", options: [
            { t: "아예 굶었어... 10시간 공복", s: "hungry" },
            { t: "병원 밥 대충 마셨어", s: "heavy" },
            { t: "중간에 간식은 좀 먹었지", s: "light" },
            { t: "식욕조차 없을 만큼 힘들어", s: "mild" },
            { t: "그래도 챙겨 먹으려고 노력함", s: "stable" }
        ]},
        { text: "지금 당장 땡기는 자극의 정도는?", options: [
            { t: "미친듯이 맵고 짠 거!", s: "spicy" },
            { t: "달달해서 당 충전되는 거", s: "reward" },
            { t: "기름지고 고소한 튀김류", s: "fried" },
            { t: "뜨끈하고 시원한 국물", s: "warm" },
            { t: "담백하고 가벼운 샐러드", s: "light" }
        ]},
        { text: "내일도 똑같이 출근해?", options: [
            { t: "응... 벌써부터 한숨 나와", s: "meat" },
            { t: "내일은 드디어 오프야!", s: "heavy" },
            { t: "듀티가 바뀌어서 적응해야 해", s: "energy" },
            { t: "아직 잘 모르겠어", s: "mild" },
            { t: "오프 뒤에 다시 근무야", s: "reward" }
        ]},
        { text: "오늘 스스로에게 몇 점 주고 싶어?", options: [
            { t: "100점! 완벽하게 해냈어", s: "reward" },
            { t: "70점, 무사히 끝나서 다행이야", s: "stable" },
            { t: "40점, 자책하고 싶지 않은데 힘들어", s: "mild" },
            { t: "보상 받고 싶은 마음 1000%", s: "heavy" },
            { t: "그냥 내일이 안 왔으면 좋겠어", s: "spicy" }
        ]}
    ],
    before: [
        { text: "무슨 근무 들어가기 전이야?", options: [
            { t: "데이(Day) - 아직 잠 덜 깸", s: "light" },
            { t: "이브닝(Evening) - 곧 헬게이트", s: "energy" },
            { t: "나이트(Night) - 밤샘 대비", s: "heavy" },
            { t: "교육이나 오버타임 하러 감", s: "mild" },
            { t: "이제 막 눈 떴어", s: "energy" }
        ]},
        { text: "출근 전 지금 컨디션은 어때?", options: [
            { t: "오늘 왠지 스테이블할 것 같아", s: "stable" },
            { t: "벌써부터 다리가 후들거려", s: "meat" },
            { t: "가기 싫어서 눈물 날 것 같아", s: "reward" },
            { t: "카페인이 절실하게 필요해", s: "energy" },
            { t: "그냥 아무 생각이 없어", s: "mild" }
        ]},
        { text: "출근해서 밥 먹을 시간 있을까?", options: [
            { t: "절대 없어, 지금이 마지막이야", s: "heavy" },
            { t: "바쁘면 또 굶겠지 뭐", s: "heavy" },
            { t: "병원 밥 먹을 시간은 나겠지", s: "mild" },
            { t: "눈치껏 간식 먹을 거야", s: "light" },
            { t: "교대로 꼬박꼬박 챙겨 먹음", s: "stable" }
        ]},
        { text: "오늘 멤버(스테이션)는 어때?", options: [
            { t: "천사들만 모인 최고의 조합", s: "stable" },
            { t: "무난무난해서 괜찮아", s: "mild" },
            { t: "빌런이 섞여있어서 걱정돼", s: "spicy" },
            { t: "다 모르는 사람/신규라 불안해", s: "stress" },
            { t: "나 혼자 다 해야 할 것 같아", s: "meat" }
        ]},
        { text: "지각할까봐 서두르고 있어?", options: [
            { t: "응, 지금 뛰어가야 해!", s: "light" },
            { t: "조금 여유 있어서 뭐 먹으려고", s: "heavy" },
            { t: "이미 병원 근처 편의점이야", s: "mild" },
            { t: "가는 내내 자고 싶어", s: "tired" },
            { t: "미리 와서 공부/준비 중", s: "energy" }
        ]},
        { text: "지금 입안의 상태는?", options: [
            { t: "쓰고 텁텁해서 상큼한 게 필요해", s: "light" },
            { t: "텅 비어서 고소한 게 땡겨", s: "meat" },
            { t: "매콤한 걸로 정신 차리고 싶어", s: "spicy" },
            { t: "입맛 없는데 뭐라도 넣어야 함", s: "warm" },
            { t: "달달한 게 들어가야 힘이 나", s: "reward" }
        ]},
        { text: "오늘의 근무 예상 강도는?", options: [
            { t: "1단계 - 아주 평화로움", s: "stable" },
            { t: "2단계 - 평소만큼 바쁨", s: "mild" },
            { t: "3단계 - 정신없을 예정", s: "heavy" },
            { t: "4단계 - 멘붕 오기 직전", s: "stress" },
            { t: "5단계 - 이미 나는 없다", s: "meat" }
        ]},
        { text: "근무 후에 약속 있어?", options: [
            { t: "응, 맛있는 거 먹으러 가!", s: "reward" },
            { t: "아니, 바로 씻고 잘 거야", s: "warm" },
            { t: "운동 가기로 마음먹었어", s: "energy" },
            { t: "밀린 공부나 과제해야 해", s: "mild" },
            { t: "그때 가서 정할래", s: "light" }
        ]},
        { text: "가장 걱정되는 게 뭐야?", options: [
            { t: "환자 상태 갑자기 나빠질까봐", s: "mild" },
            { t: "IV 실패해서 등땀 날까봐", s: "stress" },
            { t: "선생님들한테 혼날까봐", s: "angry" },
            { t: "너무 바빠서 화장실 못 갈까봐", s: "heavy" },
            { t: "그냥 가기 싫은 게 제일 커", s: "reward" }
        ]}
    ],
    off: [
        { text: "오늘 오프는 어떻게 시작했어?", options: [
            { t: "오후 2시까지 기절해있었어", s: "reward" },
            { t: "아침 일찍 일어나서 놀러 감", s: "energy" },
            { t: "밀린 병원 일/공부 하는 중", s: "stable" },
            { t: "하루종일 침대 위에서 뒹굴", s: "mild" },
            { t: "대청소하고 이불 빨래 완료", s: "heavy" }
        ]},
        { text: "내일 출근 생각하면 어때?", options: [
            { t: "생각 안 하려고 노력 중!", s: "stable" },
            { t: "벌써부터 심장이 두근거려", s: "warm" },
            { t: "사직서 쓰고 싶은 충동...", s: "stress" },
            { t: "그냥 돈 벌러 가야지 체념함", s: "mild" },
            { t: "오프가 하루 더 있어서 행복!", s: "reward" }
        ]},
        { text: "오늘 하루의 행복 지수는?", options: [
            { t: "100% 터질 듯이 행복해", s: "reward" },
            { t: "80% 그냥 평화롭고 좋아", s: "stable" },
            { t: "50% 무난무난한 하루", s: "mild" },
            { t: "20% 어제 일이 자꾸 떠올라", s: "spicy" },
            { t: "0% 오프인데도 몸이 아파", s: "warm" }
        ]},
        { text: "가장 땡기는 음식 식감은?", options: [
            { t: "바삭바삭 튀김류", s: "fried" },
            { t: "쫄깃쫄깃 고기/회", s: "meat" },
            { t: "아삭아삭 신선한 채소", s: "light" },
            { t: "부드럽고 달콤한 것", s: "reward" },
            { t: "뜨끈한 국물 요리", s: "warm" }
        ]},
        { text: "오늘의 활동량은 어느 정도?", options: [
            { t: "0% - 침대와 한 몸", s: "light" },
            { t: "30% - 동네 카페 마실", s: "mild" },
            { t: "60% - 밖에서 친구 만남", s: "energy" },
            { t: "100% - 여행이나 운동 완료", s: "meat" },
            { t: "준비하느라 바쁨", s: "energy" }
        ]},
        { text: "활동하면서 스트레스 풀렸어?", options: [
            { t: "응, 다 잊어버렸어!", s: "stable" },
            { t: "어느 정도는 풀린 듯", s: "mild" },
            { t: "아직 조금 남아있어", s: "spicy" },
            { t: "맛있는 걸 먹어야 풀릴 듯", s: "heavy" },
            { t: "오프가 더 길었으면 좋겠어", s: "reward" }
        ]},
        { text: "음식의 칼로리는 신경 써?", options: [
            { t: "오프인데? 신경 안 써!", s: "heavy" },
            { t: "조금은...? 말로만", s: "meat" },
            { t: "내일 출근을 위해 관리하자", s: "light" },
            { t: "맛있으면 0칼로리", s: "fried" },
            { t: "요즘 식단 중이야 😭", s: "light" }
        ]},
        { text: "어느 나라 음식이 땡겨?", options: [
            { t: "정갈한 한식", s: "meat" },
            { t: "화려한 일식/중식", s: "reward" },
            { t: "기름진 양식/버거", s: "heavy" },
            { t: "상큼한 동남아/샐러드", s: "light" },
            { t: "아무거나 맛있는 거면 됨", s: "mild" }
        ]},
        { text: "마지막으로 오늘의 휴식 컨셉은?", options: [
            { t: "고생한 나를 위한 보상 데이", s: "reward" },
            { t: "내일을 위한 완벽한 충전", s: "stable" },
            { t: "밀린 일을 해결하는 갓생", s: "energy" },
            { t: "그냥 아무것도 안 하기", s: "mild" },
            { t: "사랑하는 사람과 함께하기", s: "reward" }
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
        
        pFill.style.width = `${((this.responses.length + 1) / 10) * 100}%`;
        document.getElementById('progress-text').innerText = `기분 분석 중... (${this.responses.length + 1}/10)`;

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
                    this.stepIdx = -1;
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

        const scores = {};
        this.selectedTags.forEach(t => scores[t] = (scores[t] || 0) + 1);

        const candidates = FOOD_DATABASE.map(f => {
            let match = 0;
            f.tags.forEach(t => { if (scores[t]) match += scores[t]; });
            return { ...f, score: match + Math.random() * 0.1 };
        }).sort((a, b) => b.score - a.score);

        const picks = candidates.slice(0, 3);
        const container = document.getElementById('results-container');
        container.innerHTML = '';

        const situation = this.responses[0];
        const state = this.responses[1];
        document.getElementById('result-summary').innerText = 
            `지금 "${situation}" 상황에서 "${state}"라니 정말 고생 많았어 😭\n가영이의 마음과 몸 상태를 분석해서 고른 3가지 메뉴야!`;

        picks.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area">
                    <img src="${food.i}" alt="${food.n}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'">
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: 지금 ${state} 상황이고 ${situation}이라서 ${food.r}</p>
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
        setTimeout(() => { if (window.confirm("배달 앱이 설치되어 있나요? 웹으로 이동할까요?")) window.location.href = type === 'baemin' ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`; }, 1500);
    }

    sendToBF(foodName) {
        const msg = `자기야 나 지금 ${this.responses[0]}인데 ${this.responses[1]}해서 너무 힘들어... 😭 분석해보니까 오늘 [${foodName}] 먹어야 한대! 이거 사주면 가영이 기분 싹 풀릴 듯? 💝`;
        if (navigator.share) { navigator.share({ title: '괜찮아, 밥먹자 🏥💝', text: msg, url: window.location.href }); }
        else { alert("메시지가 복사되었습니다! 남자친구에게 보내주세요:\n\n" + msg); }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

window.game = new MoodFoodApp();
