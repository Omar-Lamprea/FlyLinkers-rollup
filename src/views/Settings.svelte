<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import {onMount} from 'svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import InfoUser from '../components/settings-user/InfoUser.svelte'
  import InfoProfile from '../components/settings-user/InfoProfile.svelte'
  import Experience from '../components/profile/Experience.svelte'
  import Language from '../components/settings-user/Language.svelte'
  // import InfoExperiences from '../components/settings-user/InfoExperiences.svelte'
  import Loader from '../components/Loader.svelte'
  import {translate} from '../js/translate'
  import DeleteAccount from '../components/Modals/DeleteAccount.svelte';

  const urlAPI = 'https://api.flylinkers.com'
  const userMain = localStorage.getItem('userId')

  let dataUser = false
  const getUser = async ()=>{
    const response = await fetch(`${urlAPI}/user/create/?id=${localStorage.getItem('userId')}`)
    const content = await response.json()
    if (response.ok) {
      dataUser = content[0]
    }
  }

  let dataProfile = false
  let id = parseInt(localStorage.getItem('userId')), experiences, userProfile
  const getProfile = async ()=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${userMain}&main_user=${userMain}`)
    const content = await response.json()
    if (response.ok) {
      dataProfile = content[0]
      experiences = dataProfile.experiences
      userProfile = dataProfile.id
      // console.log(dataProfile);
    }
  }

  onMount(async()=>{
    await getUser()
    await getProfile()
    translate()
  })
</script>

<style>
  .btn-home{
    background-color: var(--main-color);
    color: #fff;
    border-radius: 5px;
    border: none;
    padding: .5rem;
    width: 20rem;
  }
  .btn-home:hover{
    background-color: var(--hover-main-color);
  }
  .delete-account button{
    background-color: transparent;
    border: none;
    color: #c61f1f;
    font-weight: 700;
  }
</style>

<div class="row">
  <div class="col-12 col-lg-9 mt-3 mt-md-0 d-flex flex-column">
    {#if dataProfile && getUser}
      <InfoUser {urlAPI} {dataUser}/>
      <InfoProfile {urlAPI} {dataProfile}/>
      <Language/>
      <Experience {urlAPI} {id} {experiences} {userProfile}/>

      <div class="delete-account d-flex justify-content-end mx-3">
        <button class="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#deleteAccount{id}">
          <i class="fa-solid fa-user-xmark mx-1"></i>
          <p>Delete account</p>
        </button>
      </div>
      <a class="d-flex align-self-center" href="/" use:link use:active>
        <button data-translate="finish-settings" class="btn-home">Finish</button>
      </a>
    {:else}
      <Loader/>
    {/if}
  </div>
  <SidebarRight {urlAPI}/>
</div>

<DeleteAccount {id} {urlAPI}/>