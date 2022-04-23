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
      let content = await response.json()
      countPost = content.next
      if (response.ok) {
        const dateNow = new Date()
        const dateNowOfMlSeconds = dateNow.getTime();

        // const datelimit = new Date(dateNowOfMlSeconds - addMlSeconds)
        // console.log(datelimit.toISOString());
        // console.log(new Date(Date.parse(content.results[2].create_time)));
        // console.log(new Date(Date.parse(content.results[2].create_time) + 10000));

        if (content.results.length === 3) {
          for (let i = 0; i < content.results.length; i++) {
            if (content.results[i].user.id === parseInt(localStorage.getItem('userId')) &&
            new Date(Date.parse(content.results[i].create_time) + 10000) >= dateNowOfMlSeconds) {
              let aux = content.results[0]
              let aux2 = content.results[1]
              content.results[0] = content.results[i]
              content.results[1] = aux
              content.results[2] = aux2
            }
          }
        }else if(content.results.length === 2){
          for (let i = 0; i < content.results.length; i++) {
            if (content.results[i].user.id === parseInt(localStorage.getItem('userId')) &&
            new Date(Date.parse(content.results[i].create_time) + 10000) >= dateNowOfMlSeconds) {
              let aux = content.results[0]
              content.results[0] = content.results[i]
              content.results[1] = aux
            }
          }
        }

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
    setInterval(() => {
      clearPost()
      getPosts(1)
    }, 120_000);

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