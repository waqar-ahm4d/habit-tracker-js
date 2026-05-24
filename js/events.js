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
  const deleteButtons =
  document.querySelectorAll(
    "[data-delete-id]"
  );

    deleteButtons.forEach(button => {
    button.addEventListener("click", () => 
        {
            deleteHabit(button.dataset.deleteId);
        });
    });
    const editButtons =
  document.querySelectorAll(
    "[data-edit-id]"
  );

editButtons.forEach(button => {
  button.addEventListener(
    "click",
    () => {
      startRename(
        button.dataset.editId
      );
    }
  );
});

const renameLabels =
  document.querySelectorAll(
    "[data-rename-id]"
  );

renameLabels.forEach(label => {
  label.addEventListener(
    "dblclick",
    () => {
      startRename(
        label.dataset.renameId
      );
    }
  );
});
    const renameInputs =
  document.querySelectorAll(
    ".rename-input"
  );

renameInputs.forEach(input => {
  input.addEventListener(
    "keydown",
    event => {
      const habitId =
        input.id.replace(
          "rename-",
          ""
        );

      if (event.key === "Enter") {
        renameHabit(
          habitId,
          input.value
        );
      }

      if (event.key === "Escape") {
        state.editingHabitId =
          null;

        render();

        setupGridEvents();
      }
    }
  );

  input.addEventListener(
    "blur",
    () => {
      const habitId =
        input.id.replace(
          "rename-",
          ""
        );

      renameHabit(
        habitId,
        input.value
      );
    }
  );
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

export function deleteHabit(habitId) {
  state.habits = state.habits.filter(
      habit => habit.id !== habitId
    );

  Object.keys(state.completions).forEach(key => {
    if (key.startsWith(habitId)) {
      delete state.completions[key];
    }
  });

  saveState();
  render();
  setupGridEvents();
}
export function startRename(
  habitId
) {
  state.editingHabitId =
    habitId;

  render();

  setupGridEvents();

  const renameInput =
    document.getElementById(
      `rename-${habitId}`
    );

  if (renameInput) {
    renameInput.focus();

    renameInput.select();
  }
}

export function renameHabit(
  habitId,
  newName
) {
  const trimmedName =
    newName.trim();

  if (!trimmedName) {
    state.editingHabitId =
      null;

    render();

    setupGridEvents();

    return;
  }

  const habit =
    state.habits.find(
      habit => habit.id === habitId
    );

  if (habit) {
    habit.name = trimmedName;
  }

  state.editingHabitId =
    null;

  saveState();

  render();

  setupGridEvents();
}