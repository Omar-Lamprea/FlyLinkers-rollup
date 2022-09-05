<script>
  import { onMount } from "svelte";
  import Post from '../components/post/Post.svelte'
  import Loader from '../components/Loader.svelte'
  import SidebarLeft from '../components/SidebarLeft.svelte'
  import SidebarRight from '../components/SidebarRight.svelte'

  export let params
  const urlAPI = 'https://api.flylinkers.com'
  const urlImages= 'https://api.flylinkers.com'

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

  onMount(async()=>{
    await getPost()
  })

</script>

<div class="row">
  {#if template}
    <SidebarLeft {name} {last_name} {title} {photo} {urlAPI} {urlImages}/>
    <div class="col-12 col-lg-6">
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
