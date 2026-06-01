# Assessment Answers

### 1. How to run

This project requires zero installations. Simply download the repository and open `index.html` directly in any web browser.

### 2. Stack & design choices

**Stack:** I chose Vanilla HTML, CSS, and JavaScript. Because the core requirement was live updates on every keystroke without a calculate button, I wanted direct, immediate control over DOM event listeners without the overhead or state-rendering cycles of a framework like React. It keeps the project incredibly lightweight.

**Visual/Interaction Decisions:**

- **Decision 1:** I used CSS Grid for the `.calculator-container` over Flexbox. By setting `grid-template-columns: 1fr` by default and changing it to `1fr 1fr` on screens above 768px, I ensured the input panel and output panel stack perfectly on mobile and snap side-by-side on desktop without needing complex margin math.
- **Decision 2:** For the inline error validation, I intentionally used CSS `opacity` and a fixed `min-height` instead of `display: none`. This ensures that when an error appears, it fades in smoothly rather than abruptly shifting the entire layout down, satisfying the requirement that errors should not flicker.

### 3. Responsive & accessibility

**Responsiveness:** On a 360px-wide phone, the app is a single vertical column, making it easy to tap inputs without zooming. On a 1440px laptop, the CSS Grid expands to a two-column layout, utilizing the extra screen real estate to keep all information above the fold.

**Accessibility (Handled):** I explicitly linked every `<label>` to its corresponding `<input>` using the `for` and `id` attributes. This ensures that if a user clicks the label text, the input focuses automatically, which creates a larger click target and strictly supports screen readers.

**Accessibility (Skipped):** I knowingly skipped implementing `aria-live` regions for the dynamically updating total displays. Because the numbers update on every single keystroke, a screen reader with an active `aria-live` region would constantly interrupt itself to read the changing numbers, creating a highly frustrating experience for visually impaired users.

### 4. AI usage

**Tools Used:** Google Gemini.

- **What I asked:** I requested an initial HTML skeleton for the inputs, a modern CSS color styling template, and vanilla JavaScript logic to handle the math and event listeners.
- **What it gave me:** It provided the raw code structure including the Grid layout, the event listener loops, and the DOM selectors.
- **What I changed & why:** The AI initially provided a standard rounding logic (`Math.round`) for the per-person share. I changed this specifically to `Math.ceil(perPersonShare * 100) / 100`. I did this to enforce a strict rounding policy: if a bill divides to Rs 33.333, standard rounding leaves the group 1 cent short. By forcing a `Math.ceil` round-up to 33.34, I ensure the restaurant is always paid in full, and any micro-fraction acts as a tiny extra tip.

### 5. Honest gap

One thing that isn't polished enough is the handling of absurdly large inputs overflowing the UI. While the math handles it, if a user pastes a 20-digit number into the bill field, the resulting total breaks out of its visual container in the dark output box. With another day, I would add a `max-length` constraint to the inputs or implement a visual text-truncation/scaling function for the output spans so the UI never breaks regardless of the number size.
