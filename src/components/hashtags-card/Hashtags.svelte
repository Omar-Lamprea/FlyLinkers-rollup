<script>
  import Hashtag from './Hashtag.svelte'
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
    {
      name: 'Pilot',
      link: '/'
    },
    {
      name: 'Airplane',
      link: '/'
    }
  ]
</script>

<style>
  /* .Hashtags{
    padding-bottom: 0;
  } */
  .Hashtags h6{
    color: var(--main-color);
    padding: 0 2rem;
  }
  .Hashtags p{
    color: var(--main-color);
    font-weight: 600;
  }
  .Hashtags p{
    color: grey;
    /* font-size: 20px; */
  }

  .Hashtags-discover{
    border-top: 1px solid var(--main-color);
  }
</style>

<div class="Hashtags d-none d-lg-block Default-containers px-0 pb-0 muted">
  <h6 data-translate="title-hashtags" class="muted">Followed Hashtags</h6>
  {#each data as hashtag}
    <Hashtag {...hashtag}/>
  {:else}
    <p>Loading...</p>
  {/each}
  <div class="Hashtags-discover text-center py-3 muted">
    <p data-translate="discover-hash" class="muted">Discover More</p>
  </div>
</div>