<script>
  import AddPost from './post/AddPost.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';
  import { translate } from '../js/translate';


  export let id;
  export let urlAPI;

  const userId = id;
  const posts = writable([])

  let colorbox = 'boxHome'

  let page = 0;
  let countPost = null

  export async function getPosts (page1){
    if (page1) {
      page = page1
    }else{
      page += 1
    }
    try {
      const response = await fetch(`${urlAPI}/post/home/?page=${page}&user_id=${id}`)
      const content = await response.json()
      countPost = content.next
      if (response.ok) {
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

  const reloadPosts = () =>{
    // setTimeout(() => {
      const reloadPosts = document.getElementById('reloadPostCheck')
      const observer = new MutationObserver(()=>{
        // console.log('reloading post...');
        clearPost()
        getPosts(1)
        reloadPosts.removeAttribute('data-reloading')
      })
      if (!window.location.href.includes('settings')) {
        observer.observe(reloadPosts, {attributes:true})
      }
    // }, 4000);
  }

  iconHome.addEventListener('click', ()=>{
    clearPost()
    getPosts(1)
  })

  onMount(async ()=>{
    await getPosts()
    reloadPosts()

    document.addEventListener('scroll', async (e)=>{
      if ((window.innerHeight + window.scrollY) >= main.offsetHeight - 1 && !window.location.href.includes('settings') && !window.location.href.includes('profile')){
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

<div class="Timeline col-12 col-lg-6">
  <div class="Timeline-container">
    <input type="checkbox" id="reloadPostCheck" name="reloadPost" class="d-none">
    {#if id}
       <AddPost {id} {urlAPI} {colorbox}/>
    {/if}
    {#each $posts as dataPost}
      <Post {...dataPost} {userId} {urlAPI}/>
    {/each}

    <div id="endPosts" class="d-none text-center fw-bold" style="color: var(--main-color);">Sorry!, we can't find more post to show you.</div>
  </div>
</div>