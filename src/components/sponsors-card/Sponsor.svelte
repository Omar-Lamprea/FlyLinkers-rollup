<script>
  export let sponsorName, sponsorlogo
</script>

<style>
  .Sponsor{
    border-bottom: 1px solid var(--main-color);

  }
  .Sponsor-title{
    color: var(--main-color);
    font-weight: 600;
  }
  .Sponsor-logo img{
    width: 50%;
  }
</style>

<div class="Sponsor text-center mb-4">
  <div class="Sponsor-title">
    <h6>{sponsorName}</h6>
  </div>
  <div class="Sponsor-logo">
    <img src="{sponsorlogo}" alt="">
  </div>
</div>