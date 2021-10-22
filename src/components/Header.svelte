<script>
	import { Router, Link, Route } from "svelte-routing";
</script>

<style>
  .Header{
    background-color: var(--main-color);
    color: white;
    position: fixed;
  }
  .Header-logo h1{
    font-weight: 100;
  }
  .Header-input input{
    border-radius: .5rem;
    border: none;
    padding: .3rem;
    width: 15rem;
    margin: 0;
  }

  .Header-content a{
    text-decoration: none;
    color: #fff;
  }
</style>

<div class="Header container-fluid">
  <div class="Header-container container">
    <div class="Header-content d-flex align-items-center justify-content-between">
      <div class="Header-logo d-flex align-items-center p-3">
        <!-- <a href="/" class="d-flex align-items-center">
          <img src="./img/flylinkers-logo-blanco.png" alt="logo" width="100">
          <h1>FlyLinkers</h1>
        </a> -->
        <Router>
          <Link to="/" class="d-flex align-items-center">
            <img src="./img/flylinkers-logo-blanco.png" alt="logo" width="100">
            <h1>FlyLinkers</h1>
          </Link>
        </Router>
      </div>
      <div class="Header-input">
        <input type="text" placeholder="Search">
      </div>
      
      <div class="Header-nav d-flex">
        <div class="Header-nav-home mx-3 fs-3">
          <a href="/">
            <i class="fas fa-home"></i>
          </a>
        </div>
        <div class="Header-nav-user-plus mx-3 fs-3">
          <a href="/">
            <i class="fas fa-user-plus"></i>
          </a>
        </div>
        <div class="Header-nav-briefcase mx-3 fs-3">
          <a href="/">
            <i class="fas fa-briefcase"></i>
          </a>
        </div>
        <div class="Header-nav-comment mx-3 fs-3">
          <a href="/">
            <i class="fas fa-comment"></i>
          </a>
        </div>
        <div class="Header-nav-bell mx-3 fs-3">
          <a href="/">
            <i class="fas fa-bell"></i>
          </a>
        </div>
        <div class="Header-nav-user mx-3 fs-3">
          <a href="/">
            <i class="fas fa-user"></i>
          </a>
        </div>
        <div class="Header-nav-grip-vertical mx-3 fs-3">
          <a href="/">
            <i class="fas fa-grip-vertical"></i>
          </a>
        </div>
        <div class="Header-nav-calendar-week mx-3 fs-3">
          <a href="/">
            <i class="fas fa-calendar-week"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>