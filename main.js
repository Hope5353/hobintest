// 가영아밥먹자 High-Precision Logic & Real Food Image Database

const QUESTIONS = [
    { text: "가영아, 지금 배고픈 정도가 어느 정도야?", options: [{t:"아직은 괜찮아", s:1}, {t:"약간 출출한 정도?", s:2}, {t:"기분 좋게 배고파", s:3}, {t:"슬슬 예민해지려 해", s:4}, {t:"지금 당장 안 먹으면 큰일 나!", s:5}] },
    { text: "오늘 가영이의 기분 점수를 매긴다면?", options: [{t:"완전 최고! 날아갈 것 같아", s:1}, {t:"오늘 좀 예쁘네? 기분 좋아", s:2}, {t:"그냥 평범한 하루였어", s:3}, {t:"누가 건드리면 폭발할 것 같아", s:4}, {t:"세상이 무너진 듯 울적해", s:5}] },
    { text: "지금 가영이의 몸 상태는 어때?", options: [{t:"완전 쌩쌩해! 에너지 뿜뿜", s:1}, {t:"나쁘지 않아, 보통이야", s:2}, {t:"온몸이 찌릿찌릿 피곤해", s:3}, {t:"으슬으슬 춥고 기운 없어", s:4}, {t:"배가 꾸룩꾸룩, 속이 예민해", s:5}] },
    { text: "지금 가장 강렬하게 끌리는 맛은?", options: [{t:"눈물 쏙 빠지는 매운맛", s:1}, {t:"입안이 얼얼한 마라맛", s:2}, {t:"달콤함이 폭발하는 단맛", s:3}, {t:"고소하고 기름진 느끼한 맛", s:4}, {t:"깔끔하고 담백한 건강한 맛", s:5}] },
    { text: "오늘 가영이가 받은 스트레스 정도는?", options: [{t:"스트레스가 뭐야? 행복해", s:1}, {t:"약간 신경 쓰이는 정도?", s:2}, {t:"평소만큼은 받았어", s:3}, {t:"뒷목이 당길 정도로 심해", s:4}, {t:"멘탈이 탈탈 털렸어...", s:5}] },
    { text: "어떤 식감의 음식을 씹고 싶어?", options: [{t:"아삭아삭 신선한 식감", s:1}, {t:"바삭바삭 소리 나는 식감", s:2}, {t:"쫄깃쫄깃 찰진 식감", s:3}, {t:"입에서 살살 녹는 부드러움", s:4}, {t:"뜨끈한 국물에 말아먹는 느낌", s:5}] },
    { text: "지금 가영이의 식탐(욕심) 지수는?", options: [{t:"간단하게 요기만 할래", s:1}, {t:"가벼운 다이어트 식단?", s:2}, {t:"맛있는 거 적당히!", s:3}, {t:"이것저것 다 펼쳐놓고 싶어", s:4}, {t:"배 터질 때까지 먹을 거야", s:5}] },
    { text: "음식의 온도는 어떤 게 좋아?", options: [{t:"머리가 띵할 정도로 차가운 것", s:1}, {t:"시원하고 상큼한 것", s:2}, {t:"적당히 미지근한 것", s:3}, {t:"따뜻하고 포근한 것", s:4}, {t:"입 천장 데일 듯 뜨거운 것", s:5}] },
    { text: "지금 가영이의 소화 능력은?", options: [{t:"돌도 씹어 먹을 수 있어", s:1}, {t:"완전 튼튼, 문제없어", s:2}, {t:"평소랑 비슷해", s:3}, {t:"조금 더부룩한 느낌이야", s:4}, {t:"아주 가벼운 것만 가능해", s:5}] },
    { text: "마지막으로, 오늘 가영이에게 해주고 싶은 보상은?", options: [{t:"나를 위한 작은 사치", s:1}, {t:"죄책감 없는 건강한 한 끼", s:2}, {t:"고생한 나를 위한 폭식", s:3}, {t:"기분 전환을 위한 특별식", s:4}, {t:"따뜻한 위로가 되는 집밥 느낌", s:5}] }
];

const FOOD_DATABASE = [
    { 
        n: "엽기떡볶이", 
        i: "https://images.unsplash.com/photo-1621310158204-62967f8a7e08?auto=format&fit=crop&q=80&w=1000", 
        r: "가영이의 스트레스를 한 방에 날려버릴 매운맛의 끝판왕!", 
        s: "엽기떡볶이" 
    },
    { 
        n: "뿌링클 치킨", 
        i: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=1000", 
        r: "가영이가 제일 행복해지는 마법의 가루 뿌링클!", 
        s: "BHC 뿌링클" 
    },
    { 
        n: "마라탕", 
        i: "https://images.unsplash.com/photo-1624514336021-397cc93e9619?auto=format&fit=crop&q=80&w=1000", 
        r: "가영이 취향대로 듬뿍 담은 얼큰하고 알싸한 마라탕!", 
        s: "마라탕" 
    },
    { 
        n: "연어 초밥 세트", 
        i: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000", 
        r: "입안에서 사르르, 가영이의 마음도 사르르 녹여줄 신선한 연어.", 
        s: "연어초밥" 
    },
    { 
        n: "한우 스테이크", 
        i: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=1000", 
        r: "오늘 고생한 가영이를 위한 특별하고 고급스러운 보상.", 
        s: "스테이크" 
    },
    { 
        n: "베이컨 크림 파스타", 
        i: "https://images.unsplash.com/photo-1612459284970-e8f027596582?auto=format&fit=crop&q=80&w=1000", 
        r: "부드럽고 고소하게 가영이의 감성을 충전해줄 파스타 한 그릇.", 
        s: "까르보나라" 
    },
    { 
        n: "삼겹살 구이", 
        i: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=1000", 
        r: "체력 보충이 필요한 가영이를 위한 지글지글 고기 타임.", 
        s: "삼겹살" 
    },
    { 
        n: "수제 치즈버거 세트", 
        i: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000", 
        r: "두툼한 패티와 치즈로 가영이의 기분을 완벽하게 업!", 
        s: "수제버거" 
    },
    { 
        n: "바삭한 등심 돈카츠", 
        i: "https://images.unsplash.com/photo-1591814468924-cafb5d123211?auto=format&fit=crop&q=80&w=1000", 
        r: "겉바속촉의 정석, 가영이의 입맛을 다시 깨워줄 거야.", 
        s: "돈까스" 
    },
    { 
        n: "따뜻한 소고기 쌀국수", 
        i: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=1000", 
        r: "속을 편안하고 따뜻하게 달래줄 가영이의 힐링 푸드.", 
        s: "쌀국수" 
    },
    {
        n: "망고 빙수",
        i: "https://images.line.me/7b7e6f8b-f45e-4b4e-9b7e-6f8b-f45e-4b4e/ mango_bing.jpg",
        r: "달콤하고 시원한 보상이 필요할 때, 가영이의 미소를 되찾아줄 거야.",
        s: "신라호텔 망고빙수"
    }
];

// Fallback search keywords for 200 items logic
const SUB_FOODS = ["샌드위치", "포케", "라멘", "텐동", "찜닭", "갈비찜", "족발", "보쌈", "회덮밥", "라자냐", "타코", "나초", "팟타이", "나시고랭", "꿔바로우", "양꼬치", "부대찌개", "김치찜", "간장게장", "보리밥", "비빔밥", "수제비", "칼국수", "만두", "빙수", "도넛", "크로플", "에그타르트", "그릭요거트", "떡갈비", "불고기", "제육볶음", "오징어볶음", "낙지볶음", "장어덮밥", "카레", "하이라이스", "오므라이스", "리조또", "감바스", "에그인헬", "감자탕", "순대국", "뼈해장국", "해물파전", "김치전", "수육", "육전", "편육", "닭강정", "시장통닭", "순살치킨", "지코바", "굽네치킨", "교촌치킨", "노랑통닭", "푸라닭", "신전떡볶이", "청년다방", "배떡", "응급실떡볶이", "국물닭발", "오돌뼈", "닭똥집", "똥집튀김", "돼지게티", "곱창", "대창", "막창", "특수부위", "갈매기살", "항정살", "등갈비", "쪽갈비", "토마호크", "양갈비", "징기스칸", "스키야키", "밀푀유나베", "우츠동", "냉모밀", "소바", "우동", "가츠동", "에비동", "규동", "사케동", "마제소바", "아부라소바", "멘보샤", "크림새우", "칠리새우", "유린기", "깐풍기", "팔보채", "양장피", "고추잡채", "마파두부", "짬뽕", "백짬뽕", "굴짬뽕", "간짜장", "쟁반짜장", "볶음밥", "잡채밥", "마라샹궈", "꿔바로우", "딤섬", "샤오롱바오", "하가우", "고로케", "고구마맛탕", "맛사탕", "탕후루", "젤라또", "소르베", "망고빙수", "멜론빙수", "딸기빙수", "인절미빙수", "허니브레드", "치즈케이크", "티라미수", "초코무스", "몽블랑", "마카롱", "다쿠아즈", "까눌레", "휘낭시에", "마들렌", "스콘", "에그샌드위치", "잠봉뵈르", "반미", "분짜", "짜조", "똠양꿍", "푸팟퐁커리", "그린커리", "레드커리", "팟씨유", "카오팟", "반새오", "월남쌈", "분보후에", "짜조", "인도카레", "난", "탄두리치킨", "라씨", "케밥", "팔라펠", "후무스", "샥슈카", "파에야", "추러스", "감바스알아히요", "미트볼", "뇨끼", "부르스케타", "카프레제", "시저샐러드", "콥샐러드", "리코타치즈샐러드", "연어샐러드", "스테이크샐러드", "쉬림프샐러드", "머쉬룸샐러드", "치킨텐더샐러드", "단호박샐러드", "감자샐러드", "콘샐러드", "코울슬로", "핫도그", "칠리독", "치즈독", "콘독", "어니언링", "감자튀김", "치즈볼", "떡꼬치", "소떡소떡", "닭꼬치", "염통꼬치", "순대", "튀김범벅", "물어묵", "빨간어묵", "매운오뎅", "붕어빵", "호떡", "군고구마", "군밤", "식혜", "수정과", "달고나"];

class MoodFoodApp {
    constructor() {
        this.currentStep = 0;
        this.totalScore = 0;
        this.init();
    }

    init() {
        document.getElementById('btn-start-survey').onclick = () => this.startSurvey();
        document.getElementById('btn-reset').onclick = () => this.resetApp();
    }

    startSurvey() {
        this.currentStep = 0;
        this.totalScore = 0;
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.remove('hidden');
        document.getElementById('survey-area').classList.remove('hidden');
        this.showQuestion();
    }

    showQuestion() {
        const q = QUESTIONS[this.currentStep];
        document.getElementById('progress-text').innerText = `질문 ${this.currentStep + 1} / 10`;
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

    async showResult() {
        document.getElementById('survey-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('result-area').classList.remove('hidden');

        let finalIndex = (this.totalScore * 7) % (FOOD_DATABASE.length + SUB_FOODS.length);
        let food;
        if (finalIndex < FOOD_DATABASE.length) {
            food = FOOD_DATABASE[finalIndex];
        } else {
            const subName = SUB_FOODS[finalIndex % SUB_FOODS.length];
            food = { 
                n: subName, 
                r: `가영아, 정밀 분석 결과 오늘은 ${subName}이 가영이의 기분을 최고로 만들어 줄 거야!`, 
                s: subName,
                i: `https://loremflickr.com/800/600/${encodeURIComponent(subName)},food` // Robust real photo fallback
            };
        }

        document.getElementById('res-name').innerText = food.n;
        document.getElementById('res-reason').innerText = food.r;
        
        const img = document.getElementById('res-img');
        const loader = document.getElementById('img-loader');
        img.style.display = 'none';
        loader.style.display = 'block';

        img.src = food.i;
        img.onload = () => {
            loader.style.display = 'none';
            img.style.display = 'block';
        };

        const bLink = document.getElementById('link-baemin');
        const cLink = document.getElementById('link-coupang');
        bLink.href = `baemin://search?keyword=${encodeURIComponent(food.s)}`;
        cLink.href = `coupangeats://search?q=${encodeURIComponent(food.s)}`;
        
        bLink.onclick = (e) => { 
            if(!window.confirm("배달의민족 앱을 열어볼까?")) { 
                e.preventDefault(); 
                window.location.href = `https://www.baemin.com/search?keyword=${encodeURIComponent(food.s)}`; 
            } 
        };
        cLink.onclick = (e) => { 
            if(!window.confirm("쿠팡이츠 앱을 열어볼까?")) { 
                e.preventDefault(); 
                window.location.href = `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(food.s)}`; 
            } 
        };
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('res-img').style.display = 'none';
        document.getElementById('img-loader').style.display = 'block';
    }
}

new MoodFoodApp();
