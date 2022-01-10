<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import CreatePost from './post/CreatePost.svelte'
  import Experience from './profile//Experience.svelte'
  import Panel from './profile/Panel.svelte'
  import AddPostHome from './post/AddPostHome.svelte';
  import PostP from './post/PostProfile.svelte'
  import Post from './post/Post.svelte'

  export let name, last_name, title, email , photo , id = '';

  let coverPhoto;
  let aboutMe;
  let userId = id

  const getProfile = async ()=>{
    const response = await fetch(`http://18.118.50.78:8000/user/profile/?user_id=${id}`)
    const content = await response.json()
    let data = content[0]
    coverPhoto = `http://18.118.50.78:8000${data.cover_img}`
    aboutMe = data.about
    localStorage.setItem('coverPhoto', coverPhoto)
  }

  let post;
  let userPost;
  const getPost = async()=>{
    // await id
    const response = await fetch(`http://18.118.50.78:8000/post/create/?user=${id}`)
    const content = await response.json()
    post = content.splice(1).reverse()
    userPost = content[0]
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
  <div class="Profile-container">
    <CoverPhoto {coverPhoto}/>
    <UserDetails {name} {last_name} {title} {email} {photo} {id} {aboutMe}/>
    <!-- <CreatePost/> -->
    <div class="Background-post-profile" on:load={getPost()}>
      <p class="my-2">Post</p>
      <AddPostHome {id}/>
    </div>
    <Experience/>
    <Panel/>
    {#if post}
      {#each post as dataPost}
        <Post {...userPost} {...dataPost} {userId}/>
        <!-- <PostP {...userPost} {...dataPost}/> -->
      {:else}
        <p>Loading...</p>
      {/each}
    {/if}
  </div>
</div>