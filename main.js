// 괜찮아, 밥먹자 🏥💝 Hyper-Precision Nested Branching Logic

const FOOD_DATABASE = [
    { n: "엽기떡볶이 (오리지널)", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?q=80&w=800", r: "빌런들에게 뺏긴 기를 매운맛으로 복수하기 위해!", s: "엽기떡볶이", tags: ["stress", "spicy", "heavy", "night"] },
    { n: "삼겹살 & 소주", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "스테이션에서 탈탈 털린 체력, 고기로 기름칠!", s: "삼겹살", tags: ["exhausted", "meat", "heavy", "day", "off"] },
    { n: "전복죽 (속편한 한끼)", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?q=80&w=800", r: "밤새고 너덜해진 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild", "warm", "night"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995?q=80&w=800", r: "수쌤한테 안 깨지고 무사 인계한 나를 위한 상.", s: "BHC 뿌링클", tags: ["reward", "fried", "stable", "evening", "off"] },
    { n: "마라탕 & 꿔바로우", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?q=80&w=800", r: "얼얼한 마라맛으로 병원 스트레스 싹 잊기!", s: "마라탕", tags: ["stress", "spicy", "hungry", "day", "evening"] },
    { n: "모듬 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", r: "고생한 나를 위한 깔끔하고 고급스러운 한 끼.", s: "초밥", tags: ["stable", "light", "reward", "before", "off"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800", r: "퇴근 후 으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm", "tired", "night"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", r: "든든하게 입안 가득 채우는 육즙의 행복.", s: "수제버거", tags: ["hungry", "heavy", "meat", "day", "evening"] },
    { n: "바삭 등심 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?q=80&w=800", r: "바삭바삭 소리에 우울함도 다 깨져버릴 거야.", s: "돈까스", tags: ["stable", "crispy", "mild", "day", "off"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", r: "스트레스 폭발한 날, 칼칼한 국물에 소주 한 잔.", s: "곱창전골", tags: ["stress", "heavy", "warm", "evening"] },
    { n: "에그 샌드위치", i: "https://images.unsplash.com/photo-1539252554452-da001b2d1531?q=80&w=800", r: "출근 전 가볍고 빠르게, 일할 에너지 충전!", s: "샌드위치", tags: ["light", "energy", "before"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800", r: "빌런 때문에 오른 열불을 시원하게 식혀줘.", s: "망고빙수", tags: ["angry", "cold", "reward", "day", "off"] },
    { n: "직화 보쌈", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "기름기 뺀 단백질로 내일을 위한 에너지를!", s: "보쌈", tags: ["meat", "heavy", "stable", "evening", "off"] },
    { n: "소고기 스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=800", r: "고생한 나를 위해 큰맘 먹고 즐기는 사치!", s: "스테이크", tags: ["reward", "meat", "before", "off"] },
    { n: "해물 파전", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800", r: "비오는 날, 복잡한 생각 잊게 해주는 힐링.", s: "해물파전", tags: ["off", "fried", "mild"] }
];

const BRANCHES = {
    root: {
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (지침)", next: "shift_select", s: "after" },
            { t: "이제 곧 출근해야 해 (긴장)", next: "before", s: "before" },
            { t: "행복한 오프(Off) 중!", next: "off", s: "off" }
        ]
    },
    shift_select: {
        text: "방금 끝난 근무가 뭐야?",
        options: [
            { t: "데이 (Day)", next: "after_day", s: "day" },
            { t: "이브닝 (Evening)", next: "after_eve", s: "evening" },
            { t: "나이트 (Night)", next: "after_night", s: "night" }
        ]
    },
    after_day: [
        { text: "데이 근무 어땠어? 아침 밥은 먹었어?", options: [
            { t: "완전 스테이블(Stable)! 아침도 먹음", s: "stable" },
            { t: "바빠서 물도 못 마시고 굶었어", s: "hungry" },
            { t: "신규 사고 쳐서 뒷수습 하느라 진 빠짐", s: "stress" },
            { t: "수쌤이 불러서 잔소리 폭격 맞음", s: "angry" },
            { t: "그냥 평범하게 바쁜 하루였어", s: "mild" }
        ]},
        { text: "지금 다리 상태는 어때?", options: [
            { t: "퉁퉁 부어서 내 다리가 아닌 듯", s: "exhausted" },
            { t: "조금 뻐근하지만 걸을만해", s: "mild" },
            { t: "앉아있고 싶어 죽겠어", s: "tired" },
            { t: "차라리 마사지를 받고 싶음", s: "light" },
            { t: "운동하러 갈 수 있을 정도로 쌩쌩!", s: "energy" }
        ]},
        { text: "오늘 보호자/환자 빌런 있었어?", options: [
            { t: "응, 진짜 멱살 잡을 뻔했어", s: "angry" },
            { t: "한두 명 짜증나게 하더라", s: "stress" },
            { t: "다행히 오늘은 천사들만 있었어", s: "stable" },
            { t: "의사 오더 안 나와서 피 말렸어", s: "stress" },
            { t: "말 안 듣는 환자 땜에 인내심 한계", s: "spicy" }
        ]},
        { text: "인계할 때 선배나 동료 눈치 보였어?", options: [
            { t: "응, 태움 급 질문 공세에 털림", s: "stress" },
            { t: "사소한 걸로 꼬투리 잡혀서 우울해", s: "reward" },
            { t: "깔끔하게 칼퇴 완료!", s: "stable" },
            { t: "동료들이 도와줘서 무사히 넘김", s: "mild" },
            { t: "내 실수 발견해서 자책 중...", s: "mild" }
        ]},
        { text: "내일도 데이 출근이야?", options: [
            { t: "응, 일찍 자야 해서 속상해", s: "light" },
            { t: "아니, 내일은 이브닝/나이트!", s: "heavy" },
            { t: "드디어 내일은 오프야!", s: "reward" },
            { t: "연속 데이라 기절 직전", s: "exhausted" },
            { t: "아직 스케줄을 확인 안 했어", s: "mild" }
        ]}
    ],
    after_eve: [
        { text: "이브닝 수고했어! 오늘 저녁은?", options: [
            { t: "병원 밥 맛없어서 거의 굶음", s: "hungry" },
            { t: "중간에 간식 좀 주워 먹었지", s: "light" },
            { t: "일이 터져서 먹을 생각도 못 함", s: "stress" },
            { t: "동료랑 몰래 야식 먹었어", s: "stable" },
            { t: "지금 너무 배고파서 손 떨려", s: "heavy" }
        ]},
        { text: "퇴근길 기분은 어때?", options: [
            { t: "밤 공기 시원하고 해방감 최고!", s: "stable" },
            { t: "내일 또 출근이라니 우울해", s: "reward" },
            { t: "졸려서 운전/버스에서 졸았어", s: "tired" },
            { t: "오늘 실수한 거 계속 생각나", s: "mild" },
            { t: "그냥 맛있는 거 먹고 싶어", s: "heavy" }
        ]},
        { text: "오늘 제일 힘들게 한 사람은?", options: [
            { t: "교대 인계 안 받으려는 선배", s: "spicy" },
            { t: "사고 치고 모른 척하는 신규", s: "angry" },
            { t: "갑자기 상태 안 좋아진 환자", s: "stress" },
            { t: "자꾸 오더 바꾸는 전공의", s: "stress" },
            { t: "퇴근 안 시켜주는 수쌤", s: "angry" }
        ]},
        { text: "집에 가서 바로 잘 거야?", options: [
            { t: "응, 씻지도 못하고 기절할 듯", s: "mild" },
            { t: "맥주 한 잔 하며 넷플릭스!", s: "fried" },
            { t: "잠이 안 와서 술 생각나", s: "heavy" },
            { t: "배달 기다리며 폰 볼 거야", s: "reward" },
            { t: "내일 이브닝이라 좀 놀다 잘래", s: "energy" }
        ]},
        { text: "지금 입안에서 당기는 느낌은?", options: [
            { t: "미친듯이 자극적인 매운맛!", s: "spicy" },
            { t: "달달한 게 들어가야 살 것 같아", s: "reward" },
            { t: "기름지고 고소한 거", s: "fried" },
            { t: "뜨끈한 국물이 필요해", s: "warm" },
            { t: "그냥 아무거나 배 채울 거", s: "heavy" }
        ]}
    ],
    after_night: [
        { text: "밤샘 근무 진짜 고생했어... 지금 눈 상태는?", options: [
            { t: "눈이 침침하고 빠질 것 같아", s: "mild" },
            { t: "몽롱해서 제정신이 아니야", s: "tired" },
            { t: "나이트 끝나서 오히려 쌩쌩해!", s: "energy" },
            { t: "햇빛 보니까 눈물 나", s: "warm" },
            { t: "빨리 어두운 방에 눕고 싶어", s: "light" }
        ]},
        { text: "오늘 밤은 어땠어? 스테이블 했어?", options: [
            { t: "응, 이벤트 없이 조용했어", s: "stable" },
            { t: "환자 자꾸 깨서 잠 한숨 못 잠", s: "stress" },
            { t: "응급 터져서 영혼 갈아 넣음", s: "exhausted" },
            { t: "선배랑 둘이서 분위기 안 좋았어", s: "angry" },
            { t: "신규 교육하느라 더 피곤해", s: "stress" }
        ]},
        { text: "아침 공기 마시니까 기분이 어때?", options: [
            { t: "상쾌해! 보상 받고 싶어", s: "reward" },
            { t: "남들 출근할 때 퇴근해서 뿌듯", s: "stable" },
            { t: "그냥 세상이 나를 억까하는 듯", s: "heavy" },
            { t: "졸려서 아무 감흥이 없어", s: "mild" },
            { t: "아침부터 매운 거 땡겨", s: "spicy" }
        ]},
        { text: "식사하고 바로 암막 커튼 칠 거야?", options: [
            { t: "응, 암흑 속으로 사라질래", s: "mild" },
            { t: "든든하게 먹고 12시간 잘 거야", s: "heavy" },
            { t: "잠이 안 와서 아침 술?", s: "meat" },
            { t: "가볍게 먹고 조금만 잘래", s: "light" },
            { t: "오후에 약속 있어서 버텨야 함", s: "energy" }
        ]},
        { text: "지금 위장 상태는 어때?", options: [
            { t: "텅 비어서 쓰라릴 정도야", s: "warm" },
            { t: "더부룩해서 부드러운 게 필요해", s: "mild" },
            { t: "스트레스 받아서 뭐든 씹고 싶어", s: "meat" },
            { t: "속이 허해서 국물 생각나", s: "warm" },
            { t: "입맛 없는데 안 먹으면 못 자", s: "light" }
        ]}
    ],
    before: [
        { text: "무슨 근무 들어가는 거야?", options: [
            { t: "데이(Day) - 아침 일찍", s: "light" },
            { t: "이브닝(Evening) - 오후 출근", s: "energy" },
            { t: "나이트(Night) - 밤샘 전쟁", s: "heavy" },
            { t: "교육/오버타임 하러 가는 중", s: "mild" },
            { t: "오프였는데 불려가는 중(억울)", s: "angry" }
        ]},
        { text: "출근 전 지금 컨디션은?", options: [
            { t: "오늘 왠지 스테이블할 것 같아", s: "stable" },
            { t: "벌써부터 다리가 후들거려", s: "meat" },
            { t: "가기 싫어서 눈물 날 것 같아", s: "reward" },
            { t: "카페인이 절실하게 필요해", s: "energy" },
            { t: "그냥 아무 생각이 없어", s: "mild" }
        ]},
        { text: "가장 걱정되는 게 뭐야?", options: [
            { t: "IV 실패해서 등땀 날까봐", s: "stress" },
            { t: "인계 주다가 영혼까지 털릴까봐", s: "angry" },
            { t: "선배들한테 한 소리 들을까봐", s: "stress" },
            { t: "너무 바빠서 화장실 못 갈까봐", s: "heavy" },
            { t: "그냥 가기 싫은 게 제일 커", s: "reward" }
        ]},
        { text: "지금 입안의 상태는?", options: [
            { t: "쓰고 텁텁해서 상큼한 게 필요해", s: "light" },
            { t: "텅 비어서 고소한 게 땡겨", s: "meat" },
            { t: "매콤한 걸로 정신 차리고 싶어", s: "spicy" },
            { t: "달달한 게 들어가야 힘이 나", s: "reward" },
            { t: "속 쓰려서 뜨끈한 게 좋아", s: "warm" }
        ]}
    ],
    off: [
        { text: "오늘 오프는 어떻게 시작했어?", options: [
            { t: "오후까지 기절해있었어", s: "reward" },
            { t: "일찍 일어나서 놀러 감", s: "energy" },
            { t: "밀린 병원 일/공부 하는 중", s: "stable" },
            { t: "하루종일 침대 위에서 뒹굴", s: "mild" },
            { t: "대청소하고 이불 빨래 완료", s: "heavy" }
        ]},
        { text: "병원 냄새 좀 빠진 것 같아?", options: [
            { t: "완전! 이제야 사람 사는 듯", s: "stable" },
            { t: "아니, 자꾸 단톡방 알람 울려", s: "angry" },
            { t: "인계 실수한 거 생각나서 불안해", s: "stress" },
            { t: "오프인데도 병원 꿈 꿨어", s: "tired" },
            { t: "병원 생각 1도 안 남", s: "stable" }
        ]},
        { text: "가장 땡기는 음식 식감은?", options: [
            { t: "바삭바삭 튀김류", s: "fried" },
            { t: "쫄깃쫄깃 고기/회", s: "meat" },
            { t: "아삭아삭 신선한 채소", s: "light" },
            { t: "부드럽고 달콤한 것", s: "reward" },
            { t: "뜨끈한 국물 요리", s: "warm" }
        ]},
        { text: "오늘 하루의 행복 지수는?", options: [
            { t: "100% 터질 듯이 행복해", s: "reward" },
            { t: "80% 그냥 평화롭고 좋아", s: "stable" },
            { t: "50% 무난무난한 하루", s: "mild" },
            { t: "20% 어제 일이 자꾸 떠올라", s: "spicy" },
            { t: "0% 오프인데도 몸이 아파", s: "warm" }
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
        } else if (this.currentPath === 'shift_select') {
            q = BRANCHES.shift_select;
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
        
        // Progress UI
        const total = 10;
        const current = Math.min(this.responses.length + 1, 10);
        pFill.style.width = `${(current / total) * 100}%`;
        document.getElementById('progress-text').innerText = `분석 중... (${current}/10)`;

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

        const situation = this.responses[0]; // Timing
        const detailState = this.responses[2]; // Deep insight
        document.getElementById('result-summary').innerText = 
            `지금 "${situation}" 상황에서 "${detailState}" 때문에 정말 고생 많았어 😭\n가영이의 마음과 몸 상태를 분석해서 고른 3가지 메뉴야!`;

        picks.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area">
                    <img src="${food.i}" alt="${food.n}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'">
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: ${detailState} 상황이고 ${situation}이라서 ${food.r}</p>
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
        const msg = `자기야 나 지금 ${this.responses[0]}인데 ${this.responses[2]}해서 너무 힘들어... 😭 가영이의 마음을 읽는 앱으로 분석해보니까 오늘 [${foodName}] 먹어야 한대! 이거 사주면 기분 싹 풀릴 듯? 💝`;
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
