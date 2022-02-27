// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Header.svelte-17jelq4.svelte-17jelq4{background-color:var(--main-color);color:#fff;position:fixed;z-index:1000}.Header-logo.svelte-17jelq4 h1.svelte-17jelq4{font-weight:100;margin-bottom:.5rem}.Header-input.svelte-17jelq4 input.svelte-17jelq4{border:none;border-radius:.5rem;margin:0;padding:.3rem;width:15rem}.Header-input.svelte-17jelq4.svelte-17jelq4{position:relative}.dropdown-search.svelte-17jelq4.svelte-17jelq4{background-color:#fff;border:1px solid #d5d5d5;border-radius:5px;color:#000;margin:.1rem 0 0;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content;min-width:100%;padding:4px 0;position:absolute;width:-webkit-max-content;width:-moz-max-content;width:max-content;z-index:100}.dropdown-search.svelte-17jelq4 li.svelte-17jelq4{cursor:pointer;list-style:none}.dropdown-search.svelte-17jelq4 li h6.svelte-17jelq4{color:var(--main-color);font-weight:700}.dropdown-search.svelte-17jelq4 li img.svelte-17jelq4{border-radius:30%;height:65px;margin-right:.5rem;-o-object-fit:cover;object-fit:cover;width:65px}@media screen and (max-width:768px){.Header-input.svelte-17jelq4 input.svelte-17jelq4{width:90%}.Header.svelte-17jelq4 h1.svelte-17jelq4{display:none}.Header-logo.svelte-17jelq4.svelte-17jelq4{width:110px}.Header-content.svelte-17jelq4.svelte-17jelq4{margin-bottom:.5rem;margin-top:.5rem}.Header-logo.svelte-17jelq4 img.svelte-17jelq4{width:100%}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}