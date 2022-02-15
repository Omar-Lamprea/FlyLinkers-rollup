// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap\");@import url(\"https://fonts.googleapis.com/css2?family=Pacifico&display=swap\");:root{--main-color:#199aaf }body{background-color:#fafafa;color:#262626}body,h1,h2,h3,h4,h5,h6,p{margin:0;padding:0}a h1{color:#fafafa}a:hover{text-decoration:none}.Default-containers{background-color:#fafafa;border:.5px solid var(--main-color);border-radius:1rem;margin-bottom:1.2rem;padding:1.2rem 2rem}.Default-containers-grey{background-color:#efefef;border:none;border-radius:1rem;margin-bottom:1.2rem;padding:1.2rem 2rem}.btn-flylinkers{border:1px solid #199aaf;border-radius:.5rem;color:grey}.btn-flylinkers:hover{background-color:inherit;border:1px solid #199aaf;color:var(--main-color)}main.svelte-1a9t7ki{padding-bottom:5rem;padding-top:14rem}@media screen and (max-width:768px){main.svelte-1a9t7ki{padding-top:9rem}.Default-containers,.Default-containers-grey{padding:1rem 0}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}