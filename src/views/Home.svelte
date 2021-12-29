<script>
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import TimelineH from '../components/TimelineH.svelte';
  import SidebarRight from '../components/SidebarRight.svelte'

  export let name, title;

</script>

<div class="row">

    <SidebarLeft {name} {title}/>
    <TimelineH />
    <SidebarRight />
    
</div>