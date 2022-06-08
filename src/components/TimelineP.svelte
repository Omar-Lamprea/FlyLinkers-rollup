<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import Experience from './profile/Experience.svelte'
  import Panel from './profile/Panel.svelte'
  import AddPost from './post/AddPost.svelte';
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
  import { translate } from '../js/translate';


  export let name, last_name, title, email , photo , id, urlAPI;
  export let userMain;
  export let countFriends = 0;

  if (userMain === undefined) {
    userMain = ""
  }

  const dataJson = JSON.parse(localStorage.getItem('data'))

  let coverPhoto;
  let aboutMe;
  let userId = id
  let data;
  let experiences;
  let userProfile;

  const getProfile = async ()=>{
    const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
    const content = await response.json()
    if (content[0]) {
      data = content[0]
      userProfile = data.id
      experiences = data.experiences
      coverPhoto = `${urlAPI}${data.cover_img}`
      aboutMe = data.about
    }
  }

  let post;
  let userPost;
  let countPost = null

  const getPost = async()=>{
    post = ''
    const response = await fetch(`${urlAPI}/post/create/?user=${id}`).then(res =>{
      if (res.ok) {
        return res.json()
      }else{
        throw new Error("Sorry, there isn't posts to show")
      }
    })
    .then(json =>{
      const content = json
      countPost = content.next
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
    countPost = content.next
    try {
      if (content) {
        posts.set([...$posts, ...content.results])
      }
    } catch (error) {
      endPosts.classList.remove('d-none')
    }
  }

  const reloadPosts = () =>{
    const reloadPosts = document.getElementById('reloadPostCheck')
    const observer = new MutationObserver(()=>{
      // console.log('reloading post...');
      post = ''
      getPost(1)
      reloadPosts.removeAttribute('data-reloading')
    })
    if (!window.location.href.includes('settings')){
      observer.observe(reloadPosts, {attributes:true})
    }
  }


  onMount(async ()=>{
    await getProfile()
    if (data.posts) {
      getPost()
    }
    reloadPosts()

    document.addEventListener('scroll', async (e)=>{
      if ((window.innerHeight + window.scrollY) >= main.offsetHeight - 1 && !window.location.href.includes('settings') && window.location.hash.length === 9){
        if (countPost !== null) {
          getPosts()
        }else{
          setTimeout(() => {
            endPosts.classList.remove('d-none')
          }, 1000);
        }
      }
    })

    // translate()

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
  @media screen and (max-width: 768px){
    .Background-post-profile{
      padding: 1.2rem 1rem;
    }
  }
</style>

<div class="Profile col-12 col-lg-9">
    <input type="checkbox" id="reloadPostCheck" name="reloadPost" class="d-none">
    <div class="Profile-container">
      <CoverPhoto {coverPhoto} {userId}/>
      <UserDetails {name} {last_name} {title} {email} {photo} {id} {aboutMe} {userMain} {urlAPI}/>

      {#if email === dataJson.email}
        <div class="Background-post-profile">
          <p data-translate="title-post" class="my-2">Post</p>
          <AddPost {id} {urlAPI}/>
        </div>
      {/if}
      {#if experiences !== undefined}
         <Experience {urlAPI} {id} {experiences} {userProfile}/>
      {/if}

      {#if email === dataJson.email}
        <Panel {countFriends}/>
      {/if}

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

      <div data-translate="noPost" id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry!, we can't find more post to show you.</div>
    </div>
</div>