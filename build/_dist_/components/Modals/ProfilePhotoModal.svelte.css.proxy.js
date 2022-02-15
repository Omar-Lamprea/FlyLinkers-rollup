// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".photoLoaded.svelte-7bg6c8{display:none;height:350px;margin:1rem auto;max-height:500px;max-width:80%;-o-object-fit:cover;object-fit:cover}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}