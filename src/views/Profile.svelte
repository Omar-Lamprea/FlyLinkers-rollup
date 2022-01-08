<script>
  import TimelineP from '../components/TimelineP.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'

  export let name, title, email, photo, id, last_name, middle_name = '';

</script>

<div class="row">
  <TimelineP {name} {last_name} {title} {email} {photo} {id}/>
  <SidebarRight {id}/>

</div>