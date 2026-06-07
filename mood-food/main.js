// MoodFood Logic

const MOOD_MAP = {
    angry: {
        food: "엽기떡볶이 (매운맛)",
        emoji: "🔥",
        reason: "화가 날 땐 스트레스 확 풀리는 매운 음식이 최고죠! 빨간 맛으로 기분을 정화해 보세요.",
        search: "매운 떡볶이"
    },
    sad: {
        food: "달콤한 마카롱 & 케이크",
        emoji: "🍰",
        reason: "서운하고 울적할 땐 당 충전이 정답! 입안 가득 퍼지는 달콤함이 마음을 달래줄 거예요.",
        search: "디저트"
    },
    tired: {
        food: "든든한 삼계탕이나 전복죽",
        emoji: "🍲",
        reason: "몸도 마음도 지쳤을 땐 따뜻한 보양식으로 기력을 회복해 보세요. 그녀에게 힘이 될 거예요.",
        search: "보양식"
    },
    happy: {
        food: "분위기 있는 스테이크 & 와인",
        emoji: "🍷",
        reason: "행복한 날은 더 행복하게! 오늘 같은 날엔 근사한 요리로 축배를 들어보는 건 어떨까요?",
        search: "스테이크"
    },
    stress: {
        food: "바삭바삭한 치킨",
        emoji: "🍗",
        reason: "스트레스 폭발 직전엔 역시 씹는 맛! 바삭한 치킨 소리로 잡생각을 날려버리세요.",
        search: "치킨"
    },
    unknown: {
        food: "취향 저격 마라탕",
        emoji: "🍜",
        reason: "도무지 기분을 모를 땐 골라 담는 재미가 있는 마라탕! 원하는 재료로 기분을 맞춰보세요.",
        search: "마라탕"
    }
};

class MoodFoodApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const moodBtns = document.querySelectorAll('.mood-btn');
        moodBtns.forEach(btn => {
            btn.onclick = () => {
                const mood = btn.dataset.mood;
                this.showResult(mood);
            };
        });

        document.getElementById('btn-reset').onclick = () => {
            this.toggleStep('mood-selection');
        };
    }

    showResult(mood) {
        const config = MOOD_MAP[mood];
        const resultArea = document.getElementById('food-card');
        
        resultArea.innerHTML = `
            <span class="food-emoji">${config.emoji}</span>
            <span class="food-name">${config.food}</span>
            <p class="food-reason">${config.reason}</p>
        `;

        // Update Delivery Links
        const baeminLink = document.getElementById('link-baemin');
        const coupangLink = document.getElementById('link-coupang');
        
        // Dynamic search deep links (simulated via search params)
        baeminLink.href = `https://www.baemin.com/search?keyword=${encodeURIComponent(config.search)}`;
        coupangLink.href = `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(config.search)}`;

        this.toggleStep('result-area');
    }

    toggleStep(stepId) {
        document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
        document.getElementById(stepId).classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

new MoodFoodApp();
