<script>
  // import { Router, Link, Route } from "svelte-spa-router";
</script>

<style>
  .burger-menu{
    cursor: pointer;
    /* display: none; */
  }
  .burger-menu i::after{
    content: inherit;
  }
  .burger-menu div{
    display: flex;
    justify-content: center;
  }
</style>

<nav class="burger-menu">
  <i class="fas fa-bars dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false" ></i>
  <!-- <Router>
    <ul class="dropdown-menu" aria-labelledby="settings">
      <div class="Header-nav-home mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-home"></i>
        </Link>
      </div>
      <div class="Header-nav-user-plus mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-user-plus"></i>
        </Link>
      </div>
      <div class="Header-nav-briefcase mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-briefcase"></i>
        </Link>
      </div>
      <div class="Header-nav-comment mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-comment"></i>
        </Link>
      </div>
      <div class="Header-nav-bell mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-bell"></i>
        </Link>
      </div>
      <div class="Header-nav-user mx-3 fs-3">
        <Link to="/profile">
          <i class="fas fa-user"></i>
        </Link>
      </div>
      <div class="Header-nav-calendar-week mx-3 fs-3">
        <Link to="/">
          <i class="fas fa-calendar-week"></i>
        </Link>
      </div>
    </ul>
  </Router> -->
</nav>