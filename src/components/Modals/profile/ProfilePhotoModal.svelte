<script>
  import {closeModal} from '../../../js/closeModals'

  let profilePhotoB64;
  let urlProfilePhoto;
  let idProfilePhoto
  export let id, urlAPI, urlImages;

  let saveProfilePhoto = 'Save profile photo'

  const showProfileImg = () =>{
    const render = new FileReader();
    render.readAsDataURL(profilePhoto.files[0])
    render.onloadend = ()=>{
      showProfileImage.style.display = 'flex'
      showProfileImage.src = render.result
      profilePhotoB64 = render.result
    }
  }

  const convertProfileB64 = async ()=> {
    const response = await fetch(`${urlImages}/resources/img/`,{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          img: profilePhotoB64
        })
    })
    const content = await response.json()
    urlProfilePhoto = content.img
    idProfilePhoto = content.id
  }

  const updateProfile = async(id)=>{
    saveProfilePhoto = 'processing...'
    btnProfilePhoto.setAttribute('disabled', '')
    await convertProfileB64()
    const response = await fetch(`${urlAPI}/user/create/?id=${id}`,{
      method : 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        photo: urlProfilePhoto
      })
    })
    
    if (response.ok) {
      localStorage.removeItem('profilePhoto')
      const profileImg = document.getElementById('dropdownMenuButton1')
      const headerUserImage = document.getElementById('headerUserImage')
      profileImg.setAttribute('src', `${urlAPI}${urlProfilePhoto}`)
      headerUserImage.setAttribute('src', `${urlAPI}${urlProfilePhoto}`)
      closeModal('ModalProfile')
      saveProfilePhoto = 'Save profile photo'
      btnProfilePhoto.removeAttribute('disabled')
      showProfileImage.style.display = 'none'
    }
  }

</script>

<style>
  .photoLoaded{
    display: none;
    height: 350px;
    max-height: 500px;
    max-width: 80%;
    margin: 1rem auto;
    object-fit: cover;
  }
</style>

<div class="modal fade" id="ModalProfile" tabindex="-1" aria-labelledby="ModalProfileModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">

    <div class="modal-content">

      <div class="modal-header">
        <h5 data-translate="title-profile-photo" class="modal-title" id="ModalProfileModalLabel">Edit profile photo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body text-start">
        <div class="photo">
          <label data-translate="p-profile" for="profilePhoto">Add profile photo</label>
          <input type="file" name="profilePhoto" id="profilePhoto" accept=".png, .jpg, .jpeg" on:change={showProfileImg}>
          <img src="" alt="" id="showProfileImage" class="photoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button data-translate="modal-profile-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button data-translate="modal-profile-btn-save" id="btnProfilePhoto" type="button" class="btn btn-outline-primary btn-flylinkers" on:click={updateProfile(id)}>{saveProfilePhoto}</button>
      </div>

    </div>
  </div>
</div>