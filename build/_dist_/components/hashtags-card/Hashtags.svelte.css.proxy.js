// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Hashtags.svelte-1714uyw h6.svelte-1714uyw{color:var(--main-color);padding:0 2rem}.Hashtags.svelte-1714uyw p.svelte-1714uyw{color:var(--main-color);color:grey;font-weight:600}.Hashtags-discover.svelte-1714uyw.svelte-1714uyw{border-top:1px solid var(--main-color)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}