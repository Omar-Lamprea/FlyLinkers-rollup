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

    .banner{
    /* padding: .5rem; */
    padding: 0;
    border: none;
  }
  .banner img{
    width: 100%;
    border-radius: 1rem;
  }
</style>

<!-- <div class="Groups d-none d-lg-block Default-containers muted">
  <h6 data-translate="title-groups" class="muted">Groups</h6>
  {#each data as group}
    <Group {...group}/>
  {:else}
    <p>Loading...</p>
  {/each}
</div> -->


<div class="banner Default-containers d-none d-lg-block">
  <a href="https://news.flylinkers.com/" target="_blank" rel="nofollow noopener noreferrer">
    <img src="../img/banner2lateral-01.jpg" alt="banner">
  </a>
</div>