<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import CreatePost from './post/CreatePost.svelte'
  import Experience from './profile//Experience.svelte'
  import Panel from './profile/Panel.svelte'
  import AddPostHome from './post/AddPostHome.svelte';
  import PostP from './post/PostProfile.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';

  export let name, last_name, title, email , photo , id;

  let coverPhoto;
  let aboutMe;
  let userId = id

  const getProfile = async ()=>{
    const response = await fetch(`http://18.118.50.78:8000/user/profile/?user_id=${id}`)
    const content = await response.json()
    if (content.Detail) {
      // createprofile()
    }
    let data = content[0]
    coverPhoto = `http://18.118.50.78:8000${data.cover_img}`
    aboutMe = data.about
    localStorage.setItem('coverPhoto', coverPhoto)
  }

  const createprofile = async ()=>{
    const response = await fetch('http://18.118.50.78:8000/user/profile/', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: id,
        resource_id : 0,
        about: '',
        cover_img: ''
      })
    })
  }

  let post;
  let userPost;
  const getPost = async()=>{
    const response = await fetch(`http://18.118.50.78:8000/post/create/?user=${id}`)
    const content = await response.json()
    post = content.results.splice(1)
    userPost = content.results[0]
  }

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

<div class="Profile col-9" on:load={getProfile()}>
  <!-- {#if aboutMe} -->
    <div class="Profile-container" on:load={getPost()}>
        <CoverPhoto {coverPhoto}/>
        <UserDetails {name} {last_name} {title} {email} {photo} {id} {aboutMe}/>
      <!-- <CreatePost/> -->
      {#if email === localStorage.getItem('user')}
        <div class="Background-post-profile" on:load={getPost()}>
          <p class="my-2">Post</p>
          <AddPostHome {id}/>
        </div>
      {/if}
      <Experience/>
      <Panel/>
      {#if post}
        {#each post as dataPost}
          <Post {...userPost} {...dataPost} {userId}/>
        {/each}
      {/if}
    </div>
  <!-- {/if} -->
</div>