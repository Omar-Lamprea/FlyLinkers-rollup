<script>
  import User from './User.svelte'

  export let id;

  let data;
  const getFriends = async()=>{
    const response = await fetch(`http://18.118.50.78:8000/friend/user/?user=${id}`)
    const content = await response.json()
    data = content
  }
  getFriends()
</script>

<style>
    .People h4{
    color: var(--main-color);
  }
</style>

<div class="People Default-containers">
  <div class="People-Ttitle mb-3 text-center">
    <h4>People</h4>
  </div>
  <div class="People-column">
    <div class="User">
      {#if data}
         {#each data as UserDetails}
           <User {...UserDetails}/>
         {/each}
      {/if}
    </div>
  </div>
</div>