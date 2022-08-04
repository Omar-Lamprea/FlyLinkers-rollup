<script>
  import getDataexperiences from '../../profile/Experience.svelte'
  export let userProfile, urlAPI;
  import {closeModal} from '../../../js/closeModals'
  import { onMount } from 'svelte';

  let langSelect = localStorage.getItem('lang')
  const months = [
    {value: '0', month : 'Please select'},
    {value: '1', month : 'January'},
    {value: '2', month : 'February'},
    {value: '3', month : 'March'},
    {value: '4', month : 'April'},
    {value: '5', month : 'May'},
    {value: '6', month : 'June'},
    {value: '7', month : 'July'},
    {value: '8', month : 'August'},
    {value: '9', month : 'September'},
    {value: '10', month : 'October'},
    {value: '11', month : 'November'},
    {value: '12', month : 'December'}
  ]
  const monthsEs = [
    {value: '0', month : 'Selecciona una opción'},
    {value: '1', month : 'Enero'},
    {value: '2', month : 'Febrero'},
    {value: '3', month : 'Marzo'},
    {value: '4', month : 'Abril'},
    {value: '5', month : 'Mayo'},
    {value: '6', month : 'Junio'},
    {value: '7', month : 'Julio'},
    {value: '8', month : 'Agosto'},
    {value: '9', month : 'Septiembre'},
    {value: '10', month : 'Octubre'},
    {value: '11', month : 'Noviembre'},
    {value: '12', month : 'Diciembre'}
  ]

  const employmentTypeList = [
    'Full-time', 'Part-time', 
    'Self-employed', 'Freelance', 
    'Contract', 'InternShip', 
    'Apprenticeship', 
    'Seasonal'
  ]
  const employmentTypeListEs = [
    'Jornada completa', 'Jornada parcial', 
    'Autónomo', 'Profesional independiente', 
    'Contrato temporal', 'Contrato de prácticas', 
    'Contrato de formación', 
    'Seasonal'
  ]

  const yearStart = 1922
  const today = new Date()
  const yearCurrent = today.getFullYear()
  const yearList = []
  for (let i = yearCurrent; i >= yearStart; i--) {
    yearList.push(i)
  }

  const addExpreience = ()=>{
    const company_name = postCompanyName.value

    let start_date = ''
    postStartYear.value !== "0" && postStartDate.value !== "0" 
      ? start_date = [parseInt(postStartYear.value), parseInt(postStartDate.value)] 
      : start_date = ''

    let workingCheck = 0
    postWorking.checked ? workingCheck = 1 : workingCheck = 0

    let end_date = '';
    postEndYear.value !== '0' && postEndDate.value !== '0' 
      ? end_date = [parseInt(postEndYear.value), parseInt(postEndDate.value)]
      : end_date = ''

    const location = postCountry.value
    const titleJob = postTitle.value

    let employment_type = ''
    postEmploymentType.value === 'pleaseSelect'
      ? employment_type = ''
      : employment_type = postEmploymentType.value

    const descriptionJob = postDescriptionExperience.value

    // console.log(
    //   userProfile,
    //   company_name,
    //   start_date,
    //   workingCheck,
    //   end_date,
    //   location,
    //   titleJob,
    //   employment_type,
    //   descriptionJob
    // );

    let templateExperience = {};
    const experienceIncompleteMessage = 'please complete all the fields'
    
    if (workingCheck === 0) {
      if (userProfile !== '' && company_name !== '' && start_date !== '' && end_date !== '' && location !== '' 
      && titleJob !== '' && employment_type !== '' && descriptionJob){
        templateExperience = {
          "profile": userProfile,
          "company_name": company_name,
          "start_date": start_date,
          "working": 0,
          "end_date": end_date,
          "location": location,
          "title": titleJob,
          "employment_type": employment_type,
          "description": descriptionJob
        }
        // console.log(templateExperience);
        addNewExperience(templateExperience)
      }else{
        console.error(experienceIncompleteMessage);
        alert(experienceIncompleteMessage);
      }
    }

    if (workingCheck === 1) {
      if (userProfile !== '' && company_name !== '' && start_date !== '' && location !== '' 
      && titleJob !== '' && employment_type !== '' && descriptionJob){
        templateExperience = {
          "profile": userProfile,
          "company_name": company_name,
          "start_date": start_date,
          "working": 1,
          "end_date": [0,0],
          "location": location,
          "title": titleJob,
          "employment_type": employment_type,
          "description": descriptionJob
        }
        // console.log(templateExperience);
        addNewExperience(templateExperience)
      }else{
        console.error(experienceIncompleteMessage);
        alert(experienceIncompleteMessage);
      }
    }
  }

  const toggleEndDate = ()=>{
    if (postWorking.checked) {
      postEndYear.setAttribute('disabled', '')
      postEndDate.setAttribute('disabled', '')
    }else{
      postEndYear.removeAttribute('disabled', '')
      postEndDate.removeAttribute('disabled', '')
    }
  }

  async function addNewExperience (templateExperience){
    // console.log(templateExperience);
    const postExperience = await fetch(`${urlAPI}/user/experience/`, {
      method: 'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(templateExperience)
    })
    if (postExperience.ok) {
      formAddNewExperience.reset()
      closeModal('modalExperience')
      btnAddExperience.classList.toggle('reload-expereriences')
    }
  }

  //add observer
  const observer = new MutationObserver(()=>{

    if(btnAddEx.dataset.translatee){
      // console.log(btnAddEx.dataset.translatee);
      langSelect = btnAddEx.dataset.translatee
    }
  })

  onMount(()=>{
    const btnAddEx = document.getElementById('btnAddEx')
    btnAddEx ? observer.observe(btnAddEx, {attributes:true}) : false
  })

</script>

<style>
  .modal-content{
    height: 90vh;
    overflow: auto;
  }
  form input, textarea, select{
    width: 100%;
    margin-bottom: 1rem;
  }
  .dates .start, .end{
    width: 100%;
  }
  form input[type='checkbox']{
    width: fit-content;
    margin: 0 1rem 0 0.5rem;
    transform: scale(2);
  }
  .btn-save-experience{
    background-color: var(--main-color);
    color: #fff;
  }
</style>

<div class="modal fade" id="modalExperience" tabindex="-1" aria-labelledby="modalExperienceLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 data-translate="title-post-xp" class="modal-title" id="modalExperienceLabel">Add Experience</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">

        <div class="headModal">
          <h5 data-translate="title-worked">Where have you worked?</h5>
          <p data-translate="require-xp" class="my-3">* Indicates required</p>
        </div>

        <div class="formExperience">
          <form id="formAddNewExperience" action="">
            <div class="companyName">
              <label data-translate="modal-company-name" for="postCompanyName">Company Name*</label>
                <input type="text" name="postCompanyName" id="postCompanyName" placeholder="Ex: FlyLinkers">
            </div>

            <div class="dates">
              <div class="start me-md-1">
                <label data-translate="modal-start-date" for="postStartDate">Start date*</label>
                <div class="workStartDate d-md-flex justify-content-between">
                  <select name="postStartDate" id="postStartDate" class="me-md-1 mb-3">
                    {#if langSelect === 'En'}
                      {#each months as month}
                        <option value={month.value}>{month.month}</option>
                      {/each}
                    {:else}
                      {#each monthsEs as month}
                        <option value={month.value}>{month.month}</option>
                      {/each}
                    {/if}
                  </select>
                  <select name="postStartYear" id="postStartYear" class="mb-3">
                    <option data-translate="modal-xp-year" value=0>Year</option>
                    {#each yearList as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="end">
                <label data-translate="modal-end-date" for="postEndDate">end date*</label>
                <div class="workEndDate d-md-flex justify-content-between">
                  <select name="postEndDate" id="postEndDate" class="me-md-1 mb-3">
                    {#if langSelect === 'En'}
                      {#each months as month}
                        <option value={month.value}>{month.month}</option>
                      {/each}
                    {:else}
                      {#each monthsEs as month}
                        <option value={month.value}>{month.month}</option>
                      {/each}
                    {/if}
                    
                  </select>
                  <select name="postEndYear" id="postEndYear" class="mb-3">
                    <option data-translate="modal-xp-year" value=0>Year</option>
                    {#each yearList as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>

            <div class="working d-flex align-items-center">
              <input type="checkbox" name="postWorking" id="postWorking" on:click={toggleEndDate}>
              <label data-translate="modal-currently" for="postWorking">
                I am currently working in this role
              </label>
            </div>

            <label data-translate="modal-locacy" for="postCountry">Location*</label>
            <input type="text" name="postCountry" id="postCountry" placeholder="Ex: Colombia">

            <label data-translate="modal-title-exp" for="postTitle">Title*</label>
            <input type="text" name="postTitle" id="postTitle" placeholder="Ex: Manager">

            <label data-translate="modal-job-type" for="postEmploymentType">Employment type*</label>
            <select name="postEmploymentType" id="postEmploymentType">
              <option data-translate="modal-xp-select-job-type" value="pleaseSelect">Please select</option>
              {#if langSelect === 'En'}
                {#each employmentTypeList as employment}
                  <option value={employment}>{employment}</option>
                {/each}
              {:else}
                {#each employmentTypeListEs as employment}
                  <option value={employment}>{employment}</option>
                {/each}
              {/if}
            </select>

            <label data-translate="moda-xp-description" for="postDescriptionExperience">Description*</label>
            <textarea name="postDescriptionExperience" id="postDescriptionExperience" cols="30" rows="5"></textarea>
          </form>
        </div>

      </div>
      <div class="modal-footer">
        <button data-translate="modal-xp-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button data-translate="modal-xp-btn-save" id="btnAddExperience" type="button" class="btn btn-outline-primary btn-flylinkers btn-save-experience" on:click={addExpreience}>Save</button>
      </div>
    </div>
  </div>
</div>