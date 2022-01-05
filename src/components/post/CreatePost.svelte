<script>

  let rowsArea = 2
  const postValue = (e)=>{
    if (e.key === 'Enter') {
      rowsArea++
    }
  }

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
    border: none;
    background: #fafafa;
  }
  
</style>

<div class="Post Default-containers-grey">
  <div class="Post-container">
    <div class="Post-title">
      <p class="my-2">Post</p>
    </div>
    <div class="Default-containers Post-content">
      <p class="mb-3"><i class="fas fa-pen"></i> Create post</p>
      <textarea name="" id="" cols="30" rows={rowsArea} on:keyup={postValue} placeholder="......"></textarea>
    </div>

    <div class="Nav-add-post d-flex">
      <div class="Header-nav-image mx-3">
        <a href="/">
          <i class="fas fa-image"></i>
          <span>Photo</span>
        </a>
      </div>
      <div class="Header-nav-film mx-3">
        <a href="/">
          <i class="fas fa-film"></i>
          <span>Video</span>
        </a>
      </div>
      <div class="Header-nav-calendar mx-3">
        <a href="/">
          <i class="fas fa-calendar"></i>
          <span>Event</span>
        </a>
      </div>
      <div class="Header-nav-file-alt mx-3">
        <a href="/">
          <i class="fas fa-file-alt"></i>
          <span>Write article</span>
        </a>
      </div>
    </div>
  </div>
</div>