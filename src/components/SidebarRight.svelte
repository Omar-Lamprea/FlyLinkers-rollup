<script>
  import Events from './events-card/Events.svelte'
  import Sponsors from './sponsors-card/Sponsors.svelte'
  import People from './people/People.svelte'

  export let id = '', urlAPI;
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
       <People {id} {urlAPI}/>
    {/if}

  </div>
</div>