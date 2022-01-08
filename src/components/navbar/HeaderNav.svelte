<script>
  import { Router, Link, Route } from "svelte-routing";


  let notification = 2;

  const logOut = ()=>{
    localStorage.clear();
    const redirect = 'http://localhost:3000/'
    window.location.href = redirect
  }

  export let photo;


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
  .Header-nav-user img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .notification{
    position: relative;
  }
  .notifications{
    position: absolute;
    top: 6px;
    left: 14px;
    background-color: #d70000;
    border-radius: 50%;
    font-size: .8rem;
    font-weight: 500;
    height: 20px;
    width: 20px;
    text-align: center;
    color: white;
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
    <div class="Header-nav-bell mx-3 fs-3 notification" id="notification">
      <Link to="/">
        <div class="dropdown">
          <i class="fas fa-bell dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <div class="notifications">{notification}</div>
          <ul class="dropdown-menu" aria-labelledby="settings">
            <li><span class="dropdown-item">notifications....</span></li>
          </ul>
        </div>
      </Link>
    </div>
    <div class="Header-nav-user mx-3 fs-3">
      <Link to="/profile">
        {#if localStorage.getItem('profilePhoto')}
           <img src="{localStorage.getItem('profilePhoto')}" alt="">
        {:else}
          <img src="http://18.118.50.78:8000{photo}" alt="">
        {/if}
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
