// =========================
// 🔥 MAIN SCORING FUNCTION
// =========================

export const calculateBurnout = (
  answers: any,
  type: string
): number => {

  // =========================
  // 🧠 GENERAL + WEEKLY
  // =========================
  if (type === "general" || type === "weekly") {
    let total = 0;
    let weightSum = 0;

    if (answers.stress !== undefined) {
      total += (answers.stress / 10) * 100 * 0.3;
      weightSum += 0.3;
    }

    if (answers.sleep !== undefined) {
      total += ((10 - answers.sleep) / 10) * 100 * 0.2;
      weightSum += 0.2;
    }

    if (answers.screen !== undefined) {
      total += (answers.screen / 4) * 100 * 0.15;
      weightSum += 0.15;
    }

    if (answers.social !== undefined) {
      total += (answers.social / 4) * 100 * 0.1;
      weightSum += 0.1;
    }

    if (answers.exercise !== undefined) {
      total += ((4 - answers.exercise) / 4) * 100 * 0.15;
      weightSum += 0.15;
    }

    if (answers.water !== undefined) {
      total += ((4 - answers.water) / 4) * 100 * 0.1;
      weightSum += 0.1;
    }

    if (weightSum === 0) return 0;

    return Math.round(total / weightSum);
  }


  // =========================
  // ⚡ DAILY (simple avg)
  // =========================
  if (type === "daily") {
    const values = Object.values(answers) as number[];

    if (values.length === 0) return 0;

    const avg =
      values.reduce((sum, v) => sum + v, 0) / values.length;

    return Math.round((avg / 10) * 100);
  }


  // =========================
  // 📊 MONTHLY (custom model)
  // =========================
  if (type === "monthly") {
    const burnout = answers.burnout_feeling ?? 1;
    const motivation = answers.motivation ?? 1;
    const balance = answers.balance ?? 1;

    return Math.round(
      (burnout / 10) * 50 +                 // main factor
      ((10 - motivation) / 10) * 25 +       // inverse
      ((10 - balance) / 10) * 25
    );
  }


  // =========================
  // 🔥 HABIT (no burnout score)
  // =========================
  return 0;
};



// =========================
// 📈 LEVEL SYSTEM
// =========================

export const getBurnoutLevel = (score: number): string => {
  if (score < 30) return "Low";
  if (score < 60) return "Moderate";
  return "High";
};