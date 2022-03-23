<script>
  import {closeModal} from '../../../js/closeModals'

  let coverPhotoB64;
  let urlCoverPhoto;
  let idCoverPhoto;

  export let id, urlAPI;

  let btnSaveCoverPhoto = 'Save cover photo'

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
    // console.log('procesando info....');
    btnUpdateCoverPhoto.setAttribute('disabled', '')
    btnSaveCoverPhoto = 'processing...'

    upDateDataDescription()
  }

  const upDateDataDescription = async ()=>{
    await convertCoverB64()
    // console.log('id:', idCoverPhoto, 'url:', urlCoverPhoto);
    // const userDescription = document.getElementById('userDescription').textContent

    // console.log('actualizando a:', urlCoverPhoto);
    const sendData = await fetch(`${urlAPI}/user/profile/?user=${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cover_img: urlCoverPhoto
      })
    })
    const content = await sendData.json()
    if (sendData.ok) {
      localStorage.removeItem('coverPhoto')
      const cover = document.getElementById('coverPhotoProfile')
      cover.setAttribute('src', `${urlAPI}${urlCoverPhoto}`)
      closeModal('editProfile')
      btnSaveCoverPhoto = 'Save cover photo'
      btnUpdateCoverPhoto.removeAttribute('disabled')
      showImage.style.display = 'none'
    }
  }

</script>

<style>
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
        <h5 class="modal-title" id="editProfileLabel">Edit cover photo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body text-start">
        <div class="cover-photo">
          <label for="coverPhoto">Cover photo</label>
          <input type="file" name="coverPhoto" id="coverPhoto" accept=".png, .jpg, .jpeg" on:change={showCoverImg}>
          <img src="" alt="" id="showImage" class="coverPhotoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnUpdateCoverPhoto" type="button" class="btn btn-outline-primary btn-flylinkers" on:click={getProfile(id)}>{btnSaveCoverPhoto}</button>
      </div>

    </div>
  </div>
</div>