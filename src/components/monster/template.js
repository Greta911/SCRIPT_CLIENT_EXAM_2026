
import { MONSTER_TYPES } from "../../config/constants";
export default function getTemplate(monster) {
  const typeOptions = MONSTER_TYPES
    .map(
      (t) => `<option value="${t}" ${t === monster.type ? "selected" : ""}>${t}</option>`
    )
    .join("");

 if (monster.isEditing) {
    return `
      <tr class="isEditing" data-id="${monster.id}">
        <td class="p-3">
          <input type="text" class="edit-name field w-full" value="${monster.name}" />
        </td>
        <td class="p-3">
          <select class="edit-type field w-full">
            ${typeOptions}
          </select>
        </td>
        <td class="p-3">
          <input type="number" min="1" max="5" class="edit-danger field w-20" value="${monster.dangerLevel}" />
        </td>
        <td class="p-3">
          <input type="number" class="edit-year field w-24" value="${monster.year}" />
        </td>
        <td class="p-3">
          <div class="flex justify-end gap-2">
            <button data-action="save" data-id="${monster.id}" class="btn-check isEditing-visible btn btn-jade py-2 px-3" aria-label="Save">
              <i class="fa-solid fa-check"></i>
            </button>
            <button data-action="cancel" data-id="${monster.id}" class="btn-cancel isEditing-visible btn btn-lipstick py-2 px-3" aria-label="Cancel">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  return `
    <tr data-id="${monster.id}">
      <td class="p-3 font-semibold text-[var(--gold)]">${monster.name}</td>
      <td class="p-3 text-[var(--silver)]">${monster.type}</td>
      <td class="p-3" title="Level ${monster.dangerLevel}">${monster.dangerSkulls}</td>
      <td class="p-3 text-[var(--silver)]">${monster.year}</td>
      <td class="p-3">
        <div class="flex justify-end gap-2">
          <button data-action="edit" data-id="${monster.id}" class="btn-edit isEditing-hidden btn btn-gold py-2 px-3" aria-label="Edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button data-action="delete" data-id="${monster.id}" class="btn-delete isEditing-hidden btn btn-lipstick py-2 px-3" aria-label="Delete">
            <i class="fa-solid fa-skull"></i>
          </button>
        </div>
      </td>
    </tr>
  `;

}