// 괜찮아, 밥먹자 🏥💝 Hyper-Realistic Nurse Insights Edition

const FOOD_DATABASE = [
    { n: "엽기떡볶이 (오리지널)", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?q=80&w=800", r: "빌런들에게 뺏긴 기를 매운맛으로 복수하기 위해!", s: "엽기떡볶이", tags: ["stress", "spicy", "heavy", "after"] },
    { n: "삼겹살 & 소주", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "스테이션에서 탈탈 털린 체력, 고기로 기름칠!", s: "삼겹살", tags: ["exhausted", "meat", "heavy", "after", "off"] },
    { n: "전복죽 (영양보충)", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?q=80&w=800", r: "밤새고 너덜해진 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild", "warm", "after"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995?q=80&w=800", r: "수쌤한테 안 깨지고 무사 인계한 나를 위한 상.", s: "BHC 뿌링클", tags: ["reward", "fried", "stable", "after", "off"] },
    { n: "마라탕 & 꿔바로우", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?q=80&w=800", r: "얼얼한 마라맛으로 병원 스트레스 싹 잊기!", s: "마라탕", tags: ["stress", "spicy", "hungry", "after"] },
    { n: "모듬 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", r: "고생한 나를 위한 깔끔하고 고급스러운 한 끼.", s: "초밥", tags: ["stable", "light", "reward", "before", "off"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800", r: "퇴근 후 으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm", "tired", "after"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", r: "든든하게 입안 가득 채우는 육즙의 행복.", s: "수제버거", tags: ["hungry", "heavy", "meat", "after", "off"] },
    { n: "바삭 등심 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?q=80&w=800", r: "바삭바삭 소리에 우울함도 다 깨져버릴 거야.", s: "돈까스", tags: ["stable", "crispy", "mild", "after", "off"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", r: "스트레스 폭발한 날, 칼칼한 국물에 소주 한 잔.", s: "곱창전골", tags: ["stress", "heavy", "warm", "after"] },
    { n: "서브웨이 샌드위치", i: "https://images.unsplash.com/photo-1539252554452-da001b2d1531?q=80&w=800", r: "출근 전 가볍고 빠르게, 일할 에너지 충전!", s: "샌드위치", tags: ["light", "energy", "before"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800", r: "빌런 때문에 오른 열불을 시원하게 식혀줘.", s: "망고빙수", tags: ["angry", "cold", "reward", "after", "off"] },
    { n: "직화 보쌈", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "단백질 보충으로 내일 듀티 에너지를 미리!", s: "보쌈", tags: ["meat", "heavy", "stable", "after", "off"] },
    { n: "안심 스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800", r: "나이트 들어가기 전, 든든하게 최후의 만찬!", s: "스테이크", tags: ["reward", "meat", "before", "off"] },
    { n: "해물 파전", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800", r: "비오는 오프날, 세상 모든 걱정 잊는 힐링.", s: "해물파전", tags: ["off", "fried", "mild"] }
];

const BRANCHES = {
    root: {
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (탈탈 털림)", next: "after", s: "after" },
            { t: "곧 출근해야 해... (폭풍 전야)", next: "before", s: "before" },
            { t: "오늘은 행복한 오프! (Off)", next: "off", s: "off" }
        ]
    },
    after: [
        { text: "오늘 스테이션 분위기는 어땠어?", options: [
            { t: "완전 스테이블(Stable)! 평화로웠어", s: "stable" },
            { t: "조금 바빴지만 사고 없이 끝냄", s: "mild" },
            { t: "선배들 눈치 보느라 멘탈 나감", s: "stress" },
            { t: "수쌤이 자꾸 불러서 피 말렸어", s: "stress" },
            { t: "완전 헬파티... 물도 못 마심", s: "exhausted" }
        ]},
        { text: "오늘 가장 가영이를 힘들게 한 건?", options: [
            { t: "말 안 듣는 환자 & 무개념 보호자", s: "angry" },
            { t: "사고 치고 다니는 어리버리 신규", s: "stress" },
            { t: "말도 안 되는 오더 내는 의사", s: "stress" },
            { t: "태움이나 다름없는 선배의 압박", s: "angry" },
            { t: "쉴 틈 없이 터지는 응급 상황", s: "exhausted" }
        ]},
        { text: "지금 몸 상태 중 어디가 제일 고통스러워?", options: [
            { t: "종일 뛰어다녀서 다리가 터질 듯", s: "exhausted" },
            { t: "인계하고 설명하느라 목이 다 쉼", s: "warm" },
            { t: "차팅 쏟아져서 눈 침침, 손목 아픔", s: "mild" },
            { t: "신경 썼더니 뒷목 당기고 머리 아파", s: "spicy" },
            { t: "그냥 숨 쉬는 것도 귀찮은 무기력", s: "heavy" }
        ]},
        { text: "오늘 인계할 때 어땠어?", options: [
            { t: "깔끔하게 털고 나왔어! 칼퇴!", s: "stable" },
            { t: "질문 공세에 버벅거려서 속상해", s: "reward" },
            { t: "차팅 밀려서 1시간 오버타임 함", s: "meat" },
            { t: "무사히 넘겨서 다행이다 싶음", s: "mild" },
            { t: "다음 듀티한테 미안해서 찝찝함", s: "light" }
        ]},
        { text: "밥 먹을 여유는 좀 있었어?", options: [
            { t: "10시간 동안 생공복... 배고파 죽음", s: "hungry" },
            { t: "병원 밥 맛없어서 거의 남겼어", s: "heavy" },
            { t: "중간에 간식 좀 주워 먹었지", s: "light" },
            { t: "너무 지쳐서 입맛조차 없어", s: "mild" },
            { t: "전투적으로 먹긴 먹었어", s: "stable" }
        ]},
        { text: "식사하고 바로 잠들 예정이야?", options: [
            { t: "씻고 바로 기절하고 싶어", s: "mild" },
            { t: "맥주 한 잔 하며 넷플릭스 볼래", s: "fried" },
            { t: "잠이 안 와서 술 한잔 생각나", s: "spicy" },
            { t: "이제 막 밤을 지새워야 해", s: "energy" },
            { t: "남자친구한테 하소연하며 먹을래", s: "reward" }
        ]},
        { text: "지금 당장 땡기는 자극의 정도는?", options: [
            { t: "미친듯이 맵고 짠 거! (다 박살!)", s: "spicy" },
            { t: "달달해서 당 충전되는 거", s: "reward" },
            { t: "기름지고 고소한 튀김류", s: "fried" },
            { t: "뜨끈하고 시원한 국물", s: "warm" },
            { t: "상큼하고 깔끔한 샐러드/회", s: "light" }
        ]},
        { text: "가장 생각나는 빌런의 얼굴은?", options: [
            { t: "안 가르쳐주고 화만 내는 선배", s: "spicy" },
            { t: "억지 부리는 보호자/환자", s: "heavy" },
            { t: "가르쳐줘도 까먹는 답답한 신규", s: "stress" },
            { t: "협조 안 해주는 이기적인 의사", s: "meat" },
            { t: "그냥 병원 건물 자체가 싫어", s: "angry" }
        ]},
        { text: "내일도 똑같이 출근해?", options: [
            { t: "응... 또 그 지옥으로 가야 함", s: "meat" },
            { t: "내일은 드디어 오프야! (행복)", s: "heavy" },
            { t: "듀티가 바뀌어서 적응해야 해", s: "energy" },
            { t: "연속 근무 중이라 제정신 아님", s: "exhausted" },
            { t: "오프 뒤에 다시 근무야", s: "reward" }
        ]},
        { text: "마지막으로 가영이에게 해주고 싶은 말?", options: [
            { t: "오늘도 환자 살리느라 수고했어", s: "reward" },
            { t: "버틴 게 대견해, 진짜 고생했다", s: "stable" },
            { t: "다 잊고 맛있는 거 먹자!", s: "heavy" },
            { t: "나만 믿어, 다 시켜줄게!", s: "meat" },
            { t: "내일은 더 스테이블하길!", s: "stable" }
        ]}
    ],
    before: [
        { text: "어느 근무 들어가기 전이야?", options: [
            { t: "데이(Day) - 눈도 못 뜸", s: "light" },
            { t: "이브닝(Evening) - 헬게이트 오픈", s: "energy" },
            { t: "나이트(Night) - 밤샘 전쟁 대비", s: "heavy" },
            { t: "교육/미팅 하러 가는 중", s: "mild" },
            { t: "오프였는데 불려가는 중(ㅠㅠ)", s: "angry" }
        ]},
        { text: "오늘 멤버(스테이션) 확인했어?", options: [
            { t: "천사들만 모인 최고의 조합", s: "stable" },
            { t: "무난무난해서 다행이야", s: "mild" },
            { t: "빌런이 섞여있어서 긴장돼", s: "spicy" },
            { t: "다 신규라 내가 다 해야 할 듯", s: "meat" },
            { t: "무서운 수쌤/선배 듀티라 무서움", s: "stress" }
        ]},
        { text: "출근 전 지금 컨디션은?", options: [
            { t: "오늘 왠지 스테이블할 것 같아", s: "stable" },
            { t: "벌써부터 다리가 후들거려", s: "meat" },
            { t: "가기 싫어서 눈물 날 것 같아", s: "reward" },
            { t: "카페인이 절실하게 필요해", s: "energy" },
            { t: "잠이 덜 깨서 몽롱해", s: "light" }
        ]},
        { text: "가장 걱정되는 게 뭐야?", options: [
            { t: "환자 상태 갑자기 나빠질까봐", s: "mild" },
            { t: "IV 실패해서 등땀 날까봐", s: "stress" },
            { t: "인계 주다가 영혼까지 털릴까봐", s: "angry" },
            { t: "너무 바빠서 화장실 못 갈까봐", s: "heavy" },
            { t: "실수해서 수쌤한테 한 소리 들을까봐", s: "stress" }
        ]},
        { text: "지금 배고픈 정도는?", options: [
            { t: "든든하게 먹어야 버텨", s: "heavy" },
            { t: "적당히 먹고 싶어", s: "mild" },
            { t: "속 더부룩하면 일 못 해", s: "light" },
            { t: "입맛 없지만 살려고 먹어", s: "energy" },
            { t: "커피 한 잔이면 충분해", s: "light" }
        ]},
        { text: "오늘 보호자/의사 빌런 예감은?", options: [
            { t: "없길 기도 중 (Stay Stable!)", s: "stable" },
            { t: "왠지 어제의 그 사람이 있을 듯", s: "spicy" },
            { t: "의사 오더 꼬일까봐 걱정돼", s: "stress" },
            { t: "병원에 빌런이 없을 리가", s: "heavy" },
            { t: "오늘은 나만 잘하면 됨", s: "mild" }
        ]},
        { text: "출근까지 시간 얼마나 남았어?", options: [
            { t: "이미 늦었어, 지금 뛰어야 해!", s: "light" },
            { t: "조금 여유 있어서 챙겨 먹으려고", s: "heavy" },
            { t: "이미 병원 근처야", s: "mild" },
            { t: "가는 내내 차에서 잘 거야", s: "tired" },
            { t: "미리 와서 프리 라운딩 중", s: "energy" }
        ]},
        { text: "지금 입안의 상태는?", options: [
            { t: "쓰고 텁텁해서 상큼한 게 필요해", s: "light" },
            { t: "텅 비어서 고소한 게 땡겨", s: "meat" },
            { t: "매콤한 걸로 정신 차리고 싶어", s: "spicy" },
            { t: "속 쓰려서 뜨끈한 게 좋아", s: "warm" },
            { t: "달달한 게 들어가야 힘이 나", s: "reward" }
        ]},
        { text: "근무 후에 가영이의 계획은?", options: [
            { t: "친구랑 술/맛집 가기로 함", s: "reward" },
            { t: "집에 와서 바로 기절 예정", s: "mild" },
            { t: "운동 가기로 마음먹었어", s: "energy" },
            { t: "밀린 공부나 과제해야 해", s: "mild" },
            { t: "보상으로 맛있는 배달!", s: "heavy" }
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
        { text: "병원 냄새 좀 빠진 것 같아?", options: [
            { t: "완전! 이제야 사람 사는 듯", s: "stable" },
            { t: "아니, 자꾸 단톡방 알람 울려", s: "angry" },
            { t: "인계 실수한 거 생각나서 불안해", s: "stress" },
            { t: "오프인데도 병원 꿈 꿨어", s: "tired" },
            { t: "병원 생각 1도 안 남", s: "stable" }
        ]},
        { text: "오늘 식사 컨셉은?", options: [
            { t: "오프니까 화려하게 폭식!", s: "heavy" },
            { t: "분위기 있는 곳에서 외식", s: "reward" },
            { t: "가볍고 건강하게 관리", s: "light" },
            { t: "배달 시켜서 편하게 먹기", s: "mild" },
            { t: "집밥 느낌으로 든든하게", s: "meat" }
        ]},
        { text: "가장 땡기는 음식 식감은?", options: [
            { t: "바삭바삭 튀김류", s: "fried" },
            { t: "쫄깃쫄깃 고기/회", s: "meat" },
            { t: "아삭아삭 신선한 채소", s: "light" },
            { t: "부드럽고 달콤한 것", s: "reward" },
            { t: "뜨끈한 국물 요리", s: "warm" }
        ]},
        { text: "어느 나라 음식이 땡겨?", options: [
            { t: "정갈한 한식", s: "meat" },
            { t: "화려한 일식/중식", s: "reward" },
            { t: "기름진 양식/버거", s: "heavy" },
            { t: "상큼한 동남아/샐러드", s: "light" },
            { t: "아무거나 맛있는 거면 됨", s: "mild" }
        ]},
        { text: "지금 가영이의 몸 상태는?", options: [
            { t: "자고 일어났더니 쌩쌩해!", s: "energy" },
            { t: "그래도 여전히 종아리가 아파", s: "warm" },
            { t: "소화 안 되고 속이 답답해", s: "light" },
            { t: "잠만 쏟아지고 나른해", s: "mild" },
            { t: "운동해서 근육통 생김", s: "meat" }
        ]},
        { text: "활동하면서 스트레스 풀렸어?", options: [
            { t: "응, 다 잊어버렸어!", s: "stable" },
            { t: "어느 정도는 풀린 듯", s: "mild" },
            { t: "아직 조금 남아있어", s: "spicy" },
            { t: "맛있는 걸 먹어야 풀릴 듯", s: "heavy" },
            { t: "오프가 더 길었으면 좋겠어", s: "reward" }
        ]},
        { text: "마지막으로 오늘의 휴식 만족도는?", options: [
            { t: "100% 완벽한 힐링", s: "stable" },
            { t: "70% 무난하게 잘 쉬었어", s: "mild" },
            { t: "30% 쉰 것 같지도 않아", s: "heavy" },
            { t: "보상이 절실하게 필요해", s: "reward" },
            { t: "사랑하는 사람과 있어서 좋아", s: "reward" }
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
            `지금 "${situation}" 상황에서 "${state}"라니 고생 정말 많았어 😭\n지친 마음과 몸 상태를 분석해서 고른 최고의 메뉴 3가지야!`;

        picks.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area">
                    <img src="${food.i}" alt="${food.n}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'">
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: ${state} 상태와 ${situation} 상황이라서 ${food.r}</p>
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
        const msg = `자기야 나 오늘 ${this.responses[0]}인데 ${this.responses[1]}해서 너무 힘들어... 😭 분석해보니까 오늘 [${foodName}] 먹어야 한대! 이거 사주면 기분 싹 풀릴 듯? 💝`;
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
