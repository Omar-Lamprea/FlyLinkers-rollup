// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".burger-menu.svelte-13geh1i.svelte-13geh1i{cursor:pointer}.burger-menu.svelte-13geh1i i.svelte-13geh1i:after{content:inherit}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}