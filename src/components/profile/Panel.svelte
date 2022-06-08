<script>
  export let countFriends;
</script>
<style>
  .Panel{
    color: #6b6b6b;
  }
  .Panel-content{
    margin: .5rem 1rem;
    min-width: 10rem;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Panel-title, i, .Panel-content h3{
    color: var(--main-color);
    font-weight: 600;
  }

</style>

<div class="Default-containers-grey Panel">
  <div class="Panel-title">
    <p data-translate="title-panel" class="mx-3 mx-md-0">Your panel</p>
  </div>
  <div class="d-flex flex-wrap justify-content-center my-2">
    <!-- <div class="Default-containers Panel-content text-center">
      <h3>1</h3>
      <p data-translate="who-viewed">Who's viewed your profile</p>
    </div>
    <div class="Default-containers Panel-content text-center">
      <h3>50</h3>
      <p data-translate="views-post">Post views</p>
    </div> -->
    <div class="Default-containers Panel-content text-center">
      <h3>{countFriends}</h3>
      <p data-translate="my-network">My network</p>
    </div>
  </div>
  <p class="mx-3 mx-md-0">
    <i class="fas fa-bookmark"></i>
    <span data-translate="mark-pages">Mark pages</span>
  </p>
</div>