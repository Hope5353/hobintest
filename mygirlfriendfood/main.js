// 괜찮아, 밥먹자 🏥💝 Master Nurse-Only Edition (Full 10-Step Survey)

const FOOD_DATABASE = [
    { n: "엽기떡볶이", r: "빌런 보호자 때문에 오른 혈압을 매운맛으로 복수!", s: "엽기떡볶이", tags: ["stress", "spicy"] },
    { n: "삼겹살 & 소주", r: "스테이션에서 탈탈 털린 체력, 고기로 기름칠!", s: "삼겹살", tags: ["exhausted", "meat"] },
    { n: "전복죽", r: "밤샘 후 지친 위장을 달래주는 따뜻한 위로.", s: "전복죽", tags: ["tired", "mild"] },
    { n: "뿌링클 치킨", r: "수쌤한테 안 깨지고 무사 인계한 나를 위한 상.", s: "BHC 뿌링클", tags: ["reward", "fried"] },
    { n: "마라탕 & 꿔바로우", r: "얼얼한 마라맛으로 병원 냄새 싹 잊어버려!", s: "마라탕", tags: ["stress", "spicy"] },
    { n: "모듬 초밥", r: "고생한 나를 위한 깔끔하고 고급스러운 보상.", s: "초밥", tags: ["stable", "light"] },
    { n: "소고기 쌀국수", r: "퇴근 후 으슬으슬한 몸을 데워주는 뜨끈한 국물.", s: "쌀국수", tags: ["exhausted", "warm"] },
    { n: "수제 치즈버거", r: "든든하게 입안 가득 채우는 육즙의 행복.", s: "수제버거", tags: ["hungry", "heavy"] },
    { n: "바삭 등심 돈카츠", r: "겉바속촉, 우울함을 날리는 바삭한 소리.", s: "돈까스", tags: ["stable", "crispy"] },
    { n: "곱창 전골", r: "스트레스 폭발한 날, 칼칼한 국물에 소주 한 잔.", s: "곱창전골", tags: ["stress", "heavy"] },
    { n: "망고 빙수", r: "열 오르는 기분을 시원하게 식혀주는 당 충전.", s: "망고빙수", tags: ["angry", "cold"] },
    { n: "직화 보쌈", r: "담백한 고기로 내일 근무 에너지를 미리 충전!", s: "보쌈", tags: ["meat", "heavy"] }
];

const EXTRA_NAMES = ["김치찜", "냉모밀", "마제소바", "텐동", "나시고랭", "팟타이", "푸팟퐁커리", "타코", "라자냐", "에그인헬", "감바스", "뇨끼", "리조또", "휘낭시에", "크로플", "젤라또", "티라미수", "그릭요거트", "반미", "분짜", "탄두리치킨", "인도커리", "샥슈카", "파에야", "봉골레", "라구파스타", "잠봉뵈르", "지코바", "허니콤보", "고추바사삭", "가마로강정", "신전떡볶이", "청년다방", "응급실떡볶이", "배떡", "직화오돌뼈", "닭발", "염통꼬치", "순대", "튀김범벅", "물어묵", "매운오뎅", "붕어빵", "호떡", "소떡소떡", "멘보샤", "크림새우", "유린기", "깐풍기", "양장피", "마파두부", "짬뽕", "볶음밥", "딤섬", "고구마맛탕", "츄러스", "소르베", "말차빙수", "앙버터", "바게트", "소금빵", "도넛", "핫도그", "칠리독", "콘독", "어니언링", "해물파전", "김치전", "육전", "편육", "제육볶음", "오징어소면", "낙지볶음", "장어덮밥", "스테이크덮밥", "우츠동", "가츠동", "에비동", "카레라이스", "오므라이스", "새우볶음밥", "잡채밥", "비빔냉면", "회냉면", "콩국수", "비빔국수", "잔치국수", "수제비", "칼국수", "모듬만두", "갈비탕", "곰탕", "설렁탕", "순대국", "내장탕", "뼈해장국", "감자탕", "추어탕", "육개장", "미역국", "소고기무국", "콩나물국밥", "선지국밥", "해장국", "닭개장", "삼계탕", "찜닭", "안동찜닭", "간장치킨", "양념치킨", "마늘치킨", "또봉이", "시장통닭", "오리주물럭", "훈제오리", "불고기", "갈비찜", "돼지갈비", "소갈비", "등갈비", "폭립", "치즈돈까스", "고구마돈까스", "차돌박이", "우삼겹", "대창", "막창", "곱창", "특양", "대창덮밥", "연어장덮밥", "간장새우장", "양념게장", "꼬막비빔밥", "물회", "조개구이", "방어회", "광어회", "우럭회", "도미회", "참치회", "육사시미", "산낙지", "낙곱새", "쭈꾸미볶음", "꼼장어", "장어구이"];
EXTRA_NAMES.forEach(name => {
    FOOD_DATABASE.push({ n: name, r: `오늘 당신의 컨디션에 딱 맞는 ${name}! 기분을 전환해 줄 거예요.`, s: name, tags: ["mild", "hungry"] });
});

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
    root: {
        text: "고생했어! 지금 어떤 상황이야?",
        options: [
            { t: "방금 퇴근했어! (탈탈 털림)", next: "shift_after", s: "after" },
            { t: "이제 곧 출근해야 해 (긴장)", next: "before_work", s: "before" },
            { t: "행복한 오프(Off) 중!", next: "off_day", s: "off" }
        ]
    },
    shift_after: {
        text: "방금 끝난 근무가 뭐야?",
        options: [
            { t: "데이 (Day)", next: "after_day", s: "day" },
            { t: "이브닝 (Evening)", next: "after_eve", s: "evening" },
            { t: "나이트 (Night)", next: "after_night", s: "night" }
        ]
    },
    // AFTER DAY SHIFT (10 Steps)
    after_day: [
        { text: "데이 근무 어땠어? 스테이션 평화로웠어?", options: [{t:"완전 스테이블(Stable)!", s:"stable"}, {t:"조금 바빴어", s:"mild"}, {t:"신규 사고 쳐서 멘탈 나감", s:"stress"}, {t:"완전 헬파티였어", s:"exhausted"}, {t:"이벤트 터져서 인계 늦어짐", s:"angry"}] },
        { text: "오늘 다리 상태는 어때?", options: [{t:"퉁퉁 부어서 터질 것 같아", s:"exhausted"}, {t:"뻐근하지만 걸을만해", s:"mild"}, {t:"앉아있고 싶어 죽겠어", s:"tired"}, {t:"종아리 마사지기 시급함", s:"light"}, {t:"아직은 쌩쌩해!", s:"energy"}] },
        { text: "오늘 보호자/환자 빌런 있었어?", options: [{t:"진짜 뒷목 잡을 뻔함", s:"angry"}, {t:"한두 명 짜증나게 하더라", s:"stress"}, {t:"다행히 오늘은 천사들뿐!", s:"stable"}, {t:"의사 오더 안 나와서 피 말림", s:"stress"}, {t:"말 안 들어서 인내심 한계", s:"spicy"}] },
        { text: "점심은 제대로 챙겨 먹었어?", options: [{t:"아예 굶었어(10시간 공복)", s:"hungry"}, {t:"입에 쑤셔 넣듯 5분 컷", s:"heavy"}, {t:"간식으로 대충 때웠어", s:"light"}, {t:"그래도 밥 먹을 시간은 있었어", s:"mild"}, {t:"지금 식욕이 아예 없어", s:"mild"}] },
        { text: "인계할 때 선배나 동료 눈치 보였어?", options: [{t:"태움 급 압박에 털림", s:"stress"}, {t:"버벅거려서 자책 중", s:"reward"}, {t:"깔끔 칼퇴 성공!", s:"stable"}, {t:"동료랑 수다 떨며 나옴", s:"reward"}, {t:"다음 듀티한테 미안함", s:"light"}] },
        { text: "지금 입안에서 가장 당기는 느낌은?", options: [{t:"미친듯이 맵고 짠 거!", s:"spicy"}, {t:"달달해서 당 충전되는 거", s:"reward"}, {t:"기름지고 고소한 거", s:"fried"}, {t:"뜨끈하고 시원한 국물", s:"warm"}, {t:"상큼하고 담백한 거", s:"light"}] },
        { text: "집에 가서 바로 잘 거야?", options: [{t:"씻고 바로 기절 예정", s:"mild"}, {t:"넷플릭스 보며 스트레스 풀래", s:"heavy"}, {t:"맥주 한 잔 하며 수다 떨래", s:"fried"}, {t:"잠이 안 와서 좀 놀아야지", s:"heavy"}, {t:"내일도 데이라 바로 자야 함", s:"light"}] },
        { text: "오늘 가장 짜증 났던 포인트는?", options: [{t:"이해 안 가는 의사 오더", s:"stress"}, {t:"억지 부리는 보호자", s:"angry"}, {t:"답답한 신규 뒷수습", s:"stress"}, {t:"끝나지 않는 잡일들", s:"exhausted"}, {t:"내 실수 아닐까 하는 걱정", s:"mild"}] },
        { text: "내일도 똑같이 출근해?", options: [{t:"응... 또 연근이야", s:"meat"}, {t:"내일은 드디어 오프!", s:"reward"}, {t:"듀티가 바뀌어(이브/나이트)", s:"energy"}, {t:"아직 스케줄 몰라", s:"mild"}, {t:"내일도 데이, 지옥 반복", s:"exhausted"}] },
        { text: "고생한 나에게 해주고 싶은 말?", options: [{t:"환자 살리느라 수고했어", s:"reward"}, {t:"버틴 게 대견해", s:"stable"}, {t:"나만 믿어, 다 시켜줄게!", s:"meat"}, {t:"내일은 스테이블하길!", s:"stable"}, {t:"다 잊고 먹자!", s:"heavy"}] }
    ],
    // AFTER EVENING SHIFT (10 Steps)
    after_eve: [
        { text: "이브닝 끝! 퇴근길 밤 공기 어때?", options: [{t:"해방감 최고! 행복해", s:"stable"}, {t:"너무 졸려서 몽롱해", s:"tired"}, {t:"오늘 일 생각에 복잡해", s:"mild"}, {t:"그냥 빨리 집 가고 싶어", s:"heavy"}, {t:"밤 공기가 차갑게 느껴져", s:"warm"}] },
        { text: "오늘 저녁은 병원에서 먹었어?", options: [{t:"바빠서 구경도 못 함", s: "hungry"}, {t:"대충 비빔밥 비벼 먹음", s:"mild"}, {t:"중간에 간식만 주워 먹음", s:"light"}, {t:"지금 손 떨릴 정도로 배고파", s:"heavy"}, {t:"피곤해서 배 안 고파", s:"mild"}] },
        { text: "오늘 스테이션 분위기 어땠어?", options: [{t:"선배들 기분 안 좋아서 피 말림", s:"stress"}, {t:"이벤트 터져서 인계 전쟁", s:"exhausted"}, {t:"의외로 스테이블해서 좋았어", s:"stable"}, {t:"신규 가르치느라 기 빨림", s: "stress"}, {t:"나 혼자 다 한 느낌이야", s:"angry"}] },
        { text: "지금 몸에서 제일 신호 오는 곳?", options: [{t:"허리랑 어깨가 끊어질 듯", s:"meat"}, {t:"다리가 부어서 신발 안 들어감", s:"exhausted"}, {t:"눈이 침침하고 머리 지끈", s:"warm"}, {t:"목소리가 안 나올 정도로 힘듦", s:"warm"}, {t:"속 쓰리고 위 아파", s:"mild"}] },
        { text: "오늘 보호자 억까 당했어?", options: [{t:"응, 진짜 뒷목 잡음", s:"angry"}, {t:"말도 안 되는 요구에 지침", s:"stress"}, {t:"다행히 오늘은 무난했어", s:"stable"}, {t:"환자랑 싸울 뻔함", s:"spicy"}, {t:"상냥한 분들 덕에 힐링됨", s:"stable"}] },
        { text: "지금 가장 생각나는 맛은?", options: [{t:"자극 폭발! 매운맛", s:"spicy"}, {t:"입안에 녹는 달콤함", s:"reward"}, {t:"바삭하고 고소한 튀김", s:"fried"}, {t:"시원한 맥주와 안주", s:"fried"}, {t:"속 편한 뜨끈한 국물", s:"warm"}] },
        { text: "내일도 이브닝 근무야?", options: [{t:"응, 조금 늦잠 잘 수 있어", s:"energy"}, {t:"아니, 내일은 나이트야", s:"heavy"}, {t:"드디어 내일 오프!", s:"reward"}, {t:"내일 데이라 지금 바로 자야 해", s:"light"}, {t:"연속 이브닝이라 죽을 맛", s:"exhausted"}] },
        { text: "병원 단톡방 알람 울리면 어때?", options: [{t:"심장이 쿵 내려앉음", s:"stress"}, {t:"차단하고 싶어", s:"angry"}, {t:"무시하고 싶지만 봄", s:"mild"}, {t:"별 생각 없음", s:"stable"}, {t:"내 욕할까봐 불안함", s:"stress"}] },
        { text: "샤워하고 나와서 뭐 할 거야?", options: [{t:"배달 기다리며 폰 보기", s:"reward"}, {t:"바로 침대 속으로 다이빙", s:"mild"}, {t:"넷플릭스 영화 한 편", s:"heavy"}, {t:"오늘 일 복기하며 자책", s:"mild"}, {t:"남자친구랑 하소연 타임", s:"reward"}] },
        { text: "스스로에게 해주고 싶은 보상은?", options: [{t:"최고급 안주와 야식", s:"heavy"}, {t:"내일을 위한 꿀잠", s:"stable"}, {t:"맛있는 거 먹고 잊기", s:"meat"}, {t:"나를 위한 칭찬 한마디", s:"reward"}, {t:"그냥 무조건 매운 거!", s:"spicy"}] }
    ],
    // AFTER NIGHT SHIFT (10 Steps)
    after_night: [
        { text: "밤샘 완료... 퇴근길 아침 햇살 어때?", options: [{t:"눈부셔서 눈물 나", s:"warm"}, {t:"남들 출근할 때 퇴근해서 뿌듯", s:"stable"}, {t:"세상이 나를 억까하는 느낌", s:"heavy"}, {t:"몽롱해서 꿈꾸는 것 같아", s:"tired"}, {t:"상쾌한데 몸은 너덜너덜", s:"reward"}] },
        { text: "오늘 밤 스테이션은 어땠어?", options: [{t:"스테이블해서 꿀잠(?) 잠", s:"stable"}, {t:"환자 자꾸 깨서 한숨 못 잠", s:"stress"}, {t:"응급 터져서 영혼 갈아 넣음", s:"exhausted"}, {t:"선배랑 분위기 안 좋아서 불편", s: "angry"}, {t:"차팅 밀려서 정신없었어", s:"stress"}] },
        { text: "지금 눈 상태가 어때?", options: [{t:"빠질 것 같이 뻑뻑해", s:"mild"}, {t:"눈꺼풀이 천근만근이야", s:"tired"}, {t:"시뻘겋게 충혈됨", s:"warm"}, {t:"눈앞이 흐릿해", s:"mild"}, {t:"오히려 눈이 말똥말똥함", s:"energy"}] },
        { text: "밤사이에 뭐 좀 먹었어?", options: [{t:"아예 굶었어, 속 쓰려", s:"warm"}, {t:"편의점 간식으로 연명", s:"light"}, {t:"동료랑 몰래 야식 먹음", s:"heavy"}, {t:"입맛 없어서 커피만 마심", s:"energy"}, {t:"지금 배 터지게 먹고 싶어", s:"heavy"}] },
        { text: "암막 커튼 칠 준비 됐어?", options: [{t:"응, 암흑 속으로 사라질래", s:"mild"}, {t:"배고파서 밥 먹고 잘래", s:"heavy"}, {t:"잠이 안 와서 좀 놀다 잘래", s:"fried"}, {t:"오후에 약속 있어서 못 자", s:"energy"}, {t:"빨리 씻고 눕고 싶어 죽겠음", s:"mild"}] },
        { text: "지금 입안에서 당기는 온도는?", options: [{t:"머리 띵해지는 차가운 거", s:"cold"}, {t:"속을 달래주는 뜨끈한 거", s:"warm"}, {t:"적당히 미지근하고 부드러운 거", s:"mild"}, {t:"자극적인 뜨거운 맛", s:"spicy"}, {t:"얼음 가득한 음료", s:"cold"}] },
        { text: "오늘 가장 고마웠던/미안했던 사람은?", options: [{t:"인계 잘 받아준 다음 듀티", s:"stable"}, {t:"밤새 같이 고생한 동료", s:"reward"}, {t:"말썽 안 부린 천사 환자들", s:"stable"}, {t:"사고 쳤는데 수습해준 선배", s:"mild"}, {t:"자는데 깨운 것 같은 나 자신", s:"mild"}] },
        { text: "내일도 나이트 근무야?", options: [{t:"응, 나이트 킵(Keep)의 삶", s:"heavy"}, {t:"내일은 드디어 오프야!", s:"reward"}, {t:"듀티 바뀌어서 리듬 깨짐", s:"energy"}, {t:"연속 나이트라 정신 나감", s:"exhausted"}, {t:"아직 스케줄 몰라", s:"mild"}] },
        { text: "지금 당장 생각나는 메뉴 식감은?", options: [{t:"부드러워서 후루룩 넘어가는 거", s:"mild"}, {t:"쫄깃쫄깃 씹는 재미 있는 거", s:"meat"}, {t:"바삭해서 스트레스 풀리는 거", s:"fried"}, {t:"아삭아삭 신선한 거", s:"light"}, {t:"국물에 밥 말아먹는 느낌", s:"warm"}] },
        { text: "밤샘 근무한 당신에게 주는 보상은?", options: [{t:"든든한 국밥 한 그릇", s:"warm"}, {t:"기분 좋아지는 단맛 폭발", s:"reward"}, {t:"남친이 사주는 맛있는 거", s:"reward"}, {t:"그냥 무조건 배 터지는 고기", s:"meat"}, {t:"나를 위한 보양식", s:"mild"}] }
    ],
    // BEFORE WORK (10 Steps)
    before_work: [
        { text: "어느 근무 들어가기 전이야?", options: [{t:"데이(Day) - 아직 밤 같아", s:"light"}, {t:"이브닝(Evening) - 곧 헬게이트", s:"energy"}, {t:"나이트(Night) - 밤샘 전쟁 대비", s:"heavy"}, {t:"교육/미팅 가는 길", s:"mild"}, {t:"오프였는데 불려가는 중(ㅠㅠ)", s:"angry"}] },
        { text: "지금 기분은 솔직히 어때?", options: [{t:"가기 싫어서 눈물 나", s:"reward"}, {t:"돈 벌러 가자... 해탈함", s:"mild"}, {t:"오늘은 좀 힘이 나!", s:"energy"}, {t:"무사 스테이블하길 기도 중", s:"stable"}, {t:"병원 방향으로 절하고 싶음", s:"stable"}] },
        { text: "오늘 멤버(스테이션) 확인했어?", options: [{t:"천사 조합! 최고의 날", s:"stable"}, {t:"무난해서 다행이야", s:"mild"}, {t:"빌런 섞여있어서 긴장됨", s:"spicy"}, {t:"다 신규라 내가 다 해야 함", s:"meat"}, {t:"무서운 선배/수쌤 듀티라 무서움", s:"stress"}] },
        { text: "잠은 좀 푹 잤어?", options: [{t:"꿀잠 잤어, 컨디션 최고", s:"stable"}, {t:"병원 꿈 꾸느라 설쳤어", s:"stress"}, {t:"3시간도 못 자고 눈 뜸", s:"heavy"}, {t:"중간에 계속 깨서 피곤해", s:"warm"}, {t:"자도 자도 피곤한 느낌", s:"meat"}] },
        { text: "출근까지 시간 얼마나 남았어?", options: [{t:"이미 늦었어, 뛰는 중!", s:"light"}, {t:"조금 여유 있어서 먹으려 해", s:"heavy"}, {t:"이미 병원 근처야", s:"mild"}, {t:"가는 내내 차에서 잘 거야", s:"tired"}, {t:"미리 와서 준비 중", s:"energy"}] },
        { text: "가장 걱정되는 게 뭐야?", options: [{t:"환자 상태 나빠질까봐", s:"mild"}, {t:"IV 실패해서 등땀 날까봐", s:"stress"}, {t:"인계 주다 영혼까지 털릴까봐", s:"angry"}, {t:"너무 바빠서 굶을까봐", s:"heavy"}, {t:"실수해서 깨질까봐", s:"stress"}] },
        { text: "지금 배고픈 정도는?", options: [{t:"든든하게 먹어야 버텨", s:"heavy"}, {t:"적당히 먹고 싶어", s:"mild"}, {t:"속 더부룩하면 일 못 해", s:"light"}, {t:"입맛 없지만 살려고 먹어", s:"energy"}, {t:"커피 한 잔이면 충분해", s:"light"}] },
        { text: "지금 입안의 상태는?", options: [{t:"쓰고 텁텁해서 상큼한 게 필요", s:"light"}, {t:"텅 비어서 고소한 게 땡김", s:"meat"}, {t:"매콤한 걸로 정신 차릴래", s:"spicy"}, {t:"속 쓰려서 뜨끈한 게 좋아", s:"warm"}, {t:"달달한 게 들어가야 힘 남", s:"reward"}] },
        { text: "근무 후에 계획은?", options: [{t:"친구랑 맛집 가기로 함", s:"reward"}, {t:"바로 씻고 기절 예정", s:"mild"}, {t:"운동 가기로 마음먹음", s:"energy"}, {t:"밀린 공부/과제", s:"mild"}, {t:"나에게 주는 맛있는 배달!", s: "heavy"}] },
        { text: "마지막으로 가영이의 각오는?", options: [{t:"오늘 제발 스테이블해라!", s:"stable"}, {t:"무사히 퇴근만 하자", s:"mild"}, {t:"오늘도 환자들 지켜야지", s:"reward"}, {t:"사직서 던지고 싶지만 참음", s:"stress"}, {t:"난 할 수 있다! 아자아자!", s:"energy"}] }
    ],
    // OFF DAY (10 Steps)
    off_day: [
        { text: "오프 축하해! 어떻게 시작했어?", options: [{t:"오후까지 기절해있었어", s:"reward"}, {t:"일찍 일어나서 놀러 감", s:"energy"}, {t:"밀린 병원 일/공부 하는 중", s:"stable"}, {t:"하루종일 침대 위 뒹굴", s:"mild"}, {t:"대청소하고 빨래 완료", s:"heavy"}] },
        { text: "병원 냄새 좀 빠진 것 같아?", options: [{t:"완전! 이제야 사람 사는 듯", s:"stable"}, {t:"자꾸 단톡방 알람 울려 짜증", s:"angry"}, {t:"인계 실수 생각나서 불안함", s:"stress"}, {t:"오프인데도 병원 꿈 꿨어", s:"tired"}, {t:"병원 생각 1도 안 남", s:"stable"}] },
        { text: "지금 가영이의 몸 어디가 아파?", options: [{t:"종아리랑 발바닥이 찌릿함", s:"warm"}, {t:"목이랑 어깨가 뭉침", s:"meat"}, {t:"허리가 끊어질 듯", s:"meat"}, {t:"눈이 침침하고 머리 아픔", s:"mild"}, {t:"그냥 전체적으로 몸살 기운", s:"warm"}] },
        { text: "오늘 가영이의 행복 지수는?", options: [{t:"100% 터질 듯이 행복!", s:"reward"}, {t:"80% 평화롭고 좋음", s:"stable"}, {t:"50% 무난무난한 하루", s:"mild"}, {t:"20% 내일 출근 생각에 우울", s:"stress"}, {t:"0% 오프인데도 몸이 너무 아픔", s:"warm"}] },
        { text: "오늘 식사 컨셉은 뭐야?", options: [{t:"오프니까 화려하게 폭식!", s:"heavy"}, {t:"분위기 있는 곳에서 외식", s:"reward"}, {t:"가볍고 건강하게 관리", s:"light"}, {t:"배달 시켜서 편하게 먹기", s:"mild"}, {t:"정갈한 집밥 스타일", s:"meat"}] },
        { text: "가장 생각나는 음식 식감은?", options: [{t:"바삭바삭 튀김류", s:"fried"}, {t:"쫄깃쫄깃 고기/회", s:"meat"}, {t:"아삭아삭 신선한 거", s:"light"}, {t:"부드럽고 달콤한 것", s:"reward"}, {t:"뜨끈한 국물 요리", s:"warm"}] },
        { text: "내일 출근 생각하면 어때?", options: [{t:"생각 안 하려고 노력 중!", s:"stable"}, {t:"벌써부터 심장이 두근거려", s:"warm"}, {t:"사직서 쓰고 싶어짐", s:"stress"}, {t:"그냥 돈 벌러 가야지 해탈", s:"mild"}, {t:"오프가 하루 더 있어서 행복", s:"reward"}] },
        { text: "활동하면서 스트레스 풀렸어?", options: [{t:"응, 다 잊어버렸어!", s:"stable"}, {t:"어느 정도는 풀린 듯", s:"mild"}, {t:"아직 조금 남아있어", s:"spicy"}, {t:"맛있는 걸 먹어야 풀릴 듯", s:"heavy"}, {t:"오프가 더 길었으면 좋겠어", s:"reward"}] },
        { text: "음식의 칼로리, 신경 써?", options: [{t:"오프인데? 신경 안 써!", s:"heavy"}, {t:"조금은...? 말로만", s:"meat"}, {t:"관리해야 해 😭", s:"light"}, {t:"맛있으면 0칼로리", s:"fried"}, {t:"요즘 식단 중이야", s:"light"}] },
        { text: "마지막으로 가영이의 오프 컨셉은?", options: [{t:"고생한 나를 위한 보상 데이", s:"reward"}, {t:"내일을 위한 완벽한 충전", s:"stable"}, {t:"밀린 일 해결하는 갓생", s:"energy"}, {t:"그냥 아무것도 안 하기", s:"mild"}, {t:"사랑하는 사람과 함께하기", s:"reward"}] }
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
        
        // Accurate Progress
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

        picks.forEach((food) => {
            const ytLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(food.s + " 먹방")}`;
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div class="food-info">
                    <span class="food-name">${food.n}</span>
                    <p class="food-reason">💡 추천 이유: ${this.responses[2] || "지친 하루"} 상황이라 ${food.r}</p>
                    <a href="${ytLink}" target="_blank" class="youtube-btn">🎥 유튜브에서 먹방 영상 보기</a>
                    <div class="order-btn-group">
                        <a href="#" class="mini-order-btn mini-baemin" onclick="window.game.goOrder('baemin', '${food.s}', event)">배민 주문</a>
                        <a href="#" class="mini-order-btn mini-coupang" onclick="window.game.goOrder('coupang', '${food.s}', event)">쿠팡 주문</a>
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
            ? `baemin://search?keyword=${encodeURIComponent(search)}` 
            : `coupangeats://search?q=${encodeURIComponent(search)}`;
        window.location.href = url;
        setTimeout(() => {
            const webUrl = type === 'baemin' 
                ? `https://www.baemin.com/search?keyword=${encodeURIComponent(search)}` 
                : `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(search)}`;
            if (window.confirm("앱이 실행되지 않았나요? 웹으로 이동할까요?")) window.location.href = webUrl;
        }, 1500);
    }

    sendToBF(foodName, event) {
        if(event) event.stopPropagation();
        
        const bWebUrl = `https://www.baemin.com/search?keyword=${encodeURIComponent(foodName)}`;
        const cWebUrl = `https://eats.coupang.com/hc/search/results?q=${encodeURIComponent(foodName)}`;
        
        // Refined Message with direct order links
        const msg = `자기야 나 오늘 근무 끝나고 너무 고생했어... 😭 분석해보니까 오늘 [${foodName}] 먹어야 한대! 나 이거 사주면 기분 싹 풀릴 것 같아 💝\n\n🛵 배민에서 사주기: ${bWebUrl}\n\n🚀 쿠팡이츠에서 사주기: ${cWebUrl}`;
        
        if (navigator.share) {
            navigator.share({
                title: '괜찮아, 밥먹자 🏥💝',
                text: msg,
                url: window.location.href
            }).catch(e => console.log('Share failed', e));
        } else {
            const tempInput = document.createElement('textarea');
            tempInput.value = msg; document.body.appendChild(tempInput);
            tempInput.select(); document.execCommand('copy'); document.body.removeChild(tempInput);
            alert("메시지와 주문 링크가 복사되었습니다! 남자친구에게 카톡으로 보내주세요:\n\n" + msg);
        }
    }

    resetApp() {
        document.getElementById('result-area').classList.add('hidden');
        document.getElementById('survey-progress-container').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}
window.game = new MoodFoodApp();
