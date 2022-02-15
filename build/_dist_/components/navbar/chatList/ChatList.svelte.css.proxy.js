// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".chatList.svelte-1e3lw2e.svelte-1e3lw2e{cursor:pointer}.chatList.svelte-1e3lw2e span.svelte-1e3lw2e{width:14rem}.chatList.svelte-1e3lw2e img.svelte-1e3lw2e{border-radius:30px;height:50px;margin-right:1rem;-o-object-fit:cover;object-fit:cover;width:50px}.chatList.svelte-1e3lw2e p.svelte-1e3lw2e{color:var(--main-color);font-weight:700}.chatList.svelte-1e3lw2e .messageText.svelte-1e3lw2e{color:grey;font-weight:inherit}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}