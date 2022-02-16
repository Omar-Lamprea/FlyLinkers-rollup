<script>
  import NavPost from './NavPost.svelte'
  import Loader from '../Loader.svelte'

  export let id, urlAPI, colorbox;

  if (!colorbox) {
    colorbox = ''
  }

  let urlLink;
  let validUrl = '';

  let characterCount = 0
  const validateInfoPost = async (e) =>{
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

  const validateUrl = (e)=>{
    urlLink = ''
    if (urlContent) {
      metaTitle.value = ''
      metaDescription.value = ''
      metaImage.src = ''
      urlContent = ''
      searchMeta = ''
      urlLink = ''
    }
    if(e.target.value.includes('https') || e.target.value.includes('http')){
      let searchUrl = e.target.value.split(' ')
      let link;

      for (let i = 0; i < searchUrl.length; i++) {
        if (searchUrl[i].includes('https://') || searchUrl[i].includes('http://')) {
          link = searchUrl[i]
          urlLink = searchUrl[i]
        }else{

        }
      }
      if (isValidHttpUrl(link) === true){
        showMetaData(link)
      }
    }else{
      urlMeta.classList.add('d-none')
    }


    if (e.target.value !== '') {
      btnSendPost.removeAttribute('disabled')
    }else{
      btnSendPost.setAttribute('disabled', '')
      validUrl = ''
    }
  }

  let searchMeta = false;
  let urlContent;

  const showMetaData = async (url) =>{
    if (!searchMeta || url !== searchMeta) {
      searchMeta = url
      const urlMeta = document.getElementById('urlMeta')
      urlMeta.classList.remove('d-none')
      const getMeta = await fetch(`${urlAPI}/post/meta/`,{
        method: 'POST',
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          url: searchMeta
        })
      })
      const content = await getMeta.json()
      if (content) {
        urlContent = content
        validUrl = url
      }
    }
  }
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    }catch (_) {
      return false;
    }
    return(url.protocol === "http:" || url.protocol === "https:");
  }

  const closeMetaData = ()=>{
    if(urlContent){
      urlMeta.classList.add('d-none')
      metaTitle.value = ''
      metaDescription.value = ''
      metaImage.src = ''
      urlContent = ''
      searchMeta = ''
      urlLink = ''
      validUrl = ''
    }
  }

  const sendPost = async()=>{
    let imagePost = '';
    if (!!postImg.src) {
      // console.log('envia solo foto')
      const convertImageB64 = await fetch(`${urlAPI}/resources/img/`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          img: postImg.src
        })
      })
      const content = await convertImageB64.json()
      imagePost = content.img
    }

    if (
      postDescription.value !== '' && imagePost === '' || 
      postDescription.value === '' && imagePost !== '' || 
      postDescription.value !== '' && imagePost !== '') 
      {
        let postDescriptionClean = []
        if(postDescription.value.includes('https') || postDescription.value.includes('http')){
          const descriptionUrl = postDescription.value.split(' ')
          descriptionUrl.forEach(string => {
            if(!string.includes('https') || !string.includes('http')){
              postDescriptionClean.push(string)
            }
          });
        }else{
          postDescriptionClean.push(postDescription.value)
        }
        const joinPostDescriptionClean = postDescriptionClean.join(' ')

        const post = await fetch(`${urlAPI}/post/create/`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            user: id,
            img: imagePost,
            desc : joinPostDescriptionClean,
            url: validUrl
          })
        })
        const content = await post.json()
        if (content) {
          postDescription.value = ''
          if (postImg.src) {
            postImg.setAttribute('src', '')
            postImg.classList.toggle('d-none')
          }
          closeMetaData()
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
  .urlMeta{
    padding: 1rem;
    margin: 1rem;
    border: 1px solid var(--main-color);
    border-radius: 1rem;
  }
  .urlMeta img{
    width: 100%;
    margin-top: 1rem;
  }
  .urlMeta i{
    color: red;
    padding: 0.2rem;
    cursor: pointer;
    display: flex;
    justify-content: end;
  }
  .boxHome{
    background-color: #EFEFEF;
  }

</style>


<div class="Add-post {colorbox} Default-containers px-lg-5 d-flex flex-column">

  <div class="Add-post-input mx-3 d-flex flex-column justify-content-center position-relative">
    <textarea name="" cols="" rows="1" id="postDescription" class="Default-containers" placeholder="Start a post..." on:keyup={validateUrl} on:keydown={validateInfoPost}></textarea>
    <div id="characterCountSpan" class="characterCount characterCount-active">
      {characterCount}/255
    </div>
    <img alt="postImg" id="postImg" class="d-none mb-3">
  </div>

  <div id="urlMeta" class="urlMeta d-flex flex-column d-none">
      {#if urlContent && urlLink.includes('https://')}
        <i class="fa-solid fa-xmark d-flex- align-self-end" on:click={closeMetaData}></i>
        <h6 id="metaTitle">{urlContent.title}</h6>
        <p id="metaDescription">{urlContent.description}</p>
        <img id="metaImage" src={urlContent.image} alt="">
      {:else}
        <Loader/>
      {/if}
  </div>

  <NavPost/>


  <button id="btnSendPost" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" disabled on:click={sendPost}>Post</button>

</div>