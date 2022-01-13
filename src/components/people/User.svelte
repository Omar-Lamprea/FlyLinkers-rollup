<script>
  export let name, middle_name, last_name, title, photo, email, id = '';



  const viewUserProfile = (email) => {
    window.location.href = `http://localhost:5000/profile/${email}`
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

<div class="User my-3 pb-3 d-flex align-items-center" on:click={viewUserProfile(email)}>
  <div class="User-photo">
    <img src="http://18.118.50.78:8000{photo}" alt="">
  </div>
  <div class="User-detail d-flex flex-column">
    <p>{name} {last_name}</p>
    <span>{title}</span>
    <span>{email}</span>
  </div>
</div>