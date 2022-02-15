// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".modal-content.svelte-1r8fjdo.svelte-1r8fjdo{height:90vh;overflow:auto}form.svelte-1r8fjdo input.svelte-1r8fjdo,select.svelte-1r8fjdo.svelte-1r8fjdo,textarea.svelte-1r8fjdo.svelte-1r8fjdo{margin-bottom:1rem;width:100%}.dates.svelte-1r8fjdo .start.svelte-1r8fjdo,.end.svelte-1r8fjdo.svelte-1r8fjdo{width:100%}form.svelte-1r8fjdo input[type=checkbox].svelte-1r8fjdo{margin:0 1rem 0 .5rem;transform:scale(2);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}