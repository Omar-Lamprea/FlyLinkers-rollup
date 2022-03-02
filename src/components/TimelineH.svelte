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

  let colorbox = 'boxHome'

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
      // console.log(content);
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

  setTimeout(() => {
    const reloadPosts = document.getElementById('reloadPostCheck')
    const observer = new MutationObserver(()=>{
      // console.log('reloading post...');
      clearPost()
      getPosts(1)
      reloadPosts.removeAttribute('data-reloading')
    })
    observer.observe(reloadPosts, {attributes:true})
  }, 4000);

  document.addEventListener('scroll', async (e)=>{
    if ((window.innerHeight + window.scrollY) >= main.offsetHeight - 1 && !window.location.href.includes('settings')){
      if (countPost > 3) {
        getPosts()
      }
    }
  })

  iconHome.addEventListener('click', ()=>{
    clearPost()
    getPosts(1)
  })

  onMount(getPosts)
</script>

<div class="Timeline col-12 col-lg-6">
  <div class="Timeline-container">
    <input type="checkbox" id="reloadPostCheck" name="reloadPost" class="d-none">
    {#if id}
       <AddPost {id} {urlAPI} {colorbox}/>
    {/if}
    {#each $posts as dataPost}
      <Post {...dataPost} {userId} {urlAPI}/>
    {/each}

    <div id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry! there aren't more posts.</div>
  </div>
</div>