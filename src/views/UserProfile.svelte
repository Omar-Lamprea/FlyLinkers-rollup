<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import Loader from '../components/Loader.svelte'
  import {onMount} from 'svelte'

  let userMain = localStorage.getItem('userId');
  export let params;
  const urlAPI = 'https://api.flylinkers.com'

  const urlUser = window.location.pathname
  // const urluserProfile = urlUser.slice(9)
  const urluserProfile = localStorage.getItem('visitProfile')

  let userProfile;
  let dataProfile;
  let id, name, last_name, title, email , photo;

  const getUser = async()=>{
    const response = await fetch(`${urlAPI}/user/create/?username=${params.user}`)
    const content = await response.json()
    userProfile = content[0]


    id = userProfile.id
    name = userProfile.name
    last_name = userProfile.last_name
    title = userProfile.title
    email = userProfile.email
    photo = userProfile.photo

    // console.log(id);
    getUserProfile(userProfile.id)
  }

  const getUserProfile = async(id)=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
    const content = await response.json()
    dataProfile = content[0]
  }

  let dataFriends;
  let countFriends;
  const getFriends = async()=>{
    const response = await fetch(`${urlAPI}/friend/user/?user=${id}`)
    if (response.ok) {
      const content = await response.json()
      dataFriends = content
      countFriends = content.length;
    }
  }

  onMount(async() =>{
    await getUser()
    getFriends()
  })

</script>

<div class="row">
  {#if dataProfile}
    <TimelineP {name} {last_name} {title} {email} {photo} {id} {userMain} {urlAPI}/>
    <SidebarRight {id} {urlAPI} {dataFriends}/>
  {:else}
     <Loader/>
  {/if}
</div>