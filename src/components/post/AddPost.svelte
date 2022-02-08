<script>
  import NavPost from './NavPost.svelte'

  export let id, urlAPI;

  let characterCount = 0
  const validateInfoPost = (e) =>{
    e.target.style.height = (e.target.scrollHeight > e.target.clientHeight) ? (e.target.scrollHeight)+"px" : "60px"; 
    // console.log(e.target.value.length);
    characterCount = e.target.value.length

    if (e.target.value.length <= 255) {
      characterCountSpan.classList.add('characterCount-active')
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
    }else{
      btnSendPost.setAttribute('disabled', '')
      characterCountSpan.classList.remove('characterCount-active')
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
          if (postImg.src) {
            postImg.setAttribute('src', '')
            postImg.classList.toggle('d-none')
          }
        }
    }
  }

</script>

<style>
  .Add-post textarea{
    margin-top: .5rem;
    padding: .5rem;
    width: 100%;
    overflow-y: auto; 
    word-wrap:break-word
  }
  .Add-post textarea:focus-visible{
    outline-color: var(--main-color);
  }
  .characterCount{
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: 12px;
    color: red;
  }
  .characterCount-active{
    color: grey;
  }

  .btn-post{
    width: 50%;
    background-color: #199aaf;
    color: #fefefe;
  }

</style>


<div class="Add-post Default-containers px-lg-5 d-flex flex-column">

  <div class="Add-post-input mx-3 d-flex flex-column justify-content-center position-relative">
    <textarea name="" cols="" rows="1" id="postDescription" class="Default-containers" placeholder="Start a post..." on:keydown={validateInfoPost}></textarea>
    <div id="characterCountSpan" class="characterCount characterCount-active">
      {characterCount}/255
    </div>
    <img alt="postImg" id="postImg" class="d-none mb-3">
  </div>

  <NavPost/>

  <button id="btnSendPost" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" disabled on:click={sendPost}>Post</button>

</div>