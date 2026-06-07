// 괜찮아, 밥먹자 🏥💝 Master Nurse-Only Edition (5 Options & Shared Link Fix)

const FOOD_DATABASE = [
    { n: "엽기떡볶이", r: "빌런 때문에 오른 혈압을 시원하게 식혀줄 강력한 매운맛!", s: "엽기떡볶이", tags: ["spicy", "stress"] },
    { n: "마라탕 & 꿔바로우", r: "얼얼한 마라맛으로 병원 냄새와 복잡한 생각을 싹 날려버려!", s: "마라탕", tags: ["spicy", "stress"] },
    { n: "불닭발", r: "콜라겐 충전과 함께 스트레스를 한 입에 씹어버리자!", s: "무뼈닭발", tags: ["spicy", "stress"] },
    { n: "삼겹살 & 소주", r: "온종일 서서 일한 당신, 지글지글 고기 수혈이 시급해요!", s: "삼겹살", tags: ["meat", "exhausted"] },
    { n: "한우 스테이크", r: "오늘 주인공인 당신을 위한 특별하고 고급스러운 보상.", s: "스테이크", tags: ["meat", "reward"] },
    { n: "영양 전복죽", r: "너덜해진 위장을 부드럽게 감싸주는 따뜻한 위로.", s: "전복죽", tags: ["mild", "warm"] },
    { n: "뿌링클 치킨", r: "수쌤한테 안 깨지고 칼퇴한 나를 위한 달콤한 상.", s: "BHC 뿌링클", tags: ["fried", "reward"] },
    { n: "소고기 쌀국수", r: "으슬으슬한 몸을 데워주는 뜨끈하고 깔끔한 국물.", s: "쌀국수", tags: ["warm", "tired"] },
    { n: "수제 치즈버거", r: "육즙 팡팡! 든든하게 채우는 행복.", s: "수제버거", tags: ["heavy", "hungry"] },
    { n: "바삭 등심 돈카츠", r: "겉바속촉, 우울함을 날리는 바삭한 소리.", s: "돈까스", tags: ["crispy", "stable"] },
    { n: "곱창 전골", r: "스트레스 폭발한 날, 칼칼한 국물에 소주 한 잔.", s: "곱창전골", tags: ["heavy", "stress"] },
    { n: "망고 빙수", r: "열 오르는 기분을 시원하게 식혀주는 당 충전.", s: "망고빙수", tags: ["cold", "reward"] }
];

const EXTRA_NAMES = ["찜닭", "부대찌개", "김치찜", "냉모밀", "마제소바", "텐동", "나시고랭", "팟타이", "푸팟퐁커리", "타코", "라자냐", "에그인헬", "감바스", "뇨끼", "리조또", "휘낭시에", "크로플", "젤라또", "티라미수", "그릭요거트", "반미", "분짜", "탄두리치킨", "인도커리", "샥슈카", "파에야", "봉골레", "라구파스타", "잠봉뵈르", "지코바", "허니콤보", "고추바사삭", "가마로강정", "신전떡볶이", "청년다방", "응급실떡볶이", "배떡", "직화오돌뼈", "닭발", "염통꼬치", "순대", "튀김범벅", "물어묵", "매운오뎅", "붕어빵", "호떡", "소떡소떡", "멘보샤", "크림새우", "유린기", "깐풍기", "양장피", "마파두부", "짬뽕", "볶음밥", "딤섬", "고구마맛탕", "츄러스", "소르베", "말차빙수", "앙버터", "바게트", "소금빵", "도넛", "핫도그", "칠리독", "콘독", "어니언링", "해물파전", "김치전", "육전", "편육", "제육볶음", "오징어소면", "낙지볶음", "장어덮밥", "스테이크덮밥", "우츠동", "가츠동", "에비동", "카레라이스", "오므라이스", "새우볶음밥", "잡채밥", "비빔냉면", "회냉면", "콩국수", "비빔국수", "잔치국수", "수제비", "칼국수", "모듬만두", "갈비탕", "곰탕", "설렁탕", "순대국", "내장탕", "뼈해장국", "감자탕", "추어탕", "육개장", "미역국", "소고기무국", "콩나물국밥", "선지국밥", "해장국", "닭개장", "삼계탕", "안동찜닭", "간장치킨", "양념치킨", "마늘치킨", "또봉이", "시장통닭", "오리주물럭", "훈제오리", "불고기", "갈비찜", "돼지갈비", "소갈비", "등갈비", "폭립", "치즈돈까스", "고구마돈까스", "차돌박이", "우삼겹", "대창", "막창", "곱창", "특양", "대창덮밥", "연어장덮밥", "간장새우장", "양념게장", "꼬막비빔밥", "물회", "조개구이", "방어회", "광어회", "우럭회", "도미회", "참치회", "육사시미", "산낙지", "낙곱새", "쭈꾸미볶음", "꼼장어", "장어구이"];
EXTRA_NAMES.forEach(name => { FOOD_DATABASE.push({ n: name, r: `오늘 당신의 상태를 정밀 분석한 결과, 가장 에너지를 줄 메뉴는 ${name}입니다!`, s: name, tags: ["mild", "hungry"] }); });

const SUMMARIES = [
    "빌런 보호자 때문에 멘탈이 바스러진 오늘, 강력한 수혈이 시급해요 😭",
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
    root: { // Step 1
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (탈탈 털림)", next: "shift_after", s: "after" },
            { t: "이제 곧 출근해야 해 (긴장)", next: "before_work", s: "before" },
            { t: "행복한 오프(Off) 중!", next: "off_day", s: "off" },
            { t: "연속 근무 드디어 끝남!", next: "shift_after", s: "exhausted" },
            { t: "교육이나 오버타임 가는 중", next: "before_work", s: "mild" }
        ]
    },
    shift_after: { // Step 2
        text: "방금 끝난 근무가 뭐야?",
        options: [
            { t: "데이 (Day)", next: "after_work", s: "day" },
            { t: "이브닝 (Evening)", next: "after_work", s: "evening" },
            { t: "나이트 (Night)", next: "after_work", s: "night" },
            { t: "연근 (연속 근무)", next: "after_work", s: "exhausted" },
            { t: "다른 업무(교육 등)", next: "after_work", s: "mild" }
        ]
    },
    after_work: [ // Steps 3-10
        { text: "오늘 스테이션 분위기는 어땠어?", options: [{t:"완전 스테이블(Stable)!", s:"stable"}, {t:"조금 바빴지만 사고 없음", s:"mild"}, {t:"선배들 땜에 멘탈 나감", s:"stress"}, {t:"수쌤이 자꾸 불러서 피 말림", s:"stress"}, {t:"완전 헬파티 😭", s:"exhausted"}] },
        { text: "오늘 가장 힘들게 한 빌런은?", options: [{t:"말 안 듣는 보호자/환자", s:"angry"}, {t:"사고 치는 어리버리 신규", s:"stress"}, {t:"이해 안 가는 오더 의사", s:"stress"}, {t:"태움 급 선배 압박", s:"angry"}, {t:"쉴 틈 없는 응급 상황", s:"exhausted"}] },
        { text: "지금 몸 상태 중 어디가 제일 고통스러워?", options: [{t:"다리가 퉁퉁 부어 무거워", s:"exhausted"}, {t:"인계 하느라 목이 다 쉼", s:"warm"}, {t:"눈 침침, 머리 지끈지끈", s:"mild"}, {t:"뒷목 당기고 어깨 뭉침", s:"meat"}, {t:"그냥 전체적으로 기절각", s:"heavy"}] },
        { text: "오늘 인계할 때 어땠어?", options: [{t:"깔끔하게 털고 칼퇴!", s:"stable"}, {t:"버벅거려서 자책 중", s:"reward"}, {t:"차팅 밀려 1시간 연장", s:"heavy"}, {t:"무사히 넘겨서 다행", s:"mild"}, {t:"다음 듀티한테 미안함", s:"light"}] },
        { text: "밥 먹을 여유는 좀 있었어?", options: [{t:"10시간 생공복... 배고파 죽음", s:"hungry"}, {t:"병원 밥 대충 넘김", s:"heavy"}, {t:"중간에 간식 좀 주워 먹음", s:"light"}, {t:"너무 지쳐 입맛조차 없어", s:"mild"}, {t:"전투적으로 먹긴 먹었어", s:"stable"}] },
        { text: "지금 당장 땡기는 자극의 정도는?", options: [{t:"미친듯이 맵고 짠 거!", s:"spicy"}, {t:"달달해서 당 충전되는 거", s:"reward"}, {t:"기름지고 고소한 거", s:"fried"}, {t:"뜨끈하고 시원한 국물", s:"warm"}, {t:"상큼 깔끔한 거", s:"light"}] },
        { text: "식사하고 바로 잠들 예정이야?", options: [{t:"씻고 바로 기절 예정", s:"mild"}, {t:"맥주 한 잔 하며 넷플릭스", s:"fried"}, {t:"잠 안 와서 술 생각남", s:"spicy"}, {t:"이제 막 밤을 지새워야 함", s:"energy"}, {t:"하소연하며 스트레스 풀래", s:"reward"}] },
        { text: "내일도 똑같이 출근해?", options: [{t:"응... 지옥 반복 예정", s:"meat"}, {t:"내일은 드디어 오프!", s:"reward"}, {t:"듀티 바뀌어서 적응해야 해", s:"energy"}, {t:"연속 근무라 제정신 아님", s:"exhausted"}, {t:"오프 뒤에 다시 출근", s:"stable"}] }
    ],
    before_work: [ // Steps 2-10
        { text: "데이(Day), 이브(Eve), 나이트(Night) 중 뭐야?", options: [{t:"데이 - 아직 밤 같아", s:"light"}, {t:"이브 - 곧 헬게이트", s:"energy"}, {t:"나이트 - 밤샘 전쟁", s:"heavy"}, {t:"교육/오버타임", s:"mild"}, {t:"불려나가는 중(억울)", s:"angry"}] },
        { text: "오늘 멤버(스테이션) 확인했어?", options: [{t:"천사 조합! 최고의 날", s:"stable"}, {t:"무난무난해", s:"mild"}, {t:"빌런 섞여있음", s:"spicy"}, {t:"다 신규라 내가 다 함", s:"meat"}, {t:"무서운 선배 듀티", s:"stress"}] },
        { text: "출근 전 솔직한 기분은?", options: [{t:"가기 싫어 눈물 남", s:"reward"}, {t:"돈 벌러 가자... 해탈", s:"mild"}, {t:"제발 스테이블하길", s:"stable"}, {t:"카페인 절실함", s:"energy"}, {t:"아무 생각이 없다", s:"mild"}] },
        { text: "잠은 좀 푹 잤어?", options: [{t:"꿀잠 잤어!", s:"stable"}, {t:"병원 꿈 꾸다 설침", s:"stress"}, {t:"거의 못 잤어", s:"heavy"}, {t:"자꾸 깨서 피곤해", s:"warm"}, {t:"자도 자도 피곤함", s:"meat"}] },
        { text: "걱정되는 거 있어?", options: [{t:"IV 실패 등땀", s:"stress"}, {t:"인계 털릴까봐", s:"angry"}, {t:"수쌤 잔소리", s:"stress"}, {t:"바빠서 굶을까봐", s:"heavy"}, {t:"그냥 가기 싫은 게 큼", s:"reward"}] },
        { text: "지금 입안의 상태는?", options: [{t:"텁텁해서 상큼한 거", s:"light"}, {t:"텅 비어 고소한 거", s:"meat"}, {t:"매콤해서 정신 차릴 맛", s:"spicy"}, {t:"속 쓰려 뜨끈한 거", s:"warm"}, {t:"달달한 당분 필요", s:"reward"}] },
        { text: "오늘 예상 강도는?", options: [{t:"스테이블!", s:"stable"}, {t:"이미 멘붕 직전", s:"stress"}, {t:"정신없을 예정", s:"heavy"}, {t:"5단계 헬파티", s:"meat"}, {t:"평소만큼 바쁠 듯", s:"mild"}] },
        { text: "근무 후에 계획은?", options: [{t:"친구랑 맛집!", s:"reward"}, {t:"씻고 바로 기절", s:"mild"}, {t:"운동(갓생)", s:"energy"}, {t:"밀린 공부/과제", s:"mild"}, {t:"나에게 주는 맛있는 배달", s:"heavy"}] },
        { text: "마지막으로 오늘의 각오는?", options: [{t:"무사 퇴근하자!", s:"mild"}, {t:"환자 살리자!", s:"reward"}, {t:"난 할 수 있다!", s:"energy"}, {t:"사직서 참자", s:"stress"}, {t:"제발 평화롭길", s:"stable"}] }
    ],
    off_day: [ // Steps 2-10
        { text: "오늘 오프 어떻게 시작했어?", options: [{t:"오후까지 기절", s:"reward"}, {t:"일찍 놀러 나감", s:"energy"}, {t:"밀린 일/공부", s:"stable"}, {t:"침대 위 뒹굴", s:"mild"}, {t:"대청소/빨래", s:"heavy"}] },
        { text: "병원 냄새 빠진 것 같아?", options: [{t:"완전!", s:"stable"}, {t:"아니, 자꾸 단톡 알람 와", s:"angry"}, {t:"오프인데 병원 꿈 꿈", s:"tired"}, {t:"인계 실수 생각남", s:"stress"}, {t:"병원 생각 1도 안 함", s:"stable"}] },
        { text: "어디가 제일 아파?", options: [{t:"종아리랑 발바닥", s:"warm"}, {t:"어깨랑 허리", s:"meat"}, {t:"눈이랑 머리", s:"mild"}, {t:"몸살 기운", s:"warm"}, {t:"다행히 안 아픔", s:"stable"}] },
        { text: "행복 지수는 어느 정도?", options: [{t:"100% 완전 행복", s:"reward"}, {t:"80% 평화롭고 좋음", s:"stable"}, {t:"50% 무난무난", s:"mild"}, {t:"10% 내일 출근 우울", s:"stress"}, {t:"0% 몸이 너무 아픔", s:"warm"}] },
        { text: "오늘 식사 컨셉은?", options: [{t:"화려한 폭식!", s:"heavy"}, {t:"분위기 외식", s:"reward"}, {t:"가볍게 관리", s:"light"}, {t:"편하게 배달", s:"mild"}, {t:"정갈한 집밥", s:"meat"}] },
        { text: "활동하면서 스트레스 풀렸어?", options: [{t:"응, 다 잊음!", s:"stable"}, {t:"아직 조금 남아있어", s:"spicy"}, {t:"맛있는 거 먹어야 풀릴 듯", s:"heavy"}, {t:"더 길었으면 좋겠어", s:"reward"}, {t:"보통이야", s:"mild"}] },
        { text: "칼로리 신경 써?", options: [{t:"오프인데? 노 신경!", s:"heavy"}, {t:"조금은?", s:"light"}, {t:"식단 중이야 😭", s:"light"}, {t:"맛있으면 0칼로리", s:"fried"}, {t:"완전 관리!", s:"light"}] },
        { text: "지금 땡기는 식감은?", options: [{t:"바삭한 거", s:"fried"}, {t:"쫄깃한 고기", s:"meat"}, {t:"상큼한 거", s:"light"}, {t:"달콤한 거", s:"reward"}, {t:"뜨끈한 국물", s:"warm"}] },
        { text: "오늘의 오프 컨셉은?", options: [{t:"완벽한 보상!", s:"reward"}, {t:"내일을 위한 충전", s:"stable"}, {t:"그냥 아무것도 안 함", s:"mild"}, {t:"밀린 일 해결", s:"energy"}, {t:"사랑하는 사람과 함께", s:"reward"}] }
    ]
};

class MoodFoodApp {
    constructor() { this.history = []; this.currentPath = 'root'; this.stepIdx = -1; this.responses = []; this.selectedTags = []; this.init(); }
    init() { document.getElementById('btn-start-survey').onclick = () => this.startSurvey(); document.getElementById('btn-reset').onclick = () => this.resetApp(); document.getElementById('btn-prev').onclick = () => this.prevStep(); document.getElementById('btn-share-app').onclick = () => this.shareApp(); }
    startSurvey() { this.history = []; this.currentPath = 'root'; this.stepIdx = -1; this.responses = []; this.selectedTags = []; document.getElementById('start-screen').classList.add('hidden'); document.getElementById('survey-progress-container').classList.remove('hidden'); document.getElementById('survey-area').classList.remove('hidden'); this.nextStep(); }
    nextStep(tag) {
        if (tag !== undefined) { this.history.push({ path: this.currentPath, stepIdx: this.stepIdx, responses: [...this.responses], selectedTags: [...this.selectedTags] }); this.selectedTags.push(tag); }
        this.stepIdx++;
        let q;
        if (this.currentPath === 'root') q = BRANCHES.root;
        else if (this.currentPath === 'shift_after') q = BRANCHES.shift_after;
        else { const branch = BRANCHES[this.currentPath]; if (this.stepIdx < branch.length) q = branch[this.stepIdx]; else return this.showResult(); }
        this.renderQuestion(q);
    }
    prevStep() {
        if (this.history.length === 0) { this.resetApp(); return; }
        const last = this.history.pop(); this.currentPath = last.path; this.stepIdx = last.stepIdx; this.responses = last.responses; this.selectedTags = last.selectedTags;
        let q;
        if (this.currentPath === 'root') q = BRANCHES.root;
        else if (this.currentPath === 'shift_after') q = BRANCHES.shift_after;
        else q = BRANCHES[this.currentPath][this.stepIdx];
        this.renderQuestion(q);
    }
    renderQuestion(q) {
        document.getElementById('question-text').innerText = q.text;
        const aGrid = document.getElementById('answer-buttons'); aGrid.innerHTML = '';
        const currentCount = this.responses.length + 1;
        document.getElementById('progress-bar-fill').style.width = `${(currentCount / 10) * 100}%`;
        document.getElementById('progress-text').innerText = `컨디션 분석 중... (${Math.min(currentCount, 10)}/10)`;
        q.options.forEach(opt => {
            const btn = document.createElement('button'); btn.className = 'answer-btn'; btn.innerText = opt.t;
            btn.onclick = () => { this.responses.push(opt.t); if (opt.next) { this.currentPath = opt.next; this.stepIdx = -1; } this.nextStep(opt.s); };
            aGrid.appendChild(btn);
        });
    }
    async showResult() {
        document.getElementById('survey-area').classList.add('hidden'); document.getElementById('result-area').classList.remove('hidden');
        const scores = {}; this.selectedTags.forEach(t => scores[t] = (scores[t] || 0) + 1);
        const ranked = FOOD_DATABASE.map(f => { let match = 0; f.tags.forEach(t => { if (scores[t]) match += scores[t]; }); return { ...f, match: match + Math.random() * 0.5 }; }).sort((a, b) => b.match - a.match);
        const picks = ranked.slice(0, 3);
        const container = document.getElementById('results-container'); container.innerHTML = '';
        const summaryIdx = (this.selectedTags.length * 7) % SUMMARIES.length;
        document.getElementById('status-summary-box').innerText = SUMMARIES[summaryIdx];
        picks.forEach((food) => {
            const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(food.s + " 먹방")}`;
            const card = document.createElement('div'); card.className = 'food-card';
            card.innerHTML = `
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: ${this.responses[2] || "지친 하루"} 상황이라 ${food.r}</p>
                    <a href="${ytSearchUrl}" target="_blank" class="youtube-btn">🎥 유튜브에서 먹방 검색 결과 보기</a>
                    <div class="order-btn-group">
                        <a href="#" class="mini-order-btn mini-baemin" onclick="window.game.goOrder('baemin', '${food.s}', event)">배민 검색</a>
                        <a href="#" class="mini-order-btn mini-coupang" onclick="window.game.goOrder('coupang', '${food.s}', event)">쿠팡 검색</a>
                        <a href="#" class="mini-order-btn mini-kakao" onclick="window.game.sendToBF('${food.n}', event)">사줘!</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    goOrder(type, search, event) {
        if(event) event.stopPropagation();
        const url = type === 'baemin' 
            ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` 
            : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`;
        window.location.href = url;
    }
    sendToBF(foodName, event) {
        if(event) event.stopPropagation();
        const shareUrl = window.location.href;
        const bUrl = `https://www.baemin.com/search?keyword=${encodeURIComponent(foodName)}`;
        const cUrl = `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(foodName)}`;
        const msg = `자기야 나 오늘 근무 끝나고 너무 힘들었어... 😭 분석해보니까 오늘 [${foodName}] 먹어야 한대! 나 이거 사주면 기분 싹 풀릴 것 같아 💝\n\n결과 보기: ${shareUrl}\n\n🛵 배민 주문: ${bUrl}\n🚀 쿠팡이츠 주문: ${cUrl}`;
        if (navigator.share) navigator.share({ title: '괜찮아, 밥먹자 🏥💝', text: msg, url: shareUrl }).catch(e => console.log('Share failed', e));
        else alert("메시지와 주문 링크가 복사되었습니다! 남자친구에게 카톡으로 보내주세요:\n\n" + msg);
    }
    shareApp() {
        const msg = `오늘 하루 지친 당신을 위한 완벽한 위로, [괜찮아, 밥먹자 🏥💝]\n기분에 딱 맞는 음식을 추천받아봐!`;
        if (navigator.share) navigator.share({ title: '괜찮아, 밥먹자 🏥💝', text: msg, url: window.location.href });
        else alert("사이트 링크가 복사되었습니다! 친구들에게 공유해 보세요:\n" + window.location.href);
    }
    resetApp() { document.getElementById('result-area').classList.add('hidden'); document.getElementById('survey-progress-container').classList.add('hidden'); document.getElementById('start-screen').classList.remove('hidden'); window.scrollTo(0, 0); }
}
window.game = new MoodFoodApp();
