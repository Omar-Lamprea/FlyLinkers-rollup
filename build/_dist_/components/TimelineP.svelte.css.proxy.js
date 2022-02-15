// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Background-post-profile.svelte-9igu1v.svelte-9igu1v{background-color:#efefef;border-radius:1rem;margin-bottom:1.2rem;padding:1.2rem 2rem}.Background-post-profile.svelte-9igu1v p.svelte-9igu1v{color:var(--main-color);font-weight:600}@media screen and (max-width:768px){.Background-post-profile.svelte-9igu1v.svelte-9igu1v{padding:1.2rem 1rem}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}