<script>
  import SidebarRight from '../components/SidebarRight.svelte'
  const urlAPI = 'https://api.flylinkers.com'

</script>

<style>
  .user-blocked i{
    color: var(--main-color);
    font-size: 10rem;
  }
  .user-blocked h1{
    color: #df1818;
  }

  @media screen and (max-width: 992px){
    main, .row{
      height: inherit;
    }
  }
  
</style>

<div class="row">
  <div class="col-12 col-lg-9 mt-3 mt-md-0 d-flex flex-column justify-content-center justify-content-lg-start">
    <div class="user-blocked mt-lg-5 d-flex flex-column justify-content-center align-items-center">
      <i class="fa-solid fa-user-slash mt-5"></i>
      <h1 class="mt-1">user not found</h1>
    </div>
  </div>
  <SidebarRight {urlAPI}/>
</div>