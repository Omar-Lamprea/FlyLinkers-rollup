// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-1wpps5d i.svelte-1wpps5d{color:#fff;text-decoration:none}.dropdown-toggle.svelte-1wpps5d.svelte-1wpps5d:empty:after{content:normal}.dropdown-item.svelte-1wpps5d.svelte-1wpps5d:active{background-color:var(--main-color)}.Header-nav-user.svelte-1wpps5d img.svelte-1wpps5d{border-radius:50%;height:2rem;-o-object-fit:cover;object-fit:cover;width:2rem}.notification.svelte-1wpps5d.svelte-1wpps5d{position:relative}.notificacions-chats.svelte-1wpps5d.svelte-1wpps5d{background-color:#d70000;border-radius:50%;color:#fff;font-size:.8rem;font-weight:500;height:20px;left:14px;position:absolute;text-align:center;top:6px;width:20px}@media screen and (max-width:1200px){.nav-container.svelte-1wpps5d.svelte-1wpps5d{margin:.5rem 0}}@media screen and (max-width:480px){.hidden.svelte-1wpps5d.svelte-1wpps5d{display:none}.icon.svelte-1wpps5d.svelte-1wpps5d{font-size:1.7rem!important;margin:0 .8rem!important}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}