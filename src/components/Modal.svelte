<script>

  let photoB64;
  let urlCoverPhoto;
  let idCoverPhoto;
  let validateProfile;
  export let id;

  const showImg = ()=>{
    const render = new FileReader();
    render.readAsDataURL(coverPhoto.files[0])
    render.onloadend = ()=>{
      // console.log(render.result)
      showImage.style.display = 'flex'
      showImage.src = render.result
      photoB64 = render.result
    }
  }

  const convertB64 = async ()=> {
    const response = await fetch('http://18.118.50.78:8000/resources/img/',{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          img: photoB64
        })
    })
    const content = await response.json()
    urlCoverPhoto = content.img
    idCoverPhoto = content.id
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
    await convertB64()

    const sendData = await fetch('http://18.118.50.78:8000/user/profile/', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id : id,
        about: description.value,
        resource_id : idCoverPhoto,
        cover_img: urlCoverPhoto
      })
    })
  }

  const upDateDataDescription = async ()=>{
    await convertB64()
    const sendData = await fetch(`http://18.118.50.78:8000/user/profile/?user_id=${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id : id,
        about: description.value,
        resource_id : idCoverPhoto,
        cover_img: urlCoverPhoto
      })
    })
    const content = await sendData.json()
    if (content) {
      localStorage.removeItem('coverPhoto')
      window.location.reload()
    }
  }

</script>

<style>
  .modal-body textarea{
    width: 100%;
  }
  .coverPhotoLoaded{
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
          <input type="file" name="coverPhoto" id="coverPhoto" accept=".png, .jpg, .jpeg" on:change={showImg}>
          <img src="" alt="" id="showImage" class="coverPhotoLoaded">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" on:click={getProfile(id)}>Save changes</button>
      </div>

    </div>
  </div>
</div>