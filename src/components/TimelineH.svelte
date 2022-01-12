<script>
  import AddPost from './post/AddPostHome.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';

  export let id = '';
  const userId = id;
  const posts = writable([])

  let page = 0;

  async function getPosts (){
    page += 1
    const response = await fetch(`http://18.118.50.78:8000/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
    try {
      if (content) {
        posts.set([...$posts, ...content.results])
      }
    } catch (error) {
      endPosts.classList.remove('d-none')
    }
  }

  onMount(getPosts)

  document.addEventListener('scroll', async (e)=>{
    if ((window.innerHeight + window.scrollY) === main.offsetHeight){
      getPosts()
    }
  })

</script>

<div class="Timeline col-12 col-lg-6">
  <div class="Timeline-container">
    <AddPost {id}/>
      {#each $posts as dataPost}
        <Post {...dataPost} {userId}/>
      {/each}

      <div id="endPosts" class="d-none text-center">No more posts =(</div>
   <!-- <button on:click={getPosts}>cargar mas...</button> -->
  </div>
</div>