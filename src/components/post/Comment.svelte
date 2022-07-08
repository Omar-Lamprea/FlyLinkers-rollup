<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import UserPhoto from '../profile/UserPhoto.svelte'
  import startTime from '../../js/startTime.js'
  import Reply from './Reply.svelte'
  import { translate } from '../../js/translate';
  import {sendLike, sendLove} from '../../js/reactionsPost.js'
  import {onMount} from "svelte"

  // import {commentsFirebase} from '../../js/firebase/commentsFirebase.js'

  // let replyLike = 0
  // let replyLove = 0
  // let replycomment = 0

  export let comment, urlAPI, urlImages;

  let reply;

  let iconLike = "far"
  let iconLove = "far"
  let reactionsLikeList;
  let reactionsLoveList;

  const getReaction = async ()=>{
    let reaction;
    const response = await fetch(`${urlAPI}/post/reacts/?comment_id=${comment.id}`)
    if (response.ok) {
      const content = await response.json()
      reactionsLikeList = []
      reactionsLoveList = []
      content.forEach(userReaction => {
        if (userReaction.like) reactionsLikeList.push(userReaction.name + ' ' + userReaction.last_name)
        else if (userReaction.love) reactionsLoveList.push(userReaction.name + ' ' + userReaction.last_name)
      })

      reaction = content.find(r => r.id === parseInt(localStorage.getItem('userId')));
    }

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
      console.log('Error:');
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

    const result = await sendLike(commentId, localStorage.getItem('userId'))
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
    getReaction()
  }

  const makeLove = async (icon, count, idComment) =>{
    const countLove = document.getElementById(`container-reaction-love-${comment.id}`)
    countLove.setAttribute('disabled', '')

    const result = await sendLove(idComment, localStorage.getItem('userId'))
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
    getReaction()
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
    /* margin: 0 0 0.5rem 0.5rem; */
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
  .Comments-users span button{
    font-weight: 600;
    color: var(--main-color);
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .User-comment{
    color: var(--main-color);
    font-weight: 600;
  }

  .userInfo .startTime{
    color: grey;
    font-weight: inherit;
  }

  .reactions-comment{
    border-top: 1px solid rgb(184 184 184);
  }
  .reactions-comment .span-reply{
    background-color: inherit;
    padding: inherit;
  }

  .add-reply input{
    width: 100%;
  }
  .Comments-users .add-reply button{
    background-color: var(--main-color);
    color: #fff;
    cursor: pointer;
    padding: 0 0.5rem;
    border: none;
    margin-left: 0.1rem;
  }


  .tooltipp {
  position: relative;
  display: inline-block;
  /* border-bottom: 1px dotted black; */
}

.tooltipp .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.761);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltipp .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.tooltipp:hover .tooltiptext {
  visibility: visible;
}

</style>

<div class="Comments">
  <div class="Comments-content">
    <div class="Comments-users mb-2 mx-2 mx-md-0">
      <a href="/profile/{comment.user.username}" class="d-flex" style="height: fit-content;" use:link use:active>
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
        <div class="reactions-comment d-flex pt-2 pb-1">
          <button id="container-reaction-like-{comment.id}" class="mx-2 tooltipp" on:click={makeLike(`icon-like-${comment.id}`, `count-like-${comment.id}`, `${comment.id}`)}>
            <i id="icon-like-{comment.id}" class="{iconLike} fa-thumbs-up" aria-hidden="true"></i>
            <span id="count-like-{comment.id}" class="span-reply">{comment.reactions.like}</span>
            {#if reactionsLikeList && reactionsLikeList.length >0 }
              <span class="tooltiptext">
                <ul class="p-0 m-0" id="ulLikeListReactions{comment.id}">
                    {#each reactionsLikeList as userLike}
                      <li style="list-style: none;">{userLike}</li>
                    {/each}
                </ul>
              </span>
            {/if}
          </button>

          <button id="container-reaction-love-{comment.id}" class="mx-2 tooltipp" on:click={makeLove(`icon-love-${comment.id}`, `count-love-${comment.id}`, `${comment.id}`)}>
            <i id="icon-love-{comment.id}" class="{iconLove} fa-heart" aria-hidden="true"></i>
            <span id="count-love-{comment.id}" class="span-reply">{comment.reactions.love}</span>
            {#if reactionsLoveList && reactionsLoveList.length > 0}
              <span class="tooltiptext">
                <ul class="p-0 m-0" id="ulLoveReactionsList{comment.id}">
                  {#each reactionsLoveList as userLove}
                    <li style="list-style: none;">{userLove}</li>
                  {/each}
                </ul>
              </span>
            {/if}
          </button>

          <button class="mx-2" on:click={showReply}>
            <i  class="fas fa-comment" aria-hidden="true"></i>
            <span class="span-reply">{comment.answers} <span class="span-reply" data-translate="reply">Reply</span></span>
          </button>
        </div>

        {#if reply}
           <div class="add-reply mt-2 d-flex">
             <img src="{urlImages}{localStorage.getItem('profilePhoto')}" alt="img">
             <form class="d-flex w-100">
               <input data-translate="input-make-reply" id="input-addReply-{comment.id}" type="text" class="Comments-input" placeholder="Write a reply..." on:keyup={commentAbled}>
               <button data-translate="btn-make-comment" id="btn-addReply-{comment.id}" class="btn-sendComment" style="ba" disabled on:click={addReply}>Post</button>
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