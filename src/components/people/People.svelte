<script>
  import User from './User.svelte'

  export let id, urlAPI;
  let data;
  const getFriends = async()=>{
    const response = await fetch(`${urlAPI}/friend/user/?user=${id}`)
    const content = await response.json()
    data = content
  }
  getFriends()
</script>

<style>
  .People-Ttitle h4{
    color: var(--main-color);
  }
</style>

<div class=" Default-containers px-3">
  <div class="People-Ttitle mb-3 text-center">
    <h4>People</h4>
  </div>
  <div class="People-column">
    <div class="User">
      {#if data}
         {#each data as UserDetails}
           <User {...UserDetails} {urlAPI}/>
         {/each}
      {/if}
    </div>
  </div>
</div>