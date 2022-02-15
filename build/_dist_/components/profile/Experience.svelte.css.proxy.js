// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Experience.svelte-1g8ohdw.svelte-1g8ohdw{color:#6b6b6b}.Experience-content.svelte-1g8ohdw p.svelte-1g8ohdw{margin:1rem 0}.Experience-content.svelte-1g8ohdw span.svelte-1g8ohdw,.Experience-title.svelte-1g8ohdw.svelte-1g8ohdw{color:var(--main-color)}.Experience-title.svelte-1g8ohdw.svelte-1g8ohdw{font-weight:600}.addExperiences.svelte-1g8ohdw p.svelte-1g8ohdw{font-size:1.5rem;font-weight:700}.addExperiences.svelte-1g8ohdw i.svelte-1g8ohdw{color:#199aaf;font-size:3rem}.updateExperience.svelte-1g8ohdw.svelte-1g8ohdw{position:absolute;right:5px;top:0}.updateExperience.svelte-1g8ohdw i.svelte-1g8ohdw{color:var(--main-color);cursor:pointer;font-size:1.3rem}.deleteExperience.svelte-1g8ohdw.svelte-1g8ohdw{position:absolute;right:5px;top:50px}.deleteExperience.svelte-1g8ohdw i.svelte-1g8ohdw{color:#c61f1f;cursor:pointer;font-size:1.3rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}