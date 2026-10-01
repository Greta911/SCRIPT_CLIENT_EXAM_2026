export default function getTemplate() {
  return `
    <aside class="deco-frame md:w-1/3 p-6 bg-[var(--murk)]/60 self-start">
      <h2 class="display text-2xl mb-5 text-[var(--pearl)]">File a new creature</h2>

      <form id="add-monster-form">
        <label class="block mb-4 text-[var(--silver)]">
          Name
          <input type="text" id="add-name" class="field" placeholder="The Crawling Mass" required />
        </label>

        <label class="block mb-4 text-[var(--silver)]">
          Type
          <select id="add-type" class="field" required>
            <option value="Giant reptile">Giant reptile</option>
            <option value="Alien">Alien</option>
            <option value="Mutant">Mutant</option>
            <option value="Giant insect">Giant insect</option>
            <option value="Robot">Robot</option>
            <option value="Deep-sea creature">Deep-sea creature</option>
          </select>
        </label>

        <label class="block mb-4 text-[var(--silver)]">
          Danger level (1 to 5)
          <input type="number" id="add-danger" min="1" max="5" class="field" placeholder="3" required />
        </label>

        <label class="block mb-6 text-[var(--silver)]">
          Release year
          <input type="number" id="add-year" min="1950" max="1969" class="field" placeholder="1957" required />
        </label>

        <button type="submit" class="btn btn-lipstick w-full py-3 px-4 text-lg">Add to the archive</button>
      </form>
    </aside>
  `;
}