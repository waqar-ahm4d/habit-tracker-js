export function getToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getWeekStart(date) {
  const currentDate = new Date(date);

  const day = currentDate.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  currentDate.setDate(
    currentDate.getDate() + difference
  );

  currentDate.setHours(0, 0, 0, 0);

  return currentDate;
}

export function getCurrentWeekStart(currentWeekOffset) {
  const today = getToday();

  const start = getWeekStart(today);

  start.setDate(
    start.getDate() + currentWeekOffset * 7
  );

  return start;
}

export function getWeekDates(currentWeekOffset) {
  const weekStart =
    getCurrentWeekStart(currentWeekOffset);

  return Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(weekStart);

      date.setDate(
        weekStart.getDate() + index
      );

      return date;
    }
  );
}

export function isToday(date) {
  return (
    formatDate(date) ===
    formatDate(getToday())
  );
}

export function isFuture(date) {
  return date > getToday();
}

export function calculateStreak(
  habitId,
  completions
) {
  let streak = 0;

  const currentDate =
    getToday();

  const todayKey =
    `${habitId}-${formatDate(
      currentDate
    )}`;

  if (!completions[todayKey]) {
    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  while (true) {
    const key =
      `${habitId}-${formatDate(
        currentDate
      )}`;

    if (completions[key]) {
      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
}

export function getStreakData(
  streak
) {
  if (streak === 0) {
    return {
      icon: "—",
      color: "#6B7280",
      background:
        "rgba(107,114,128,0.1)",
    };
  }

  if (streak <= 2) {
    return {
      icon: "🌱",
      color: "#10B981",
      background:
        "rgba(16,185,129,0.12)",
    };
  }

  if (streak <= 6) {
    return {
      icon: "✨",
      color: "#F59E0B",
      background:
        "rgba(245,158,11,0.12)",
    };
  }

  if (streak <= 13) {
    return {
      icon: "🔥",
      color: "#EF4444",
      background:
        "rgba(239,68,68,0.12)",
    };
  }

  return {
    icon: "👑",
    color: "#8B5CF6",
    background:
      "rgba(139,92,246,0.12)",
  };
}