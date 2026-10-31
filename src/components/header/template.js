export default function getTemplate(title) {
  return `
    <header class="text-center mb-10">
      <p class="text-[var(--silver)] tracking-widest text-sm">A creature feature archive</p>
      <h1 class="marquee text-6xl md:text-8xl my-3">${title}</h1>
      <p class="text-[var(--silver)] italic">
        They rose from the deep between 1950 and 1969. Someone had to keep the records.
      </p>
    </header>
  `;
}