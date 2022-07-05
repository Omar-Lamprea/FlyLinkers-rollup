<script>
  import ProfileCard from './profile-card/ProfileCard.svelte'
  import Groups from './groups-card/Groups.svelte'
  import Hashtags from './hashtags-card/Hashtags.svelte'

  export let name, title, photo, last_name, urlAPI, urlImages;

</script>

<style>
  /* .Sidebar-container {
    position: fixed;
    width: 100%;
  } */
</style>

<div class="Sidebar col-12 col-lg-3">
  <div class="Sidebar-container">
    <ProfileCard {name} {last_name} {title} {photo} {urlAPI} {urlImages}/>
    <Groups/>
    <Hashtags/>
  </div>
</div>