<script>
  // export let postImg;
  // console.log(postImg);


  const showPostImg = ()=>{
    if (loadPhotoInput.value !== "") {
      if(loadPhotoInput.files[0].size > 3_145_728){
        alert("File is too big! \nTry again with a file smaller than 3MB");
        loadPhotoInput.value = "";
      }
      const render = new FileReader();
      render.readAsDataURL(loadPhotoInput.files[0])
      render.onloadend = ()=>{
        closeImg.classList.remove('d-none')
        postImg.classList.remove('d-none')
        postImg.src = render.result
        ableBtn()
        uploadVideo.setAttribute('disabled', '')
      }
    }
    // else{
    //   uploadVideo.removeAttribute('disabled')
    // }
    
  }

  const uploadVideoPost = (e) =>{
    console.log(uploadVideo.files);
    // postVideo.srx = uploadVideo.files[0]
    if (uploadVideo.files[0]) {
      if (uploadVideo.files[0].size > 52_428_800) {
        alert("File is too big! \nTry again with a file smaller than 50MB");
        loadPhotoInput.value = "";
      }else{
        const render = new FileReader();
        render.readAsDataURL(uploadVideo.files[0])
        render.onloadend = ()=>{
          closeVd.classList.remove('d-none')
          postVideo.classList.remove('d-none')
          // console.log(render.result);
          postVideo.src = render.result
          ableBtn()
          loadPhotoInput.setAttribute('disabled', '')
        }
      }
    }
  }

  const ableBtn = ()=>{
    const btnsendPost = document.getElementById('btnSendPost')
    btnsendPost.removeAttribute('disabled')
  }

</script>

<style>
  .Header-nav, .Header-nav label{
    cursor: pointer;
  }
  i, span{
    color:var(--main-color)
  }
  .disabled, .disabled i, .disabled span {
    color: grey;
    cursor: default;
  }

  @media screen and (max-width: 768px){
    .hidden{
      display: none;
    }
  }

</style>

<div class="Nav-add-post d-flex justify-content-center mt-2 text-center">
  <div class="Header-nav Header-nav-image mx-3" id="loadPhotoPost" type="file">
    <label for="loadPhotoInput">
      <i class="fas fa-image"></i>
      <span data-translate="icon-photo">Photo</span>
      <input type="file" name="loadPhotoInput" id="loadPhotoInput" class="d-none" accept=".png, .jpg, .jpeg, .gif"  on:change={showPostImg}>
    </label>
  </div>
  <div class="Header-nav Header-nav-film mx-3">
    <label for="uploadVideo">
      <i class="fas fa-film"></i>
      <span data-translate="icon-video">Video</span>
      <input type="file" name="uploadVideo" id="uploadVideo" class="d-none" accept="video/mp4,video/x-m4v,video/*"  on:change={uploadVideoPost}>
    </label>
  </div>



  <!-- other buttons -->
  <!-- <div class="Header-nav Header-nav-calendar mx-3 disabled">
    <a href="/">
      <i class="fas fa-calendar"></i>
      <span data-translate="icon-event">Event</span>
    </a>
  </div>
  <div class="Header-nav Header-nav-file-alt mx-3 hidden disabled">
    <a href="/">
      <i class="fas fa-file-alt"></i>
      <span data-translate="icon-article">Write article</span>
    </a>
  </div> -->
</div>