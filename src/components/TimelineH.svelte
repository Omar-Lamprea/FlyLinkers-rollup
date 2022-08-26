<script>
  import AddPost from './post/AddPost.svelte'
  import Post from './post/Post.svelte'
  import Loader from './Loader.svelte'
  import {onMount} from 'svelte'
  import { writable } from 'svelte/store';
  import { translate } from '../js/translate';


  export let id;
  export let urlAPI, urlImages;

  const userId = id;
  const posts = writable([])

  let colorbox = 'boxHome'

  let page = 0;
  let countPost = null
  let endPostMessage;

  export async function getPosts(page1, idNewPost = false){
    if (page1) {
      page = page1
    }else{
      page += 1
    }
    try {
      const response = await fetch(`${urlAPI}/post/home/?page=${page}&user_id=${id}`)
      if (response.ok) {
        let content = await response.json()
        countPost = content.next

        if(idNewPost){
          let arreglo = content.results
          let index = (el) => el.id === parseInt(idNewPost);

          if (arreglo.findIndex(index) >= 0) {
            //si llega acá se ordena

            // console.log('arreglo sin ordenar:');
            // console.log(arreglo);

            let aux = arreglo[arreglo.findIndex(index)] // 1
            arreglo[arreglo.findIndex(index)] = arreglo[0]
            arreglo[0] = aux

            // console.log('arreglo ordenado:');
            // console.log(arreglo);

          }else{
            const getNewPost = await fetch(`${urlAPI}/post/create/?post_id=${idNewPost}`)
            if(getNewPost.ok){
              const response = await getNewPost.json()
              let userResult = {
                user : response.results[0]
              }
              let template = Object.assign(response.results[1], userResult)
              content.results.unshift(template)
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
      const reloadPosts = document.getElementById('reloadPostCheck')

      const observer = new MutationObserver(()=>{
        // console.log('reloading post...');
        // console.log('id del post nuevo=', reloadPosts.getAttribute('data-post'))
        clearPost()
        getPosts(1, reloadPosts.getAttribute('data-post'))
        reloadPosts.removeAttribute('data-reloading')
      })

      if (!window.location.href.includes('settings')) {
        observer.observe(reloadPosts, {attributes:true})
      }
  }

  iconHome.addEventListener('click', ()=>{
    clearPost()
    getPosts(1)
  })

  onMount(async ()=>{
    await getPosts()
    reloadPosts()

    document.addEventListener('scroll', async (e)=>{
      if(window.location.hash === "#/" || window.location.hash === ""){
        if ((window.innerHeight + window.scrollY) >= main.offsetHeight - 1 && !window.location.href.includes('settings') && !window.location.href.includes('profile')){
          if (countPost !== null && countPost !== undefined) {
            getPosts()
            countPost = null
          }else{
            setTimeout(() => {
              endPostMessage = 1
            }, 1000);
          }
        }
      } 
    })

    // translate()
    // setInterval(() => {
    //   clearPost()
    //   getPosts(1)
    // }, 120_000);
  })

</script>

<div class="Timeline col-12 col-lg-6">
  <div class="Timeline-container">
    <input type="checkbox" id="reloadPostCheck" name="reloadPost" class="d-none">
    {#if id}
       <AddPost {id} {urlAPI} {colorbox} {urlImages}/>
    {/if}
    {#each $posts as dataPost}
      <Post {...dataPost} {userId} {urlAPI} {urlImages}/>
    {/each}

    {#if endPostMessage}
      {#if localStorage.getItem('lang') === "Es"}
        <div data-translate="noPost" id="endPosts" class=" text-center fw-bold" style="color: var(--main-color);">Lo sentimos!, no hay más publicaciones que mostrarte.</div>
      {:else}
         <div data-translate="noPost" id="endPosts" class=" text-center fw-bold" style="color: var(--main-color);">Sorry!, we can't find more post to show you.</div>
      {/if}
    {/if}
  </div>
</div>
