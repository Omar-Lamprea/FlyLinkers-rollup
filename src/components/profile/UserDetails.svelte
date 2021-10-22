<script>
  import UserPotho from './UserPhoto.svelte'

  const userDetails =
    {
      name: 'Sam Anderson',
      Age: 26,
      profilePhoto: '../../../public/img/pilot.jpg',
      coverPotho: 'https://arepa.s3.amazonaws.com/elmo002.jpg',
      workTitle: 'Fonder',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugit tempore totam, voluptatem odio similique esse quibusdam nemo quod! Blanditiis.',
      email: 'samanderson@outlook.com',
      profileViews: 2.3,
      postViews: 2.3
    }
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
          <UserPotho/>
          <div class="Profile-card-info mt-2">
            <div class="Profile-card-user">
              <h2>SAM ANDERSON</h2>
              <span>Founder</span><br>
              <p>Colombia</p>
            </div>
            <div class="Profile-description my-3">
              <p> <i class="fas fa-pen"></i> About me</p>
              <div class="Profile-description-text my-2">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id dolores maxime laborum hic earum ut quis est quo commodi aut!</p>
              </div>
              <div class="Profile-description-contact">
                <p>Email</p>
                <p><a href="/">idgrafica1@outlook.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="col-6">
      <div class="Profile-card-text text-end">
        <p class="mb-3"><i class="fas fa-pen"></i> Edit profile</p>
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