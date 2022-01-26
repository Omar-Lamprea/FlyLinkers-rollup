<script>
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import TimelineH from '../components/TimelineH.svelte';
  import SidebarRight from '../components/SidebarRight.svelte'

  export let name, middle_name, last_name, email, title, photo, id, urlAPI;

</script>

<div class="row">
    {#if window.innerWidth > 920}
      <SidebarLeft {name} {last_name} {title} {photo} {urlAPI}/>
      <TimelineH {id} {urlAPI}/>
      <SidebarRight {urlAPI}/>
    {:else}
      <TimelineH />
    {/if}
    
    
</div>