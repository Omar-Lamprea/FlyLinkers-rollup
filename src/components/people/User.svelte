<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'

  export let name, middle_name, last_name, title, photo, email, id, urlAPI, urlImages, username, phone;

  
  const viewUserProfile = (email) => {
    window.location.pathname = `profile/${email}`
  }
  const visitProfile = () =>{
    localStorage.setItem('visitProfile', username)
    window.location.reload()
  }

</script>

<style>
  .User{
    border-bottom: 1px solid var(--main-color);
    cursor: pointer;
  }
  .User-detail{
    color: var(--main-color);
    font-weight: 700;
    margin-left: 1rem;
  }
  .User-detail span{
    color: grey;
    font-weight: 500;
    font-size: .7rem;
    word-break: break-word;
  }
  .User-photo{
    width: 60px;
    min-width: 60px;
    height: 60px;
  }
  .User-photo img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30%;
    border: 2px solid var(--main-color);
    padding: 0.1rem;
  }
</style>

<!-- <div class="User my-3 pb-3 d-flex align-items-center" on:click={viewUserProfile(email)}>
  <div class="User-photo">
    <img src="{urlAPI}{photo}" alt="">
  </div>
  <div class="User-detail d-flex flex-column">
    <p>{name} {last_name}</p>
    <span>{title}</span>
    <span>{email}</span>
  </div>
</div> -->


<div class="User my-3 pb-3 d-flex align-items-center" on:click={visitProfile}>
  <a href="/profile/{username}" class="d-flex" use:link use:active>
    <div class="User-photo">
      <img src="{urlImages}{photo}" alt="">
    </div>
    <div class="User-detail d-flex flex-column">
      <p>{name} {last_name}</p>
      <span>{title}</span>
      <span>{email}</span>
    </div>
  </a>

</div>