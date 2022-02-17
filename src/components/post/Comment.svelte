<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import UserPhoto from '../profile/UserPhoto.svelte'
  import startTime from '../../js/startTime.js'
  // import {commentsFirebase} from '../../js/firebase/commentsFirebase.js'

  export let comment, urlAPI;

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
    margin: 0 0 0.5rem 0.5rem;
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
    margin-right: .5rem;
  }
  .Comments-users span p{
    color: var(--main-color);
    font-weight: 600;
  }
  .userInfo .startTime{
    color: grey;
    font-weight: inherit;
  }

  /* .User-comment{
    cursor: pointer;
    color: var(--main-color)
  } */
</style>

<div class="Comments">
  <div class="Comments-content">
    <div class="Comments-users">
      <a href="/profile/{comment.user.email}" class="d-flex" use:link use:active>
        <img src="{urlAPI}{comment.user.photo}" alt="">
      </a>
      <span>
        <div class="userInfo mb-1 d-flex justify-content-between">
          <a href="/profile/{comment.user.email}" class="d-flex" use:link use:active>
            <p class="User-comment">{comment.user.name} {comment.user.last_name}</p>
          </a>
          <p class="startTime">{startTime(comment.create_time)}</p>
        </div>
        {comment.comment}
      </span>
    </div>
  </div>
</div>