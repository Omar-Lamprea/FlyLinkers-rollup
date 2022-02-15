// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-cg5i0q i.svelte-cg5i0q{color:#fff;text-decoration:none}.dropdown-toggle.svelte-cg5i0q.svelte-cg5i0q:empty:after{content:normal}.dropdown-item.svelte-cg5i0q.svelte-cg5i0q:active{background-color:var(--main-color)}.Header-nav-user.svelte-cg5i0q img.svelte-cg5i0q{border-radius:50%;height:2rem;-o-object-fit:cover;object-fit:cover;width:2rem}.notification.svelte-cg5i0q.svelte-cg5i0q{position:relative}.notificacions-chats.svelte-cg5i0q.svelte-cg5i0q{background-color:#d70000;border-radius:50%;color:#fff;font-size:.8rem;font-weight:500;height:20px;left:14px;position:absolute;text-align:center;top:6px;width:20px}@media screen and (max-width:480px){.hidden.svelte-cg5i0q.svelte-cg5i0q{display:none}.icon.svelte-cg5i0q.svelte-cg5i0q{font-size:1.7rem!important;margin:0 .8rem!important}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}