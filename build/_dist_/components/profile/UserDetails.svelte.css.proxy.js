// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Profile-card.svelte-lxt76k.svelte-lxt76k.svelte-lxt76k{padding-bottom:0}.Profile-card-info.svelte-lxt76k.svelte-lxt76k.svelte-lxt76k{width:100%}.Profile-card-info.svelte-lxt76k span.svelte-lxt76k.svelte-lxt76k{font-size:18px;font-weight:400}.Profile-card-info.svelte-lxt76k p.svelte-lxt76k.svelte-lxt76k{font-size:14px}.Profile-card-info.svelte-lxt76k p.svelte-lxt76k span.svelte-lxt76k{color:var(--main-color);font-size:inherit;font-weight:700}.Profile-card-user.svelte-lxt76k.svelte-lxt76k.svelte-lxt76k{color:var(--main-color)}.Profile-card-user.svelte-lxt76k h2.svelte-lxt76k.svelte-lxt76k{font-size:18px}.Profile-description.svelte-lxt76k i.svelte-lxt76k.svelte-lxt76k{color:var(--main-color)}.Profile-description.svelte-lxt76k .edit-description.svelte-lxt76k.svelte-lxt76k{cursor:pointer;width:-webkit-max-content;width:-moz-max-content;width:max-content}.Profile-card-text.svelte-lxt76k i.svelte-lxt76k.svelte-lxt76k,.Profile-card-text.svelte-lxt76k span.svelte-lxt76k.svelte-lxt76k{color:var(--main-color);font-weight:700}.Profile-card-text.svelte-lxt76k.svelte-lxt76k.svelte-lxt76k{margin:2rem 0}.btn-outline-primary.svelte-lxt76k.svelte-lxt76k.svelte-lxt76k:disabled{border:1px solid grey;color:gray}.disabled.svelte-lxt76k i.svelte-lxt76k.svelte-lxt76k{color:gray}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}