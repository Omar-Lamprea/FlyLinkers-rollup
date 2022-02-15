// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Hastag.svelte-my1t9e ul.svelte-my1t9e{padding:0 3rem}.Hastag.svelte-my1t9e li.svelte-my1t9e{list-style:none;margin:.8rem 0}.Hastag.svelte-my1t9e span.svelte-my1t9e{color:grey;font-weight:400}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}