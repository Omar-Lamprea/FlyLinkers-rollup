// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".CoverPhoto.svelte-8ip6o5.svelte-8ip6o5{height:15rem;position:relative}.CoverPhoto.svelte-8ip6o5 img.svelte-8ip6o5{border-radius:1rem;cursor:pointer;height:inherit;-o-object-fit:cover;object-fit:cover;width:100%}.editCoverPhoto.svelte-8ip6o5.svelte-8ip6o5{background-color:#fff;border:none;border-radius:1rem;bottom:5px;font-weight:500;padding:.5rem 1rem;position:absolute;right:5px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}