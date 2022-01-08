<script>
  // import Comments from './Comments.svelte'
  export let desc, reactions, img, comments, create_time, user, id;


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

  getPostDate()

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
  .Card-board-icons i {
    cursor: pointer;
    font-size: 15px;
  }
  .Card-board-actions{
    font-size: 20px;
    margin: 1rem 0;
  }

  .Card-description span {
    font-size: 14px;
    margin: 0 1rem;
  }

</style>


<div class="Card Default-containers">
  <div class="Card-container">
    <div class="Card-Header">
      <div class="Card-user">
        <img src="http://18.118.50.78:8000{user.photo}" alt="">
        <h2>
          {user.name} {user.last_name}
          <span>{user.title}</span>
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
        <div class="Header-nav-like mx-3">
          <a href="/">
            <i class="fas fa-thumbs-up"></i>
            <span>{reactions.like}</span>
          </a>
        </div>
        <div class="Header-nav-heart mx-3">
          <a href="/">
            <i class="fas fa-heart"></i>
            <span>{reactions.love}</span>
          </a>
        </div>
        <div class="Header-nav-comment mx-3">
          <a href="/">
            <i class="fas fa-comment"></i>
            <span>{comments} Comments</span>
          </a>
        </div>
      </div>
      <!-- <div class="Card-board-icons-second">
        <i class="fas fa-paper-plane"></i>
        <i class="fas fa-bookmark"></i>
      </div> -->
    </div>

    <div class="Card-board-actions">
      <div class="Card-board-actions d-flex">
        <div class="Header-nav-thumbs-up mx-3">
          <a href="/">
            <i class="far fa-thumbs-up"></i>
            <span>Like</span>
          </a>
        </div>
        <div class="Header-nav-heart mx-3">
          <a href="/">
            <i class="far fa-heart"></i>
            <span>love</span>
          </a>
        </div>
        <div class="Header-nav-comments mx-3">
          <a href="/">
            <i class="far fa-comments"></i>
            <span>Comment</span>
          </a>
        </div>
        <div class="Header-nav-share mx-3">
          <a href="/">
            <i class="fas fa-share"></i>
            <span>Share</span>
          </a>
        </div>
        <div class="Header-nav-paper-plane mx-3">
          <a href="/">
            <i class="fas fa-paper-plane"></i>
            <span>Send</span>
          </a>
        </div>
      </div>
      <!-- <div class="Card-board-icons-second">
        <i class="fas fa-paper-plane"></i>
        <i class="fas fa-bookmark"></i>
      </div> -->
    </div>

  <!-- <Comments/> -->
</div>