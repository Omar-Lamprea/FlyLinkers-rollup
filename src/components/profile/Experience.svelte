<script>
  import { onMount } from "svelte";
  export let urlAPI, id, experiences

  console.log(urlAPI, id, experiences);
  let data;

  const getExperiences = async()=>{
    const response = await fetch(`${urlAPI}/user/experience/?profile_id=${id}`)
    const content = await response.json()
    console.log(content);
    data = content
  }
  if (experiences && id === parseInt(localStorage.getItem('userId'))) {
    getExperiences()
  }

</script>

<style>
  .Experience{
    color: #6b6b6b;
  }
  .Experience-content p{
    margin: 1rem 0;
  }
  .Experience-content span, .Experience-title{
    color: var(--main-color);
  }
  .Experience-title{
    font-weight: 600;
  }
  .addExperiences p{
    font-weight: bold;
    font-size: 1.5rem;
  }
  .addExperiences i{
    font-size: 3rem;
    color: #199aaf;
  }
</style>

<div class="Default-containers Experience">
  <div class="Experience-content mx-3 mx-md-0">
    {#if data}
       {#each data as experience}
          <div class="Experience-title">
          <p>Experience</p>
          </div>
          <p>Company Name: <span>{experience.company_name}</span></p>
          <p>Dates of employments: <span>{experience.start_date} - {experience.end_date}</span></p>
          <p>Ubication: <span>{experience.location}</span></p>

          <p>Title: <span>{experience.title}</span></p>
          <p>job type: <span>{experience.employment_type}</span></p>
          <p>{experience.description}</p>
       {/each}
    {:else}
      <div class="addExperiences text-center">
        <p>Add a new experience!</p>
        <i class="fas fa-plus-circle"></i>
      </div>
    {/if}

  </div>
</div>