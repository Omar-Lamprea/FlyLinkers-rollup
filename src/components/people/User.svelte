<script>
  // import { Router, Link, Route } from "svelte-spa-router";
  export let name, middle_name, last_name, title, photo, email, id, urlAPI;



  const viewUserProfile = (email) => {
    window.location.pathname = `profile/${email}`
  }
  const visitProfile = () =>{
    localStorage.setItem('visitProfile', email)
    setTimeout(() => {
      localStorage.setItem('visitProfile', 'userProfile')
    }, 2000);
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
  }
  .User-photo{
    width: 60px;
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
  <!-- <Router>
    <Link on:click={visitProfile} to="/profile/{localStorage.getItem('visitProfile')}" class="d-flex">
      <div class="User-photo">
        <img src="{urlAPI}{photo}" alt="">
      </div>
      <div class="User-detail d-flex flex-column">
        <p>{name} {last_name}</p>
        <span>{title}</span>
        <span>{email}</span>
      </div>
    </Link>
  </Router> -->
</div>