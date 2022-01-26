<script>
  import NavPost from './NavPost.svelte'

  export let id, urlAPI;

  const validateInfoPost = (e) =>{
    if (e.key === 'Enter') {
      e.target.rows ++
    }
    if (e.target.value !== '') {
      btnSendPost.removeAttribute('disabled')
    }else{
      btnSendPost.setAttribute('disabled', '')
      if (postImg.src) {
        btnSendPost.removeAttribute('disabled')
      }
    }
  }

  const sendPost = async()=>{
    let imagePost = '';
    if (!!postImg.src) {
      // imagePost = postImg.src
      const convertImageB64 = await fetch(`${urlAPI}/resources/img/`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          img: postImg.src
        })
      })
      const content =await convertImageB64.json()
      imagePost = content.img
    }

    if (
      postDescription.value !== '' && imagePost === '' || 
      postDescription.value === '' && imagePost !== '' || 
      postDescription.value !== '' && imagePost !== '') 
      {
      //   const dataPost = {
      //     id : id,
      //     description : postDescription.value,
      //     img : imagePost
      //   }
      // console.log(dataPost);

        const post = await fetch(`${urlAPI}/post/create/`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            user: id,
            img: imagePost,
            desc : postDescription.value
          })
        })
        const content = await post.json()
        if (content) {
          postDescription.value = ''
          // window.location.reload()
        }
    }
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
    <textarea name="" cols="" rows="1" id="postDescription" class="Default-containers" placeholder="Start a post..." on:keyup={validateInfoPost}></textarea>
    <img alt="postImg" id="postImg" class="d-none mb-3">
  </div>

  <NavPost/>

  <button id="btnSendPost" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" disabled on:click={sendPost}>Post</button>

</div>