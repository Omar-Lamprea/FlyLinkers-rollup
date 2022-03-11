<script>
  import ShareModal from '../../Modals/actions/ShareModal.svelte'
  export let id, urlAPI, shareId = ''

  if (!id) id = shareId

  let userPost;
  let infoPost;

  // console.log(id);
  const getPostShare = async() =>{
    const response = await fetch(`${urlAPI}/post/create/?post_id=${id}`)
    if (response.ok) {
      const content = await response.json()
      // console.log(content.results);
      userPost = content.results[0]
      infoPost = content.results[1]
    }
  }
</script>

<style>
  .share span{
    color: rgba(38, 38, 38, 0.7);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-weight: initial;
  }
</style>

<div class="share" data-bs-toggle="modal" data-bs-target="#shareModal-{id}" on:click={getPostShare}>
<!-- <div class="share" data-bs-toggle="modal" data-bs-target="#shareModal-{id}"> -->
  <i class="fas fa-share"></i>
  <span>Share</span>
</div>
<ShareModal {urlAPI} {id} {userPost} {infoPost}/>