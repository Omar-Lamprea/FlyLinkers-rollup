<script>
  export let name;
  export let link;
</script>

<style>
  .Hastag ul{
    padding: 0 3rem;
  }
  .Hastag li{
    list-style: none;
    margin: .8rem 0;
  }
  .Hastag span{
    font-weight: initial;
    color: grey;
  }
</style>
<div class="Hastag">
  <ul>
    <!-- <a href={link}> -->
      <li>
        <span class="muted">#{name}</span>
    <!-- </a> -->
  </ul>
</div>