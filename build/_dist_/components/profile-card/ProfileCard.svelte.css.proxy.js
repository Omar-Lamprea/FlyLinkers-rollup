// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Profile-card.svelte-svq0p9.svelte-svq0p9{padding-bottom:0}.Profile-card-info.svelte-svq0p9.svelte-svq0p9{border-bottom:1px solid var(--main-color);width:100%}.Profile-card-info.svelte-svq0p9 span.svelte-svq0p9{font-size:18px;font-weight:400}.Profile-card-info.svelte-svq0p9 p.svelte-svq0p9{font-size:14px}.Profile-card-info.svelte-svq0p9 p span.svelte-svq0p9{color:var(--main-color);font-size:inherit;font-weight:700}.Profile-card-user.svelte-svq0p9.svelte-svq0p9{color:var(--main-color)}.Profile-card-user.svelte-svq0p9 h2.svelte-svq0p9{font-size:18px}.Profile-card-edit.svelte-svq0p9.svelte-svq0p9{margin:1rem}.Profile-card-edit.svelte-svq0p9 i.svelte-svq0p9{color:var(--main-color)}.Profile-edit-profile.svelte-svq0p9.svelte-svq0p9{color:grey;font-weight:600}@media screen and (max-width:768px){.Profile-card.svelte-svq0p9.svelte-svq0p9{margin-top:4rem}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}