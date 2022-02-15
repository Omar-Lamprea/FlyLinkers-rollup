// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Comments.svelte-1c8dgly span.svelte-1c8dgly{background-color:#80808021;color:grey;font-size:.8rem;font-weight:400;padding:.5rem 1rem;width:88%}.Comments-users.svelte-1c8dgly.svelte-1c8dgly{display:flex;justify-content:space-between;margin:0 0 .5rem .5rem}.Comments-users.svelte-1c8dgly img.svelte-1c8dgly{border:1px solid var(--main-color);border-radius:50%;height:40px;margin-right:.5rem;-o-object-fit:cover;object-fit:cover;padding:.1rem;width:40px}.Comments-users.svelte-1c8dgly span p.svelte-1c8dgly{color:var(--main-color);font-weight:600}.userInfo.svelte-1c8dgly .startTime.svelte-1c8dgly{color:grey;font-weight:inherit}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}