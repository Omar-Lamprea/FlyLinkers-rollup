<script>
  import NavPost from './NavPost.svelte'
  import Loader from '../Loader.svelte'

  export let id, urlAPI, colorbox;

  if (!colorbox) colorbox = ''

  let urlLink;
  let validUrl = '';
  let YTlink;

  let characterCount = 0
  const validateInfoPost = async (e) =>{
    // console.dir(e.target.value);
    e.target.style.height = (e.target.scrollHeight > e.target.clientHeight) ? (e.target.scrollHeight)+"px" : "41px"; 
    // console.log(e.target.value.length);
    characterCount = e.target.value.length

    if (e.target.value.length <= 255) {
      characterCountSpan.classList.add('characterCount-active')
      if (e.key === 'Enter') {
        e.target.rows ++
      }
      if (e.target.value.length >= 3) {
        btnSendPost.removeAttribute('disabled')
      }else{
        closeMeta()
        if (postImg.src) {
          btnSendPost.removeAttribute('disabled')
          uploadVideo.setAttribute('disabled', '')
        }
      }
    }else{
      btnSendPost.setAttribute('disabled', '')
      characterCountSpan.classList.remove('characterCount-active')
    }
  }

  const validateUrl = (e)=>{
    if(e.target.value.includes('https') || e.target.value.includes('http')){
      loadPhotoInput.setAttribute('disabled', '')
      uploadVideo.setAttribute('disabled', '')
      let searchUrl = e.target.value.split(' ')

      searchUrl.forEach(url => {
        if (url.includes('\n')) {
          searchUrl = url.replace('\n', ' ')
          const splitUrl = searchUrl.split(' ')

          splitUrl.forEach(el => {
            if (el.includes('https://') || el.includes('http://')){
              searchUrl = [el]
            }
          });
        }
      });
      let link;

      for (let i = 0; i < searchUrl.length; i++) {
        if (searchUrl[i].includes('https://') || searchUrl[i].includes('http://')) {
          link = searchUrl[i]
          urlLink = searchUrl[i]
        }
      }
      if (isValidHttpUrl(link) === true){
        if (!localStorage.getItem('urlPost')) {
          localStorage.setItem('urlPost', link)
          showDataPost(link)
        }else{
          if (link !== localStorage.getItem('urlPost')) {
            localStorage.setItem('urlPost', link)
            showDataPost(link)
          }
        }
      }

    }else{
      loadPhotoInput.removeAttribute('disabled')
      uploadVideo.removeAttribute('disabled', '')
      urlMeta.classList.add('d-none')
    }

    if (e.target.value.length >= 3) {
      btnSendPost.removeAttribute('disabled')
    }else{
      btnSendPost.setAttribute('disabled', '')
      validUrl = ''
    }
  }

  const showDataPost = (link)=>{
    console.log('call data');
    link.includes('https://www.youtube.com/') 
      ? showYouTubeData(link) 
      : showMetaData(link)
  }

  let searchMeta = false;
  let urlContent;
  
  const showMetaData = async (url) =>{
    console.log(url);
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
        // console.log(url);
        urlContent = content
        validUrl = url
      }
    }
  }
  const showYouTubeData = (link)=>{
    YTvideoContainer.classList.remove('d-none')
    YTlink = link.replace('watch?v=', 'embed/')
    btnSendPost.removeAttribute('disabled')
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

  const closeMeta = ()=>{
    localStorage.removeItem('urlPost')
    btnSendPost.setAttribute('disabled', '')
    loadPhotoInput.removeAttribute('disabled')
    uploadVideo.removeAttribute('disabled', '')
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
    urlContent = undefined
  }
  const closeMetaData = ()=>{
    loadPhotoInput.removeAttribute('disabled')
    uploadVideo.removeAttribute('disabled', '')
    localStorage.removeItem('urlPost')
    postDescription.value = ''
    btnSendPost.setAttribute('disabled', '')
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
    urlContent = undefined
  }
  const closeYTData = () =>{
    loadPhotoInput.removeAttribute('disabled')
    uploadVideo.removeAttribute('disabled', '')
    localStorage.removeItem('urlPost')
    YTlink = false
    postDescription.value = ''
    btnSendPost.setAttribute('disabled', '')
  }

  const closeImage =() =>{
    postImg.removeAttribute('src')
    postImg.classList.add('d-none')
    closeImg.classList.add('d-none')
    uploadVideo.removeAttribute('disabled')
    if (postDescription.value === '') btnSendPost.setAttribute('disabled', '')
  }

  const closeVideo = () =>{
    //const btnCloseVd = document.getElementById('closeVd')
    postVideo.removeAttribute('src')
    postVideo.classList.add('d-none')
    closeVd.classList.add('d-none')
    loadPhotoInput.removeAttribute('disabled')
    uploadVideo.value = ''
    if (postDescription.value === '') btnSendPost.setAttribute('disabled', '')
  }

  const sendPost = async()=>{
    loaderPost.classList.toggle('d-none')
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
      if (convertImageB64.ok) {
        const content = await convertImageB64.json()
        imagePost = content.img
      }
    }
    
    if (!postVideo.src) {
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
            }else{
              if (string.includes('\n')) {
                const stringReplace = string.replace('\n', ' ')
                const newString = stringReplace.split(' ')
                postDescriptionClean.push(newString[0])
              }
            }
          })
        }else{
          postDescriptionClean.push(postDescription.value)
        }
        const joinPostDescriptionClean = postDescriptionClean.join(' ')
  
        let template;
        if (urlContent === undefined && !YTlink) {
          template = {
            user: id,
            img: imagePost,
            desc: joinPostDescriptionClean,
          }
        }else if(urlContent === undefined && YTlink){
          template = {
            user: id,
            img: imagePost,
            desc: joinPostDescriptionClean,
            video: YTlink
          }
        }else{
          if (urlContent.id) {
            template = {
              user: id,
              img: imagePost,
              desc: joinPostDescriptionClean,
              url_id: urlContent.id
            }
          }else{
            template = {
              user: id,
              img: imagePost,
              desc: joinPostDescriptionClean,
              meta: {
                title: urlContent.title,
                description: urlContent.description,
                image: urlContent.image,
                url: validUrl
              }
            }
          }
        }
  
        console.log(template);
        const post = await fetch(`${urlAPI}/post/create/`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(template)
        })

        if (post.ok) {
          postDescription.value = ''
          if (postImg.src) {
            postImg.setAttribute('src', '')
            postImg.classList.add('d-none')
          }

          closeMetaData()
          closeYTData()
          closeVideo()
          closeImage()

          loaderPost.classList.add('d-none')
          //recargar post
          const reloadPost = document.getElementById('reloadPostCheck')
          reloadPost.classList.toggle('data-reloading')
        }
      }
      
    }else{
      const data = new FormData()
      data.append('video', uploadVideo.files[0])
  
      const responseVideo = await fetch(`${urlAPI}/resources/video/`, {
        method: 'POST',
        body: data
      })
      if (responseVideo.ok) {
        const content = await responseVideo.json()
        console.log(content);
        const templateVideo = {
          user: id,
          img: "",
          desc: postDescription.value,
          video: content.video
        }
  
        const responsePostVideo = await fetch(`${urlAPI}/post/create/`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(templateVideo)
        })
  
        if (responsePostVideo.ok) {
          
          postDescription.value = ''
          if (postVideo.src) {
            postVideo.setAttribute('src', '')
            postVideo.classList.toggle('d-none')
            btnSendPost.setAttribute('disabled', '')
            loaderPost.classList.add('d-none')
            const reloadPost = document.getElementById('reloadPostCheck')
            reloadPost.classList.toggle('data-reloading')
          }
          closeVideo()
        }
      }
    }
  }

</script>

<style>
  .Add-post textarea{
    margin: .5rem 0;
    padding: .5rem;
    width: 100%;
    overflow-y: auto; 
    word-wrap:break-word;
    resize: none;
  }
  .Add-post textarea:focus-visible{
    outline-color: var(--main-color);
  }
  .characterCount{
    /* position: absolute; */
    /* bottom: 0; */
    text-align: end;
    top: 3.5rem;
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
  .btn-closeImgVideo{
    width: fit-content;
    display: flex;
    align-self: end;
    color: red;
    /* font-size: 1rem; */
    cursor: pointer;
  }

</style>


<div class="Add-post {colorbox} Default-containers px-lg-5 d-flex flex-column">

  <div class="Add-post-input mx-3 d-flex flex-column justify-content-center position-relative">
    <textarea data-translate="input-addPost" name="" cols="1" rows="1" id="postDescription" class="Default-containers" placeholder="Start a post..." on:keyup={validateUrl} on:keyup={validateInfoPost}></textarea>
    <div id="characterCountSpan" class="characterCount characterCount-active">
      {characterCount}/255
    </div>
    <i id="closeImg" class="fa-solid fa-xmark btn-closeImgVideo d-none" on:click={closeImage}></i>
    <img alt="postImg" id="postImg" class="d-none my-3" style="width:100%; max-height: 400px; object-fit: contain;">

    <i id="closeVd" class="fa-solid fa-xmark btn-closeImgVideo d-none" on:click={closeVideo}></i>
    <video controls id="postVideo" class="d-none my-3" style="max-height: 400px;">
      <track kind="captions">
    </video>

  </div>

  <div id="urlMeta" class="urlMeta d-flex flex-column d-none">
      {#if urlContent && urlLink.includes('https://')}
      <!-- {#if urlContent} -->
        <i class="fa-solid fa-xmark d-flex- align-self-end" on:click={closeMetaData}></i>
        <h6 id="metaTitle">{urlContent.title}</h6>
        <p id="metaDescription">{urlContent.description}</p>
        <img id="metaImage" src={urlContent.image} alt="">
      {:else}
        <Loader/>
      {/if}
  </div>

  <div id="YTvideoContainer" class="YTvideo d-flex flex-column d-none">
    {#if YTlink}
    <i class="fa-solid fa-xmark d-flex- align-self-end" on:click={closeYTData}></i>
      <iframe
        width="100%" 
        height="350" 
        src={YTlink} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    {/if}
  </div>

  <NavPost/>

  <div id="loaderPost" class="loader-content d-none">
    <div class="loader">
      <div></div>
    </div>
  </div>
  <button data-translate="post" id="btnSendPost" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" disabled on:click={sendPost}>Post</button>
</div>