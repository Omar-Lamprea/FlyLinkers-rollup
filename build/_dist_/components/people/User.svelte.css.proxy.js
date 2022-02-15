// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".User.svelte-2pwqh.svelte-2pwqh{border-bottom:1px solid var(--main-color);cursor:pointer}.User-detail.svelte-2pwqh.svelte-2pwqh{color:var(--main-color);font-weight:700;margin-left:1rem}.User-detail.svelte-2pwqh span.svelte-2pwqh{color:grey;font-size:.7rem;font-weight:500}.User-photo.svelte-2pwqh.svelte-2pwqh{height:60px;width:60px}.User-photo.svelte-2pwqh img.svelte-2pwqh{border:2px solid var(--main-color);border-radius:30%;height:100%;-o-object-fit:cover;object-fit:cover;padding:.1rem;width:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}