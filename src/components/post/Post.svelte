<script>
  import './Post.css'
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import Comment from './Comment.svelte'
  import SharePost from './actions/SharePost.svelte'
  import startTime from '../../js/startTime.js'
  import { onMount } from "svelte";
  import {commentsFirebase} from '../../js/firebase/commentsFirebase.js'
  import {reactionsFirebase} from '../../js/firebase/reactionsFirebase.js'
  import { translate } from '../../js/translate';
  import {googleTranslateJs} from '../..//js/googleTranslate'
  import Loader from '../Loader.svelte'
  import ReportPostModal from "../Modals/reportPostModal.svelte";

  export let userId;
  export let desc, reactions, img, comments, create_time, user, id, user_id, update_time;
  export let name, middle_name, last_name, title, photo, email, username = 0, phone = 0;
  export let userMain, urlAPI, urlImages, url_id, meta;
  export let share_id, share_count, share = '';
  export let video, code = '';
  if(code && code !== false) code = code.charAt(0).toUpperCase() + code.slice(1)
  // console.log(code);

  // code
  //   ? code = code.charAt(0).toUpperCase() + code.slice(1) 
  //   : code = false

  let reactionsLikeList;
  let reactionsLoveList;
  // console.log(navigator.language);

  const userStorage = JSON.parse(localStorage.getItem('data'))

  let shareId;
  if (share !== '') shareId = share[1].id

  // console.log(userId, user);
  if (!meta) {
    meta = false
  }
  // console.log(meta);


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

  

  userId = parseInt(userId)
  userMain = parseInt(userMain)


  // const viewUserProfile = () => {
  //   if (user) {
  //     const userEmail = user.email;
  //     window.location.pathname = `profile/${userEmail}`
  //   }
  // }
  const visitProfile = () =>{
    localStorage.setItem('visitProfile', user.username)
  }
  const likeValue = `likeValue${id}`
  const loveValue = `loveValue${id}`
  
  let reactionsPost = '';
  const reactionUser = async()=>{
    const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`)
    const response = await getIdReaction.json()

    reactionsPost = response
    reactionsLikeList = []
    reactionsLoveList = []

    reactionsPost.forEach(userReaction => {
      if (userReaction.like) reactionsLikeList.push(userReaction.name + ' ' + userReaction.last_name)
      else if (userReaction.love) reactionsLoveList.push(userReaction.name + ' ' + userReaction.last_name)
    })

    const spanLikeValue = document.getElementById(`likeValue${id}`)
    const spanLoveValue = document.getElementById(`loveValue${id}`)
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)
    
    if (spanLikeValue.textContent !== '0' || spanLoveValue.textContent !== '0') {
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
    const btnReactionLike = document.getElementById(`btnReactionLike${id}`)
    const btnReactionLove = document.getElementById(`btnReactionLove${id}`)
    btnReactionLike.setAttribute('disabled', '')
    btnReactionLove.setAttribute('disabled', '')

    const spanLikeValue = document.getElementById(`likeValue${id}`)
    const spanLoveValue = document.getElementById(`loveValue${id}`)
    if (spanLikeValue.textContent === '0' || spanLoveValue.textContent === '0') {
      const getIdReaction = await fetch(`${urlAPI}/post/like/?post_id=${id}`)
      const response = await getIdReaction.json()
      reactionsPost = response
    }
    const likeAcount = document.getElementById(likeValue)
    const loveAcount = document.getElementById(loveValue)
    const element = e.target.parentNode.childNodes[0]
    const reactionType = element.classList[0]
    const reactionElement = element.classList[1]
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)

    
    let myLike = false
    let userlike = []
    if (reactionsPost !== '' && !reactionsPost.Error) {
      reactionsPost.forEach(like => {
        if (like.id === userId) {
          myLike = true
          userlike.push(like)
        }else{
          myLike = false
        }
      });
    }

    let myLove = false
    let userLove = []
    if (reactionsPost !== '' && !reactionsPost.Error) {
      reactionsPost.forEach(love => {
        if (love.id === userId) {
          myLove = true
          userLove.push(love)
        }else{
          myLove = false
        }
      });
    }

    if (userlike.length > 0 && userlike[0].id === userId) {
      myLike = true
    }
    if (userLove.length > 0 && userLove[0].id === userId) {
      myLove = true
    }
    // console.log(myLike, reactionType);
    // update like reaction
    if (myLike && reactionType === 'fa-thumbs-up') {
      if (reactionElement === 'far') {
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
      if (reactionElement === 'fas') {
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
    if (myLove && reactionType === 'fa-heart') {
      if (reactionElement === 'far'){
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

      // console.log(reactionsPost, reactionType, reactionElement, userId);
      if (reactionElement === 'fas'){
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
          // await reactionUser()
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

          let aux;
          if (user.length === 0) {
            aux = user_id
          }else{
            aux = user.id
          }
          // console.log(reactionsPost, aux);
          if (aux !== userId ) {
            
            // console.log(reactionsPost);
            const template = {
              user_id: userId,
              name: userStorage.name + ' ' + userStorage.last_name,
              photo: userStorage.photo,
              create_at: new Date(),
              seen: false,
              post_id: id
            }
          // console.log(template, aux);
          reactionsFirebase(template, aux)
          }
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
          reactionsFirebase()

          let aux;
          if (user.length === 0) {
            aux = user_id
          }else{
            aux = user.id
          }
          // console.log(reactionsPost, aux);
          if (aux !== userId ) {
            
            // console.log(reactionsPost);
            const template = {
              user_id: userId,
              name: userStorage.name + ' ' + userStorage.last_name,
              photo: userStorage.photo,
              create_at: new Date(),
              seen: false,
              post_id: id
            }
          // console.log(template, aux);
          reactionsFirebase(template, aux)
          }
        }
      }
    }



    
    function toggleReaction(){
      if (element.classList[1] === 'far'){
        element.classList.remove('far')
        element.classList.add('fas')
      }else{
        element.classList.remove('fas')
        element.classList.add('far')
      }
    }
    await reactionUser()
    btnReactionLike.removeAttribute('disabled')
    btnReactionLove.removeAttribute('disabled')
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
      translate()
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
      await getCommets()


      let aux;
      if (user.length === 0) {
        aux = user_id
      }else{
        aux = user.id
      }

      if (aux !== userId ) {
        
        let userDataComment = 0
        if (dataComment.length > 0) {
          userDataComment = dataComment[dataComment.length - 1]
        }else{
          userDataComment = dataComment[0]
        }

        const commentUserFirebase = {
          user_id: userId,
          comment: userDataComment.comment,
          name: userStorage.name + ' ' + userStorage.last_name,
          photo: userStorage.photo,
          post_id: id,
          seen: false,
          create_at: new Date()
        }

        commentsFirebase(commentUserFirebase, aux)
      }
    }
  }

  const deletePost = async(id)=>{
    const response = await fetch(`${urlAPI}/post/create/?post_id=${id}&user_id=${userId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    const content = await response.json()
    if (response.ok) {
      const reloadPost = document.getElementById('reloadPostCheck')
      reloadPost.classList.toggle('data-reloading')
    }else{
      console.log(content);
    }
  }

  let showLoader = 0
  const googleTranslate = async (text) =>{
    showLoader = 1

    const translated = await googleTranslateJs(text)

    if (translated) {
      let translation = translated.translatedText
      showLoader = 0
      const textTranslated = document.getElementById(`textTranslated-${id}`)
      textTranslated.innerHTML = translation
    }else{
      showLoader = 0
      const textTranslated = document.getElementById(`textTranslated-${id}`)
      localStorage.getItem('lang') === "En"
        ? textTranslated.innerHTML = "This post cannot be translated"
        : textTranslated.innerHTML = "No se puede traducir este post"
    }
  }

  
  
  onMount(async ()=>{
    await reactionUser()
    if (window.location.href.includes('/post/')) {
      showComments()
    }
    translate()
  })
</script>

<div class="Card Default-containers" id="post-{id}">
  <ReportPostModal {id} {urlAPI}/>
  <div class="Card-container">
    <div class="Card-Header px-3 px-md-0">

        {#if user}
          <div class="Card-user" on:click={visitProfile}>
            <a href="/profile/{user.username}" class="d-flex" use:link use:active>
              <img src="{urlImages}{user.photo}" alt="">
              <h2>
                {user.name} {user.last_name}
                <span>{user.title}</span>
                <span>{startTime(create_time)}</span>
              </h2>
            </a>
          </div>
        {:else}
          <div class="Card-user">
            <img src="{urlImages}{photo}" alt="">
            <h2>
              {name} {last_name}
              <span>{title}</span>
              <span>{startTime(create_time)}</span>
            </h2>
          </div>
        {/if}
      
      <div class="Card-settings">
        <div class="dropdown">
          <i class="fas fa-ellipsis-h dropdown-toggle" type="button" id="settings-post" data-bs-toggle="dropdown" aria-expanded="false"></i> 
          <ul class="dropdown-menu" aria-labelledby="settings-post">
            <li><a class="dropdown-item" href="/post/{id}" use:link use:active data-translate="see-post">See post</a></li>
            <li data-translate="modal-report-post-title" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#reportPostModal{id}">Report post</li>

            {#if user}
               {#if user.id.toString() === localStorage.getItem('userId')}
                 <li class="dropdown-item" on:click={deletePost(id)} data-translate="delete-post">Delete post</li>
               {/if}
            {:else}
              {#if user_id.toString() === localStorage.getItem('userId')}
                <li class="dropdown-item" on:click={deletePost(id)} data-translate="delete-post">Delete post</li>
              {/if}
            {/if}
          </ul>
        </div>
      </div>
    </div>

    <div class="Card-description d-flex flex-column mx-3 mx-md-0">
      <span class="mx-0">{desc}</span>
      {#if desc && code && code !== localStorage.getItem('lang') }
        <span id="btn-translatePost" class="mx-0 btn-translatePost" on:click={googleTranslate(desc)}>See translation</span>
        <div class="desc-translated">
          {#if showLoader}
            <Loader size={"small"}/>
          {/if}
          <span class="mx-0" id="textTranslated-{id}"></span>
        </div>
      {/if}
    </div>
  </div>

    <div class="Card-photo px-0">
      {#if meta && share === ''}
        <div class="urlMeta d-flex flex-column mb-3">
          <a href={meta.url} target="_blank">
            {#if meta.title}
               <h6>{meta.title}</h6>
            {/if}
            {#if meta.description}
               <p>{meta.description}</p>
            {/if}
            {#if meta.image}
               <img src="{meta.image}" alt="">
            {/if}
          </a>
        </div>
      {/if}

      {#if !!img}
        <figure>
          <img src="{urlImages}{img}" alt="img post">
        </figure>
      {/if}
    </div>

    {#if video && share === ''}
      {#if video.includes('https://www.youtube.com/')}
        <iframe
          width="100%" 
          height="350" 
          src={video}
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      {:else}
        <!-- <video   style="width: 100%;" controls autoplay muted autobuffer autobuffered> -->
        <video style="width: 100%; max-height: 400px;" controls>
          <source src="{urlAPI}{video}">
          <track kind="captions">
        </video>
      {/if}
    {/if}

    {#if share !== ''}
      <hr>
      <div class="px-3 px-lg-0">
        <div class="user-shared">
          <!-- <p>{share[0].first_name}</p> -->

          <div class="Card-user justify-content-start" on:click={visitProfile}>
            <a href="/profile/{share[0].username}" class="d-flex" use:link use:active>
              <img src="{urlImages}{share[0].photo}" alt="">
              <h2>
                {share[0].name} {share[0].last_name}
                <span>{share[0].title}</span>
                <span>{startTime(share[1].create_time)}</span>
              </h2>
            </a>
          </div>

        </div>
        <div class="info-shared">
          <span>{share[1].desc}</span>
          {#if share[1].img !== ''}
             <img src="{urlImages}{share[1].img}" alt="" style="width: 100%;">
          {/if}
          {#if share[1].video}
            {#if share[1].video.includes('https://www.youtube.com/')}
              <iframe
                width="100%" 
                height="350" 
                src={share[1].video} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            {:else}
              <!-- <video   style="width: 100%;" controls autoplay muted autobuffer autobuffered> -->
              <video style="width: 100%; max-height: 400px;" controls>
                <source src="{urlAPI}{video}">
                <track kind="captions">
              </video>
            {/if}
          {/if}
          {#if share[1].url_id !== 0}
            <div class="urlMeta d-flex flex-column mb-3">
              <a href={meta.url} target="_blank">
                {#if meta.title}
                  <h6>{meta.title}</h6>
                {/if}
                {#if meta.description}
                  <p>{meta.description}</p>
                {/if}
                {#if meta.image}
                  <img src="{meta.image}" alt="">
                {/if}
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <div class="Card-board-icons">
      <div class="Card-board-icons-first d-flex px-3 px-md-0">
        <div class="Reaction Header-nav-like mx-2 tooltipp">
            <i class="fas fa-thumbs-up"></i>
            <span id={likeValue}>{reactions.like}</span>
            {#if reactionsLikeList && reactionsLikeList.length > 0}
              <span class="tooltiptext">
                <ul class="p-0 m-0" id="ulLikeListReactions{id}">
                  {#each reactionsLikeList as userLike}
                    <li style="list-style: none;">{userLike}</li>
                  {/each}
                </ul>
              </span>
            {/if}
        </div>

        <div class="Reaction Header-nav-heart mx-2 tooltipp">
          <i class="fas fa-heart"></i>
          <span id={loveValue}>{reactions.love}</span>
          {#if reactionsLoveList && reactionsLoveList.length > 0}
            <span class="tooltiptext">
              <ul class="p-0 m-0" id="ulLoveReactionsList{id}">
                {#each reactionsLoveList as userLove}
                  <li style="list-style: none;">{userLove}</li>
                {/each}
              </ul>
            </span>
          {/if}
        </div>

        <div class="Reaction Header-nav-comment mx-2">
          <i class="fas fa-comment"></i>
          <span on:click={showComments}>
            <span>{comments}</span>
            <span data-translate="comments">Comments</span>
          </span>
        </div>
      </div>
    </div>

    <div class="Card-board-actions">
      <div class="Card-board-actions d-flex justify-content-center justify-content-md-start">
        <button id="btnReactionLike{id}" class="Action Header-nav-thumbs-up d-flex d-xl-block flex-column align-items-center" on:click={changeReaction}>
          <i id="btnLike{id}" class="fa-thumbs-up far"></i>
          <span data-translate="like">Like</span>
        </button>
        <button id="btnReactionLove{id}" class="Action Header-nav-heart d-flex d-xl-block flex-column align-items-center" on:click={changeReaction}>
          <i id="btnLove{id}"class="fa-heart far"></i>
          <span data-translate="love">love</span>
        </button>
        <div class="Action Header-nav-comments d-flex d-xl-block flex-column align-items-center" on:click={showComments}>
          <i class="fa-comments far"></i>
          <span data-translate="comment">Comment</span>
        </div>
        <div class="Action Header-nav-share">
          {#if share !== ''}
            <SharePost {shareId} {urlAPI} {urlImages}/>
          {:else}
            <SharePost {id} {urlAPI} {urlImages}/>
          {/if}
        </div>
        <!-- <div class="Action Header-nav-paper-plane hidden disabled">
          <i class="fas fa-paper-plane"></i>
          <span data-translate="send">Send</span>
        </div> -->
      </div>
    </div>

    <div id="comment{id}" class="comments mt-3 d-none">
      <div class="Comments-add d-flex justify-content-between">
        <img src="{urlImages}{localStorage.getItem('profilePhoto')}" alt="img">
        <form>
          <input data-translate="input-make-comment" id="inputAddComment{id}" type="text" class="Comments-input" placeholder="Write a comment..." on:keyup={commentAbled}>
          <button data-translate="btn-make-comment" id="btn-sendComment{id}" class="btn-sendComment" disabled on:click={addComment}>Post</button>
        </form>
      </div>

      {#if dataComment}
        {#each dataComment as comment}
          <Comment {comment} {urlAPI} {urlImages}/>
        {/each}
      {/if}
    </div>
</div>