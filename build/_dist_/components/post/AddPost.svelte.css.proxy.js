// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Add-post.svelte-1jepya9 textarea.svelte-1jepya9{word-wrap:break-word;margin-top:.5rem;overflow-y:auto;padding:.5rem;width:100%}.Add-post.svelte-1jepya9 textarea.svelte-1jepya9:focus-visible{outline-color:var(--main-color)}.characterCount.svelte-1jepya9.svelte-1jepya9{bottom:0;color:red;font-size:12px;position:absolute;right:10px}.characterCount-active.svelte-1jepya9.svelte-1jepya9{color:grey}.btn-post.svelte-1jepya9.svelte-1jepya9{background-color:#199aaf;color:#fefefe;width:50%}.urlMeta.svelte-1jepya9.svelte-1jepya9{border:1px solid var(--main-color);border-radius:1rem;margin:1rem;padding:1rem}.urlMeta.svelte-1jepya9 img.svelte-1jepya9{margin-top:1rem;width:100%}.urlMeta.svelte-1jepya9 i.svelte-1jepya9{color:red;cursor:pointer;display:flex;justify-content:end;padding:.2rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}