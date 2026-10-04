export default function getTemplate(monster) {
  const dangerSkulls = "☠️".repeat(Math.min(Math.max(monster.dangerLevel, 1), 5));
  
  const types = [
    "Giant reptile",
    "Alien",
    "Mutant",
    "Giant insect",
    "Robot",
    "Deep-sea creature"
  ];

  const typeOptions = types
    .map(
      (t) => `<option value="${t}" ${t === monster.type ? "selected" : ""}>${t}</option>`
    )
    .join("");

  if (monster.isEditing) {
    //MODE ÉDITION
    return `
      <tr class="border-b border-[var(--murk)] bg-[var(--murk)]/20" data-id="${monster.id}">
        <td class="p-3">
          <input type="text" class="edit-name field w-full" value="${monster.name}" />
        </td>
        <td class="p-3">
          <input type="text" class="edit-type field w-full" value="${monster.type}" />
        </td>
        <td class="p-3">
          <input type="number" min="1" max="5" class="edit-danger field w-20" value="${monster.dangerLevel}" />
        </td>
        <td class="p-3">
          <input type="number" class="edit-year field w-24" value="${monster.year}" />
        </td>
        <td class="p-3 text-right space-x-2">
          <button data-action="save" data-id="${monster.id}" class="btn-primary text-xs px-2 py-1">Save</button>
          <button data-action="cancel" data-id="${monster.id}" class="btn-secondary text-xs px-2 py-1">Cancel</button>
        </td>
      </tr>
    `;
  }

  //MODE AFFICHAGE NORMAL
  return `
    <tr class="border-b border-[var(--murk)] hover:bg-[var(--murk)]/20" data-id="${monster.id}">
      <td class="p-3 font-semibold text-[var(--gold)]">${monster.name}</td>
      <td class="p-3 text-[var(--silver)]">${monster.type}</td>
      <td class="p-3" title="Level ${monster.dangerLevel}">${dangerSkulls}</td>
      <td class="p-3 text-[var(--silver)]">${monster.year}</td>
      <td class="p-3 text-right space-x-2">
        <button data-action="edit" data-id="${monster.id}" class="btn-secondary text-xs px-2 py-1">Edit</button>
        <button data-action="delete" data-id="${monster.id}" class="btn-danger text-xs px-2 py-1">Delete</button>
      </td>
    </tr>
  `;

}