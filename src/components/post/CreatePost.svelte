<script>
  import NavPost from './NavPost.svelte'
  import expandTextArea from '../../js/expandTextArea.js'


</script>

<style>
  .Post-container, .Post-content i{
    color: var(--main-color);
  }
  .Post-content{
    color: #6b6b6b;
  }
  .Post-title{
    font-weight: 600;
  }
  .Post-content textarea{
    width: 100%;
    border: 1px solid var(--main-color);
    border-radius: 1rem;
    background: #fafafa;
  }
  .btn-post{
    width: 50%;
    background-color: #199aaf;
    color: #fefefe;
  }
  
</style>

<div class="Post Default-containers-grey">
  <div class="Post-container d-flex flex-column">
    <div class="Post-title">
      <p class="my-2">Post</p>
    </div>
    <div class="Default-containers Post-content">
      <p class="mb-3"><i class="fas fa-pen"></i> Create post</p>
      <textarea name="" id="" cols="30" rows="1" on:keyup={expandTextArea} placeholder="......"></textarea>
      <img src="" alt="postImg" id="postImg" class="d-none mb-3" style="width: 100%;">
    </div>

    <NavPost/>
    <button class="btn btn-outline-primary btn-flylinkers btn-post mt-3">Post</button>
  </div>
</div>