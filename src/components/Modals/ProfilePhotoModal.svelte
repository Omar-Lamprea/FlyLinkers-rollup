<script>
  let profilePhotoB64;
  let urlProfilePhoto;
  let idProfilePhoto

  export let id, urlAPI;


  const showProfileImg = () =>{
    console.log(profilePhoto);
    const render = new FileReader();
    render.readAsDataURL(profilePhoto.files[0])
    render.onloadend = ()=>{
      showProfileImage.style.display = 'flex'
      showProfileImage.src = render.result
      profilePhotoB64 = render.result
    }
  }

  const convertProfileB64 = async ()=> {
    const response = await fetch(`${urlAPI}/resources/img/`,{
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
    const content = await response.json()
    if (content) {
      localStorage.removeItem('profilePhoto')
      // window.location.reload()
      const profileImg = document.getElementById('dropdownMenuButton1')
      const getNewProfile = await fetch(`${urlAPI}/user/create/?id=${id}`)
      const contentProfile = await getNewProfile.json()
      const data = contentProfile[0]
      profileImg.setAttribute('src', `${urlAPI}${data.photo}`)
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
        <h5 class="modal-title" id="ModalProfileModalLabel">Edit Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body text-start">
        <div class="photo">
          <label for="profilePhoto">Profile photo</label>
          <input type="file" name="profilePhoto" id="profilePhoto" accept=".png, .jpg, .jpeg" on:change={showProfileImg}>
          <img src="" alt="" id="showProfileImage" class="photoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-outline-primary btn-flylinkers" data-bs-dismiss="modal" on:click={updateProfile(id)}>Save Profile photo</button>
      </div>

    </div>
  </div>
</div>