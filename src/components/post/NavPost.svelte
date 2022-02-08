<script>
  // export let postImg;
  // console.log(postImg);


  const showPostImg = ()=>{
    const render = new FileReader();
    render.readAsDataURL(loadPhotoInput.files[0])
    render.onloadend = ()=>{
      postImg.classList.remove('d-none')
      postImg.src = render.result
      ableBtn()
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

<div class="Nav-add-post d-flex justify-content-center">
  <div class="Header-nav Header-nav-image mx-3" id="loadPhotoPost" type="file">
    <label for="loadPhotoInput">
      <i class="fas fa-image"></i>
      <span>Photo</span>
      <input type="file" name="loadPhotoInput" id="loadPhotoInput" class="d-none" accept=".png, .jpg, .jpeg, .gif" on:change={showPostImg}>
    </label>
  </div>
  <div class="Header-nav Header-nav-film mx-3 disabled">
    <!-- <a href="/"> -->
      <i class="fas fa-film"></i>
      <span>Video</span>
    <!-- </a> -->
  </div>
  <div class="Header-nav Header-nav-calendar mx-3 disabled">
    <!-- <a href="/"> -->
      <i class="fas fa-calendar"></i>
      <span>Event</span>
    <!-- </a> -->
  </div>
  <div class="Header-nav Header-nav-file-alt mx-3 hidden disabled">
    <!-- <a href="/"> -->
      <i class="fas fa-file-alt"></i>
      <span>Write article</span>
    <!-- </a> -->
  </div>
</div>