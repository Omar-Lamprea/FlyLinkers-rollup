<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import UserPhoto from '../profile/UserPhoto.svelte'
  import startTime from '../../js/startTime.js'
  import Reply from './Reply.svelte'
  import { translate } from '../../js/translate';

  // import {commentsFirebase} from '../../js/firebase/commentsFirebase.js'

  // let replyLike = 0
  // let replyLove = 0
  // let replycomment = 0

  export let comment, urlAPI, urlImages;
  console.log(comment);

  let reply;

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
          <p class="mx-2">
            <i class="fas fa-thumbs-up" aria-hidden="true"></i>
            <span class="span-reply">0</span>
          </p>

          <p class="mx-2">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <span class="span-reply">0</span>
          </p>

          <p class="mx-2" on:click={showReply}>
            <i class="fas fa-comment" aria-hidden="true"></i>
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