<script>
  import UserPotho from './UserPhoto.svelte'
  import Modal from '../Modal.svelte'

  export let name, title, email , photo, id, aboutMe;

</script>

<style>
  .Profile-card{
    padding-bottom: 0;
  }
  .Profile-card-info {
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

  .Profile-description i{
    color: var(--main-color);
  }

  .Profile-card-text i, .Profile-card-text span{
    color: var(--main-color);
    font-weight: bold;
  }
  .Profile-card-text{
    margin: 2rem 0;
  }

  .btn-flylinkers{
    border-radius: 0.5rem;
    color: grey;
    border: 1px solid #199aaf;
    margin-top: 2rem;
  }
  .btn-flylinkers:hover{
    background-color: inherit;
    border: 2px solid #199aaf;
  }

</style>
<div class="UserDetails Default-containers mt-3">
  <div class="row">
    <div class="col-6">

      <div class="Profile-card">
        <div class="Profile-card-content d-flex flex-column">
          <UserPotho {photo}/>
          <div class="Profile-card-info mt-2">
            <div class="Profile-card-user">
              <h2>{name}</h2>
              <span>{title}</span>
              <p>Colombia</p>
            </div>
            <div class="Profile-description my-3">
              <p><i class="fas fa-pen"></i> About me</p>
              <div class="Profile-description-text my-2">
                <p>{aboutMe}</p>
              </div>
              <div class="Profile-description-contact">
                <p>Email</p>
                <p><a href="/">{email}</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="Profile-card-text text-end d-flex flex-column align-items-end">
        <p type="button" class="mb-3" data-bs-toggle="modal" data-bs-target="#editProfile"><i class="fas fa-pen"></i> Edit profile</p>
        <Modal {id}/>
        <div class="Profile-card-statistics">
          <p>Who viewed your profile-card <span>3.8K</span></p> 
          <p>Views of your post <span>3.8K</span></p> 
        </div>
        <div class="Profile-card-buttons mt-5">
          <button class="btn btn-outline-primary btn-flylinkers"><i class="fas fa-pen"></i> I have interest in...</button>
          <button class="btn btn-outline-primary btn-flylinkers">Add selection</button>
        </div>
      </div>
    </div>
  </div>
</div>