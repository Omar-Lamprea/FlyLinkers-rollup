<script>

  let coverPhotoB64;
  let urlCoverPhoto;
  let idCoverPhoto;

  export let id, urlAPI;

  const showCoverImg = ()=>{
    const render = new FileReader();
    render.readAsDataURL(coverPhoto.files[0])
    render.onloadend = ()=>{
      showImage.style.display = 'flex'
      showImage.src = render.result
      coverPhotoB64 = render.result
    }
  }

  const convertCoverB64 = async ()=> {
    const response = await fetch(`${urlAPI}/resources/img/`,{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img: coverPhotoB64
      })
    })
    const content = await response.json()
    urlCoverPhoto = content.img
    idCoverPhoto = content.id
  }

  const getProfile = async (id)=>{
      const response = await fetch(`${urlAPI}/user/profile/?user_id=${id}`)
      const content = await response.json()

      if (content.Detail === 'User does not exist') {
        createDataDescription()
      } else {
        upDateDataDescription()
      }
  }

  const createDataDescription = async ()=>{
    await convertCoverB64()

    const sendData = await fetch('${urlAPI}/user/profile/', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: id,
        resource_id : idCoverPhoto,
        about: description.value,
        cover_img: urlCoverPhoto
      })
    })
  }

  const upDateDataDescription = async ()=>{
    await convertCoverB64()
    // console.log('id:', idCoverPhoto, 'url:', urlCoverPhoto);
    let dataDescription;
    
    const userDescription = document.getElementById('userDescription').textContent
    if (description.value === '') {
      dataDescription = userDescription 
    }else{
      dataDescription = description.value
    }

    const sendData = await fetch(`${urlAPI}/user/profile/?user=${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        about: dataDescription,
        // resource_id : idCoverPhoto,
        cover_img: urlCoverPhoto
      })
    })
    const content = await sendData.json()
    if (content) {
      localStorage.removeItem('coverPhoto')
      const cover = document.getElementById('coverPhotoProfile')
      cover.setAttribute('src', `${urlAPI}${urlCoverPhoto}`)
    }
  }

</script>

<style>
  .modal-body textarea{
    width: 100%;
  }
  .coverPhotoLoaded{
    display: none;
    height: 350px;
    max-height: 400px;
    max-width: 80%;
    margin: 1rem auto;
    object-fit: cover;
  }
</style>

<div class="modal fade" id="editProfile" tabindex="-1" aria-labelledby="editProfileLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="editProfileLabel">Edit Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body text-start">
        <div class="description-user">
          <label for="description">Edit description</label>
          <textarea name="" id="description" cols="30" rows="2"></textarea>
        </div>
        <div class="cover-photo">
          <label for="coverPhoto">Cover photo</label>
          <input type="file" name="coverPhoto" id="coverPhoto" accept=".png, .jpg, .jpeg" on:change={showCoverImg}>
          <img src="" alt="" id="showImage" class="coverPhotoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-outline-primary btn-flylinkers" data-bs-dismiss="modal" on:click={getProfile(id)}>Save cover photo</button>
      </div>

    </div>
  </div>
</div>