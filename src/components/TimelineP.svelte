<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import CreatePost from './post/CreatePost.svelte'
  import Experience from './profile//Experience.svelte'
  import Panel from './profile/Panel.svelte'

  export let name, title, email , photo , id;

  let coverPhoto;
  let aboutMe;

  const getProfile = async ()=>{
    setTimeout(async() => {
      const response = await fetch(`http://18.118.50.78:8000/user/profile/?user_id=${id}`)
      const content = await response.json()
      let data = content[0]
      coverPhoto = `http://18.118.50.78:8000${data.cover_img}`
      aboutMe = data.about
      localStorage.setItem('coverPhoto', coverPhoto)
    }, 1000);
  }

</script>

<div class="Profile col-9" on:load={getProfile()}>
  <div class="Profile-container">
    <CoverPhoto {coverPhoto}/>
    <UserDetails {name} {title} {email} {photo} {id} {aboutMe}/>
    <CreatePost/>
    <Experience/>
    <Panel/>
  </div>
</div>