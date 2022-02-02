<script>
  import AddPost from './post/AddPost.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';

  export let id;
  export let urlAPI;

  const userId = id;
  const posts = writable([])

  let page = 0;
  let countPost = 0

  export async function getPosts (page1){
    if (page1) {
      page = page1
    }else{
      page += 1
    }
    try {
      const response = await fetch(`${urlAPI}/post/home/?page=${page}&user_id=${id}`)
      const content = await response.json()
      countPost = content.count
      if (content.results) {
        posts.set([...$posts, ...content.results])
      }else{
        endPosts.classList.remove('d-none')
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function clearPost(){
    posts.set([])
  }

  onMount(getPosts)

  if (id) {
    setTimeout(() => {
      btnSendPost.addEventListener('click', e =>{
        setTimeout(() => {
          clearPost()
          getPosts(1)
        }, 1000);
      })
    }, 3000);
  }

  document.addEventListener('scroll', async (e)=>{
    if ((window.innerHeight + window.scrollY) === main.offsetHeight){
      if (countPost > 3) {
        getPosts()
      }
    }
  })

</script>

<div class="Timeline col-12 col-lg-6">
  <div class="Timeline-container">
    {#if id}
       <AddPost {id} {urlAPI}/>
    {/if}
    {#each $posts as dataPost}
      <Post {...dataPost} {userId} {urlAPI}/>
    {/each}

    <div id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry! there aren't more posts.</div>
  </div>
</div>