// 가영아밥먹자 Advanced Logic & 200-Food Database (Image Integrated)

const QUESTIONS = [
    { text: "가영아, 지금 배고픈 정도는 어느 정도야?", options: [{t:"조금 출출해", s:1}, {t:"보통이야", s:2}, {t:"배고파서 기운 없어", s:3}, {t:"지금 당장 먹어야 해!", s:4}] },
    { text: "오늘 하루 가영이의 기분은 어때?", options: [{t:"최고야! 행복해", s:1}, {t:"그냥 평범해", s:2}, {t:"조금 지루하거나 울적해", s:3}, {t:"완전 스트레스 받아!", s:4}] },
    { text: "지금 날씨나 온도 체감은 어때?", options: [{t:"조금 더워", s:1}, {t:"딱 좋아", s:2}, {t:"으슬으슬 추워", s:3}, {t:"비오거나 흐려", s:4}] },
    { text: "가영이가 지금 가장 땡기는 맛은?", options: [{t:"달콤한 맛", s:1}, {t:"매콤한 맛", s:2}, {t:"짭짤한 맛", s:3}, {t:"느끼하고 고소한 맛", s:4}] },
    { text: "오늘 가영이의 활동량은 어땠어?", options: [{t:"계속 앉아있었어", s:1}, {t:"보통이었어", s:2}, {t:"많이 돌아다녔어", s:3}, {t:"운동도 했어!", s:4}] },
    { text: "음식의 식감은 어떤 게 좋아?", options: [{t:"부드러운 것", s:1}, {t:"아삭아삭한 것", s:2}, {t:"쫄깃쫄깃한 것", s:3}, {t:"바삭바삭한 것", s:4}] },
    { text: "지금 생각나는 메뉴의 느낌은?", options: [{t:"간단한 분식/스낵", s:1}, {t:"든든한 밥/찌개", s:2}, {t:"특별한 고기/해산물", s:3}, {t:"화려한 파티 음식", s:4}] },
    { text: "가영아, 지금 소화 상태는 어때?", options: [{t:"완전 튼튼해", s:1}, {t:"보통이야", s:2}, {t:"조금 더부룩해", s:3}, {t:"가벼운 게 좋아", s:4}] },
    { text: "먹고 나서 가영이의 상태는 어땠으면 좋겠어?", options: [{t:"기운이 펄펄 났으면", s:1}, {t:"마음이 편안했으면", s:2}, {t:"입안이 즐거웠으면", s:3}, {t:"깔끔하고 가벼웠으면", s:4}] },
    { text: "마지막으로, 오늘 가영이 스스로에게 상을 준다면?", options: [{t:"가벼운 보상", s:1}, {t:"맛있는 위로", s:2}, {t:"화려한 칭찬", s:3}, {t:"최고급 선물", s:4}] }
];

const FOOD_DATABASE = [
    { n: "엽기떡볶이", r: "가영이가 받은 스트레스를 한 방에 날려버릴 매운맛의 끝판왕!", s: "엽기떡볶이 마라떡볶이" },
    { n: "뿌링클 치킨", r: "바삭한 치킨과 달콤 짭짤한 시즈닝의 조화! 가영이의 행복 치트키.", s: "BHC 뿌링클 치킨" },
    { n: "마라탕", r: "가영이가 좋아하는 재료만 골라 담아! 얼큰하고 알싸한 맛이 최고야.", s: "마라탕 꿔바로우" },
    { n: "연어 초밥", r: "부드럽고 신선한 연어가 입안에서 살살 녹아. 가영이의 기분도 녹아내릴걸?", s: "생연어 초밥 세트" },
    { n: "스테이크", r: "오늘 고생한 가영이를 위한 특별한 보상. 육즙 가득한 스테이크 한 입!", s: "안심 스테이크 미디엄" },
    { n: "파스타", r: "분위기 내고 싶은 날, 가영이의 감성을 충족시켜줄 부드러운 크림 파스타.", s: "까르보나라 크림 파스타" },
    { n: "삼겹살", r: "지치고 힘들 땐 역시 고기지! 지글지글 삼겹살에 쌈 싸 먹으면 기운이 펄펄.", s: "삼겹살 구이 배달" },
    { n: "햄버거", r: "든든하고 빠르게 당 충전! 가영이가 좋아하는 수제 버거 어때?", s: "수제치즈버거 세트" },
    { n: "돈카츠", r: "겉바속촉의 정석. 가영이의 입안 가득 바삭함과 고소함이 퍼질 거야.", s: "프리미엄 등심 돈카츠" },
    { n: "쌀국수", r: "따뜻하고 깔끔한 국물이 생각날 때. 가영이의 속을 편안하게 달래줄 거야.", s: "베트남 소고기 쌀국수" },
    { n: "샤브샤브", r: "건강하고 맛있게! 야채 듬뿍 고기 듬뿍 가영이의 영양 만점 한 끼.", s: "소고기 샤브샤브 세트" },
    { n: "닭발", r: "콜라겐 가득, 매콤함 가득! 야식으로 가영이가 제일 좋아하는 메뉴 중 하나지.", s: "무뼈 국물 닭발" },
    { n: "와플", r: "달콤한 상이 필요한 시간. 가영이의 미소를 되찾아줄 디저트 타임!", s: "벨기에 와플 아이스크림" },
    { n: "아구찜", r: "매콤하고 쫄깃한 식감. 든든하게 먹고 싶을 때 추천!", s: "매콤 아구찜" },
    { n: "평양냉면", r: "깔끔하고 슴슴한 맛의 매력. 오늘같이 조금 더운 날 가영이에게 딱이야.", s: "평양물냉면" },
    { n: "피자", r: "치즈 듬뿍! 가영이와 함께 나눠 먹으면 두 배로 맛있는 피자 파티.", s: "페퍼로니 치즈 피자" },
    { n: "짜장면 & 탕수육", r: "고민될 땐 역시 중식! 바삭한 탕수육은 가영이의 기분을 업시켜줘.", s: "짜장면 탕수육 세트" },
    { n: "육회", r: "신선하고 고소한 육회 한 점. 가영이의 입맛을 돋우는 최고의 별미.", s: "한우 육회 한 접시" },
    { n: "곱창전골", r: "뜨끈하고 진한 국물에 고소한 곱창. 가영이의 스트레스가 사르르 녹아.", s: "소곱창전골" },
    { n: "베이글", r: "가볍지만 든든한 브런치 감성. 가영이의 여유로운 오후를 위해.", s: "어니언 베이글 크림치즈" }
];

const SUB_FOODS = ["치즈 닭갈비", "간장게장", "보쌈 세트", "직화 족발", "로제 찜닭", "부대찌개", "김치찜", "포케 샐러드", "규동", "사케동", "텐동", "냉모밀", "마제소바", "라멘", "나시고랭", "팟타이", "푸팟퐁커리", "타코", "라자냐", "에그인헬", "감바스", "뇨끼", "리조또", "트러플 감자튀김", "에그타르트", "휘낭시에", "마들렌", "스콘", "까눌레", "크로플", "젤라또", "망고 빙수", "생딸기 케이크", "티라미수", "초코 수플레", "그릭 요거트", "베트남 반미", "분짜", "탄두리 치킨", "인도 커리", "샥슈카", "파에야", "미트볼 파스타", "봉골레", "라구 파스타", "뇨끼", "리코타 치즈 샐러드", "콥 샐러드", "잠봉뵈르", "잠실 수제버거", "고추 바사삭", "허니 콤보", "지코바 양념치킨", "가마로 강정", "신전 떡볶이", "청년다방 차돌떡볶이", "응급실 국물 떡볶이", "배떡 로제떡볶이", "직화 오돌뼈", "닭똥집 튀김", "염통 꼬치", "모듬 순대", "튀김 범벅", "물어묵", "매운 오뎅", "붕어빵", "씨앗 호떡", "군고구마", "군밤", "식혜", "수정과", "달고나", "소떡소떡", "멘보샤", "크림 새우", "유린기", "깐풍기", "양장피", "팔보채", "전가복", "딤섬", "샤오롱바오", "하가우", "고구마 맛탕", "츄러스", "소르베", "말차 빙수", "인절미 빙수", "멜론 빙수", "치즈 케이크", "까망베르 크림치즈", "앙버터", "바게트", "소금빵", "무지개 케이크", "도넛", "츄러스", "핫도그", "칠리독", "콘독", "어니언링", "해물 파전", "김치전", "육전", "편육", "제육 볶음", "오징어 소면", "낙지 볶음", "장어 덮밥", "스테이크 덮밥", "우츠동", "가츠동", "에비동", "카레 라이스", "하이 라이스", "오므라이스", "새우 볶음밥", "잡채밥", "마파두부 덮밥", "고추잡채", "물냉면", "비빔냉면", "회냉면", "콩국수", "비빔국수", "잔치국수", "수제비", "칼국수", "모듬 만두", "군만두", "물만두", "갈비탕", "곰탕", "설렁탕", "순대국", "내장탕", "뼈해장국", "감자탕", "추어탕", "육개장", "미역국", "소고기 무국", "북어국", "콩나물 국밥", "선지 국밥", "해장국", "닭개장", "삼계탕", "찜닭", "안동 찜닭", "치즈 찜닭", "간장 치킨", "양념 치킨", "마늘 치킨", "파닭", "뿌링클", "지코바", "굽네", "네네", "처갓집", "또봉이", "시장 통닭", "치킨 강정", "닭갈비", "오리 주물럭", "오리 로스", "훈제 오리", "불고기", "뚝배기 불고기", "갈비찜", "매운 갈비찜", "돼지 갈비", "소갈비", "등갈비", "폭립", "돈까스", "치즈 돈까스", "고구마 돈까스", "카레 돈까스", "냉동 삼겹살", "냉면 삼겹살", "대패 삼겹살", "차돌박이", "우삼겹", "양깃머리", "대창", "막창", "곱창", "염통", "특양", "곱창 전골", "대창 덮밥", "연어장 덮밥", "간장 새우장", "양념 게장", "꼬막 비빔밥", "멍게 비빔밥", "회덮밥", "물회", "조개구이", "굴찜", "과메기", "방어회", "광어회", "우럭회", "도미회", "참치회", "육사시미", "육회 탕탕이", "산낙지", "낙곱새", "쭈꾸미 볶음", "꼼장어", "장어 구이"];

class MoodFoodApp {
    constructor() {
        this.currentStep = 0;
        this.totalScore = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
    }

    startSurvey() {
        this.currentStep = 0;
        this.totalScore = 0;
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        document.getElementById('header-subtitle').innerText = "가영이의 마음을 읽는 중...";
        this.showQuestion();
    }

    showQuestion() {
        const q = QUESTIONS[this.currentStep];
        const qText = document.getElementById('question-text');
        const aGrid = document.getElementById('answer-buttons');
        const pText = document.getElementById('progress-text');
        const pFill = document.getElementById('progress-bar-fill');

        pText.innerText = `질문 ${this.currentStep + 1} / 10`;
        pFill.style.width = `${((this.currentStep + 1) / 10) * 100}%`;
        qText.innerText = q.text;
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
        if (this.currentStep < 10) {
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    async showResult() {
        document.getElementById('survey-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('result-area').classList.remove('hidden');
        document.getElementById('header-subtitle').innerText = "분석 완료! 가영아 이거 어때?";

        let finalIndex = (this.totalScore * 7) % (FOOD_DATABASE.length + SUB_FOODS.length);
        let food;
        if (finalIndex < FOOD_DATABASE.length) {
            food = FOOD_DATABASE[finalIndex];
        } else {
            const subName = SUB_FOODS[finalIndex % SUB_FOODS.length];
            food = { n: subName, r: `오늘 가영이의 세밀한 기분 분석 결과, 가장 필요한 메뉴는 ${subName}이야!`, s: subName };
        }

        document.getElementById('res-name').innerText = food.n;
        document.getElementById('res-reason').innerText = food.r;

        // Fetch Real Image
        this.fetchFoodImage(food.s);

        // Update Delivery Links
        const baeminLink = document.getElementById('link-baemin');
        const coupangLink = document.getElementById('link-coupang');

        baeminLink.href = `baemin://search?keyword=${encodeURIComponent(food.s)}`;
        coupangLink.href = `coupangeats://search?q=${encodeURIComponent(food.s)}`;

        // Web Fallback if deep links fail
        baeminLink.onclick = (e) => {
            if (!window.confirm("배달의민족 앱으로 이동할까요?")) {
                e.preventDefault();
                window.location.href = `https://www.baemin.com/search?keyword=${encodeURIComponent(food.s)}`;
            }
        };
        coupangLink.onclick = (e) => {
            if (!window.confirm("쿠팡이츠 앱으로 이동할까요?")) {
                e.preventDefault();
                window.location.href = `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(food.s)}`;
            }
        };
    }

    async fetchFoodImage(foodName) {
        const img = document.getElementById('res-img');
        const loader = document.getElementById('img-loader');
        img.style.display = 'none';
        loader.style.display = 'block';

        try {
            // Using a search-based image proxy or reliable free API for demo purposes
            // In a real high-end app, we'd use Google Custom Search API or Unsplash
            // Here we use a reliable image fetch strategy
            const targetUrl = `https://www.google.com/search?q=${encodeURIComponent(foodName + " 맛있는 음식 사진")}&tbm=isch`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const response = await fetch(proxyUrl);
            const outerData = await response.json();
            
            // Extract the first high-res looking image from search results
            const html = outerData.contents;
            const imgRegex = /img data-src="([^"]+)"/g;
            const matches = [...html.matchAll(imgRegex)];
            
            if (matches && matches.length > 2) {
                img.src = matches[2][1]; // Get the 3rd image usually is cleaner
            } else {
                img.src = `https://source.unsplash.com/800x600/?food,${encodeURIComponent(foodName)}`;
            }

            img.onload = () => {
                loader.style.display = 'none';
                img.style.display = 'block';
            };
        } catch (e) {
            img.src = `https://source.unsplash.com/800x600/?gourmet,${encodeURIComponent(foodName)}`;
            img.onload = () => {
                loader.style.display = 'none';
                img.style.display = 'block';
            };
        }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('header-subtitle').innerText = "가영이의 기분에 딱 맞는 메뉴를 골라줄게";
    }
}

new MoodFoodApp();
