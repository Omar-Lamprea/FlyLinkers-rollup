<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  export let reply, urlImages;
  console.log(reply)

</script>

<style>
  .container-reply{
    border-bottom: 2px solid #fefefe;
  }
  .container-reply img{
    width: 35px;
    min-width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: 0.1rem;
    margin-right: .5rem;
  }
  .container-reply .reply-content p:first-child{
    color: var(--main-color);
    font-weight: 600;
  }
</style>


<div class="container-reply my-3 pb-1 d-flex">
  <div class="reply-user">
    <a href="/profile/{reply.user[0].username}" class="d-flex" use:link use:active>
      <img src="{urlImages}{reply.user[0].photo}" alt="" width="30">
    </a>
  </div>
  <div class="reply-content">
    <a href="/profile/{reply.user[0].username}" class="d-flex" use:link use:active>
      <p>{reply.user[0].name} {reply.user[0].last_name}</p>
    </a>
    <p>{reply.answer}</p>
  </div>
</div>