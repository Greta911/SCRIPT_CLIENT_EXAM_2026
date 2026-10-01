export default function getTemplate(monsterList) {
  const rows = monsterList.filteredMonsters
    .map((monster) => monster.render())
    .join("");

  return `
    <section class="deco-frame md:w-2/3 p-6 bg-[var(--murk)]/40">
      <div class="flex flex-wrap justify-between items-baseline gap-2 mb-5">
        <h2 class="display text-2xl">The archive</h2>
        <p class="text-[var(--silver)]">
          Creatures on file :
          <span class="display text-2xl text-[var(--gold)]">${monsterList.monsters.length}</span>
        </p>
      </div>

      <!-- Filtro di ricerca -->
      <input type="search" id="search-input" class="field mb-5" placeholder="Search by name or type" value="${monsterList.searchQuery}" />

      <!-- Tabella mostri -->
      <div class="overflow-x-auto">
        <table class="monsters-table w-full">
          <thead>
            <tr>
              <th class="text-left p-3"><a href="#" class="sort-btn" data-sort="name">Name</a></th>
              <th class="text-left p-3"><a href="#" class="sort-btn" data-sort="type">Type</a></th>
              <th class="text-left p-3"><a href="#" class="sort-btn" data-sort="dangerLevel">Danger</a></th>
              <th class="text-left p-3"><a href="#" class="sort-btn" data-sort="year">Year</a></th>
              <th class="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody id="monsters-table-body">
            ${rows}
          </tbody>
        </table>
      </div>
    </section>
  `;
}