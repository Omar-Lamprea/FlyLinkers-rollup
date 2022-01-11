<script>
  import AddPost from './post/AddPostHome.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'

  export let id = '';
  const userId = id;

  let post;
  let page = 0;

  const getPost = async()=>{
    page += 1
    const response = await fetch(`http://18.118.50.78:8000/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
    if (content) {
      post = content.results
    }
  }

  let morePost = [{}];
  let newPost;
  let errorPage;
  
  // document.addEventListener('scroll', async (e)=>{
  //   if ((window.innerHeight + window.scrollY) === main.offsetHeight){
  //     loadMorePost()
  //   }
  // })

  const loadMorePost = async (e)=>{
    page += 1
    const response = await fetch(`http://18.118.50.78:8000/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
    newPost = content.results
    newPost.forEach(el => {
      post.push(el)
    });
    console.log(post);
    console.log(newPost);
  }

</script>

<div class="Timeline col-12 col-lg-6" on:load={getPost()}>
  <div class="Timeline-container">
    <AddPost {id}/>
    {#if post}
      {#each post as dataPost}
        <Post {...dataPost} {userId}/>
      {/each}
    {:else}
      <Loader/>
    {/if}

    {#if newPost}
      {#each newPost as dataPost}
        <Post {...dataPost} {userId}/>
      {/each}
    <!-- {:else}
      <Loader/> -->
    {/if}
   <button on:click={loadMorePost}>cargar mas...</button>
  </div>
</div>