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
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--main-color);
  padding: .1rem;
  margin-top: -4rem;
  cursor: pointer;
}
</style>

<div class="Profile-card-avatar dropdown">
  {#if localStorage.getItem('profilePhoto')}
    <img src={localStorage.getItem('profilePhoto')} alt="" class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  {:else}
    <img src={image} alt="" class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  {/if}
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">View profile photo</a></li>
    <li><a class="dropdown-item" href="#">Change profile photo</a></li>
  </ul>
</div>