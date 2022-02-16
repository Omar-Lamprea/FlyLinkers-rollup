// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Experience.svelte-8oqcys.svelte-8oqcys{color:#6b6b6b}.Experience-content.svelte-8oqcys p.svelte-8oqcys{margin:1rem 0}.Experience-content.svelte-8oqcys span.svelte-8oqcys,.Experience-title.svelte-8oqcys.svelte-8oqcys{color:var(--main-color)}.Experience-title.svelte-8oqcys.svelte-8oqcys{font-weight:600}.addExperiences.svelte-8oqcys p.svelte-8oqcys{font-size:1.5rem;font-weight:700}.addExperiences.svelte-8oqcys i.svelte-8oqcys{color:#199aaf;cursor:pointer;font-size:3rem}.updateExperience.svelte-8oqcys.svelte-8oqcys{position:absolute;right:5px;top:0}.updateExperience.svelte-8oqcys i.svelte-8oqcys{color:var(--main-color);cursor:pointer;font-size:1.3rem}.deleteExperience.svelte-8oqcys.svelte-8oqcys{position:absolute;right:5px;top:50px}.deleteExperience.svelte-8oqcys i.svelte-8oqcys{color:#c61f1f;cursor:pointer;font-size:1.3rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}