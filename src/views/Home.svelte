<script>
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import TimelineH from '../components/TimelineH.svelte';
  import SidebarRight from '../components/SidebarRight.svelte'
  import Loader from '../components/Loader.svelte'
  import {onMount} from 'svelte'
  import {getUserToFirestore} from '../js/firebase/config.js'


  const urlAPI = 'https://api.flylinkers.com'
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
      const response = await fetch(`${urlAPI}/user/create/?email=${localStorage.getItem('user')}`,{
        method: 'GET'
      })
      const content = await response.json();
      data = content[0]
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

  onMount(()=>{
    getData()
  })

</script>

<div class="row">
    {#if id && getUserMainToFirestore}
      <SidebarLeft {name} {last_name} {title} {photo} {urlAPI}/>
      <TimelineH {id} {urlAPI}/>
      <SidebarRight {urlAPI}/>
    {:else}
      <Loader/>
    {/if}
</div>