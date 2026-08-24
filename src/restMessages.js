// restMessages.js
// رسائل شريط الراحة — تتغيّر حسب حجم التمرين وموقع الجولة
// الاستخدام: getRestMessage({ exerciseName, sets, minReps, maxReps, currentSet })

/* ------------------------------------------------------------------ */
/* ١) تصنيف التمرين                                                    */
/* ------------------------------------------------------------------ */

// "معده"/"ددلفت"/"بطات" هي التهجئة الفعلية المستخدمة بأسماء التمارين
// بالبرنامج (تختلف عن "معدة"/"ديدلفت"/"سمانة" الفصحى) — لازم الاثنتين
// عشان المطابقة تشتغل صح.
const CORE_KEYWORDS = ["معدة", "معده", "بطن", "بلانك", "كرنش", "سمانة", "بطات", "مثلثات"];

const HEAVY_KEYWORDS = [
  "سكوات", "ديدلفت", "ددلفت", "بنش", "بار", "تجديف", "ضغط أرجل", "لنجز", "عقلة",
];

const ISOLATION_KEYWORDS = [
  "بايسبس", "باي", "ترايسبس", "تراي", "جانبي", "رفرفة", "تجميع",
  "تمديد", "مطرقة", "كيرل",
];

const has = (name, list) => list.some((k) => name.includes(k));

export function classifyExercise(input) {
  if (input.tier) return input.tier;

  const name = input.exerciseName;

  // الترتيب مقصود: core و isolation كلماتها أدق (تمييزية) وتُفحص قبل
  // heavy، لأن كلمات heavy زي "بار"/"بنش" عامة وتنطبق كجزء من أسماء
  // تمارين عزل أو معدة (مثال: "بنش مرتفع بايسبس"، "بنش منخفض معده").
  if (has(name, CORE_KEYWORDS)) return "core";
  if (has(name, ISOLATION_KEYWORDS)) return "isolation";
  if (has(name, HEAVY_KEYWORDS)) return "heavy";

  // fallback على الأرقام: جولات كثيرة + تكرارات قليلة = ثقيل
  if (input.sets >= 4 && input.maxReps <= 10) return "heavy";
  if (input.sets <= 3 && input.minReps >= 10) return "isolation";

  return "medium";
}

export function getSetPosition(currentSet, sets) {
  if (currentSet <= 1) return "first";
  if (currentSet >= sets) return "last";
  return "middle";
}

/* ------------------------------------------------------------------ */
/* ٢) مدة الراحة المقترحة (بالثواني)                                    */
/* ------------------------------------------------------------------ */

const REST_SECONDS = {
  heavy: 150,      // ٢:٣٠
  medium: 105,     // ١:٤٥
  isolation: 60,   // ١:٠٠
  core: 45,        // ٠:٤٥
};

/* ------------------------------------------------------------------ */
/* ٣) بنك الجُمل                                                       */
/* ------------------------------------------------------------------ */

const CUES = {
  heavy: {
    first: [
      "خذ راحتك كاملة، الحمل ثقيل",
      "رجّع نفسك زين قبل الجاية",
      "لا تستعجل — الجولة الجاية تبي طاقة",
    ],
    middle: [
      "نفس عميق وثبّت الفورم",
      "شدّ المعدة من أول تكرار",
      "نفس الوزن، تحكّم أحسن",
    ],
    last: [
      "آخر جولة — عطها كل شي 🔥",
      "خلّها آخر جولة تفتخر فيها",
      "بقت وحدة، لا تخلي شي وراك",
    ],
  },
  medium: {
    first: [
      "سخّن أعصابك، الجاية أثقل",
      "الجولة الأولى راحت، الحين البناء",
      "ثبّت وضعيتك قبل ما تبدأ",
    ],
    middle: [
      "خلّها نظيفة، لا تتعجّل",
      "ركّز على العضلة مو على الوزن",
      "نزول بطيء — هني الفايدة",
    ],
    last: [
      "جولة وحدة وتخلص التمرين",
      "أخيرة — كمّلها بنفس القوة",
      "اقفلها بشكل نظيف 💪",
    ],
  },
  isolation: {
    first: [
      "راحة قصيرة، حافظ على الضخ",
      "لا تبرد — الجاية قريبة",
      "هزّ العضلة شوي وارجع",
    ],
    middle: [
      "الحرقة زينة — كمّل",
      "قبضة مرتاحة، العضلة هي اللي تشتغل",
      "حافظ على نفس الإيقاع",
    ],
    last: [
      "أخيرة — اعصرها 💪",
      "بقت وحدة، خلّها تحرق",
      "اقفلها وارتاح",
    ],
  },
  core: {
    first: ["نفس وارجع بسرعة", "راحة خفيفة بس"],
    middle: ["شدّ وثبّت", "لا تحبس نفسك — تنفّس"],
    last: ["آخر وحدة، ثبّت للنهاية", "اقفل المعدة وخلصنا"],
  },
};

const HEADLINES = {
  first: "راحة",
  middle: "راحة",
  last: "راحة · آخر جولة",
};

/* ------------------------------------------------------------------ */
/* ٤) الدالة الرئيسية                                                  */
/* ------------------------------------------------------------------ */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRestMessage(input) {
  const tier = classifyExercise(input);
  const position = getSetPosition(input.currentSet, input.sets);
  const nextSet = Math.min(input.currentSet + 1, input.sets);

  return {
    headline: HEADLINES[position],
    subline: `${input.exerciseName} · الجولة ${nextSet} من ${input.sets}`,
    cue: pick(CUES[tier][position]),
    restSeconds: REST_SECONDS[tier],
  };
}

/* ------------------------------------------------------------------ */
/* ٥) رسالة العد التنازلي                                              */
/* ------------------------------------------------------------------ */

/** يرجّع نص بديل بآخر ١٠ ثواني */
export function getCountdownCue(remaining) {
  if (remaining <= 3) return "يالله! 🚀";
  if (remaining <= 10) return `استعد… ${remaining} ثواني`;
  return null;
}
