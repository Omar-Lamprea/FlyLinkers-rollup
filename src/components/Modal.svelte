<script>

  let coverPhotoB64;
  let urlCoverPhoto;
  let idCoverPhoto;

  let profilePhotoB64;
  let urlProfilePhoto;
  let idProfilePhoto

  export let id;

  const showCoverImg = ()=>{
    const render = new FileReader();
    render.readAsDataURL(coverPhoto.files[0])
    render.onloadend = ()=>{
      showImage.style.display = 'flex'
      showImage.src = render.result
      coverPhotoB64 = render.result
    }
  }

  const showProfileImg = () =>{
    const render = new FileReader();
    render.readAsDataURL(profilePhoto.files[0])
    render.onloadend = ()=>{
      showProfileImage.style.display = 'flex'
      showProfileImage.src = render.result
      profilePhotoB64 = render.result
    }
  }

  const convertCoverB64 = async ()=> {
    const response = await fetch('http://18.118.50.78:8000/resources/img/',{
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

  const convertProfileB64 = async ()=> {
    const response = await fetch('http://18.118.50.78:8000/resources/img/',{
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

  const getProfile = async (id)=>{
      const response = await fetch(`http://18.118.50.78:8000/user/profile/?user_id=${id}`)
      const content = await response.json()

      if (content.Detail === 'User does not exist') {
        createDataDescription()
      } else {
        upDateDataDescription()
      }
      // let data = content[0]
      // coverPhoto = `http://18.118.50.78:8000${data.cover_img}`
      // aboutMe = data.about
  }

  const createDataDescription = async ()=>{
    await convertCoverB64()

    const sendData = await fetch('http://18.118.50.78:8000/user/profile/', {
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
    console.log('id:', idCoverPhoto, 'url:', urlCoverPhoto);
    let dataDescription;
    
    const userDescription = document.getElementById('userDescription').textContent
    if (description.value === '') {
      dataDescription = userDescription 
    }else{
      dataDescription = description.value
    }
    const sendData = await fetch(`http://18.118.50.78:8000/user/profile/?user=${id}`, {
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
      window.location.reload()
    }
  }

  const updateProfile = async(id)=>{
    await convertProfileB64()
    const response = await fetch(`http://18.118.50.78:8000/user/create/?id=${id}`,{
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
      window.location.reload()
    }
  }

</script>

<style>
  .modal-body textarea{
    width: 100%;
  }
  .photoLoaded{
    display: none;
    width: 100%;
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
          <textarea name="" id="description" cols="30" rows="5"></textarea>
        </div>
        <div class="cover-photo">
          <label for="coverPhoto">Cover photo</label>
          <input type="file" name="coverPhoto" id="coverPhoto" accept=".png, .jpg, .jpeg" on:change={showCoverImg}>
          <img src="" alt="" id="showImage" class="photoLoaded">

          <label for="profilePhoto">Profile photo</label>
          <input type="file" name="profilePhoto" id="profilePhoto" accept=".png, .jpg, .jpeg" on:change={showProfileImg}>
          <img src="" alt="" id="showProfileImage" class="photoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-outline-primary btn-flylinkers" on:click={getProfile(id)}>Save cover photo</button>
        <button type="button" class="btn btn-outline-primary btn-flylinkers" on:click={updateProfile(id)}>Save Profile photo</button>
      </div>

    </div>
  </div>
</div>