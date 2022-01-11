<script>
  // import Comments from './Comments.svelte'
  export let userId;
  export let desc, reactions, img, comments, create_time, user, id, user_id, update_time;
  export let name, middle_name, last_name, title, photo, email;

  if (user) {
    name = '', middle_name= '', last_name='', title='', photo='', email = '', update_time='', user_id=''
  }else{
  }




  let datePost;

  const getPostDate = ()=> {
    const postDate = new Date(create_time)
    const dateNow = new Date()
    const substractDate = (dateNow - postDate)

    const minute = 60_000
    const hour = minute * 60
    const days = hour * 24
    const week = days * 7
    const month = week * 4
    const year = month * 12

    let daysCount = (1 * substractDate)/ days;
    let timePost;

    // console.log(Math.round(daysCount));
    if (substractDate < hour) {
      timePost = (1 * substractDate)/ minute 
      datePost = Math.floor(timePost) + 'Min'
    }
    if (daysCount < 1 && substractDate > hour){
      timePost = (1 * substractDate)/ hour 
      datePost = Math.floor(timePost) + 'H'
    }
    if (daysCount >= 1) {
      timePost = daysCount
      datePost = Math.ceil(timePost) + ' D'
    }
    if (daysCount >= 7){
      timePost = (1 * substractDate)/ week 
      datePost = Math.floor(timePost) + ' W'

      if (timePost >= 4) {
        timePost = (1 * substractDate)/ month 
        datePost = Math.floor(timePost) + ' M'

        if (timePost >= 12) {
          timePost = (1 * substractDate)/ year 
          datePost = Math.floor(timePost) + ' Year'
        }
      }
    }
  }

  
  const likeValue = `likeValue${id}`
  const loveValue = `loveValue${id}`

  const reactionUser = async()=>{
    const spanLikeValue = document.getElementById(`likeValue${id}`)
    const spanLoveValue = document.getElementById(`loveValue${id}`)
    const btnLike = document.getElementById(`btnLike${id}`)
    const btnLove = document.getElementById(`btnLove${id}`)

    if (spanLikeValue.textContent !== '0' || spanLoveValue.textContent !== '0') {
      const getIdReaction = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}`)
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

    const getIdReaction = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}`)
    const content = await getIdReaction.json()

    //like
    if (reactionType === 'fa-thumbs-up' && reactionElement === 'far') {
      console.log('like in process..');

      if(!!content.Error === true){
       const createReaction = await fetch('http://18.118.50.78:8000/post/like/',{
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
        const like = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}&user=${userId}`,{
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
      console.log('dislike in process..');

      const dislike = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}&user=${userId}`,{
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
      console.log('love in process...');
      if(!!content.Error === true){
       const createReaction = await fetch('http://18.118.50.78:8000/post/like/',{
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
          likeAcount.textContent = reactions.love + 1
          toggleReaction()
        }
      }else{
        const love = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}&user=${userId}`,{
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
          // likeAcount.textContent = reactions.like-1
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
      console.log('dislove in process...');
      
      const dislove = await fetch(`http://18.118.50.78:8000/post/like/?post_id=${id}&user=${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({})
      })

      const response = dislove.json()
      if (response) {
        loveAcount.textContent = reactions.love-1
        // likeAcount.textContent = reactions.like++
        toggleReaction()
      }
    }

    function toggleReaction(){
      element.classList.toggle('far')
      element.classList.toggle('fas')
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
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


</style>


<div class="Card Default-containers" on:load={getPostDate()}>
  <div class="Card-container">
    <div class="Card-Header">

      <div class="Card-user">
        {#if user !== undefined}
          <img src="http://18.118.50.78:8000{user.photo}" alt="">
        {/if}
        {#if user === undefined}
          <img src="http://18.118.50.78:8000{photo}" alt="">
        {/if}

        <h2>
          {#if user}
            {user.name} {user.last_name}
            <span>{user.title}</span>
          {/if}
          {#if user === undefined}
            {name} {last_name}
            <span>{title}</span>
          {/if}
          <span>{datePost}</span>
        </h2>
      </div>
      
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
           <img src="http://18.118.50.78:8000{img}" alt="img post">
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
          <span>{comments} Comments</span>
        </div>
      </div>
      <!-- <div class="Card-board-icons-second">
        <i class="fas fa-paper-plane"></i>
        <i class="fas fa-bookmark"></i>
      </div> -->
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
        <div class="Action Header-nav-comments mx-3">
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
      <!-- <div class="Card-board-icons-second">
        <i class="fas fa-bookmark"></i>
      </div> -->
    </div>

  <!-- <Comments/> -->
</div>