// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".dropdown.svelte-vkg9ez.svelte-vkg9ez{cursor:pointer}.dropdown-toggle.svelte-vkg9ez.svelte-vkg9ez:empty:after{content:normal}.dropdown-item.svelte-vkg9ez.svelte-vkg9ez:active{background-color:var(--main-color)}.dropdown-item.svelte-vkg9ez.svelte-vkg9ez{align-items:center;display:flex;justify-content:space-between}.dropdown-item.svelte-vkg9ez img.svelte-vkg9ez{border:1px solid var(--main-color);border-radius:50%;height:50px;-o-object-fit:cover;object-fit:cover;padding:.1rem;width:50px}.notifications.svelte-vkg9ez.svelte-vkg9ez{background-color:#d70000;border-radius:50%;color:#fff;font-size:.8rem;font-weight:500;height:20px;left:14px;position:absolute;text-align:center;top:6px;width:20px}.userData.svelte-vkg9ez.svelte-vkg9ez{cursor:pointer}.btns-request.svelte-vkg9ez.svelte-vkg9ez{display:flex;flex-direction:column}.btn-request.svelte-vkg9ez.svelte-vkg9ez{background-color:#fefefe;border:1px solid var(--main-color);border-radius:2rem;color:#000;margin:.5rem 0;padding:.5rem 1rem}.btn-success.svelte-vkg9ez.svelte-vkg9ez:hover{background-color:var(--main-color);color:#fefefe}.btn-decline.svelte-vkg9ez.svelte-vkg9ez:hover{background-color:#de4848;border:1px solid #de4848;color:#fefefe}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}