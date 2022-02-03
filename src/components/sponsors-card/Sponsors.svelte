<script>
  import Sponsor from './Sponsor.svelte'

  const data = [
    {
      sponsorName: 'Aeronex Cargo',
      sponsorlogo: '../img/aeronex-logo.png'
    },
    {
      sponsorName: 'Jet Blue Airways',
      sponsorlogo: '../img/JetBlue-logo.png'
    },
    {
      sponsorName: 'FlyKargo',
      sponsorlogo: '../img/FlyKargo-logo.png'
    },
    {
      sponsorName: 'Air Bridge Cargo',
      sponsorlogo: '../img/AirBridgeCargo-logo.png'
    },
  ]
</script>

<style>
    .Sponsors h4{
    color: var(--main-color);
  }
</style>


<div class="Sponsors d-none d-lg-block Default-containers px-3">
  <div class="Events-title mb-3 text-center">
    <h4>Sponsors</h4>
  </div>
  <div class="Sponsors-column">
    <div class="Sponsor">
      {#each data as sponsor}
        <Sponsor {...sponsor}/>

      {/each}
    </div>
  </div>
</div>