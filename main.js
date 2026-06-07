// 가영아밥먹자 🏥💝 High-Precision 10-Step Branching Engine with Verified Images

const FOOD_DATABASE = [
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?q=80&w=800", r: "스트레스가 확 풀리는 매운맛!", s: "엽기떡볶이", tags: ["stress", "spicy", "heavy", "퇴근"] },
    { n: "삼겹살 구이", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "기력 보충엔 역시 지글지글 고기!", s: "삼겹살", tags: ["exhausted", "meat", "heavy", "퇴근", "오프"] },
    { n: "따뜻한 전복죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?q=80&w=800", r: "속 편하게 먹고 푹 잠들기 좋아.", s: "전복죽", tags: ["tired", "mild", "warm", "퇴근"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995?q=80&w=800", r: "행복해지는 마법의 시즈닝 치킨!", s: "BHC 뿌링클", tags: ["reward", "fried", "stress", "퇴근", "오프"] },
    { n: "마라탕", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?q=80&w=800", r: "알싸한 맛으로 병원 냄새 싹 잊어버려!", s: "마라탕", tags: ["stress", "spicy", "hungry", "퇴근"] },
    { n: "연어 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", r: "깔끔하고 고급스럽게 즐기는 한 끼.", s: "연어초밥", tags: ["stable", "light", "reward", "출근 전", "오프"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800", r: "지친 속을 따뜻하게 데워주는 힐링푸드.", s: "쌀국수", tags: ["exhausted", "warm", "after_night", "퇴근"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", r: "든든하게 채우는 입안 가득 행복!", s: "수제버거", tags: ["hungry", "heavy", "meat", "퇴근", "오프"] },
    { n: "바삭한 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?q=80&w=800", r: "겉바속촉, 가영이의 미소 치트키.", s: "돈까스", tags: ["stable", "crispy", "reward", "퇴근", "오프"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", r: "진한 국물과 고소한 곱창의 조화.", s: "곱창전골", tags: ["stress", "heavy", "warm", "퇴근"] },
    { n: "에그 샌드위치", i: "https://images.unsplash.com/photo-1539252554452-da001b2d1531?q=80&w=800", r: "근무 전, 가볍고 든든한 에너지.", s: "샌드위치", tags: ["before_work", "light", "energy", "출근 전"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800", r: "열 오르는 기분을 시원하게 식혀줘.", s: "망고빙수", tags: ["angry", "cold", "reward", "퇴근", "오프"] },
    { n: "해물찜", i: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=800", r: "푸짐한 해산물로 영양 보충!", s: "해물찜", tags: ["meat", "spicy", "heavy", "퇴근"] },
    { n: "베트남 분짜", i: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800", r: "상큼하고 쫄깃하게 입맛 돋우기.", s: "분짜", tags: ["stable", "light", "오프"] },
    { n: "안심 스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800", r: "고생한 가영이를 위한 특별한 정찬.", s: "스테이크", tags: ["reward", "meat", "stable", "오프"] },
    { n: "돈코츠 라멘", i: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800", r: "진한 국물 한 모금으로 피로 회복.", s: "라멘", tags: ["warm", "tired", "after_night", "퇴근"] },
    { n: "포케 샐러드", i: "https://images.unsplash.com/photo-1546069901-d5bfbd25dd24?q=80&w=800", r: "부담 없이 건강하게 채우는 한 끼.", s: "포케", tags: ["light", "stable", "energy", "출근 전"] },
    { n: "짜장면&탕수육", i: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800", r: "고민될 땐 역시 바삭하고 든든하게!", s: "짜장면", tags: ["hungry", "fried", "heavy", "퇴근", "오프"] },
    { n: "소고기 샤브샤브", i: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800", r: "야채와 고기의 완벽한 밸런스.", s: "샤브샤브", tags: ["warm", "mild", "meat", "퇴근", "오프"] },
    { n: "베이글&크림치즈", i: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=800", r: "여유로운 오프날 브런치 감성.", s: "베이글", tags: ["off", "light", "reward", "오프"] }
];

const BRANCHES = {
    root: {
        text: "가영아, 지금 어떤 상황이야?",
        options: [
            { t: "근무 막 마쳤어! (퇴근)", next: "after", s: "퇴근" },
            { t: "이제 근무 가야 해... (출근 전)", next: "before", s: "출근 전" },
            { t: "오늘은 꿀 같은 휴식! (오프)", next: "off", s: "오프" }
        ]
    },
    after: [
        { text: "오늘 스테이션 상황은 어땠어?", options: [
            { t: "완전 스테이블(Stable)! 평화로웠어", s: "stable" },
            { t: "조금 바빴지만 버틸만했어", s: "mild" },
            { t: "정신없어서 영혼 탈탈 털림", s: "stress" },
            { t: "완전 헬파티... 역대급이야", s: "stress" },
            { t: "이벤트가 너무 많았어 😭", s: "spicy" }
        ]},
        { text: "어느 근무가 끝난 거야?", options: [
            { t: "데이 (Day) 퇴근!", s: "energy" },
            { t: "이브닝 (Evening) 퇴근!", s: "tired" },
            { t: "나이트 (Night) 퇴근!", s: "after_night" },
            { t: "연속 근무 드디어 끝...", s: "exhausted" },
            { t: "중간에 조기 퇴근? (부럽)", s: "stable" }
        ]},
        { text: "지금 몸 상태 중 어디가 제일 힘들어?", options: [
            { t: "다리가 퉁퉁 부어서 무거워", s: "exhausted" },
            { t: "어깨랑 허리가 끊어질 것 같아", s: "meat" },
            { t: "눈이 침침하고 머리가 지끈거려", s: "warm" },
            { t: "온몸에 힘이 하나도 없어", s: "meat" },
            { t: "그냥 전체적으로 기절 직전이야", s: "mild" }
        ]},
        { text: "밥 먹을 시간은 좀 있었어?", options: [
            { t: "아예 굶었어... 배고파 죽음", s: "hungry" },
            { t: "중간에 간식만 조금?", s: "hungry" },
            { t: "병원 밥 대충 넘겼어", s: "mild" },
            { t: "그래도 챙겨 먹긴 했어", s: "light" },
            { t: "지금 식욕이 아예 없어", s: "light" }
        ]},
        { text: "지금 가장 땡기는 맛은 뭐야?", options: [
            { t: "무조건 매운 거! 매운 거!!", s: "spicy" },
            { t: "달달한 게 미친 듯이 땡겨", s: "reward" },
            { t: "기름지고 고소한 거", s: "fried" },
            { t: "뜨끈하고 시원한 국물", s: "warm" },
            { t: "담백하고 속 편한 거", s: "mild" }
        ]},
        { text: "보호자나 의사가 힘들게 하진 않았어?", options: [
            { t: "응, 다들 친절했어", s: "stable" },
            { t: "한두 명 빌런이 있었지", s: "stress" },
            { t: "진짜 뒷목 잡을 뻔했어", s: "spicy" },
            { t: "그냥 일 자체가 힘들었어", s: "mild" },
            { t: "동료들이랑 수다로 풀었어", s: "reward" }
        ]},
        { text: "식사하고 바로 잠들 예정이야?", options: [
            { t: "응, 씻고 바로 기절할래", s: "mild" },
            { t: "넷플릭스 좀 보다 잘래", s: "fried" },
            { t: "맥주 한 잔 시원하게 하고 싶어", s: "fried" },
            { t: "잠이 안 와서 좀 놀아야지", s: "heavy" },
            { t: "이제 막 밤을 지새워야 해", s: "energy" }
        ]},
        { text: "오늘 고생한 가영이에게 주는 상은?", options: [
            { t: "화려하게 한 상 차려먹기", s: "heavy" },
            { t: "맛있게 적당히 즐기기", s: "reward" },
            { t: "간단하지만 맛있는 거", s: "light" },
            { t: "남자친구가 사주는 맛있는 거!", s: "reward" },
            { t: "나를 위한 건강한 선물", s: "stable" }
        ]},
        { text: "내일 가영이의 듀티는 뭐야?", options: [
            { t: "또 근무 가야 해... (연근)", s: "meat" },
            { t: "오예! 드디어 오프야!", s: "heavy" },
            { t: "다른 듀티로 바뀌어", s: "mild" },
            { t: "아직 스케줄을 몰라", s: "mild" },
            { t: "내일도 나이트야", s: "after_night" }
        ]}
    ],
    before: [
        { text: "어느 근무 들어가기 전이야?", options: [
            { t: "데이 (Day) 출근 전", s: "light" },
            { t: "이브닝 (Evening) 출근 전", s: "energy" },
            { t: "나이트 (Night) 출근 전", s: "heavy" },
            { t: "교육이나 미팅 가야 해", s: "light" },
            { t: "지금 막 눈 떴어", s: "energy" }
        ]},
        { text: "지금 기분은 솔직히 어때?", options: [
            { t: "가기 싫어서 눈물 나", s: "reward" },
            { t: "돈 벌러 가자... 해탈함", s: "mild" },
            { t: "오늘은 좀 힘이 나!", s: "energy" },
            { t: "무사히 스테이블하길 기도 중", s: "stable" },
            { t: "그냥 아무 생각이 없어", s: "mild" }
        ]},
        { text: "지금 배고픈 정도는?", options: [
            { t: "든든하게 먹어야 버텨", s: "heavy" },
            { t: "적당히 먹고 싶어", s: "mild" },
            { t: "속 더부룩하면 일 못 해", s: "light" },
            { t: "입맛 없지만 살려고 먹어", s: "energy" },
            { t: "커피 한 잔이면 될 듯", s: "light" }
        ]},
        { text: "오늘 스테이션 분위기 예상은?", options: [
            { t: "스테이블(Stable)할 것 같아", s: "stable" },
            { t: "왠지 헬파티의 예감이...", s: "spicy" },
            { t: "멤버가 좋아서 괜찮을 듯", s: "stable" },
            { t: "그냥 평소랑 비슷하겠지", s: "mild" },
            { t: "바쁠 게 뻔해서 걱정돼", s: "meat" }
        ]},
        { text: "지금 가영이에게 필요한 건?", options: [
            { t: "강력한 카페인과 당분", s: "reward" },
            { t: "속이 뜨끈해지는 국밥", s: "warm" },
            { t: "힘이 불끈 나는 고기", s: "meat" },
            { t: "기분 좋아지는 상큼한 거", s: "light" },
            { t: "바삭바삭 씹는 재미", s: "crispy" }
        ]},
        { text: "출근해서 밥 먹을 시간 있을까?", options: [
            { t: "절대 없어, 지금이 마지막", s: "heavy" },
            { t: "눈치껏 간식 먹겠지", s: "energy" },
            { t: "병원 밥 먹을 거야", s: "mild" },
            { t: "몰라, 바쁘면 못 먹는 거지", s: "heavy" },
            { t: "교대로 잘 챙겨 먹어", s: "stable" }
        ]},
        { text: "근무 후 가영이의 계획은?", options: [
            { t: "바로 친구 만나러 가기", s: "energy" },
            { t: "집에 와서 잠만 자기", s: "mild" },
            { t: "운동하러 가기 (갓생)", s: "meat" },
            { t: "남자친구랑 데이트!", s: "reward" },
            { t: "밀린 공부나 과제하기", s: "energy" }
        ]},
        { text: "가장 생각나는 음식 장르는?", options: [
            { t: "한식 (밥심!)", s: "meat" },
            { t: "일식/중식", s: "fried" },
            { t: "양식/패스트푸드", s: "heavy" },
            { t: "분식/스낵", s: "spicy" },
            { t: "상큼한 샐러드/과일", s: "light" }
        ]},
        { text: "가영아, 지금 몸 어디가 뻐근해?", options: [
            { t: "자고 일어났는데도 피곤해", s: "warm" },
            { t: "목이랑 어깨가 뭉쳐있어", s: "meat" },
            { t: "온몸이 찌뿐둥해", s: "energy" },
            { t: "다행히 오늘은 컨디션 좋아", s: "stable" },
            { t: "머리가 조금 아파", s: "mild" }
        ]}
    ],
    off: [
        { text: "오늘 오프는 어떻게 보내는 중?", options: [
            { t: "하루종일 집에서 요양 중", s: "mild" },
            { t: "드라이브나 여행 가기", s: "energy" },
            { t: "밀린 잠 12시간 자기", s: "reward" },
            { t: "맛있는 거 찾아다니기", s: "heavy" },
            { t: "자기계발/공부하기", s: "stable" }
        ]},
        { text: "지금 가영이의 행복 지수는?", options: [
            { t: "오프라서 너무 행복해!", s: "stable" },
            { t: "그냥 평화롭고 좋아", s: "stable" },
            { t: "내일 출근 생각에 우울해", s: "reward" },
            { t: "어제 일이 자꾸 생각나", s: "spicy" },
            { t: "그냥저냥 무난해", s: "mild" }
        ]},
        { text: "오늘 식사 컨셉은?", options: [
            { t: "오프니까 화려하게 폭식!", s: "heavy" },
            { t: "분위기 있는 곳에서 외식", s: "reward" },
            { t: "가볍고 건강하게 관리", s: "light" },
            { t: "배달 시켜서 편하게 먹기", s: "mild" },
            { t: "집밥 느낌으로 든든하게", s: "meat" }
        ]},
        { text: "지금 날씨는 어때?", options: [
            { t: "화창하고 맑음", s: "stable" },
            { t: "꾸물꾸물 흐림", s: "warm" },
            { t: "비가 오네? 파전각", s: "fried" },
            { t: "너무 덥다...", s: "cold" },
            { t: "추워서 나가기 싫어", s: "warm" }
        ]},
        { text: "가장 땡기는 음식 식감은?", options: [
            { t: "바삭바삭 튀김류", s: "fried" },
            { t: "쫄깃쫄깃 고기/회", s: "meat" },
            { t: "아삭아삭 신선함", s: "light" },
            { t: "부드러운 크림/치즈", s: "reward" },
            { t: "뜨끈한 국물", s: "warm" }
        ]},
        { text: "활동량은 어느 정도야?", options: [
            { t: "침대와 한 몸 (0%)", s: "light" },
            { t: "집안일 좀 했어", s: "mild" },
            { t: "밖에서 많이 걸었어", s: "meat" },
            { t: "운동까지 완료!", s: "energy" },
            { t: "지금 나갈 준비 중", s: "energy" }
        ]},
        { text: "가영아, 지금 소화 상태는?", options: [
            { t: "완전 튼튼! 다 먹을래", s: "heavy" },
            { t: "보통이야", s: "mild" },
            { t: "약간 더부룩해", s: "light" },
            { t: "어제 많이 먹어서 조심 중", s: "light" },
            { t: "아주 배고파서 쓰러짐", s: "heavy" }
        ]},
        { text: "음식의 칼로리는 신경 써?", options: [
            { t: "오프인데? 신경 안 써!", s: "heavy" },
            { t: "조금은...? 말로만", s: "meat" },
            { t: "내일 출근을 위해 관리하자", s: "light" },
            { t: "맛있으면 0칼로리", s: "fried" },
            { t: "식단 중이야 😭", s: "light" }
        ]},
        { text: "지금 생각나는 나라 음식은?", options: [
            { t: "정갈한 한식", s: "meat" },
            { t: "화려한 일식/중식", s: "reward" },
            { t: "기름진 양식/버거", s: "heavy" },
            { t: "이국적인 동남아식", s: "light" },
            { t: "그냥 아무거나 맛있으면 됨", s: "mild" }
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
        document.getElementById('progress-text').innerText = `가영이 기분 분석 중... (${this.responses.length + 1}/10)`;

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
        const moodState = this.responses[1];
        document.getElementById('result-summary').innerText = 
            `가영아, 지금 "${situation}" 상황에서 "${moodState}"라니 고생 정말 많았어 😭\n가영이의 컨디션을 정밀 분석해서 고른 3가지 메뉴야!`;

        picks.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area">
                    <img src="${food.i}" alt="${food.n}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'">
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: 가영이가 지금 ${moodState}이고 ${situation}이라서 ${food.r}</p>
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
