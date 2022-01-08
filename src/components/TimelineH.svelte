<script>
  import AddPost from './post/AddPostHome.svelte'
  import Post from './post/Post.svelte'

  export let id = '';

  let post;
  
  const getPost = async()=>{
    const response = await fetch(`http://18.118.50.78:8000/post/home/?user_id=${id}`)
    const content = await response.json()
    post = content.results
    post.reverse()
  }

</script>

<style>
  /* .Timeline{
    padding: 4em 0 0 0;
  } */
</style>

<div class="Timeline col-12 col-lg-6" on:load={getPost()}>
  <div class="Timeline-container">
    <AddPost {id}/>
    {#if post}
      {#each post as dataPost}
        <Post {...dataPost}/>
      {:else}
        <p>Loading...</p>
      {/each}
    {/if}
  </div>
</div>