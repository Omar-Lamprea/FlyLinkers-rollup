<script>
  import ExperiencesModal from '../Modals/experiences/ExperiencesModal.svelte'
  import UpdateExperiencesModal from '../Modals/experiences/UpdateExperienceModal.svelte'
  import {getExperiences} from '../../js/getExperiences'
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
  import {closeModal} from '../../js/closeModals'
  import {translate} from '../../js/translate'


  export let urlAPI, id, experiences, userProfile
  // console.log(experiences);

  // console.log(id, experiences, userProfile);
  let data = writable([])
  let experienceId;

  
  // console.log(experiences);
  export async function getDataexperiences(updateExperiences){
    if (experiences || updateExperiences) {
      // console.log('run xps..');
      experiences = true
      const dataExperiences = []
      const getXp = await getExperiences(urlAPI, userProfile)

      getXp.forEach(xp => {
        const dateStart1 = xp.start_date
        const dateStart2 = dateStart1.slice(0, -3)
        xp.start_date = dateStart2

        if (xp.end_date !== null) {
          const dateEnd1 = xp.end_date
          const dateEnd2 = dateEnd1.slice(0, -3)
          xp.end_date = dateEnd2
        }
        
        dataExperiences.push(xp)
      });
      // console.log(experiences);
      data.set(dataExperiences)
    }
  }

  const sendDataExperience = (id)=>{
    // console.log(id);
    const btnUpdateExperience = document.getElementById(`btnUpdateExperience${id}`)
    btnUpdateExperience.addEventListener('click', async e =>{
      // setTimeout(() => {
      //   let updateExperiences = true
      //   getDataexperiences(updateExperiences)
      // }, 2000); 
    })
  }

  const removeExperience = async (id)=>{
    const deleteExperience = await fetch(`${urlAPI}/user/experience/?experience_id=${id}`,{
      method: 'DELETE',
      headers:{
        "Content-Type" : "application/json"
      }
    })

    if (deleteExperience.ok) {
      data.update(arr => {
        return arr.filter(exp => exp.id !== id)
      })
    }
  }

  const reloadExperiences = () =>{
    if (localStorage.getItem('userId') === id.toString()) {
      // setTimeout(() => {
        const reloadExperiences = document.getElementById('btnAddExperience')
        const observer = new MutationObserver(async ()=>{
          // console.log('reloading exps...');
          // reloadExperiences.removeAttribute('reload-expereriences')
          let updateExperiences = true
          await getDataexperiences(updateExperiences)
        })
        if (window.location.href.includes('settings') || window.location.href.includes('profile')){
          observer.observe(reloadExperiences, {attributes:true})
        }
      // }, 4000);
    }
  }

  onMount(async()=>{
    await getDataexperiences()
    reloadExperiences()
    translate()
  })
</script>

<style>
  .Experience{
    color: #6b6b6b;
  }
  .Experience-content p{
    margin: 1rem 0;
  }
  .Experience-content span:last-child, .Experience-title{
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
    cursor: pointer;
  }
  .updateExperience{
    /* position: absolute; */
    top: 0;
    right: 5px;
  }
  .updateExperience i{
    font-size: 1.5rem;
    color: var(--main-color);
    cursor: pointer;
  }

  .deleteExperience{
    /* position: absolute; */
    top: 50px;
    right: 5px;
  }
  .deleteExperience i{
    font-size: 1.5rem;
    color: #c61f1f;
    cursor: pointer;
  }
</style>


{#if experiences}
  <div class="Default-containers Experience">
    <div class="Experience-content mx-3 mx-md-0">
      <div class="Experience-title">
        <p data-translate="title-experiences" >Experience</p>
      </div>
       {#each $data as experience}
          <div id="experience{experience.id}" data-experienceId={experience.id} class="experience position-relative">
            
            <p>
              <span data-translate="company-name">Company Name:</span>
              <span>{experience.company_name}</span>
            <p/>
            {#if !experience.working}
               <p>
                 <span data-translate="date-employment">Dates of employments:</span>
                 <span>{experience.start_date} / {experience.end_date}</span>
                </p>
            {:else}
               <p>
                <span data-translate="date-employment">Dates of employments: </span> 
                <span>{experience.start_date} / <span data-translate="currently">currently</span></span></p>
            {/if}
            <p>
              <span data-translate="locacy">Ubication:</span>
              <span>{experience.location}</span>
            </p>
  
            <p>
              <span data-translate="title-exp">Title:</span>
              <span>{experience.title}</span>
            </p>
            <p>
              <span data-translate="job-type">job type:</span>
              <span>{experience.employment_type}</span>
            </p>
            <p>{experience.description}</p>

            {#if id === parseInt(localStorage.getItem('userId'))}
              <div class="settings-exps d-flex justify-content-center">
                <div class="updateExperience mx-3" data-bs-toggle="modal" data-bs-target="#modalUpdateExperience{experience.id}" on:click={sendDataExperience(experience.id)}>
                  <i class="fas fa-pen"></i>
                </div>

                <div class="deleteExperience mx-3" >
                 <i class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#removeExperience{experience.id}"></i>
                 <!-- modal remove xp -->
                 <div class="modal fade" id="removeExperience{experience.id}" tabindex="-1" aria-labelledby="removeExperienceLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="removeExperienceLabel">Remove Experience</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Are you sure you want to delete your experience?
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" on:click={removeExperience(experience.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
               </div>
              </div>
            {/if}

            <hr>
          </div>
          <UpdateExperiencesModal {userProfile} {urlAPI} {experience}/>
        {/each}
    </div>
  {#if id === parseInt(localStorage.getItem('userId'))}
    <div class="addExperiences text-center">
      <p data-translate="add-position">Add position</p>
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
          <p>Add your work experience</p>
          <i id="" class="fas fa-plus-circle" data-bs-toggle="modal" data-bs-target="#modalExperience"></i>
          <ExperiencesModal {userProfile} {urlAPI}/>
        </div>
      </div>
    </div>
  {/if}
{/if}

