<script>
  import ProfilePhotoModal from '../Modals/ProfilePhotoModal.svelte'
  export let photo, urlAPI, id;
  if (id === undefined) {
    id = ''
  }

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

@media screen and (max-width: 992px){
  .Profile-card-avatar img{
    position: absolute;
    left: calc(50% - 50px);
  }
}
</style>

<div class="Profile-card-avatar dropdown">
  {#if id}
    <img src='{urlAPI}{photo}' alt="profilePhoto" class="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <!-- <li><a class="dropdown-item" href="/">View profile photo</a></li> -->
      <li><a class="dropdown-item" href="/" data-bs-toggle="modal" data-bs-target="#ModalProfile">Update profile photo</a></li>
    </ul>
  {:else}
    <img src='{urlAPI}{photo}' alt="profilePhoto">
  {/if}
</div>