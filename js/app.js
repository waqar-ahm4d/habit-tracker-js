import { loadState } from "./state.js";
import { render } from "./render.js";
import { setupEventListeners } from "./events.js";

loadState();
render();
setupEventListeners();