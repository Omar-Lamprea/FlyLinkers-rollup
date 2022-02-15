// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Event.svelte-1kzlnii.svelte-1kzlnii{font-size:12px}.Event.svelte-1kzlnii h6.svelte-1kzlnii{color:var(--main-color);margin-left:.5rem}.Event-img.svelte-1kzlnii img.svelte-1kzlnii{border-radius:1rem;height:100%;-o-object-fit:cover;object-fit:cover;width:80%}.Event-link.svelte-1kzlnii.svelte-1kzlnii{font-size:11px}.Event-details.svelte-1kzlnii.svelte-1kzlnii{display:flex;flex-direction:column;justify-content:center;padding-left:0;padding-right:0}.Event.svelte-1kzlnii ul.svelte-1kzlnii{padding-left:0}.Event.svelte-1kzlnii li.svelte-1kzlnii{list-style:none}.Event.svelte-1kzlnii i.svelte-1kzlnii{color:var(--main-color);font-size:9px;margin-right:.1rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}