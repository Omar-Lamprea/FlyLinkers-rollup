<script>

  import User from './User.svelte'
  export let id, urlAPI, dataFriends;

</script>

<style>
  .People-Ttitle h4{
    color: var(--main-color);
  }
</style>

<div class=" Default-containers px-3">
  <div class="People-Ttitle mb-3 text-center">
    <h4 data-translate="title-people">People</h4>
  </div>
  <div class="People-column">
    <div class="User">
      {#if dataFriends}
         {#each dataFriends as UserDetails}
           <User {...UserDetails} {urlAPI}/>
         {/each}
      {/if}
    </div>
  </div>
</div>