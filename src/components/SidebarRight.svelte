<script>
  import Events from './events-card/Events.svelte'
  import Sponsors from './sponsors-card/Sponsors.svelte'
  import People from './people/People.svelte'
  import {onMount} from 'svelte'
  import { translate } from '../js/translate';
  

  export let id = '', urlAPI, urlImages = '', dataFriends = '';
  
  onMount(async()=>{
    await translate()
  })

</script>

<style>
  /* .Sidebar-container {
    position: fixed;
    width: 100%;
  } */
</style>

<div class="Sidebar d-none d-lg-block col-3">
  <div class="Sidebar-container">
    <Events/>
    <Sponsors/>
    {#if window.location.href.includes('profile')}
       <People {id} {urlAPI} {urlImages} {dataFriends}/>
    {/if}
  </div>
</div>