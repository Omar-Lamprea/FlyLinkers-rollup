<script>
  import NavPost from './NavPost.svelte'

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

    <NavPost/>

  </div>
</div>