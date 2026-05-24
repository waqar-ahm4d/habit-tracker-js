import { state } from "./state.js";

import {
  getWeekDates,
  formatDate,
  isToday,
  isFuture,
} from "./utils.js";

export function render() {
  const appContent =
    document.getElementById("appContent");

  if (state.habits.length === 0) {
    appContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🌱</div>

        <h2 class="empty-title">
          Build your first habit
        </h2>

        <p class="empty-text">
          Start small and stay consistent.
        </p>
      </div>
    `;

    return;
  }

  const dates = getWeekDates(state.currentWeekOffset);

  appContent.innerHTML = `
    <div class="grid-wrapper">
      <div class="habit-grid">

        <div class="grid-header">
          <div class="habit-col-label">
            Habit
          </div>
          ${dates.map( date => `
                <div class="day-header">
                  <div class="day-name">
                    ${new Intl.DateTimeFormat(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    ).format(date)}
                  </div>
                  <div class="day-number">
                    ${date.getDate()}
                  </div>
                </div>`).join("")}
          <div class="streak-column">
            STR
          </div>
        </div>
        ${state.habits.map(habit => `
              <div class="habit-row">
                <div class="habit-info">
                  <div class="habit-name">
                    ${habit.name}
                  </div>
                </div>
                ${dates.map(date => {
                    const key = `${habit.id}-${formatDate(date)}`;
                    const checked = state.completions[key];
                    return `
                      <button class="cell 
                        ${checked ? "checked" : ""}
                        ${isToday(date) ? "today" : ""}
                        ${isFuture(date) ? "future" : ""} "
                        data-habit-id="${habit.id}"
                        data-date="${formatDate(date)}">
                        ${checked ? "✓" : ""}
                      </button>
                    `;
                  })
                  .join("")}

                <div>
                  <div class="streak-badge">
                    —
                  </div>
                </div>

              </div>
            `
          )
          .join("")}

      </div>
    </div>
  `;
}