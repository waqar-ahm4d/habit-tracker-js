import { state, saveState } from "./state.js";

import { render } from "./render.js";

import { isFuture } from "./utils.js";

export function setupEventListeners() {
  setupHabitForm();
  setupWeekNavigation();
  setupGridEvents();
}

function setupHabitForm() {
  const habitForm =
    document.getElementById("habitForm");

  habitForm.addEventListener(
    "submit",
    event => {
      event.preventDefault();

      const habitInput =
        document.getElementById(
          "habitInput"
        );

      const habitName =
        habitInput.value.trim();

      if (!habitName) return;

      state.habits.push({
        id: crypto.randomUUID(),
        name: habitName,
      });

      saveState();
      render();

      setupGridEvents();

      habitInput.value = "";
    }
  );
}

function setupWeekNavigation() {
  document
    .getElementById("prevWeek")
    .addEventListener("click", () => {
      state.currentWeekOffset--;

      render();
      setupGridEvents();
    });

  document
    .getElementById("nextWeek")
    .addEventListener("click", () => {
      state.currentWeekOffset++;

      render();
      setupGridEvents();
    });

  document
    .getElementById("todayBtn")
    .addEventListener("click", () => {
      state.currentWeekOffset = 0;

      render();
      setupGridEvents();
    });
}

function setupGridEvents() {
  const cells =
    document.querySelectorAll(".cell");

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const habitId =
        cell.dataset.habitId;

      const date =
        new Date(cell.dataset.date);

      toggleCompletion(habitId, date);
    });
  });
}

export function toggleCompletion(
  habitId,
  date
) {
  if (isFuture(date)) return;

  const completionKey =
    `${habitId}-${date
      .toISOString()
      .split("T")[0]}`;

  if (
    state.completions[completionKey]
  ) {
    delete state.completions[
      completionKey
    ];
  } else {
    state.completions[
      completionKey
    ] = true;
  }

  saveState();

  render();

  setupGridEvents();
}