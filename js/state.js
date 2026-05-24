export const STORAGE_KEY = "habit-tracker-data";

export const state = {
  habits: [],
  completions: {},
  currentWeekOffset: 0,
  editingHabitId: null,
};
export function loadState() {
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedState) {
    state.habits = savedState.habits || [];
    state.completions = savedState.completions || {};
  }
}
export function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      habits: state.habits,
      completions: state.completions,
    })
  );
}