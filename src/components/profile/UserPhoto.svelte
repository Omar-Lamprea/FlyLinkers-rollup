<script>
  export let photo

  let image;
  const urlImage = setTimeout(() => {
    image = `http://18.118.50.78:8000${photo}`
    localStorage.setItem('profilePhoto', image)
  }, 1000);

</script>

<style>
  .Profile-card-avatar img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px solid var(--main-color);
  padding: .1rem;
  margin-top: -4rem;
  cursor: pointer;
}
</style>

<div class="Profile-card-avatar">
  {#if localStorage.getItem('profilePhoto')}
    <img src={localStorage.getItem('profilePhoto')} alt="">
  {:else}
    <img src={image} alt="">
  {/if}
</div>