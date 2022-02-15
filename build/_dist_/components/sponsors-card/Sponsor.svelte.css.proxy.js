// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Sponsor.svelte-15vjfvm.svelte-15vjfvm{border-bottom:1px solid var(--main-color)}.Sponsor-title.svelte-15vjfvm.svelte-15vjfvm{color:var(--main-color);font-weight:600}.Sponsor-logo.svelte-15vjfvm img.svelte-15vjfvm{width:50%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}