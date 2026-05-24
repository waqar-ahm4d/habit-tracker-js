import { state } from "./state.js";

export function render() {
  const appContent = document.getElementById("appContent");

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

  appContent.innerHTML = `
    <div class="grid-wrapper">
      <h2>Your habits will appear here</h2>
    </div>
  `;
}