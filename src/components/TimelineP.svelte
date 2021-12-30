<script>
  import CoverPhoto from './profile/CoverPhoto.svelte'
  import UserDetails from './profile/UserDetails.svelte'
  import CreatePost from './profile/CreatePost.svelte'
  import Experience from './profile//Experience.svelte'
  import Panel from './profile/Panel.svelte'

  export let name, title, email , photo;
</script>

<div class="Profile col-9">
  <div class="Profile-container">
    <CoverPhoto/>
    <UserDetails {name} {title} {email} {photo}/>
    <CreatePost/>
    <Experience/>
    <Panel/>
  </div>
</div>