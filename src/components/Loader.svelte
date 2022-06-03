<script>
  export let size = 0;
</script>

{#if size}
  <div class="loader-content {size}">
    <div class="loader">
      <div></div>
    </div>
  </div>
{:else}
  <div class="loader-content">
    <div class="loader">
      <div></div>
    </div>
  </div>
{/if}