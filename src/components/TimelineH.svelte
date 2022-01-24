<script>
  import AddPost from './post/AddPost.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';

  export let id = '';
  export let urlAPI;

  const userId = id;
  const posts = writable([])

  let page = 0;

  async function getPosts (){
    page += 1
    try {
    const response = await fetch(`${urlAPI}/post/home/?page=${page}&user_id=${id}`)
    const content = await response.json()
      if (content.results) {
        posts.set([...$posts, ...content.results])
      }else{
        endPosts.classList.remove('d-none')
      }
    } catch (error) {
      console.log(error);
      
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
    <AddPost {id} {urlAPI}/>
      {#each $posts as dataPost}
        <Post {...dataPost} {userId} {urlAPI}/>
      {/each}

      <div id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry! there aren't more posts.</div>
   <!-- <button on:click={getPosts}>cargar mas...</button> -->
  </div>
</div>