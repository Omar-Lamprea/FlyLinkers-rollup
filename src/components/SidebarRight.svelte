<script>
  import Events from './events-card/Events.svelte'
  import Sponsors from './sponsors-card/Sponsors.svelte'
  import People from './People/People.svelte'
</script>

<style>
  /* .Sidebar-container {
    position: fixed;
    width: 100%;
  } */
</style>

<div class="Sidebar col-3">
  <div class="Sidebar-container">
    <Events/>
    <Sponsors/>
    {#if window.location.pathname.includes('profile')}
       <People/>
    {/if}

  </div>
</div>