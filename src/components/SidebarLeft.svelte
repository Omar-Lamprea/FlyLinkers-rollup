<script>
  import ProfileCard from './profile-card/ProfileCard.svelte'
  import Groups from './groups-card/Groups.svelte'
  import Hashtags from './hashtags-card/Hashtags.svelte'

  export let name, title, photo;

</script>

<style>
  /* .Sidebar-container {
    position: fixed;
    width: 100%;
  } */
</style>

<div class="Sidebar col-3">
  <div class="Sidebar-container">
    <ProfileCard {name} {title} {photo}/>
    <Groups/>
    <Hashtags/>
  </div>
</div>