// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Profile-card-avatar.svelte-1tdigc9 img.svelte-1tdigc9{border:1px solid var(--main-color);border-radius:50%;cursor:pointer;height:100px;margin-top:-4rem;-o-object-fit:cover;object-fit:cover;padding:.2rem;width:100px}@media screen and (max-width:992px){.Profile-card-avatar.svelte-1tdigc9 img.svelte-1tdigc9{left:calc(50% - 50px);position:absolute}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}