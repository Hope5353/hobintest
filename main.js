// 가영아밥먹자 🏥💝 Nurse Edition Logic

const QUESTIONS = [
    { text: "가영아, 지금 근무 타이밍이 언제야?", options: [{t:"근무 들어가기 전이야", s:10}, {t:"이제 막 퇴근했어!", s:20}] },
    { text: "오늘(또는 내일) 가영이의 듀티는 뭐야?", options: [{t:"데이 (Day)", s:1}, {t:"이브닝 (Evening)", s:2}, {t:"나이트 (Night)", s:3}, {t:"오프 (Off/쉬는날)", s:4}] },
    { text: "업무 강도는 어땠어? (환자 상태 등)", options: [{t:"평화로운 스테이션", s:1}, {t:"정신없이 바빴어", s:2}, {t:"완전 헬파티... 탈탈 털림", s:3}, {t:"이벤트가 좀 있었어", s:4}] },
    { text: "지금 몸에서 어디가 제일 힘들어?", options: [{t:"다리가 부어서 무거워", s:1}, {t:"허리/어깨가 뻐근해", s:2}, {t:"눈이 침침하고 머리 아파", s:3}, {t:"전체적으로 그냥 기절각", s:4}, {t:"배고픈 게 제일 고통이야", s:5}] },
    { text: "마지막 식사는 언제였어?", options: [{t:"기억도 안 나 (거의 굶음)", s:1}, {t:"6시간 넘게 지났어", s:2}, {t:"중간에 간식 좀 주워먹었어", s:3}, {t:"병원 밥 대충 먹었어", s:4}] },
    { text: "지금 가영이의 입맛 상태는?", options: [{t:"입맛 없는데 살려고 먹음", s:1}, {t:"매콤한 게 미친듯이 땡겨", s:2}, {t:"달달한 걸로 위로받고 싶어", s:3}, {t:"기름진 걸로 속을 채울래", s:4}, {t:"시원하고 깔끔한 게 좋아", s:5}] },
    { text: "오늘 보호자나 의사 때문에 스트레스 받았어?", options: [{t:"아니, 괜찮았어", s:1}, {t:"조금? 짜증났어", s:2}, {t:"말도 마... 뒷목 잡음", s:3}, {t:"동료들이랑 수다로 풀었어", s:4}] },
    { text: "음식을 먹고 나서 바로 잘 거야?", options: [{t:"응, 바로 기절할 예정", s:1}, {t:"씻고 넷플릭스 좀 보다 잘래", s:2}, {t:"잠이 안 와서 좀 놀다 잘래", s:3}, {t:"이제 막 하루를 시작해야 해", s:4}] },
    { text: "가영아, 지금 속 상태는 어때?", options: [{t:"완전 텅 비어있어", s:1}, {t:"조금 더부룩해", s:2}, {t:"스트레스성 허기짐!", s:3}, {t:"뜨끈한 국물이 필요해", s:4}] },
    { text: "오늘 고생한 가영이에게 주는 보상 점수는?", options: [{t:"소소한 힐링이면 돼", s:1}, {t:"맛있는 거 먹고 행복해지기", s:2}, {t:"화려하게 한 상 차려먹기", s:3}, {t:"남자친구의 사랑과 야식!", s:4}] }
];

const FOOD_DATABASE = [
    { n: "엽기떡볶이", i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?auto=format&fit=crop&q=80&w=800", r: "나이트 퇴근 후 스트레스 폭발엔 역시 엽떡!", s: "엽기떡볶이" },
    { n: "삼겹살", i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", r: "데이 근무 후 기력 보충엔 지글지글 삼겹살.", s: "삼겹살" },
    { n: "전복죽/본죽", i: "https://images.unsplash.com/photo-1596797038580-2c4658d7c933?auto=format&fit=crop&q=80&w=800", r: "이브닝 퇴근 후 속 편하게 잠들고 싶을 때.", s: "본죽" },
    { n: "뿌링클 치킨", i: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800", r: "헬듀티 끝내고 맥주 한 잔과 찰떡궁합.", s: "BHC 뿌링클" },
    { n: "마라탕", i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?auto=format&fit=crop&q=80&w=800", r: "알싸한 매운맛으로 병원 냄새 싹 잊어버려!", s: "마라탕" },
    { n: "육회 비빔밥", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", r: "든든하지만 깔끔하게 먹고 싶은 가영이를 위해.", s: "육회비빔밥" },
    { n: "소고기 쌀국수", i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800", r: "밤샘 후 지친 속을 따뜻하게 데워주는 힐링푸드.", s: "쌀국수" },
    { n: "수제 버거", i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", r: "입안 가득 차는 행복! 고생한 나를 위한 선물.", s: "수제버거" },
    { n: "초밥 세트", i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", r: "깔끔하고 고급스럽게, 기분 전환이 필요할 때.", s: "초밥" },
    { n: "곱창 전골", i: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", r: "진한 국물에 소주 한 잔? 오늘 스트레스 다 날려.", s: "곱창전골" },
    { n: "샌드위치/서브웨이", i: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=800", r: "근무 전, 가볍고 건강하게 에너지를 채워봐.", s: "서브웨이" },
    { n: "망고 빙수", i: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800", r: "열 오르는 스테이션 일 뒤엔 시원한 당 충전!", s: "망고빙수" }
];

class NurseFoodApp {
    constructor() {
        this.currentStep = 0;
        this.totalScore = 0;
        this.responses = [];
        this.init();
    }

    init() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
    }

    startSurvey() {
        this.currentStep = 0;
        this.totalScore = 0;
        this.responses = [];
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        this.showQuestion();
    }

    showQuestion() {
        const q = QUESTIONS[this.currentStep];
        document.getElementById('progress-text').innerText = `가영이 듀티 분석 (${this.currentStep + 1}/10)`;
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
                this.responses.push(opt.t);
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

        const container = document.getElementById('results-container');
        container.innerHTML = '';

        // Pick 3 foods based on nursing scenarios
        const picks = [
            (this.totalScore * 7) % FOOD_DATABASE.length,
            (this.totalScore * 13) % FOOD_DATABASE.length,
            (this.totalScore * 3) % FOOD_DATABASE.length
        ];
        const uniquePicks = [...new Set(picks)].slice(0, 3);
        while(uniquePicks.length < 3) uniquePicks.push((uniquePicks.length + 2) % FOOD_DATABASE.length);

        uniquePicks.forEach(idx => {
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
        const url = type === 'baemin' 
            ? `baemin://search?keyword=${encodeURIComponent(search)}`
            : `coupangeats://search?q=${encodeURIComponent(search)}`;
        window.location.href = url;
        setTimeout(() => {
            const webUrl = type === 'baemin'
                ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}`
                : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`;
            if (window.confirm("앱이 설치되어 있나요? 아니면 웹으로 이동할까요?")) window.location.href = webUrl;
        }, 1500);
    }

    sendToBF(foodName) {
        const msg = `자기야 나 오늘 듀티 너무 힘들었어... 😭 분석해봤는데 오늘 나한테 필요한 음식은 [${foodName}]이래! 이거 사주면 안돼? 💝`;
        const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_KEY&message=${encodeURIComponent(msg)}`;
        // Fallback to generic message share
        if (navigator.share) {
            navigator.share({ title: '가영아밥먹자 🏥💝', text: msg, url: window.location.href });
        } else {
            alert("메시지가 복사되었습니다! 남자친구에게 보내주세요:\n\n" + msg);
        }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

window.game = new NurseFoodApp();
