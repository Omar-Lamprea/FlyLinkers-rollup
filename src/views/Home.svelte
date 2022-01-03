<script>
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import TimelineH from '../components/TimelineH.svelte';
  import SidebarRight from '../components/SidebarRight.svelte'

  export let name, title, photo;

</script>

<div class="row">
    {#if window.innerWidth > 920}
      <SidebarLeft {name} {title} {photo}/>
      <TimelineH />
      <SidebarRight />
    {:else}
      <TimelineH />
    {/if}
    
    
</div>