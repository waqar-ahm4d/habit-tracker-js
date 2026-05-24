import { state, saveState } from "./state.js";
import { render } from "./render.js";

export function setupEventListeners() {
  const habitForm =
    document.getElementById("habitForm");

  habitForm.addEventListener("submit", event => {
    event.preventDefault();

    const habitInput =
      document.getElementById("habitInput");

    const habitName = habitInput.value.trim();

    if (!habitName) return;

    state.habits.push({
      id: crypto.randomUUID(),
      name: habitName,
    });

    saveState();
    render();

    habitInput.value = "";
  });
}
export function toggleCompletion(habitId, date) {
  if (date > new Date()) return;

  const dateKey = `${habitId}-${date}`;

  if (state.completions[dateKey]) {
    delete state.completions[dateKey];
  } else {
    state.completions[dateKey] = true;
  }

  saveState();
  render();
}