// MoodFood Logic

const MOOD_MAP = {
    angry: {
        food: "엽기떡볶이 (매운맛)",
        emoji: "🔥",
        reason: "가영이가 화가 났을 땐 스트레스 확 풀리는 매운 음식이 최고! 빨간 맛으로 기분 전환해 보자.",
        search: "매운 떡볶이"
    },
    sad: {
        food: "달콤한 마카롱 & 케이크",
        emoji: "🍰",
        reason: "울적한 가영이에게는 당 충전이 정답! 달콤함이 가영이의 마음을 토닥여줄 거야.",
        search: "디저트"
    },
    tired: {
        food: "든든한 삼계탕이나 전복죽",
        emoji: "🍲",
        reason: "지친 가영이를 위해 따뜻한 보양식을 준비해 보자. 한 그릇 비우고 기운 차렸으면 좋겠어.",
        search: "보양식"
    },
    happy: {
        food: "분위기 있는 스테이크 & 와인",
        emoji: "🍷",
        reason: "행복한 가영이와는 더 행복하게! 오늘 같은 날엔 근사한 요리로 즐거운 시간을 보내자.",
        search: "스테이크"
    },
    stress: {
        food: "바삭바삭한 치킨",
        emoji: "🍗",
        reason: "스트레스 많은 가영이를 위해 바삭한 치킨 소리로 잡생각을 다 날려버리게 해주자.",
        search: "치킨"
    },
    unknown: {
        food: "취향 저격 마라탕",
        emoji: "🍜",
        reason: "기분이 알쏭달달한 가영이에게는 골라 담는 재미가 있는 마라탕이 딱이지!",
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
