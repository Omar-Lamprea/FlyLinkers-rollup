<script>
  export let size = 0;
  export let sizeLoader ='';

</script>


{#if size}
  <div class="loader-content {size}" style="height: {sizeLoader.height}">
    <div class="loader">
      <div style="width:{sizeLoader.size}; height: {sizeLoader.size}; left:{sizeLoader.left}; top: {sizeLoader.top}"></div>
    </div>
  </div>
{:else}
  <div class="loader-content" style="height: {sizeLoader.height}">
    <div class="loader">
      <div style="width:{sizeLoader.size}; height: {sizeLoader.size}; left:{sizeLoader.left}; top: {sizeLoader.top}"></div>
    </div>
  </div>
{/if}