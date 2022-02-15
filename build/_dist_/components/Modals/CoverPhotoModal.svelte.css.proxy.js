// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".coverPhotoLoaded.svelte-1ulbmgd{display:none;height:350px;margin:1rem auto;max-height:400px;max-width:80%;-o-object-fit:cover;object-fit:cover}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}