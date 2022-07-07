<script>
  import TimelineN from '../components/TimelineN.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'
  import {getUserToFirestore} from '../js/firebase/config.js'
  import Loader from '../components/Loader.svelte'
  import { translate } from '../js/translate';
  import {onMount} from 'svelte';


  export let params;

  const urlAPI = 'https://api.flylinkers.com'
  const urlImages= 'http://3.130.198.152:8000'

  let name, title, email, photo, id, last_name, middle_name;
  let data;
  let getUserMainToFirestore;

  const getData = async ()=>{
    if (localStorage.getItem('user')) {
      const response = await fetch(`${urlAPI}/user/create/?id=${params.id}`)
      const content = await response.json();
      data = content[0]

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

  onMount(async()=>{
    await getData()
    // await getFriends()
    translate()
  })


</script>

<div class="row">
  {#if id}
    <TimelineN {name} {last_name} {title} {email} {photo} {id} {urlAPI} {urlImages} {countFriends}/>
    <SidebarRight {id} {urlAPI} {dataFriends} {urlImages}/>
  {:else}
    <div class="loaderContainer d-flex" style="height: calc(100vh - 15rem);">
      <Loader/>
    </div>
  {/if}
</div>