<script>
  import Group from './Group.svelte'
  //data
  const data = [
    {
      name: 'Aviation',
      link: '/'
    },
    {
      name: 'Events',
      link: '/'
    },
    {
      name: 'Product',
      link: '/'
    },
    {
      name: 'Seminars',
      link: '/'
    },
    {
      name: 'Planes',
      link: '/'
    },
  ]

</script>

<style>
  .Groups h6{
    color: var(--main-color);
  }
</style>

<div class="Groups d-none d-lg-block Default-containers muted">
  <h6 data-translate="title-groups" class="muted">Groups</h6>
  {#each data as group}
    <Group {...group}/>
  {:else}
    <p>Loading...</p>
  {/each}
</div>