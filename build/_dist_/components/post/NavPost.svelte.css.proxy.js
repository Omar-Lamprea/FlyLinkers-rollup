// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Header-nav.svelte-1x5l75b label.svelte-1x5l75b,.Header-nav.svelte-1x5l75b.svelte-1x5l75b{cursor:pointer}i.svelte-1x5l75b.svelte-1x5l75b,span.svelte-1x5l75b.svelte-1x5l75b{color:var(--main-color)}.disabled.svelte-1x5l75b i.svelte-1x5l75b,.disabled.svelte-1x5l75b span.svelte-1x5l75b,.disabled.svelte-1x5l75b.svelte-1x5l75b{color:grey;cursor:default}@media screen and (max-width:768px){.hidden.svelte-1x5l75b.svelte-1x5l75b{display:none}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}