// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Add-post.svelte-1v7lf9i textarea.svelte-1v7lf9i{word-wrap:break-word;margin-top:.5rem;overflow-y:auto;padding:.5rem;width:100%}.Add-post.svelte-1v7lf9i textarea.svelte-1v7lf9i:focus-visible{outline-color:var(--main-color)}.characterCount.svelte-1v7lf9i.svelte-1v7lf9i{bottom:0;color:red;font-size:12px;position:absolute;right:10px}.characterCount-active.svelte-1v7lf9i.svelte-1v7lf9i{color:grey}.btn-post.svelte-1v7lf9i.svelte-1v7lf9i{background-color:#199aaf;color:#fefefe;width:50%}.urlMeta.svelte-1v7lf9i.svelte-1v7lf9i{border:1px solid var(--main-color);border-radius:1rem;margin:1rem;padding:1rem}.urlMeta.svelte-1v7lf9i img.svelte-1v7lf9i{margin-top:1rem;width:100%}.urlMeta.svelte-1v7lf9i i.svelte-1v7lf9i{color:red;cursor:pointer;display:flex;justify-content:end;padding:.2rem}.boxHome.svelte-1v7lf9i.svelte-1v7lf9i{background-color:#efefef}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}