<script>
  export let name;
  export let link;
</script>

<style>
  .Group ul{
    padding: 0 1rem;
  }
  .Group a{
  color: grey;
  }
  .Group li{
    list-style: none;
    margin: .8rem 0;
  }
  .Group i{
    font-size: 20px;
  }
</style>

<div class="Group">
  <ul>
    <a href={link}>
      <li>
        <i class="fas fa-users"></i>
        <span>{name}</span>
      </li>
    </a>
  </ul>
</div>