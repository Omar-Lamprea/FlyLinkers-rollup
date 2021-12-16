<script>
  import { Router, Link, Route } from "svelte-routing";
  import HeaderNav from "./navbar/HeaderNav.svelte";
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
</style>

<div class="Header container-fluid">
  <div class="Header-container container">
    <div class="Header-content d-flex align-items-center justify-content-between">

      <div class="Header-logo d-flex align-items-center p-3">
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
        <HeaderNav/>
      </div>

    </div>
  </div>
</div>