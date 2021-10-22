<script>
  export let name, workTitle, city, img
</script>

<style>
  .User{
    border-bottom: 1px solid var(--main-color);

  }
  .User-detail{
    color: var(--main-color);
    font-weight: 700;
  }
  .User-detail span{
    color: grey;
    font-weight: 500;
    font-size: .9rem;
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

<div class="User py-3 d-flex justify-content-around align-items-center">
  <div class="User-photo">
    <img src="{img}" alt="">
  </div>
  <div class="User-detail d-flex flex-column">
    <p>{name}</p>
    <span>{workTitle}</span>
    <span>{city}</span>
  </div>
</div>