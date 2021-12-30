<script>
  export let coverPhoto;
</script>

<style>
  .CoverPhoto{
    height: 15rem;
  }
  .CoverPhoto img{
    border-radius: 1rem;
    width: 100%;
    height: inherit;
    object-fit: cover;
    cursor: pointer;
  }
</style>

<div class="CoverPhoto">
  {#if localStorage.getItem('coverPhoto')}
    <img src={localStorage.getItem('coverPhoto')} alt="">
  {:else}
    <img src={coverPhoto} alt="">
  {/if}
</div>