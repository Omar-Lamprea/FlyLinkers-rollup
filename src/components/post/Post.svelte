<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import Comment from './Comment.svelte'
  import startTime from '../../js/startTime.js'

  export let userId;
  export let desc, reactions, img, comments, create_time, user, id, user_id, update_time;
  export let name, middle_name, last_name, title, photo, email;
  export let userMain, urlAPI;

  let userLink;

  if (userId === undefined) {
    userId = userMain
  }

  if (userMain === undefined) {
    userMain = userId
  }

  if (user) {
    name = '', middle_name= '', last_name='', title='', photo='', email = '', update_time='', user_id='', userLink = user.email
  }else{
    user = ''
    userLink = email
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
  
  let reactionsPost = '';
  const reactionUser = async()=>{
    const spanLikeValue = document.getElementById(`likeValue${id}`)
    const spanLoveValue = document.getElementById(`loveValue${id}`)
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)
    
    if (spanLikeValue.textContent !== '0' || spanLoveValue.textContent !== '0') {
      const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`)
      const response = await getIdReaction.json()
      reactionsPost = response
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
    await reactionUser()
    const likeAcount = document.getElementById(likeValue)
    const loveAcount = document.getElementById(loveValue)
    const element = e.target.parentNode.childNodes[0]
    const reactionType = element.classList[0]
    const reactionElement = element.classList[1]
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)
    
    console.log(reactionsPost);
    let myLike = false    
    if (reactionsPost !== '') {
      reactionsPost.forEach(like => {
        if (like.id !== userId) {
          myLike = false
        }
        if(like.id === userId){
          myLike = true
        }
      });
    }

    let myLove = false
    if (reactionsPost !== '') {
      reactionsPost.forEach(love => {
        if (love.id !== userId) {
          myLove = false
        }
        if (love.id === userId) {
          myLove = true
        }
      });
    }

    // update like reaction
    if (myLike) {
      if (reactionType === 'fa-thumbs-up' && reactionElement === 'far') {
        // console.log('actualizando like');
        const like = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            like: 1
          })
        })
        const response = like.json()
        if (response) {
          reactions.like += 1
          likeAcount.textContent = reactions.like
          toggleReaction()
          if (btnLove.classList[1] === 'fas') {
            btnLove.classList.remove('fas')
            btnLove.classList.add('far')
            reactions.love -= 1
            loveAcount.textContent = reactions.love
          }
          // await reactionUser()
        }
      }
      if (reactionType === 'fa-thumbs-up' && reactionElement === 'fas') {
        // console.log('actualizando dislike');
        const dislike = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({})
        })
        const response = dislike.json()
        if (response) {
          reactions.like -= 1
          likeAcount.textContent = reactions.like
          toggleReaction()
          // await reactionUser()
        }
      }
    }

    // update love reaction
    if (myLove) {
      if (reactionType === 'fa-heart' && reactionElement === 'far'){
        // console.log('actualizando love');
        const dislove = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            love : 1
          })
        })
        const response = dislove.json()
        if (response) {
          reactions.love += 1
          loveAcount.textContent = reactions.love
          toggleReaction()
          if (btnLike.classList[1] === 'fas') {
            btnLike.classList.remove('fas')
            btnLike.classList.add('far')
            reactions.like -= 1
            likeAcount.textContent = reactions.like
          }
        }
      }

      if (reactionType === 'fa-heart' && reactionElement === 'fas'){
        // console.log('actualizando dislove');
        const dislove = await fetch(`${urlAPI}/post/like/?post_id=${id}&user=${userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({})
        })
        const response = dislove.json()
        if (response) {
          reactions.love -= 1
          loveAcount.textContent = reactions.love
          toggleReaction()
          await reactionUser()
        }
      }
    }


    //new like
    if (reactionType === 'fa-thumbs-up' && reactionElement === 'far') {
      if (reactions.like === 0 && reactions.love === 0 || !myLike && !myLove) {
        // console.log('creando like');
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
            reactions.like += 1
            likeAcount.textContent = reactions.like
            toggleReaction()
          }
      }
    }
    // new love
    if (reactionType === 'fa-heart' && reactionElement === 'far'){
      if (reactions.like === 0 && reactions.love === 0 || !myLike && !myLove) {
        // console.log('creando love');
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
          reactions.love += 1
          loveAcount.textContent = reactions.love
          toggleReaction()
        }
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

  @media screen and (max-width: 768px){
    .hidden{
      display: none;
    }
  }

</style>


<div class="Card Default-containers">


  <div class="Card-container">
    <div class="Card-Header">

        {#if user}
          <div class="Card-user" on:click={visitProfile}>
            <a href="/profile/{user.email}" class="d-flex" use:link use:active>
              <img src="{urlAPI}{user.photo}" alt="">
              <h2>
                {user.name} {user.last_name}
                <span>{user.title}</span>
                <span>{startTime(create_time)}</span>
              </h2>
            </a>
          </div>
        {:else}
          <div class="Card-user">
            <img src="{urlAPI}{photo}" alt="">
            <h2>
              {name} {last_name}
              <span>{title}</span>
              <span>{startTime(create_time)}</span>
            </h2>
          </div>
        {/if}
      
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
            <span id={likeValue}>{reactions.like}</span>
        </div>
        <div class="Reaction Header-nav-heart mx-2">
          <i class="fas fa-heart"></i>
          <span id={loveValue}>{reactions.love}</span>
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
        <div class="Action Header-nav-share mx-3 hidden">
          <i class="fas fa-share"></i>
          <span>Share</span>
        </div>
        <div class="Action Header-nav-paper-plane mx-3 hidden">
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

