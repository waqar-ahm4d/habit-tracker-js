# ANSWERS.md

## 1. How to run

### Local setup

Option 1:
- Open the project folder in VS Code
- Install the Live Server extension
- Right click `index.html`
- Click "Open with Live Server"

Option 2:
- Open `index.html` directly in the browser

No build tools or package installation are required.

### Live deployment

https://habit-tracker-js-gamma.vercel.app/

---

## 2. Stack & design choices

I chose vanilla HTML, CSS, and JavaScript because the assignment focused heavily on interaction design and frontend fundamentals rather than framework-specific architecture. I wanted to keep the project lightweight, dependency-free, and easy to run on any machine without setup complexity.

One interaction decision I made was using a horizontally scrollable weekly grid on smaller screens instead of shrinking every cell to fit the viewport. Habit tracking depends on quick readability, and compressing the grid too much made the interface harder to scan. Horizontal scrolling preserved touch target size and visual clarity on mobile devices.

Another design decision was highlighting the current day column with a soft accent background and indicator dot. Habit trackers are used daily, so orientation inside the weekly grid is important. The highlight helps users immediately identify today's progress without scanning every column.

I chose Monday as the start of the week because it aligns better with productivity-oriented planning and creates a cleaner workweek mental model for tracking routines.

For streak behavior, I decided that a streak can continue from yesterday if today's habit is not yet completed. This felt more forgiving and realistic because users often check habits later in the day.

---

## 3. Responsive & accessibility

On a 1440px laptop, the app displays the full weekly grid comfortably with all seven days visible at once. The wider layout allows faster scanning across multiple habits.

On a 360px mobile screen, the layout switches to a stacked form layout, and the weekly grid becomes horizontally scrollable. This preserves usability and avoids overly compressed cells or text.

One accessibility consideration I handled was adding clear button labels and maintaining visible focusable interactive elements like buttons and inputs. I also kept color contrast fairly strong between text and backgrounds to improve readability.

One accessibility consideration I knowingly skipped was full keyboard navigation for every grid interaction. With another day, I would add arrow-key navigation between habit cells and improve screen reader announcements for toggled checkmarks.

---

## 4. AI usage

I used ChatGPT during development for:
- brainstorming architecture ideas
- improving responsive layout behavior
- debugging JavaScript event handling
- refining streak calculation logic
- improving visual hierarchy and spacing
- generating and restructuring portions of CSS

One specific change I made to AI-generated output was restructuring the mobile grid behavior. An earlier version attempted to compress the entire habit table to fit narrow screens, which made the UI difficult to read and interact with. I changed the implementation to use horizontal scrolling with preserved cell sizing instead, which improved usability significantly on smaller devices.

I also refactored several AI-generated functions into smaller modular files (`render.js`, `events.js`, `utils.js`, and `state.js`) to make the codebase easier to maintain and reason about.

---

## 5. Honest gap

The biggest area that still needs improvement is deeper interaction polish and accessibility. While the core functionality works well, the experience could be improved with keyboard-first navigation, animated feedback for checkmark completion, and more refined mobile gestures.

With another day, I would also add a small statistics dashboard showing completion totals and longest streaks to give users more insight into their progress over time.