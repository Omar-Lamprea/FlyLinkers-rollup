<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'

  import HeaderNav from "./navbar/HeaderNav.svelte";
  import Loader from './Loader.svelte'

  export let data;
  export let urlLogOut, urlAPI, urlImages;
  let photo = data.photo, id = data.id


  let usersFound = false;


  const makeSearch = async (value) =>{
    const response = await fetch(`${urlAPI}/friend/search/?search=${value}&user_id=${id}`)
    const content = await response.json()

    if (response.ok ) {
      if (content.count > 0) {
        usersFound = content.results
      }else{
        usersFound = [{ 
          details: 'User not found',
          detailsEs: "Usuario no encontrado"
        }]
      }
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
  const visitProfile = (email) =>{
    localStorage.setItem('visitProfile', email)
    window.location.reload()
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
    margin-bottom: 0.5rem;
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
    z-index: 100;
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
      width: 100%;
      margin-left: -.5rem;
    }
    .Header h1 {
      display: none;
    }
    .Header-logo{
      width: 110px;
    }
    .Header-content{
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
    .Header-logo img{
      width: 100%;
    }

    .Header-logo-search{
      width: 100%;
      justify-content: space-between;
    }
  }

</style>

<div class="Header container-fluid">
  <div class="Header-container container">
    <div class="Header-content d-flex flex-wrap align-items-center justify-content-center justify-content-xl-between">
      
      <div class="Header-logo-search d-flex justify-contens-between align-items-center">
        <div class="Header-logo d-flex align-items-center px-3">
          <a href="/" use:link use:active class="d-flex align-items-center">
            <img src="../img/flylinkers-logo-blanco.png" alt="logo" width="100">
            <h1>FlyLinkers</h1>
          </a>
        </div>
  
        <div class="Header-input ms-0 ms-xxl-5">
          <input data-translate="input-search" type="text" placeholder="Search" on:keyup={startSearch}>
          <ul class="dropdown-search d-none" id="searchList">
            {#if usersFound}
               {#each usersFound as user}
                  {#if user.name}
                    <li>
                      <a href="/profile/{user.username}" use:link use:active on:click={visitProfile(user.username)} class="d-flex">
                        <span class="dropdown-item d-flex align-items-center">
                          <img src="{urlImages}{user.photo}" alt="img">
                          <div class="userInfo">
                            <h6>{user.name} {user.last_name}</h6>
                            <p style="color: grey;">{user.title} </p>
                            <p style="color: grey;">{user.email}</p>
                          </div>
                        </span>
                      </a>
                    </li>
                  {:else}
                  <li>
                    {#if localStorage.getItem('lang') === "En"}
                      <span class="dropdown-item">
                        {user.details}
                      </span>
                    {:else}
                      <span class="dropdown-item">
                        {user.detailsEs}
                      </span>
                    {/if}
                  </li>
                  {/if}
               {/each}
              {:else}
                <Loader/>
            {/if}
          </ul>
        </div>

      </div>

      <div class="Header-nav d-flex m-auto m-lg-0">
        <HeaderNav {photo} {id} {urlLogOut} {urlAPI} {urlImages}/>
      </div>
    </div>
  </div>
</div>