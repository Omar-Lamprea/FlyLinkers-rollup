<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'

  export let name, title, email, photo, id;

</script>

<div class="row">
  <TimelineP {name} {title} {email} {photo} {id}/>
  <SidebarRight/>

</div>