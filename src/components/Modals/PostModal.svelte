<script>
  import {onMount} from 'svelte'
  import Post from '../post/Post.svelte'
  export let postId, urlAPI, data

  let userId = localStorage.getItem('userId')
  console.log(data);
  let template;
  let content = data.results
  template = {
    user: content[0],
    comments: content[1].comments,
    create_time: content[1].create_time,
    desc: content[1].desc,
    id: content[1].id,
    img: content[1].img,
    reactions: content[1].reactions,
    update_time: content[1].update_time,
    url: content[1].url
  }
  console.log(template);

  // async function openPost(id){
  //   postId = id
  //   console.log(postId);

  //   const response = await fetch(`${urlAPI}/post/create/?post_id=${postId}`)
  //   if (response.status === 200) {
  //     const content = await response.json()
  //     data = content
  //     console.log(data);
  //   }
  // }

  // openPost(postId)

</script>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {#if data}
           {postId}
           <Post {urlAPI} {...template} {userId}/>
        {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>