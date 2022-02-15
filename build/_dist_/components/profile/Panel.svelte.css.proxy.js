// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Panel.svelte-1awuuu9.svelte-1awuuu9{color:#6b6b6b}.Panel-content.svelte-1awuuu9.svelte-1awuuu9{align-items:center;display:flex;flex-direction:column;justify-content:center;margin:.5rem 1rem;min-width:10rem;width:180px}.Panel-content.svelte-1awuuu9 h3.svelte-1awuuu9,.Panel-title.svelte-1awuuu9.svelte-1awuuu9,i.svelte-1awuuu9.svelte-1awuuu9{color:var(--main-color);font-weight:600}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}