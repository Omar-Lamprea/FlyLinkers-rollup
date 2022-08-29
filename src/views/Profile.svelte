<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import {getUserToFirestore} from '../js/firebase/config.js'
  import Loader from '../components/Loader.svelte'
  import { translate } from '../js/translate';
  import {onMount} from 'svelte';


  const urlAPI = 'https://api.flylinkers.com'
  const urlImages= 'https://api.flylinkers.com'

  let name, title, email, photo, id, last_name, middle_name;
  let data;
  let getUserMainToFirestore

  const getData = async ()=>{
    if (localStorage.getItem('user')) {
      const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`)
      const content = await response.json();
      if (response.ok) {
        data = content.User
        await getUserToFirestore(data)
        getUserMainToFirestore = await getUserToFirestore(data)
  
        if (!localStorage.getItem('profilePhoto')) {
          localStorage.setItem('profilePhoto', data.photo)
        }
  
        name = data.name
        middle_name = data.middle_name
        last_name = data.last_name
        email = data.email
        title = data.title
        photo = data.photo
        id = data.id;
      } else {
        console.log(content);
      }
    }
  }

  let dataFriends;
  let countFriends;
  const getFriends = async()=>{
    const response = await fetch(`${urlAPI}/friend/user/?user=${id}&limit=3`)
    const content = await response.json()
    if (response.ok) {
      dataFriends = content
      countFriends = content.length;
    }else{
      console.log(content);
    }
  }

  onMount(async()=>{
    await getData()
    await getFriends()
    translate()
  })


</script>

<div class="row">
  {#if id && getUserMainToFirestore}
    <TimelineP {name} {last_name} {title} {email} {photo} {id} {urlAPI} {urlImages} {countFriends}/>
    <SidebarRight {id} {urlAPI} {dataFriends} {urlImages}/>
  {:else}
    <div class="loaderContainer d-flex" style="height: calc(100vh - 15rem);">
      <Loader/>
    </div>
  {/if}
</div>