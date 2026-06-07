// 괜찮아, 밥먹자 🏥💝 Master Nurse-Only Edition (FORCED SYNC)

const FOOD_DATABASE = [
    { n: "마라탕 & 꿔바로우", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?q=80&w=800", r: "알싸한 마라맛으로 병원 냄새와 스트레스 싹!", s: "마라탕", tags: ["stress", "spicy", "heavy"] },
    { n: "엽기떡볶이 (오리지널)", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?q=80&w=800", r: "빌런 보호자 때문에 오른 혈압을 매운맛으로!", s: "엽기떡볶이", tags: ["angry", "spicy", "heavy"] },
    { n: "삼겹살 구이", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800", r: "온종일 스테이션 지킨 체력을 고기로 보충!", s: "삼겹살", tags: ["exhausted", "meat", "heavy"] },
    { n: "전복죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?q=80&w=800", r: "밤샘 후 지친 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild", "warm"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995?q=80&w=800", r: "수쌤한테 안 깨지고 무사히 퇴근한 나를 위한 상.", s: "BHC 뿌링클", tags: ["reward", "fried", "stable"] },
    { n: "모듬 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", r: "깔끔하고 고급스럽게 기분 전환하고 싶을 때.", s: "연어초밥", tags: ["stable", "light", "reward"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800", r: "퇴근 후 으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm", "tired"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", r: "든든하게 입안 가득 채우는 육즙의 행복.", s: "수제버거", tags: ["hungry", "heavy", "meat"] },
    { n: "바삭한 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?q=80&w=800", r: "겉바속촉, 우울함을 날리는 바삭한 소리.", s: "돈까스", tags: ["stable", "crispy", "mild"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", r: "오늘 받은 스트레스, 진한 국물에 소주 한 잔.", s: "곱창전골", tags: ["stress", "heavy", "warm"] },
    { n: "서브웨이 샌드위치", i: "https://images.unsplash.com/photo-1539252554452-da001b2d1531?q=80&w=800", r: "출근 전 가볍고 빠르게, 일할 에너지 충전!", s: "샌드위치", tags: ["light", "energy", "before"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800", r: "빌런 때문에 오른 열불을 시원하게 식혀주는 당 충전.", s: "망고빙수", tags: ["angry", "cold", "reward"] }
];

const SUMMARIES = [
    "오늘 빌런 보호자 때문에 멘탈이 바스러진 당신, 강력한 매운맛이 시급해요 😭",
    "스테이션에서 탈탈 털린 오늘... 든든한 고기 수혈로 기력을 보충해야 해요.",
    "오늘은 모든 게 스테이블! 평화로운 기분을 이어갈 깔끔한 한 끼 어때요?",
    "상처받은 마음에 위로가 필요한 시간, 따뜻하고 부드러운 음식이 딱이에요.",
    "수쌤한테 안 깨지고 칼퇴 성공! 화려하고 맛있는 음식으로 자신을 칭찬해줘요.",
    "말도 안 되는 오더 내린 의사 때문에 스트레스 받는 날... 씹는 맛으로 풀어봐요.",
    "입맛조차 없을 만큼 지쳤지만, 살기 위해 먹어야 한다면 시원한 국물을 추천해요.",
    "내일의 출근이 두려운 밤, 기름지고 고소한 음식으로 불안을 잠재워볼까요?",
    "행복한 오프날의 여유를 만끽하는 중! 상큼하고 가벼운 메뉴로 기분을 더 높여봐요.",
    "환자들 틈에서 살아남은 당신, 육즙 가득한 요리로 승리를 자축해요!"
];

const BRANCHES = {
    root: {
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (지침)", next: "shift_after", s: "after" },
            { t: "이제 곧 출근해야 해 (긴장)", next: "before", s: "before" },
            { t: "행복한 오프(Off) 중!", next: "off", s: "off" }
        ]
    },
    shift_after: {
        text: "방금 끝난 근무가 뭐야?",
        options: [
            { t: "데이 (Day)", next: "after_work", s: "day" },
            { t: "이브닝 (Evening)", next: "after_work", s: "evening" },
            { t: "나이트 (Night)", next: "after_work", s: "night" }
        ]
    },
    after_work: [
        { text: "오늘 스테이션 상황은 어땠어?", options: [
            { t: "완전 스테이블(Stable)! 평화로웠어", s: "stable" },
            { t: "조금 바빴지만 사고 없이 끝냄", s: "mild" },
            { t: "선배들 눈치 보느라 멘탈 나감", s: "stress" },
            { t: "수쌤이 자꾸 불러서 피 말렸어", s: "stress" },
            { t: "완전 헬파티... 물 한 모금 못 마심", s: "exhausted" }
        ]},
        { text: "오늘 가장 힘들게 한 빌런은 누구야?", options: [
            { t: "말 안 듣는 환자 & 무개념 보호자", s: "angry" },
            { t: "사고 치고 다니는 어리버리 신규", s: "stress" },
            { t: "이해 안 가는 오더 내리는 의사", s: "stress" },
            { t: "태움이나 다름없는 선배의 압박", s: "angry" },
            { t: "쉴 틈 없이 터지는 응급 상황", s: "exhausted" }
        ]},
        { text: "지금 몸에서 어디가 제일 고통스러워?", options: [
            { t: "종일 서 있어서 다리가 터질 듯", s: "exhausted" },
            { t: "인계하고 설명하느라 목이 다 쉼", s: "warm" },
            { t: "차팅 쏟아져서 눈 침침, 손목 아픔", s: "mild" },
            { t: "신경 썼더니 뒷목 당기고 머리 아파", s: "spicy" },
            { t: "그냥 숨 쉬는 것도 귀찮은 무기력", s: "heavy" }
        ]},
        { text: "오늘 인계할 때 어땠어?", options: [
            { t: "깔끔하게 털고 나왔어! 칼퇴!", s: "stable" },
            { t: "질문 공세에 버벅거려서 속상해", s: "reward" },
            { t: "차팅 밀려서 1시간 오버타임 함", s: "heavy" },
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
        { text: "지금 당장 땡기는 자극의 정도는?", options: [
            { t: "미친듯이 맵고 짠 거! (다 박살!)", s: "spicy" },
            { t: "달달해서 당 충전되는 거", s: "reward" },
            { t: "기름지고 고소한 튀김류", s: "fried" },
            { t: "뜨끈하고 시원한 국물", s: "warm" },
            { t: "상큼하고 깔끔한 샐러드/회", s: "light" }
        ]},
        { text: "식사하고 바로 잠들 예정이야?", options: [
            { t: "씻고 바로 기절하고 싶어", s: "mild" },
            { t: "맥주 한 잔 하며 넷플릭스 볼래", s: "fried" },
            { t: "잠이 안 와서 술 한잔 생각나", s: "spicy" },
            { t: "이제 막 밤을 지새워야 해", s: "energy" },
            { t: "남자친구한테 하소연하며 먹을래", s: "reward" }
        ]},
        { text: "내일도 똑같이 출근해?", options: [
            { t: "응... 또 그 지옥으로 가야 함", s: "meat" },
            { t: "내일은 드디어 오프야! (행복)", s: "reward" },
            { t: "듀티가 바뀌어서 적응해야 해", s: "energy" },
            { t: "연속 근무 중이라 제정신 아님", s: "exhausted" },
            { t: "오프 뒤에 다시 근무야", s: "stable" }
        ]}
    ],
    before: [
        { text: "어느 근무 들어가기 전이야?", options: [
            { t: "데이(Day)", s: "light" },
            { t: "이브닝(Evening)", s: "energy" },
            { t: "나이트(Night)", s: "heavy" }
        ]},
        { text: "출근 전 지금 기분은?", options: [
            { t: "가기 싫어서 눈물 나", s: "reward" },
            { t: "무사 스테이블하길 기도 중", s: "stable" },
            { t: "아무 생각이 없다", s: "mild" }
        ]},
        { text: "가장 걱정되는 게 뭐야?", options: [
            { t: "IV 실패", s: "stress" },
            { t: "인계 털림", s: "angry" },
            { t: "수쌤 잔소리", s: "stress" }
        ]}
    ],
    off: [
        { text: "오늘 오프 만족도는?", options: [
            { t: "완벽한 힐링!", s: "stable" },
            { t: "그냥 그래", s: "mild" },
            { t: "쉰 것 같지도 않아", s: "heavy" }
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
        this.currentPath = 'root'; this.stepIdx = -1; this.responses = []; this.selectedTags = [];
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        this.nextStep();
    }

    nextStep(tag) {
        if (tag) this.selectedTags.push(tag);
        this.stepIdx++;
        let q;
        if (this.currentPath === 'root') q = BRANCHES.root;
        else if (this.currentPath === 'shift_after') q = BRANCHES.shift_after;
        else {
            const branch = BRANCHES[this.currentPath];
            if (this.stepIdx < branch.length) q = branch[this.stepIdx];
            else return this.showResult();
        }
        this.renderQuestion(q);
    }

    renderQuestion(q) {
        document.getElementById('question-text').innerText = q.text;
        const aGrid = document.getElementById('answer-buttons');
        aGrid.innerHTML = '';
        const currentCount = this.responses.length + 1;
        document.getElementById('progress-bar-fill').style.width = `${(currentCount / 10) * 100}%`;
        document.getElementById('progress-text').innerText = `컨디션 분석 중... (${Math.min(currentCount, 10)}/10)`;
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn'; btn.innerText = opt.t;
            btn.onclick = () => {
                this.responses.push(opt.t);
                if (opt.next) { this.currentPath = opt.next; this.stepIdx = -1; }
                this.nextStep(opt.s);
            };
            aGrid.appendChild(btn);
        });
    }

    async showResult() {
        document.getElementById('survey-area').classList.add('hidden');
        document.getElementById('result-area').classList.remove('hidden');
        const scores = {}; this.selectedTags.forEach(t => scores[t] = (scores[t] || 0) + 1);
        const candidates = FOOD_DATABASE.map(f => {
            let match = 0; f.tags.forEach(t => { if (scores[t]) match += scores[t]; });
            return { ...f, score: match + Math.random() * 0.1 };
        }).sort((a, b) => b.score - a.score);
        const picks = candidates.slice(0, 3);
        const container = document.getElementById('results-container');
        container.innerHTML = '';
        const summaryIdx = (this.selectedTags.length * 7) % SUMMARIES.length;
        document.getElementById('status-summary-box').innerText = SUMMARIES[summaryIdx];

        for (let food of picks) {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-img-area" id="img-area-${food.s}">
                    <img src="${food.i}" alt="${food.n}">
                    <div class="play-overlay">▶️</div>
                    <div class="youtube-badge">Mukbang</div>
                </div>
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: ${this.responses[2] || "힘든 하루"} 상황이라 ${food.r}</p>
                    <div class="order-btn-group">
                        <a href="#" class="mini-order-btn mini-baemin" onclick="window.game.goOrder('baemin', '${food.s}')">배민</a>
                        <a href="#" class="mini-order-btn mini-coupang" onclick="window.game.goOrder('coupang', '${food.s}')">쿠팡</a>
                        <a href="#" class="mini-order-btn mini-kakao" onclick="window.game.sendToBF('${food.n}')">사줘!</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
            this.updateMukbangThumbnail(food);
        }
    }

    async updateMukbangThumbnail(food) {
        const area = document.getElementById(`img-area-${food.s}`);
        try {
            const query = encodeURIComponent(food.s + " 먹방");
            const targetUrl = `https://www.youtube.com/results?search_query=${query}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();
            const videoMatch = data.contents.match(/"videoId":"([^"]+)"/);
            if (videoMatch) {
                const videoId = videoMatch[1];
                const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                area.querySelector('img').src = thumb;
                area.onclick = () => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }
        } catch (e) {}
    }

    goOrder(type, search) {
        const url = type === 'baemin' ? `baemin://search?keyword=${encodeURIComponent(search)}` : `coupangeats://search?q=${encodeURIComponent(search)}`;
        window.location.href = url;
        setTimeout(() => { if (window.confirm("배달 앱이 설치되어 있나요? 웹으로 이동할까요?")) window.location.href = type === 'baemin' ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`; }, 1500);
    }

    sendToBF(foodName) {
        const msg = `자기야 나 오늘 분석해보니까 [${foodName}] 먹어야 한대! 이거 사주면 기분 싹 풀릴 것 같아 💝`;
        if (navigator.share) navigator.share({ title: '괜찮아, 밥먹자 🏥💝', text: msg, url: window.location.href });
        else alert("메시지가 복사되었습니다! 남자친구에게 보내주세요:\n\n" + msg);
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}
window.game = new MoodFoodApp();
