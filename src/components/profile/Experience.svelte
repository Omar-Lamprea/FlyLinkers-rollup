<script>
  import ExperiencesModal from '../Modals/ExperiencesModal.svelte'
  import UpdateExperiencesModal from '../Modals/UpdateExperienceModal.svelte'
  import {getExperiences} from '../../js/getExperiences'
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
import { async } from 'rxjs';

  export let urlAPI, id, experiences, userProfile

  let data = writable([])
  let experienceId;


  // export async function getExperiences(){
  //   const response = await fetch(`${urlAPI}/user/experience/?profile_id=${userProfile}`)
  //   const content = await response.json()
  //   data.set(content)
  // }
  const getDataexperiences = async ()=>{
    if (experiences) {
      data.set(await getExperiences(urlAPI, userProfile))
    }
  }

  const sendDataExperience = (id)=>{
    console.log(id);
    const btnUpdateExperience = document.getElementById(`btnUpdateExperience${id}`)
    btnUpdateExperience.addEventListener('click', e =>{
      setTimeout(() => {
        getDataexperiences()
      }, 1000);
    })
  }
  const addDataExperience = ()=>{
    btnAddExperience.addEventListener('click', e =>{
      setTimeout(() => {
        getDataexperiences()
      }, 1000);
    })
  }

  const removeExpeprience = async(id)=>{
    const container = document.getElementById(`experience${id}`)
    const deleteExperience = await fetch(`${urlAPI}/user/experience/?experience_id=${id}`,{
      method: 'DELETE',
      headers:{
        "Content-Type" : "application/json"
      }
    })
    const content = await deleteExperience.json()
    if (content) {
      container.parentNode.removeChild(container)
    }
  }
  
  onMount(()=>{
    getDataexperiences()
  })
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

  .deleteExperience{
    position: absolute;
    top: 50px;
    right: 5px;
  }
  .deleteExperience i{
    font-size: 1.3rem;
    color: #c61f1f;
    cursor: pointer;
  }
</style>

{#if data}
  <div class="Default-containers Experience">
    <div class="Experience-content mx-3 mx-md-0">
      <div class="Experience-title">
        <p>Experience</p>
      </div>
       {#each $data as experience}
          <div id="experience{experience.id}" data-experienceId={experience.id} class="experience position-relative">
            {#if id === parseInt(localStorage.getItem('userId'))}
               <div class="updateExperience" data-bs-toggle="modal" data-bs-target="#modalUpdateExperience{experience.id}" on:click={sendDataExperience(experience.id)}>
                 <i class="fas fa-pen"></i>
               </div>
               <div class="deleteExperience" on:click={removeExpeprience(experience.id)}>
                <i class="fa-solid fa-trash"></i>
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
      <i class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#modalExperience" on:click={addDataExperience()}></i>
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
          <i class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#modalExperience" on:click={addDataExperience()}></i>
          <ExperiencesModal {userProfile} {urlAPI}/>
        </div>
      </div>
    </div>
  {:else}
      <!-- else content here -->
  {/if}
{/if}

