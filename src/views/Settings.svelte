<script>
  import {onMount} from 'svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import InfoUser from '../components/settings-user/InfoUser.svelte'
  import InfoProfile from '../components/settings-user/InfoProfile.svelte'
  import Experience from '../components/profile/Experience.svelte'
  import Language from '../components/settings-user/Language.svelte'
  // import InfoExperiences from '../components/settings-user/InfoExperiences.svelte'
  import Loader from '../components/Loader.svelte'

  import {translate} from '../js/translate'

  const urlAPI = 'https://api.flylinkers.com'

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
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${localStorage.getItem('userId')}`)
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

<div class="row">
  <div class="col-12 col-lg-9 mt-3 mt-md-0">
    {#if dataProfile && getUser}
      <InfoUser {urlAPI} {dataUser}/>
      <InfoProfile {urlAPI} {dataProfile}/>
      <Language/>
      <Experience {urlAPI} {id} {experiences} {userProfile}/>
    {:else}
      <Loader/>
    {/if}
  </div>
  <SidebarRight {urlAPI}/>
</div>