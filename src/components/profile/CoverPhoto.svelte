<script>
  export let coverPhoto, userId;
  const urlUser = window.location.pathname
  const urluserProfile = urlUser.slice(9)

</script>

<style>
  .CoverPhoto{
    height: 15rem;
    position: relative;
  }
  .CoverPhoto img{
    border-radius: 1rem;
    width: 100%;
    height: inherit;
    object-fit: cover;
    cursor: pointer;
  }
  .editCoverPhoto{
    position: absolute;
    bottom: 5px;
    right: 5px;
    border: none;
    background-color: #fff;
    border-radius: 1rem;
    padding: .5rem 1rem;
    font-weight: 500;
  }

</style>

<div class="CoverPhoto dropdown">
  <img id="coverPhotoProfile" src={coverPhoto} alt="">
  {#if userId === parseInt(localStorage.getItem('userId'))}
    <button class="editCoverPhoto" data-bs-toggle="modal" data-bs-target="#editProfile" aria-hidden="true">Edit cover photo</button>
  {/if}
</div>