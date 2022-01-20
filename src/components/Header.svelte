<script>
  import { Router, Link, Route } from "svelte-routing";
  import HeaderNav from "./navbar/HeaderNav.svelte";
  import HeaderNavMobile from "./navbar/HeaderNavMobile.svelte"

  export let photo, id;
  export let name = '', title = '', email = '', last_name = '', middle_name = '';
  export let urlLogOut, urlAPI;
  export let getUserMainToFirestore;
</script>

<style>
  .Header{
    background-color: var(--main-color);
    color: white;
    position: fixed;
    z-index: 1000;
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
  @media screen and (max-width: 768px){
    .Header-input input{
    width: 90%
    }
    .Header h1 {
      display: none;
    }
  }

</style>

<div class="Header container-fluid">
  <div class="Header-container container">
    <div class="Header-content d-flex align-items-center justify-content-between">

      <div class="Header-logo d-flex align-items-center px-3">
        <Router>
          <Link to="/" class="d-flex align-items-center">
            <img src="../img/flylinkers-logo-blanco.png" alt="logo" width="100">
            <h1>FlyLinkers</h1>
          </Link>
        </Router>
      </div>

      <div class="Header-input">
        <input type="text" placeholder="Search">
      </div>

      {#if window.innerWidth > 920}
        <div class="Header-nav d-flex">
          <HeaderNav {photo} {id} {urlLogOut} {urlAPI} {getUserMainToFirestore}/>
        </div>
      {:else}
        <div class="Header-menu fs-3">
          <HeaderNavMobile/>
        </div>
      {/if}


    </div>
  </div>
</div>