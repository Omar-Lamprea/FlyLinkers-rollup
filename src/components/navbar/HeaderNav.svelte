<script>
  import { Router, Link, Route } from "svelte-routing";


  const logOut = ()=>{
    localStorage.clear();
    const redirect = 'http://localhost:3000/'
    window.location.href = redirect
  }
</script>

<style>
  div i{
    text-decoration: none;
    color: #fff;
  }
  .dropdown-toggle:empty::after{
    content: initial
  }
  .dropdown-item:active{
    background-color: var(--main-color);
  }

</style>



  <Router>
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
    <div class="Header-nav-grip-vertical mx-3 fs-3">
      <Link to="/">
        <div class="dropdown">
            <i class="fas fa-grip-vertical dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false" ></i>
          <ul class="dropdown-menu" aria-labelledby="settings">
            <li><span class="dropdown-item">Settings</span></li>
            <li><span class="dropdown-item" on:click={logOut}>Log Out</span></li>
          </ul>
        </div>
        
      </Link>
    </div>
    <div class="Header-nav-calendar-week mx-3 fs-3">
      <Link to="/">
        <i class="fas fa-calendar-week"></i>
      </Link>
    </div>
  </Router>
