<script>
  import { Router, Link, Route } from "svelte-routing";
  import Comment from './Comment.svelte'
  import startTime from '../../js/startTime.js'

  export let userId;
  export let desc, reactions, img, comments, create_time, user, id, user_id, update_time;
  export let name, middle_name, last_name, title, photo, email;
  export let userMain, urlAPI;

  if (userId === undefined) {
    userId = userMain
  }

  if (userMain === undefined) {
    userMain = userId
  }

  if (user) {
    name = '', middle_name= '', last_name='', title='', photo='', email = '', update_time='', user_id=''
  }

  const viewUserProfile = () => {
    if (user) {
      const userEmail = user.email;
      window.location.pathname = `profile/${userEmail}`
    }
  }
  const visitProfile = () =>{
    localStorage.setItem('visitProfile', user.email)
  }
  
  const likeValue = `likeValue${id}`
  const loveValue = `loveValue${id}`

  const reactionUser = async()=>{
    const spanLikeValue = document.getElementById(`likeValue${id}`)
    const spanLoveValue = document.getElementById(`loveValue${id}`)
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)

    if (spanLikeValue.textContent !== '0' || spanLoveValue.textContent !== '0') {
      const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`)
      const response = await getIdReaction.json()

      response.forEach(reaction => {
        if (reaction.id === userId && reaction.like) {
          btnLike.classList.remove('far')
          btnLike.classList.add('fas')
        }
        if (reaction.id === userId && reaction.love) {
          btnLove.classList.remove('far')
          btnLove.classList.add('fas')
        }
      });
    }
  }

  const changeReaction = async(e)=>{
    const likeAcount = document.getElementById(likeValue)
    const loveAcount = document.getElementById(loveValue)
    const element = e.target.parentNode.childNodes[0]
    const reactionType = element.classList[0]
    const reactionElement = element.classList[1]

    const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`)
    const content = await getIdReaction.json()

    //like
    if (reactionType === 'fa-thumbs-up' && reactionElement === 'far') {
      if(content.length === 0 || content.Error){
       const createReaction = await fetch(`${urlAPI}/post/like/`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: id,
          like: 1,
        })
      })
      const response = createReaction.json()
        if (response) {
          likeAcount.textContent = reactions.like + 1
          toggleReaction()
        }
      }else{
        const like = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            like: 1,
          })
        })

        const response = like.json()
        if (response) {
          likeAcount.textContent = reactions.like++
          toggleReaction()

          const btnLove = document.getElementById(`btnLove${id}`)
          const loveValue = document.getElementById(`loveValue${id}`)
          
          if (btnLove.classList[1] === 'fas') {
            btnLove.classList.add('far')
            btnLove.classList.remove('fas')
            loveValue.textContent -= 1
          }
        }
      }
    }

    //dislike
    if(reactionType === 'fa-thumbs-up' && reactionElement === 'fas'){
      const dislike = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({})
      })

      const response = dislike.json()
      if (response) {
        likeAcount.textContent = reactions.like - 1
        toggleReaction()
      }
    }


    //love
    if (reactionType === 'fa-heart' && reactionElement === 'far') {
      if(content.length === 0 || content.Error){
       const createReaction = await fetch(`${urlAPI}/post/like/`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: id,
          love: 1,
        })
      })
      const response = createReaction.json()
        if (response) {
          loveAcount.textContent = reactions.love + 1
          toggleReaction()
        }
      }else{
        const love = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            love: 1,
          })
        })
        const response = love.json()
        if (response) {
          loveAcount.textContent = reactions.love++
          toggleReaction()

          const btnLike = document.getElementById(`btnLike${id}`)
          const likeValue = document.getElementById(`likeValue${id}`)

          if (btnLike.classList[1] === 'fas') {
            btnLike.classList.add('far')
            btnLike.classList.remove('fas')
            likeValue.textContent -= 1
          }

        }
      }
    }

    //dislove
    if (reactionType === 'fa-heart' && reactionElement === 'fas') {
      const dislove = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({})
      })

      const response = dislove.json()
      if (response) {
        loveAcount.textContent = reactions.love-1
        toggleReaction()
      }
    }

    function toggleReaction(){
      element.classList.toggle('far')
      element.classList.toggle('fas')
    }
  }


  const showComments = ()=>{
    const comment = document.getElementById(`comment${id}`)
    comment.classList.remove('d-none')
    getCommets()
  }

  let dataComment;

  const getCommets = async()=>{
    if (comments >= 1) {
      const response = await fetch(`${urlAPI}/post/comment/?post_id=${id}`)
      const content = await response.json()
      dataComment = content
    }
  }

  const commentAbled = (e)=>{
    const btnSendComment = document.getElementById(`btn-sendComment${id}`)
    if (e.target.value !== '') {
      btnSendComment.removeAttribute('disabled')
    }else{
      btnSendComment.setAttribute('disabled', '')
    }
  }
  
  const addComment = async (e)=>{
    e.preventDefault()
    const inputAddComment = document.getElementById(`inputAddComment${id}`)
    const response = await fetch(`${urlAPI}/post/comment/`,{
      method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          comment: inputAddComment.value,
          user_id: userId,
          post_id: id
        })
    })
    const content = await response.json()
    if (content) {
      inputAddComment.value = ''
      comments += 1
      getCommets()
    }
  }

</script>

<style>
  .Card-Header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
  }
  .Card-user {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: .5rem;
  }
  .Card-user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: .1rem;
  }
  .Card-user h2 {
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 0 1em;
    color: var(--main-color);
    font-weight: bold;
  }
  .Card-user h2 span {
    display: block;
    font-size: 12px;
    font-weight: normal;
    color: rgba(38, 38, 38, 0.7);
  }
  .Card-photo {
    padding: 0;
    margin: 0;
  }
  .Card-photo img {
    width: 100%;
    height: auto;
  }
  .Card-photo figure {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .Card-settings i {
    cursor: pointer;
    color: var(--main-color);
    font-size: 20px;
  }
  .Card-board-icons {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--main-color);
  }
  .Reaction{
    cursor: pointer;
    font-size: .8rem;
    color: var(--main-color);
  }

  .Card-board-actions{
    font-size: 1rem;
    margin: 1rem 0;
    color: var(--main-color);
  }
  .Card-board-actions span, .Reaction span {
    color: rgba(38, 38, 38, 0.7);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;;
    font-weight: initial;
  }

  .Card-description span{
    font-size: 14px;
    margin: 0 1rem;
  }

  .Action{
    cursor: pointer;
  }

  .Comments-add {
    padding: 1rem 0;
    border-top: 1px solid rgba(219, 219, 219, 0.8);
  }
  .Comments-add img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: 0.1rem;
  }
  .Comments-add form {
    display: flex;
    align-items: center;
    width: 90%;
  }

  .Comments-input {
    border: solid 1px #e9e9e9;
    border-radius: 5px;
    color: #696969;
    border: 1px solid transparent;
    font-size: 12px;
    outline: none;
    width: 100%;
    display: flex;
  }
  .btn-sendComment {
    border: none;
    color: white;
    background-color: var(--main-color);
    font-size: 12px;
    outline: none;
    cursor: pointer;
  }


</style>


<div class="Card Default-containers">
  <div class="Card-container">
    <div class="Card-Header">

      <Router>
        {#if user}
           <Link to="/profile/{user.email}">
             <div class="Card-user" on:click={viewUserProfile}>
               {#if user !== undefined}
                 <img src="{urlAPI}{user.photo}" alt="">
               {/if}
               {#if user === undefined}
                 <img src="{urlAPI}{photo}" alt="">
               {/if}
       
               <h2>
                 {#if user}
                   {user.name} {user.last_name}
                   <span>{user.title}</span>
                 {:else}
                   {name} {last_name}
                   <span>{title}</span>
                 {/if}
                 <span>{startTime(create_time)}</span>
               </h2>
             </div>
           </Link>
        {/if}
      </Router>
      
      
      <div class="Card-settings">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>

    <div class="Card-description">
      <span>{desc}</span>
    </div>
  </div>

    <div class="Card-photo">
      <figure>
        {#if !!img}
           <img src="{urlAPI}{img}" alt="img post">
        {/if}
      </figure>
    </div>

    <div class="Card-board-icons">
      <div class="Card-board-icons-first d-flex">
        <div class="Reaction Header-nav-like mx-2">
            <i class="fas fa-thumbs-up"></i>
            {#if reactions}
              <span id={likeValue}>{reactions.like}</span>
            {/if}
            {#if reactions === undefined}
              <span id={likeValue}>0</span>
            {/if}
        </div>
        <div class="Reaction Header-nav-heart mx-2">
          <i class="fas fa-heart"></i>
          {#if reactions}
            <span id={loveValue}>{reactions.love}</span>
          {/if}
          {#if reactions === undefined}
            <span id={loveValue}>0</span>
          {/if}
        </div>
        <div class="Reaction Header-nav-comment mx-2">
          <i class="fas fa-comment"></i>
          <span on:click={showComments}>
            <span>{comments}</span> Comments</span>
        </div>
      </div>
    </div>

    <div class="Card-board-actions">
      <div class="Card-board-actions d-flex" on:load={reactionUser()}>
        <div class="Action Header-nav-thumbs-up mx-3" on:click={changeReaction}>
          <i id="btnLike{id}" class="fa-thumbs-up far"></i>
          <span>Like</span>
        </div>
        <div class="Action Header-nav-heart mx-3" on:click={changeReaction}>
          <i id="btnLove{id}"class="fa-heart far"></i>
          <span>love</span>
        </div>
        <div class="Action Header-nav-comments mx-3" on:click={showComments}>
          <i class="fa-comments far"></i>
          <span>Comment</span>
        </div>
        <div class="Action Header-nav-share mx-3">
          <i class="fas fa-share"></i>
          <span>Share</span>
        </div>
        <div class="Action Header-nav-paper-plane mx-3">
          <i class="fas fa-paper-plane"></i>
          <span>Send</span>
        </div>
      </div>
    </div>

    <div id="comment{id}" class="comments d-none">
      <div class="Comments-add d-flex justify-content-between">
        <img src="{urlAPI}{localStorage.getItem('profilePhoto')}" alt="img">
        <form>
          <input id="inputAddComment{id}" type="text" class="Comments-input" placeholder="Write a comment..." on:keyup={commentAbled}>
          <button id="btn-sendComment{id}" class="btn-sendComment" disabled on:click={addComment}>Post</button>
        </form>
      </div>

      {#if dataComment}
        {#each dataComment as comment}
          <Comment {comment} {urlAPI}/>
        {/each}
      {/if}
    </div>
</div>