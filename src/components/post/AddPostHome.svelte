<script>
  import NavPost from './NavPost.svelte'
  // import CreatePost, {postValue} from './CreatePost.svelte';

  //cómo importar una función de otro compónente? 
  let rowsArea = 1
  const postValue = (e)=>{
    if (e.key === 'Enter') {
      rowsArea++
    }
  }

  const sendPost = ()=>{
    const dataPost = {
      description : postDescription.value,
      img : postImg.src
    }
    console.log(dataPost);
  }


</script>

<style>
  .Add-post textarea{
    margin-top: .5rem;
    padding: .5rem;
    width: 100%;
  }
  .Add-post a{
    text-decoration: none;
    color: var(--main-color);
  }
  .Add-post span{
    color: grey;
  }

  .btn-post{
    width: 50%;
    background-color: #199aaf;
    color: #fefefe;
  }

</style>


<div class="Add-post Default-containers px-5 d-flex flex-column">

  <div class="Add-post-input mx-3 d-flex flex-column justify-content-center">
    <textarea name="" cols="" rows={rowsArea} id="postDescription" class="Default-containers" placeholder="Start a post..." on:keyup={postValue}></textarea>
    <!-- <input id="postDescription" class="Default-containers" type="text" placeholder="Start a post..." on:keyup={createPost}> -->
    <img src="" alt="postImg" id="postImg" class="d-none">
  </div>

  <NavPost/>

  <button class="btn btn-outline-primary btn-flylinkers btn-post mt-3" on:click={sendPost}>Post</button>

</div>  