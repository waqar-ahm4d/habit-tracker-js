export function getToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}