// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Group.svelte-1vzc48p ul.svelte-1vzc48p{padding:0 1rem}.Group.svelte-1vzc48p a.svelte-1vzc48p{color:grey}.Group.svelte-1vzc48p li.svelte-1vzc48p{list-style:none;margin:.8rem 0}.Group.svelte-1vzc48p i.svelte-1vzc48p{font-size:20px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}