const breeds = {
    dogs: [
        { name: "골든 리트리버", traits: { energy: 4, space: 4, independence: 2, sociability: 5 }, desc: "천사견이라 불리는 친화력 끝판왕! 활동적이고 사람을 매우 좋아해요." },
        { name: "보더 콜리", traits: { energy: 5, space: 5, independence: 3, sociability: 4 }, desc: "세상에서 가장 똑똑한 강아지! 엄청난 활동량과 지적 자극이 필요해요." },
        { name: "프렌치 불독", traits: { energy: 2, space: 2, independence: 3, sociability: 4 }, desc: "아파트에서 키우기 좋은 느긋한 성격. 장난기 넘치고 애교가 많아요." },
        { name: "시바견", traits: { energy: 4, space: 3, independence: 5, sociability: 2 }, desc: "독립심이 강하고 깔끔한 성격. 주인에게 충성스럽지만 가끔은 고집쟁이예요." },
        { name: "그레이하운드", traits: { energy: 2, space: 4, independence: 4, sociability: 3 }, desc: "달리기 선수지만 집에서는 세상 게으름뱅이! 의외로 조용하고 차분해요." },
        { name: "비숑 프리제", traits: { energy: 4, space: 2, independence: 2, sociability: 5 }, desc: "인형 같은 외모에 긍정적인 에너지 뿜뿜! 사교성이 정말 좋아요." },
        { name: "푸들", traits: { energy: 4, space: 2, independence: 3, sociability: 5 }, desc: "영리하고 털 빠짐이 적어 초보자에게 추천! 애교가 넘치는 스타일이에요." },
        { name: "진돗개", traits: { independence: 5, energy: 4, space: 4, sociability: 2 }, desc: "충성심의 상징! 영리하고 용맹하며 주인 한 사람만 바라보는 해바라기예요." },
        { name: "닥스훈트", traits: { energy: 3, space: 2, independence: 3, sociability: 4 }, desc: "용감하고 호기심 많은 짧은 다리의 매력쟁이! 고집이 조금 있을 수 있어요." },
        { name: "웰시 코기", traits: { energy: 4, space: 3, independence: 3, sociability: 4 }, desc: "치명적인 뒷태! 에너지가 넘치고 영리하며 사람들과 잘 어울려요." }
    ],
    cats: [
        { name: "렉돌", traits: { energy: 1, space: 2, independence: 2, sociability: 5 }, desc: "안으면 인형처럼 축 늘어지는 순둥이! 매우 조용하고 사람을 잘 따라요." },
        { name: "뱅갈", traits: { energy: 5, space: 4, independence: 3, sociability: 4 }, desc: "표범을 닮은 활동가! 호기심이 많고 에너지가 넘쳐서 같이 노는 걸 좋아해요." },
        { name: "러시안 블루", traits: { energy: 2, space: 2, independence: 4, sociability: 2 }, desc: "수줍음 많은 은빛 신사. 소음에 민감하고 주인에게만 애정을 보여줘요." },
        { name: "샴", traits: { energy: 4, space: 2, independence: 2, sociability: 5 }, desc: "고양이계의 수다쟁이! 관심받는 걸 좋아하고 주인과 소통하는 걸 즐겨요." },
        { name: "메인쿤", traits: { energy: 3, space: 5, independence: 3, sociability: 5 }, desc: "거대한 덩치에 반전 매력 '상냥한 거인'. 똑똑하고 물놀이도 즐긴답니다." },
        { name: "페르시안", traits: { energy: 1, space: 2, independence: 4, sociability: 3 }, desc: "우아하고 차분한 귀족냥. 활동적이기보다 조용히 쉬는 걸 선호해요." },
        { name: "아비시니안", traits: { energy: 5, space: 3, independence: 3, sociability: 4 }, desc: "늘 바쁘게 돌아다니는 탐험가! 영리하고 민첩하며 장난을 좋아해요." },
        { name: "스코티시 폴드", traits: { energy: 2, space: 2, independence: 3, sociability: 4 }, desc: "접힌 귀가 매력적인 평화주의자. 상냥하고 적응력이 매우 뛰어나요." },
        { name: "코리안 숏헤어", traits: { energy: 3, space: 3, independence: 4, sociability: 3 }, desc: "개성이 넘치는 우리 주변의 친구들! 건강하고 자립심이 강한 편이에요." },
        { name: "먼치킨", traits: { energy: 3, space: 2, independence: 3, sociability: 5 }, desc: "짧은 다리로 바쁘게 움직이는 귀요미! 사교적이고 애교가 정말 많아요." }
    ]
};

const questions = [
    { id: "energy", text: "휴일을 어떻게 보내고 싶나요?", options: [
        { text: "역동적인 야외 활동", value: 5 },
        { text: "가벼운 산책이나 외출", value: 3 },
        { text: "집에서 편안하게 휴식", value: 1 }
    ]},
    { id: "space", text: "현재 거주 환경은 어떤가요?", options: [
        { text: "넓은 마당이 있는 집", value: 5 },
        { text: "일반적인 빌라나 단독주택", value: 3 },
        { text: "원룸이나 아파트", value: 1 }
    ]},
    { id: "independence", text: "반려동물의 독립성에 대해 어떻게 생각하시나요?", options: [
        { text: "혼자서도 잘 지내는 게 좋아요", value: 5 },
        { text: "적당히 거리감을 두는 게 좋아요", value: 3 },
        { text: "늘 저와 함께 붙어 있으면 좋겠어요", value: 1 }
    ]},
    { id: "sociability", text: "반려동물이 사람들과 어떻게 어울리길 원하시나요?", options: [
        { text: "모두에게 친절한 인싸", value: 5 },
        { text: "가족에게만 충실한 성격", value: 3 },
        { text: "조용하고 수줍은 성격", value: 1 }
    ]}
];

let currentStep = 0;
let userScores = {};

function startQuiz() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentStep];
    const quizContainer = document.getElementById('quiz-container');
    const progress = ((currentStep) / questions.length) * 100;
    
    document.getElementById('progress').style.width = `${progress}%`;
    
    quizContainer.innerHTML = `
        <h2 class="question-text">${question.text}</h2>
        <div class="options-list">
            ${question.options.map((opt, index) => `
                <button class="option-btn" onclick="nextStep('${question.id}', ${opt.value})">${opt.text}</button>
            `).join('')}
        </div>
    `;
}

function nextStep(id, value) {
    userScores[id] = value;
    currentStep++;
    
    if (currentStep < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const bestDog = findBestMatch(breeds.dogs);
    const bestCat = findBestMatch(breeds.cats);
    
    document.getElementById('dog-result').innerHTML = `
        <h3>🐶 추천 강아지: ${bestDog.name}</h3>
        <p>${bestDog.desc}</p>
    `;
    
    document.getElementById('cat-result').innerHTML = `
        <h3>🐱 추천 고양이: ${bestCat.name}</h3>
        <p>${bestCat.desc}</p>
    `;
}

function findBestMatch(breedList) {
    return breedList.reduce((best, current) => {
        const currentScore = calculateDistance(userScores, current.traits);
        const bestScore = calculateDistance(userScores, best.traits);
        return currentScore < bestScore ? current : best;
    });
}

function calculateDistance(user, breedTraits) {
    let distance = 0;
    for (let key in user) {
        distance += Math.pow(user[key] - breedTraits[key], 2);
    }
    return Math.sqrt(distance);
}

function restartQuiz() {
    currentStep = 0;
    userScores = {};
    document.getElementById('results').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

function showInquiry() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('inquiry').style.display = 'block';
}

function goHome() {
    document.getElementById('inquiry').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}
