<script>
  import UserPhoto from '../profile/UserPhoto.svelte'

  export let comment;

</script>

<style>
  .Comments span {
    font-size: .8rem;
    width: 88%;
    font-weight: normal;
    color: grey;
    background-color: #80808021;
    padding: .5rem 1rem;
  }
  .Comments-users {
    margin: 0 0 0.5em 0;
    display: flex;
    justify-content: space-between;
  }
  .Comments-users img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: 0.1rem;
  }
  .Comments-users span p{
    color: var(--main-color);
    font-weight: 600;
  }
  .userInfo p:last-child{
    color: grey;
    font-weight: inherit;
  }
</style>

<div class="Comments">
  <div class="Comments-content">
    <div class="Comments-users">
      <img src="http://18.118.50.78:8000{comment.user.photo}" alt="">
      <span>
        <div class="userInfo mb-1 d-flex justify-content-between">
          <p>{comment.user.name} {comment.user.last_name}</p>
          <p>1W</p>
        </div>
        {comment.comment}
      </span>
    </div>
  </div>
</div>