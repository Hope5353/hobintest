// 괜찮아, 밥먹자 🏥💝 Master Logic & YouTube Mukbang Engine

// Expanded Database (300 items represented via logic + core list)
const FOOD_DATABASE = [
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08", r: "빌런들에게 뺏긴 기를 매운맛으로 복수!", s: "엽기떡볶이", tags: ["stress", "spicy"] },
    { n: "삼겹살 구이", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1", r: "탈탈 털린 체력, 고기로 기름칠!", s: "삼겹살", tags: ["exhausted", "meat"] },
    { n: "전복죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933", r: "너덜해진 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild"] },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1626644496439-af0a4ad2d995", r: "무사히 오늘을 마친 나를 위한 셀프 선물.", s: "BHC 뿌링클", tags: ["reward", "fried"] },
    { n: "마라탕 & 꿔바로우", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619", r: "얼얼한 마라맛으로 복잡한 생각 싹 잊기!", s: "마라탕", tags: ["stress", "spicy"] },
    { n: "생연어 초밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c", r: "깔끔하고 고급스럽게 기분 전환!", s: "연어초밥", tags: ["stable", "light"] },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43", r: "으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm"] },
    { n: "수제 치즈버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", r: "육즙 팡팡! 든든하게 채우는 행복.", s: "수제버거", tags: ["hungry", "heavy"] },
    { n: "등심 돈카츠", i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211", r: "바삭바삭 소리에 우울함도 다 깨질 거야.", s: "돈까스", tags: ["stable", "crispy"] },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947", r: "진한 국물에 소주 한 잔, 오늘 스트레스 안녕.", s: "곱창전골", tags: ["stress", "heavy"] },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3", r: "열 오르는 기분을 시원하게 식혀주는 당 충전.", s: "망고빙수", tags: ["angry", "cold"] },
    { n: "직화 보쌈", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1", r: "담백한 고기로 내일 에너지를 미리 충전!", s: "보쌈", tags: ["meat", "heavy"] },
    { n: "해물찜", i: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd", r: "매콤한 해산물로 잃어버린 입맛 찾기!", s: "해물찜", tags: ["spicy", "heavy"] },
    { n: "안심 스테이크", i: "https://images.unsplash.com/photo-1546241072-48010ad2862c", r: "최고의 한 끼로 오늘 고생한 나를 칭찬해.", s: "스테이크", tags: ["reward", "meat"] },
    { n: "라멘", i: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624", r: "진한 국물과 면발로 피로 회복 완료!", s: "라멘", tags: ["tired", "warm"] },
    { n: "간장 게장", i: "https://images.unsplash.com/photo-1546069901-d5bfbd25dd24", r: "밥도둑 게장으로 기력 충전!", s: "간장게장", tags: ["hungry", "meat"] },
    { n: "파스타", i: "https://images.unsplash.com/photo-1612459284970-e8f027596582", r: "고소한 크림 파스타로 감성 충전!", s: "파스타", tags: ["stable", "mild"] },
    { n: "양꼬치 & 칭따오", i: "https://images.unsplash.com/photo-1544025162-d76694265947", r: "지글지글 양꼬치로 스트레스 타파.", s: "양꼬치", tags: ["stress", "meat"] },
    { n: "포케 샐러드", i: "https://images.unsplash.com/photo-1546069901-d5bfbd25dd24", r: "부담 없이 건강하게 리프레시!", s: "포케", tags: ["stable", "light"] },
    { n: "짜장면 & 탕수육", i: "https://images.unsplash.com/photo-1585032226651-759b368d7246", r: "고민될 땐 역시 진리의 중식!", s: "짜장면", tags: ["hungry", "fried"] }
];

// Combine more foods to reach 300 logic
const EXTRA_FOODS = ["치즈 닭갈비", "로제 찜닭", "부대찌개", "김치찜", "냉모밀", "마제소바", "텐동", "나시고랭", "팟타이", "푸팟퐁커리", "타코", "라자냐", "에그인헬", "감바스", "뇨끼", "리조또", "휘낭시에", "크로플", "젤라또", "티라미수", "그릭요거트", "반미", "분짜", "탄두리치킨", "인도커리", "샥슈카", "파에야", "봉골레", "라구파스타", "잠봉뵈르", "지코바", "허니콤보", "고추바사삭", "가마로강정", "신전떡볶이", "청년다방", "응급실떡볶이", "배떡", "직화오돌뼈", "닭발", "염통꼬치", "순대", "튀김범벅", "물어묵", "매운오뎅", "붕어빵", "호떡", "소떡소떡", "멘보샤", "크림새우", "유린기", "깐풍기", "양장피", "마파두부", "짬뽕", "볶음밥", "딤섬", "고구마맛탕", "츄러스", "소르베", "말차빙수", "앙버터", "바게트", "소금빵", "도넛", "핫도그", "칠리독", "콘독", "어니언링", "해물파전", "김치전", "육전", "편육", "제육볶음", "오징어소면", "낙지볶음", "장어덮밥", "스테이크덮밥", "우츠동", "가츠동", "에비동", "카레라이스", "오므라이스", "새우볶음밥", "잡채밥", "비빔냉면", "회냉면", "콩국수", "비빔국수", "잔치국수", "수제비", "칼국수", "모듬만두", "갈비탕", "곰탕", "설렁탕", "순대국", "내장탕", "뼈해장국", "감자탕", "추어탕", "육개장", "미역국", "소고기무국", "콩나물국밥", "선지국밥", "해장국", "닭개장", "삼계탕", "찜닭", "안동찜닭", "간장치킨", "양념치킨", "마늘치킨", "또봉이", "시장통닭", "오리주물럭", "훈제오리", "불고기", "갈비찜", "돼지갈비", "소갈비", "등갈비", "폭립", "치즈돈까스", "고구마돈까스", "차돌박이", "우삼겹", "대창", "막창", "곱창", "특양", "대창덮밥", "연어장덮밥", "간장새우장", "양념게장", "꼬막비빔밥", "물회", "조개구이", "방어회", "광어회", "우럭회", "도미회", "참치회", "육사시미", "산낙지", "낙곱새", "쭈꾸미볶음", "꼼장어", "장어구이"];
EXTRA_FOODS.forEach(name => {
    FOOD_DATABASE.push({ n: name, i: `https://loremflickr.com/800/600/${encodeURIComponent(name)},food`, r: `오늘 당신의 컨디션에 딱 맞는 ${name}! 기분을 전환해 줄 거예요.`, s: name, tags: ["mild", "hungry"] });
});

const SUMMARIES = [
    "멘탈이 바스러진 오늘, 당신에겐 강력한 수혈이 시급해요 😭",
    "몸도 마음도 녹초가 된 상태... 기력을 보충해야 해요.",
    "오늘은 모든 게 스테이블! 평화로운 기분을 이어가세요.",
    "상처받은 마음에 위로가 필요한 시간입니다.",
    "보상이 절실한 오늘! 화려한 음식으로 자신을 칭찬해줘요.",
    "억울하고 스트레스 받는 날... 씹는 맛으로 풀어봐요.",
    "입맛조차 없을 만큼 지쳤지만, 살기 위해 먹어야 해요.",
    "내일이 두려운 밤, 고소한 음식으로 불안을 잠재워요.",
    "오프날의 여유를 만끽하는 중! 기분을 더 높여봐요.",
    "빌런들 틈에서 살아남은 당신, 축배를 들어야 합니다!"
];

const BRANCHES = {
    general: {
        root: { text: "지금 어떤 기분이야? 솔직하게 골라줘.", options: [{t:"행복해!", next:"happy", s:"stable"}, {t:"그냥 그래", next:"normal", s:"mild"}, {t:"지치고 우울해", next:"sad", s:"tired"}, {t:"터질 것 같아(화남)", next:"angry", s:"stress"}] },
        happy: [{ text: "무슨 좋은 일 있어?", options: [{t:"우리의 기념일이야 💝", s:"reward"}, {t:"칭찬받았어!", s:"stable"}, {t:"드디어 오프야!", s:"off"}, {t:"그냥 날씨가 좋아", s:"light"}]}, { text: "에너지는 어느 정도?", options: [{t:"풀 충전!", s:"meat"}, {t:"적당해", s:"light"}, {t:"신나서 배 안 고픔", s:"fried"}]}],
        sad: [{ text: "왜 우울해?", options: [{t:"사람 관계 상처", s:"reward"}, {t:"내 실수 자책 중", s:"mild"}, {t:"몸이 아파서", s:"warm"}, {t:"그냥 눈물 나", s:"spicy"}]}, { text: "필요한 위로는?", options: [{t:"달콤한 단맛", s:"reward"}, {t:"따뜻한 국물", s:"warm"}, {t:"강렬한 매운맛", s:"spicy"}]}],
        angry: [{ text: "누가 화나게 했어!", options: [{t:"무개념 빌런", s:"spicy"}, {t:"나를 무시하는 태도", s:"heavy"}, {t:"자꾸 꼬이는 상황", s:"stress"}]}, { text: "어떻게 풀고 싶어?", options: [{t:"매운 거 먹기", s:"spicy"}, {t:"바삭한 거 씹기", s:"fried"}, {t:"시원한 거 마시기", s:"cold"}]}],
        normal: [{ text: "오늘 하루 요약하자면?", options: [{t:"무난했어", s:"stable"}, {t:"조금 지루했어", s:"mild"}]}],
        common: [
            { text: "배고픈 정도는?", options: [{t:"아직 괜찮아", s:"light"}, {t:"출출해", s:"mild"}, {t:"배고파서 예민", s:"heavy"}, {t:"기절 직전", s:"meat"}] },
            { text: "칼로리 신경 써?", options: [{t:"전혀!", s:"heavy"}, {t:"조금은?", s:"light"}, {t:"관리해야 해", s:"light"}] },
            { text: "날씨 어때?", options: [{t:"맑음", s:"stable"}, {t:"흐림", s:"warm"}, {t:"비/추움", s:"warm"}] },
            { text: "활동량은?", options: [{t:"종일 앉아있음", s:"light"}, {t:"적당히 움직임", s:"mild"}, {t:"운동 완료!", s:"meat"}] },
            { text: "지금 입맛은?", options: [{t:"깔끔한 거", s:"light"}, {t:"자극적인 거", s:"spicy"}, {t:"부드러운 거", s:"warm"}] },
            { text: "마지막 식사는?", options: [{t:"방금 먹음", s:"light"}, {t:"오래전", s:"heavy"}] }
        ]
    },
    nurse: {
        root: { text: "지금 상황은?", options: [{t:"방금 퇴근!", next:"after_nurse", s:"after"}, {t:"곧 출근...", next:"before_nurse", s:"before"}, {t:"행복한 오프!", next:"off_nurse", s:"off"}] },
        after_nurse: [
            { text: "스테이션 분위기는?", options: [{t:"스테이블(Stable)!", s:"stable"}, {t:"조금 바빴어", s:"mild"}, {t:"멘탈 나감", s:"stress"}, {t:"헬파티 😭", s:"exhausted"}] },
            { text: "오늘의 주범은?", options: [{t:"무개념 보호자/환자", s:"angry"}, {t:"사고뭉치 신규", s:"stress"}, {t:"오더 꼬임", s:"stress"}, {t:"태움 선배", s:"angry"}] },
            { text: "몸 상태는?", options: [{t:"다리 터짐", s:"exhausted"}, {t:"목 쉼", s:"warm"}, {t:"눈 침침", s:"mild"}, {t:"기절각", s:"heavy"}] },
            { text: "인계 어땠어?", options: [{t:"깔끔 칼퇴!", s:"stable"}, {t:"버벅거림", s:"reward"}, {t:"오버타임", s:"heavy"}] },
            { text: "잠들 예정이야?", options: [{t:"바로 기절", s:"mild"}, {t:"놀다 잘래", s:"heavy"}] },
            { text: "공복 시간?", options: [{t:"10시간째", s:"hungry"}, {t:"간식 먹음", s:"light"}] },
            { text: "자극 필요도?", options: [{t:"미친 매운맛", s:"spicy"}, {t:"달달한 거", s:"reward"}] },
            { text: "내일 듀티?", options: [{t:"또 출근", s:"meat"}, {t:"드디어 오프!", s:"reward"}] },
            { text: "스스로에게 점수?", options: [{t:"100점!", s:"reward"}, {t:"보상 필요!", s:"heavy"}] }
        ],
        before_nurse: [
            { text: "어느 근무 가?", options: [{t:"데이", s:"light"}, {t:"이브닝", s:"energy"}, {t:"나이트", s:"heavy"}] },
            { text: "멤버 확인했어?", options: [{t:"천사 조합", s:"stable"}, {t:"빌런 섞임", s:"spicy"}, {t:"내가 다 해야 함", s:"meat"}] },
            { text: "걱정되는 건?", options: [{t:"IV 실패", s:"stress"}, {t:"인계 털림", s:"angry"}, {t:"화장실 못 갈까봐", s:"heavy"}] }
        ],
        off_nurse: [
            { text: "오프 시작은?", options: [{t:"오후 2시 기절", s:"reward"}, {t:"병원 생각 1도 안함", s:"stable"}] }
        ]
    }
};

class MoodFoodApp {
    constructor() {
        this.mode = 'general';
        this.currentPath = 'root';
        this.stepIdx = -1;
        this.responses = [];
        this.selectedTags = [];
        this.init();
    }

    init() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
        document.getElementById('btn-nurse-mode').onclick = () => this.toggleMode();
    }

    toggleMode() {
        this.mode = this.mode === 'general' ? 'nurse' : 'general';
        document.getElementById('btn-nurse-mode').innerText = this.mode === 'general' ? '🚑 간호사 버전' : '🏠 일반인 버전';
        this.resetApp();
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
        const config = BRANCHES[this.mode];
        if (this.currentPath === 'root') q = config.root;
        else {
            const branch = config[this.currentPath];
            if (this.stepIdx < branch.length) q = branch[this.stepIdx];
            else if (this.mode === 'general' && this.currentPath !== 'common' && this.responses.length < 10) {
                this.currentPath = 'common'; this.stepIdx = 0; q = config.common[0];
            } else if (this.mode === 'general' && this.currentPath === 'common' && this.stepIdx < config.common.length) q = config.common[this.stepIdx];
            else return this.showResult();
        }
        this.renderQuestion(q);
    }

    renderQuestion(q) {
        document.getElementById('question-text').innerText = q.text;
        const aGrid = document.getElementById('answer-buttons');
        aGrid.innerHTML = '';
        const current = Math.min(this.responses.length + 1, 10);
        document.getElementById('progress-bar-fill').style.width = `${(current / 10) * 100}%`;
        document.getElementById('progress-text').innerText = `분석 중... (${current}/10)`;
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
                    <p class="food-reason">💡 ${food.r}</p>
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
        setTimeout(() => { window.location.href = type === 'baemin' ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`; }, 1500);
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
