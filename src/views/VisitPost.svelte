<script>
  import { onMount } from "svelte";
  import Post from '../components/post/Post.svelte'
  import Loader from '../components/Loader.svelte'
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'

  export let params
  const urlAPI = 'https://api.flylinkers.com'
  const urlImages= 'https://api.flylinkers.com'
  const urlParams = window.location.href;

  let data;
  let template;
  let error = undefined;

  let name;
  let last_name;
  let title;
  let photo;
 

  const userId = localStorage.getItem('userId')
  const getPost = async()=>{
    const response = await fetch(`${urlAPI}/post/create/?post_id=${params.id}&main_user=${userId}`)
    if (response.ok) {
      const result = await response.json()
      data = result

      let content = data.results
      // console.log(content);
      name = content[0].name
      last_name = content[0].last_name
      title = content[0].title
      photo = content[0].photo

      template = {
        user: content[0],
        comments: content[1].comments,
        create_time: content[1].create_time,
        desc: content[1].desc,
        id: content[1].id,
        img: content[1].img,
        reactions: content[1].reactions,
        update_time: content[1].update_time,
        url_id: content[1].url_id,
        share: content[1].share,
        video: content[1].video,
        share_id: content[1].share_id,
        share_count: content[1].share_count,
        meta: content[1].meta
      }
    }else{
      const result = await response.json()
      error = 'Ops... We have a problem, refresh this page or try again later.'
      console.log(error)
      console.log(result);
    }
  }

  const ignore = ()=>{
    window.location.href = "./"
    //delete report....
  }

  const deletePost = async ()=>{
    const response = await fetch(`${urlAPI}/post/create/?post_id=${params.id}&user_id=${userId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    const content = await response.json()
    if (response.ok) {
      window.location.href = "./"
    }else{
      console.log(content);
    }
  }

  onMount(async()=>{
    await getPost()
  })

</script>


<style>
  .btns-admin-report button{
    border: none;
    border-radius: 5px;
    padding: .5rem 1rem;
    background-color: var(--main-color);
    color: #fff;
  }
  .btns-admin-report button:hover{
    background-color: var(--hover-main-color);
  }
  .btns-admin-report button.delete:hover{
    background-color: rgb(149, 25, 25);
  }
  .btns-admin-report button.delete{
    background-color: rgb(180, 19, 19);
  }

</style>

<div class="row">
  {#if template}
    <SidebarLeft {name} {last_name} {title} {photo} {urlAPI} {urlImages}/>
    <div class="col-12 col-lg-6">
      {#if urlParams.includes('?admin=reportedPost')}
        <div class="btns-admin-report mb-2 d-flex justify-content-center">
          <button class="me-2" on:click={ignore}>Ignore</button>
          <button class="ms-2 delete" on:click={deletePost}>Delete post</button>
        </div>
      {/if}
      <Post {urlAPI} {...template} {userId} {urlImages}/>
    </div>
    <SidebarRight {urlAPI} {urlImages}/>
  {:else}
    <Loader/>
  {/if}

  {#if error}
    <p class="text-center">{error}</p>
  {/if}
</div>
