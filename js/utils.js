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