<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import User from './User.svelte'
  export let id, urlAPI, urlImages, dataFriends;

</script>

<style>
  .People-Ttitle h4{
    color: var(--main-color);
  }

  .People-column a{
    color: grey;
    font-weight: 600;
  }
</style>

<div class=" Default-containers px-3">
  <div class="People-Ttitle mb-3 text-center">
    <h4 data-translate="title-people">People</h4>
  </div>
  <div class="People-column">
    <div class="User">
      {#if dataFriends && dataFriends.length > 0}
         {#each dataFriends as UserDetails}
           <User {...UserDetails} {urlAPI} {urlImages}/>
         {/each}

        <a href="/network/{id}" class="text-center" use:link use:active>
          <p class="text-center">Show more</p>
        </a>

      {/if}
    </div>
  </div>
</div>