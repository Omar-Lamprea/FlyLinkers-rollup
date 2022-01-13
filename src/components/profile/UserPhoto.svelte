<script>
  export let photo;
</script>

<style>
  .Profile-card-avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--main-color);
  padding: .2rem;
  margin-top: -4rem;
  cursor: pointer;
}
</style>

<div class="Profile-card-avatar dropdown">

  <!-- {#if localStorage.getItem('profilePhoto')}
    <img src='http://18.118.50.78:8000{localStorage.getItem('profilePhoto')}' alt="" class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  {:else} -->
    {#if photo}
      <img src='http://18.118.50.78:8000{photo}' alt="" class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {/if}
  <!-- {/if} -->

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="/">View profile photo</a></li>
    <li><a class="dropdown-item" href="/" data-bs-toggle="modal" data-bs-target="#editProfile">Change profile photo</a></li>
  </ul>
</div>