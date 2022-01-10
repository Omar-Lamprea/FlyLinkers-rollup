<script>
  import AddPost from './post/AddPostHome.svelte'
  import Post from './post/Post.svelte'

  export let id = '';
  const userId = id;

  let post;
  let page = 1;
  const getPost = async()=>{
    const response = await fetch(`http://18.118.50.78:8000/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
    post = content.results
    post.reverse()
  }

  let morePost;
  let errorPage;
  
  document.addEventListener('scroll', async (e)=>{
    if ((window.innerHeight + window.scrollY) === main.offsetHeight){
      loadMorePost()
    }
  })

  const loadMorePost = async ()=>{
    page += 1
    const response = await fetch(`http://18.118.50.78:8000/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
    morePost = content.results

    morePost.forEach(el => {
      morePost.push(el)
    });

    console.log(morePost);
    errorPage = content.detail
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
        <Post {...dataPost} {userId}/>
      {:else}
        <p>Loading...</p>
      {/each}
    {/if}

    {#if morePost}
      {#each morePost as dataPost}
        <Post {...dataPost} {userId}/>
      {:else}
        <p>Loading...</p>
      {/each}
    {/if}
    {#if errorPage}
       <p>no more...</p>
    {/if}

  </div>
</div>