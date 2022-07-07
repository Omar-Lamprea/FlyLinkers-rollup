<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import UserPhoto from '../profile/UserPhoto.svelte'
  import startTime from '../../js/startTime.js'
  import Reply from './Reply.svelte'
  import { translate } from '../../js/translate';
  import {sendLike, sendLove, getReactionUser} from '../../js/reactionsPost.js'
  import {onMount} from "svelte"

  // import {commentsFirebase} from '../../js/firebase/commentsFirebase.js'

  // let replyLike = 0
  // let replyLove = 0
  // let replycomment = 0

  export let comment, urlAPI, urlImages;

  let reply;

  let iconLike = "far"
  let iconLove = "far"
  const getReaction = async ()=>{
    const reaction = await getReactionUser(comment.id, localStorage.getItem('userId'));
    if(reaction){
      reaction.like ? iconLike = 'fas' : false
      reaction.love ? iconLove = 'fas' : false
    }
  }

  const showReply = async()=>{
    try {
      const response = await fetch(`${urlAPI}/post/answer/?comment_id=${comment.id}`)
      if (response.ok) {
        const content = await response.json()
        reply = content
        translate()
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log('asdf');
      console.log(error);
    }
  }

  const commentAbled = (e)=>{
    const btnSendComment = document.getElementById(`btn-addReply-${comment.id}`)
    e.target.value !== '' 
      ? btnSendComment.removeAttribute('disabled') 
      : btnSendComment.setAttribute('disabled', '')
  }

  const addReply = async (e) =>{

    e.preventDefault()

    const inputAddReply = document.getElementById(`input-addReply-${comment.id}`)

    const obj = {
      answer: inputAddReply.value,
      user_id: localStorage.getItem('userId'),
      comment_id: comment.id
    }

    const response = await fetch(`${urlAPI}/post/answer/`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(obj)
    })

    if (response.ok) {
       inputAddReply.value = ''
       comment.answers += 1
      await showReply()
    }


    //firebase:
    // const content = await response.json()
    // if (content) {
      // inputAddReply.value = ''
      // comments += 1
      // await getCommets()


      // let aux;
      // if (user.length === 0) {
      //   aux = user_id
      // }else{
      //   aux = user.id
      // }

      // if (aux !== userId ) {
        
      //   let userDataComment = 0
      //   if (dataComment.length > 0) {
      //     userDataComment = dataComment[dataComment.length - 1]
      //   }else{
      //     userDataComment = dataComment[0]
      //   }

      //   const commentUserFirebase = {
      //     user_id: userId,
      //     comment: userDataComment.comment,
      //     name: userStorage.name + ' ' + userStorage.last_name,
      //     photo: userStorage.photo,
      //     post_id: id,
      //     seen: false,
      //     create_at: new Date()
      //   }

      //   commentsFirebase(commentUserFirebase, aux)
      // }
    // }

  }


  const makeLike = async (icon, count, commentId) =>{
    const countLike = document.getElementById(`container-reaction-like-${comment.id}`)
    countLike.setAttribute('disabled', '')

    const result = await sendLike(icon, count, commentId, localStorage.getItem('userId'))
    if(result === "update like to dislike"){
      comment.reactions.like -= 1
      iconLike = "far"
    }else if(result === "update like and dislove"){
      comment.reactions.like += 1
      comment.reactions.love -= 1
      iconLike = "fas"
      iconLove = "far"
    }else if(result === "update to like" || result === "new like reaction"){
      comment.reactions.like += 1
      iconLike = "fas"
    }
    countLike.removeAttribute('disabled')
  }

  const makeLove = async (icon, count, idComment) =>{
    const countLove = document.getElementById(`container-reaction-love-${comment.id}`)
    countLove.setAttribute('disabled', '')

    const result = await sendLove(icon, count, idComment, localStorage.getItem('userId'))
    if(result === "update love to dislove"){
      comment.reactions.love -= 1
      iconLove = "far"
    }else if(result === "update love and dislike"){
      comment.reactions.love += 1
      comment.reactions.like -= 1
      iconLove = "fas"
      iconLike = "far"
    }else if(result === "update to love" || result === "new love reaction"){
      comment.reactions.love += 1
      iconLove = "fas"
    }
    countLove.removeAttribute('disabled')
  }

  onMount(async ()=>{
    await getReaction()
  })

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
    min-width: 40px;
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

  .reactions-comment p{
    cursor: pointer;
  }
  .reactions-comment .span-reply{
    background-color: inherit;
    padding: inherit;
  }

  .add-reply input{
    width: 100%;
  }
  .add-reply button{
    background-color: var(--main-color);
    color: #fff;
    cursor: pointer;
    padding: 0 0.5rem;
    border: none;
    margin-left: 0.1rem;
  }
</style>

<div class="Comments">
  <div class="Comments-content">
    <div class="Comments-users">
      <a href="/profile/{comment.user.username}" class="d-flex" use:link use:active>
        <img src="{urlImages}{comment.user.photo}" alt="">
      </a>
      <span>
        <div class="userInfo mb-1 d-flex justify-content-between">
          <a href="/profile/{comment.user.username}" class="d-flex" use:link use:active>
            <p class="User-comment">{comment.user.name} {comment.user.last_name}</p>
          </a>
          <p class="startTime">{startTime(comment.create_time)}</p>
        </div>
        <div class="mb-2">
          {comment.comment}
        </div>
        <div class="reactions-comment d-flex">
          <p id="container-reaction-like-{comment.id}" class="mx-2" on:click={makeLike(`icon-like-${comment.id}`, `count-like-${comment.id}`, `${comment.id}`)}>
            <i id="icon-like-{comment.id}" class="{iconLike} fa-thumbs-up" aria-hidden="true"></i>
            <span id="count-like-{comment.id}" class="span-reply">{comment.reactions.like}</span>
          </p>

          <p id="container-reaction-love-{comment.id}" class="mx-2" on:click={makeLove(`icon-love-${comment.id}`, `count-love-${comment.id}`, `${comment.id}`)}>
            <i id="icon-love-{comment.id}" class="{iconLove} fa-heart" aria-hidden="true"></i>
            <span id="count-love-{comment.id}" class="span-reply">{comment.reactions.love}</span>
          </p>

          <p class="mx-2" on:click={showReply}>
            <i  class="fas fa-comment" aria-hidden="true"></i>
            <span class="span-reply">{comment.answers} <span class="span-reply" data-translate="reply">Reply</span></span>
          </p>
        </div>

        {#if reply}
           <div class="add-reply mt-2 d-flex">
             <img src="{urlImages}{localStorage.getItem('profilePhoto')}" alt="img">
             <form class="d-flex w-100">
               <input data-translate="input-make-reply" id="input-addReply-{comment.id}" type="text" class="Comments-input" placeholder="Write a reply..." on:keyup={commentAbled}>
               <button data-translate="btn-make-comment" id="btn-addReply-{comment.id}" class="btn-sendComment" disabled on:click={addReply}>Post</button>
             </form>
           </div>

           <div class="container-replys">
             {#each reply as reply}
               <Reply {reply} {urlImages}/>
             {/each}
           </div>
        {/if}
      </span>
    </div>
  </div>
</div>