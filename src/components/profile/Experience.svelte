<script>
  import ExperiencesModal from '../Modals/ExperiencesModal.svelte'
  import UpdateExperiencesModal from '../Modals/UpdateExperienceModal.svelte'
  import { onMount } from "svelte";
  export let urlAPI, id, experiences, userProfile

  let data;
  const getExperiences = async()=>{
    const response = await fetch(`${urlAPI}/user/experience/?profile_id=${userProfile}`)
    const content = await response.json()
    // console.log(content);
    data = content
  }
  if (experiences) {
    getExperiences()
  }

  const showExperience = (experience)=>{
    console.log(experience);
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
  .updateExperience{
    position: absolute;
    top: 0;
    right: 5px;
  }
  .updateExperience i{
    font-size: 1.3rem;
    color: var(--main-color);
    cursor: pointer;
  }
</style>

{#if data}
  <div class="Default-containers Experience">
    <div class="Experience-content mx-3 mx-md-0">
      <div class="Experience-title">
        <p>Experience</p>
      </div>
       {#each data as experience}
          <div class="experience position-relative">
            {#if id === parseInt(localStorage.getItem('userId'))}
               <div class="updateExperience" data-bs-toggle="modal" data-bs-target="#modalUpdateExperience{experience.id}">
                 <i class="fas fa-pen"></i>
               </div>
            {/if}
            <p>Company Name: <span>{experience.company_name}</span></p>
            {#if !experience.working}
               <p>Dates of employments: <span>{experience.start_date} - {experience.end_date}</span></p>
            {:else}
               <p>Dates of employments: <span>{experience.start_date} - currently</span></p>
            {/if}
            <p>Ubication: <span>{experience.location}</span></p>
  
            <p>Title: <span>{experience.title}</span></p>
            <p>job type: <span>{experience.employment_type}</span></p>
            <p>{experience.description}</p>
            <hr>
          </div>
          <UpdateExperiencesModal {userProfile} {urlAPI} {experience}/>
        {/each}
    </div>
  {#if id === parseInt(localStorage.getItem('userId'))}
    <div class="addExperiences text-center">
      <p>Add position</p>
      <i class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#modalExperience"></i>
      <ExperiencesModal {userProfile} {urlAPI}/>
    </div>
  {/if}
  </div>
{:else}
  {#if id === parseInt(localStorage.getItem('userId'))}
    <div class="Default-containers Experience">
      <div class="Experience-content mx-3 mx-md-0">
        <div class="addExperiences text-center">
          <p>Add position</p>
          <i class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#modalExperience"></i>
          <ExperiencesModal {userProfile} {urlAPI}/>
        </div>
      </div>
    </div>
  {:else}
      <!-- else content here -->
  {/if}
{/if}

