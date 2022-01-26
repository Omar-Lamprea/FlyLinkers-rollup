<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'

  const urlUser = window.location.pathname
  // const urluserProfile = urlUser.slice(9)
  const urluserProfile = localStorage.getItem('visitProfile')

  export let userMain, urlAPI;

  let userProfile;
  let dataProfile;
  let id, name, last_name, title, email , photo;


  const getUser = async()=>{
    const response = await fetch(`${urlAPI}/user/create/?email=${urluserProfile}`)
    const content = await response.json()
    userProfile = content[0]
    id = userProfile.id
    name = userProfile.name
    last_name = userProfile.last_name
    title = userProfile.title
    email = userProfile.email
    photo = userProfile.photo

    getUserProfile(userProfile.id)
  }

  const getUserProfile = async(id)=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
    const content = await response.json()
    dataProfile = content[0]
  }

  getUser()

  // export let name, title, email, photo, id, last_name, middle_name;

</script>

<div class="row">
  {#if dataProfile}
    <TimelineP {name} {last_name} {title} {email} {photo} {id} {userMain} {urlAPI}/>
    <SidebarRight {id} {urlAPI}/>
  {/if}
</div>