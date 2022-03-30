<script>
  import {onMount} from 'svelte'
  import Loader from '../Loader.svelte'
  export let urlAPI;

  export let dataProfile;

  const update = async()=>{
    const response = await fetch(`${urlAPI}/user/profile/?user=${localStorage.getItem('userId')}`,{
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        about: aboutMe.value
      })
    })
    const content = await response.json()
    if (response.ok) {
      successProfile.classList.remove('d-none')
      setTimeout(() => {
        dropdownUserInfo()
      }, 500);
    }else{
      failProfile.classList.remove('d-none')
    }
  }

  const dropdownUserInfo = ()=>{
    toggleDropDescriptionInfo.classList.toggle('dropdown-active')
    containerDescription.classList.toggle('container-active')
  }

  onMount(()=>{
    // getdataProfile()
  })
</script>

<style>

  .Default-containers{
    overflow: hidden;
    height: 4rem;
    transition: all ease-in .5s;
  }
  .container-active{
    height: max-content;
  }
  .header-description-userMenu{
    margin-bottom: 1rem;
  }
  .header-description-userMenu i{
    color: var(--main-color);
    font-size: 1.5rem;
    transition: all ease-in .2s;
  }
  .dropdown-active{
    transform: rotate(180deg);
  }
  .section-title{
    color: var(--main-color);
    font-weight: 700;
  }
  .btn-post{
    width: 50%;
    background-color: #199aaf;
    color: #fefefe;
  }
  form input, form textarea{
    border-radius: 5px;
    border: 1px solid var(--main-color);
    width: 100%;
  }
  .aboutMe{
    width: 100%;
  }
  .icon-success{
    color: #ffffff;
    font-size: 1.5rem;
    background-color: #179aaf;
    border-radius: 50px;
    display: flex;
    align-self: center;
    padding: 7px 9px;
  }
  .fail{
    background-color: #af1717;
  }
</style>

<div id="containerDescription" class="Default-containers container-active">
  <div class="header-description-userMenu d-flex justify-content-between align-items-center">
    <p class="section-title">About me</p>
    <i id="toggleDropDescriptionInfo" class="fa-solid fa-square-caret-down dropdown-active" on:click={dropdownUserInfo}></i>
  </div>

  <!-- {#if dataProfile} -->
     <form action="" class="d-flex flex-column px-3 px-md-0">
       <div class="about mb-3 d-md-flex justify-content-between">
         <div class="aboutMe">
           <label for="aboutMe">About Me*</label>
           <textarea name="aboutMe" id="aboutMe" rows="3" value={dataProfile.about}></textarea>
         </div>
       </div>
       
       <i id="successProfile" class="fa-solid fa-check text-center icon-success d-none"></i>
       <i id="failProfile" class="fa-solid fa-bug text-center icon-success fail d-none"></i>
       <button type="submit" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" on:click|preventDefault={update}>Save</button>
     </form>
  <!-- {:else}
    <Loader />
  {/if} -->
</div>