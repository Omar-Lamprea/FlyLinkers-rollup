// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Experience.svelte-1gfb5zc.svelte-1gfb5zc{color:#6b6b6b}.Experience-content.svelte-1gfb5zc p.svelte-1gfb5zc{margin:1rem 0}.Experience-content.svelte-1gfb5zc span.svelte-1gfb5zc,.Experience-title.svelte-1gfb5zc.svelte-1gfb5zc{color:var(--main-color)}.Experience-title.svelte-1gfb5zc.svelte-1gfb5zc{font-weight:600}.addExperiences.svelte-1gfb5zc p.svelte-1gfb5zc{font-size:1.5rem;font-weight:700}.addExperiences.svelte-1gfb5zc i.svelte-1gfb5zc{color:#199aaf;cursor:pointer;font-size:3rem}.updateExperience.svelte-1gfb5zc.svelte-1gfb5zc{right:5px;top:0}.updateExperience.svelte-1gfb5zc i.svelte-1gfb5zc{color:var(--main-color);cursor:pointer;font-size:1.5rem}.deleteExperience.svelte-1gfb5zc.svelte-1gfb5zc{right:5px;top:50px}.deleteExperience.svelte-1gfb5zc i.svelte-1gfb5zc{color:#c61f1f;cursor:pointer;font-size:1.5rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}