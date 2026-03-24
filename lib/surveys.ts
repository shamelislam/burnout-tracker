// TYPES (optional but recommended)
export type Question = {
  id: string;
  question: string;
  type: "scale" | "multiple";
  min?: number;
  max?: number;
  options?: string[];
};


// =========================
// 🧠 GENERAL BURNOUT SURVEY
// =========================

export const generalSurvey: Question[] = [
  {
    id: "stress",
    question: "How stressed do you feel?",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "sleep",
    question: "Average hours of sleep this week",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "screen",
    question: "Total screen time",
    type: "multiple",
    options: ["<1 hr", "1-2 hrs", "2-4 hrs", "4-6 hrs", "6+ hrs"]
  },
  {
    id: "social",
    question: "Social media usage",
    type: "multiple",
    options: ["0-1 hr", "1-2 hrs", "2-3 hrs", "3-4 hrs", "4+ hrs"]
  },
  {
    id: "exercise",
    question: "Exercise per day",
    type: "multiple",
    options: ["0-30m", "30-60m", "1-1.5h", "1.5-2h", "2h+"]
  },
  {
    id: "water",
    question: "Water intake (cups)",
    type: "multiple",
    options: ["0-2", "3-4", "5-6", "7-8", "9+"]
  }
];


// =========================
// ⚡ DAILY SURVEY (short)
// =========================

export const dailySurvey: Question[] = [
  {
    id: "stress",
    question: "How stressed do you feel today?",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "sleep",
    question: "How many hours did you sleep last night?",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "focus",
    question: "How focused were you today?",
    type: "scale",
    min: 1,
    max: 10
  }
];


// =========================
// 📅 WEEKLY SURVEY
// =========================

export const weeklySurvey: Question[] = generalSurvey;


// =========================
// 📊 MONTHLY SURVEY
// =========================

export const monthlySurvey: Question[] = [
  {
    id: "burnout_feeling",
    question: "How often did you feel burned out this month?",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "motivation",
    question: "How motivated did you feel this month?",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    id: "balance",
    question: "How balanced was your work/life?",
    type: "scale",
    min: 1,
    max: 10
  }
];


// =========================
// 🔥 HABIT SURVEY
// =========================

export const habitSurvey: Question[] = [
  {
    id: "workload",
    question: "Typical weekly workload",
    type: "scale",
    min: 1,
    max: 5
  },
  {
    id: "overwhelmed",
    question: "How often do you feel overwhelmed?",
    type: "scale",
    min: 1,
    max: 5
  },
  {
    id: "understandBurnout",
    question: "I understand what burnout is",
    type: "scale",
    min: 1,
    max: 5
  },
  {
    id: "recognizeBurnout",
    question: "I can recognize burnout in myself",
    type: "scale",
    min: 1,
    max: 5
  },
  {
    id: "mainHabit",
    question: "Which habit do you practice most?",
    type: "multiple",
    options: [
      "Planning tasks",
      "Taking breaks",
      "Sleeping 7–9 hours",
      "Exercising",
      "Limiting procrastination",
      "Focused study sessions",
      "None"
    ]
  },
  {
    id: "frequency",
    question: "How often do you practice this habit?",
    type: "multiple",
    options: [
      "Daily",
      "3-5 times/week",
      "1-2 times/week",
      "Rarely"
    ]
  },
  {
    id: "duration",
    question: "How long have you practiced this habit?",
    type: "multiple",
    options: [
      "<1 week",
      "1-4 weeks",
      "1-3 months",
      "3+ months"
    ]
  },
  {
    id: "ease",
    question: "How easy is it to maintain?",
    type: "scale",
    min: 1,
    max: 5
  },
  {
    id: "impact",
    question: "Has this habit reduced your burnout?",
    type: "scale",
    min: 1,
    max: 5
  }
];