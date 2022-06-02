<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import {getUserToFirestore} from '../js/firebase/config.js'
  import Loader from '../components/Loader.svelte'
  import { translate } from '../js/translate';
  import {onMount} from 'svelte';


  const urlAPI = 'https://api.flylinkers.com'
  let name, title, email, photo, id, last_name, middle_name;
  let data;
  let getUserMainToFirestore

  const getData = async ()=>{
    if (localStorage.getItem('user')) {
      const response = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`)
      const content = await response.json();
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
    }
  }

  onMount(async()=>{
    await getData()
    translate()
  })


</script>

<div class="row">
  {#if id && getUserMainToFirestore}
    <TimelineP {name} {last_name} {title} {email} {photo} {id} {urlAPI}/>
    <SidebarRight {id} {urlAPI}/>
  {:else}
    <div class="loaderContainer d-flex" style="height: calc(100vh - 15rem);">
      <Loader/>
    </div>
  {/if}
</div>