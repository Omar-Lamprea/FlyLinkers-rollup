<script>
  import { Router, Link, Route } from "svelte-routing";
  import HeaderNav from "./navbar/HeaderNav.svelte";
  import HeaderNavMobile from "./navbar/HeaderNavMobile.svelte"
  import Loader from './Loader.svelte'

  export let photo, id;
  export let name = '', title = '', email = '', last_name = '', middle_name = '';
  export let urlLogOut, urlAPI;
  export let getUserMainToFirestore;

  let usersFound = false;

  const makeSearch = async (value) =>{
    const response = await fetch(`${urlAPI}/friend/search/?search=${value}`)
    const content = await response.json()

    if (content.count > 0) {
      usersFound = content.results
    }else{
      usersFound = [{ details: 'User not found'}]
    }
  }

  let timeCountdown;
  const startSearch = (e) =>{
    const value = e.target.value
    clearTimeout(timeCountdown)

    if (value !== '') {
      searchList.classList.remove("d-none")
      timeCountdown = setTimeout(async () => {
        makeSearch(value)
        clearTimeout(timeCountdown)
      }, 1000);
    }else{
      usersFound = false;
      searchList.classList.add("d-none")
    }
    // if (e.key === "Enter") {
    //   makeSearch(value)
    // }
  }

  const viewUser = (email)=>{
    window.location.pathname = `profile/${email}`
  }

  document.addEventListener('click', e =>{
    if (e.target.id !== "searchList") {
      searchList.classList.add('d-none')
      usersFound = false;
    }
  })

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
  .Header-input{
    position: relative;
  }
  .dropdown-search{
    position: absolute;
    color: black;
    width: max-content;
    min-width: 100%;
    max-width: max-content;
    margin: 0;
    margin-top: 0.1rem;
    border: 1px solid #d5d5d5;
    background-color: white;
    border-radius: 5px;
    padding: 4px 0;
  }
  .dropdown-search li{
    list-style: none;
    cursor: pointer;
  }
  .dropdown-search li h6{
    color: var(--main-color);
    font-weight: bold;
  }
  .dropdown-search li img{
    width: 65px;
    height: 65px;
    border-radius: 30%;
    object-fit: cover;
    margin-right: 0.5rem;
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
        <input type="text" placeholder="Search" on:keyup={startSearch}>
        <ul class="dropdown-search d-none" id="searchList">
          {#if usersFound}
             {#each usersFound as user}
                {#if user.name}
                  <li on:click={viewUser(user.email)}>
                    <span class="dropdown-item d-flex align-items-center">
                      <img src="{urlAPI}{user.photo}" alt="img">
                      <div class="userInfo">
                        <h6>{user.name} {user.last_name}</h6>
                        <p style="color: grey;">{user.title} </p>
                        <p style="color: grey;">{user.email}</p>
                      </div>
                    </span>
                  </li>
                {:else}
                <li>
                  <span class="dropdown-item">
                    {user.details}
                  </span>
                </li>
                {/if}
             {/each}
            {:else}
              <Loader/>
          {/if}
        </ul>
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