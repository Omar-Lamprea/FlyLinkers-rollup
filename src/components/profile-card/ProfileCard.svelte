<script>
  import UserPotho from '../profile/UserPhoto.svelte'
	import { Router, Link, Route } from "svelte-routing";

  export let name, title, photo, last_name, urlAPI;

</script>

<style>
  .Profile-card{
    padding-bottom: 0;
  }
  .Profile-card-info {
    border-bottom: 1px solid var(--main-color);
    width: 100%;
  }
  .Profile-card-info span {
    font-size: 18px;
    font-weight: normal;
  }
  .Profile-card-info p{
    font-size: 14px;
  }
  .Profile-card-info p span{
    color: var(--main-color);
    font-size: inherit;
    font-weight: bold;
  }
  .Profile-card-user{
    color: var(--main-color);
  }
  .Profile-card-user h2{
    font-size: 18px;
  }
  .Profile-card-edit{
    margin: 1rem;
  }
  .Profile-card-edit i{
    color: var(--main-color);
  }
  .Profile-edit-profile{
    color: grey;
    font-weight: 600;
  }
</style>

<div class="Profile-card Default-containers px-0">
  <div class="Profile-card-content d-flex flex-column justify-content-center align-items-center">
    <UserPotho {photo} {urlAPI}/>
    <div class="Profile-card-info text-center mt-2">
      <div class="Profile-card-user">
        <h2>{name} {last_name}</h2>
        <span>{title}</span>
      </div>
      <div class="Profile-card-text my-2">
        <p>Who viewed your profile-card <span>3.8K</span></p> 
        <p>Views of your post <span>3.8K</span></p> 
      </div>
    </div>
    <div class="Profile-card-edit">
      <p>
        <!-- <a href="./profile-card.html">Edit profile-card</a> -->
        <Router>
          <Link to="/profile" class="d-flex align-items-center">
            <div class="Profile-edit-profile">
              <i class="fas fa-bookmark"></i>
              Edit profile
            </div>
          </Link>
        </Router>
      </p>
    </div>
  </div>
</div>