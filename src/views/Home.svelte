<script>
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import TimelineH from '../components/TimelineH.svelte';
  import SidebarRight from '../components/SidebarRight.svelte'
  import Loader from '../components/Loader.svelte'
  import {onMount} from 'svelte'
  import {getUserToFirestore} from '../js/firebase/config.js'
  import { translate } from '../js/translate';


  const urlAPI = 'https://api.flylinkers.com'
  const urlImages= 'https://api.flylinkers.com'

  let name, middle_name, last_name, email, title, photo, id;
  let userMain;
  let getUserMainToFirestore;
  let data;

  if(!localStorage.getItem('user') || localStorage.getItem('user') === 'null'){
    const param = window.location.search
    const urlParams = new URLSearchParams(param)
    const user = urlParams.get('user')
    const savedUser = localStorage.setItem('user', user)
  }

// 
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
      userMain = data.id

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
      <SidebarLeft {name} {last_name} {title} {photo} {urlAPI} {urlImages}/>
      <TimelineH {id} {urlAPI} {urlImages}/>
      <SidebarRight {urlAPI} {urlImages}/>
    {:else}
      <div class="loaderContainer d-flex" style="height: calc(100vh - 15rem);">
        <Loader/>
      </div>
    {/if}
</div>