<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import Experience from './profile//Experience.svelte'
  import Panel from './profile/Panel.svelte'
  import AddPost from './post/AddPost.svelte';
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'

  export let name, last_name, title, email , photo , id, urlAPI;
  export let userMain;

  if (userMain === undefined) {
    userMain =''
  }

  let coverPhoto;
  let aboutMe;
  let userId = id
  let data

  const getProfile = async ()=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
    const content = await response.json()
    if (content[0]) {
      data = content[0]
      coverPhoto = `${urlAPI}${data.cover_img}`
      aboutMe = data.about
    }
  }

  let post;
  let userPost;
  let countPost = 0

  const getPost = async()=>{
    const response = await fetch(`${urlAPI}/post/create/?user=${id}`).then(res =>{
      if (res.ok) {
        return res.json()
      }else{
        throw new Error("Sorry, there isn't posts to show")
      }
    })
    .then(json =>{
      const content = json
      countPost = content.count

      if (!content.Detail) {
        if (content.results) {
          post = content.results.splice(1)
          userPost = content.results[0]
        }
      }
    })
    .catch((error) =>{
      console.error(error);
    })
  }


  const posts = writable([])
  let page = 1;

  async function getPosts (){
    page += 1
    const response = await fetch(`${urlAPI}/post/create/?page=${page}&user=${id}`)
    const content = await response.json()
    countPost = content.count
    try {
      if (content) {
        posts.set([...$posts, ...content.results])
      }
    } catch (error) {
      endPosts.classList.remove('d-none')
    }
  }

  if (id === parseInt(localStorage.getItem('userId'))) {
    setTimeout(() => {
      const btnSendPost = document.getElementById('btnSendPost')
      btnSendPost.addEventListener('click', e =>{
        setTimeout(() => {
          posts.set([])
          getPost()
        }, 1000);
      })
    }, 2000);
  }

  
  document.addEventListener('scroll', async (e)=>{
    if ((window.innerHeight + window.scrollY) === main.offsetHeight){
      if (countPost > 3) {
        getPosts()
      }
    }
  })




  onMount(async ()=>{
    await getProfile()
    if (data.posts) {
      getPost()
    }
  })

</script>

<style>
  .Background-post-profile{
    background-color: #EFEFEF;
    padding: 1.2rem 2rem;
    margin-bottom: 1.2rem;
    border-radius: 1rem;
  }
  .Background-post-profile p{
    color: var(--main-color);
    font-weight: 600;
  }
</style>

<div class="Profile col-9">
    <div class="Profile-container">
      <CoverPhoto {coverPhoto}/>
      <UserDetails {name} {last_name} {title} {email} {photo} {id} {aboutMe} {userMain} {urlAPI}/>

      {#if email === localStorage.getItem('user')}
        <div class="Background-post-profile">
          <p class="my-2">Post</p>
          <AddPost {id} {urlAPI}/>
        </div>
      {/if}

      <Experience/>
      <Panel/>
      {#if post}
        {#if userMain}

          {#each post as dataPost}
            <Post {...userPost} {...dataPost} {userMain} {urlAPI}/>
          {/each}

        {:else}

          {#each post as dataPost}
            <Post {...userPost} {...dataPost} {userId} {urlAPI}/>
          {/each}

        {/if}
      {/if}


      {#if $posts}
        {#if userMain}

          {#each $posts as dataPost}
            <Post {...userPost} {...dataPost} {userMain} {urlAPI}/>
          {/each}

        {:else}

          {#each $posts as dataPost}
            <Post {...userPost} {...dataPost} {userId} {urlAPI}/>
          {/each}

        {/if}
      {/if}

      <div id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry! there aren't more posts.</div>
    </div>
</div>