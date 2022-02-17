<script>
  import {closeUpdateModal} from '../../js/closeModals'
  export let userProfile, urlAPI, experience;
  // console.log(experience);

  const dataStartYear = experience.start_date.split('-')[0]
  const dataStartMonth = experience.start_date.split('-')[1]

  let dataEndYear;
  let dataEndMonth;

  if (experience.end_date !== null) {
    dataEndYear = experience.end_date.split('-')[0]
    dataEndMonth = experience.end_date.split('-')[1]
  }

  let splitMonth = dataStartMonth.split('')
  splitMonth[0] === '0' ? splitMonth.shift() : false
  const joinStartMonth = splitMonth.join('')

  let joinEndMonth;
  if (dataEndMonth) {
    let splitEndMonth = dataEndMonth.split('')
    splitEndMonth[0] === '0' ? splitEndMonth.shift() : false
    joinEndMonth = splitEndMonth.join('')
  }

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
  const employmentTypeList = [
    'Full-time', 'Part-time', 
    'Self-employed', 'Freelance', 
    'Contract', 'InternShip', 
    'Apprenticeship', 
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

    const company_name = document.getElementById(`companyNameUpdate${experience.id}`).value
    const startYear = document.getElementById(`startYear${experience.id}`).value
    const startDate = document.getElementById(`startDate${experience.id}`).value
    const endYear = document.getElementById(`endYear${experience.id}`).value
    const endDate = document.getElementById(`endDate${experience.id}`).value

    let start_date = ''
    startYear !== "0" && startDate !== "0" 
      ? start_date = [parseInt(startYear), parseInt(startDate)] 
      : start_date = ''

    let workingCheck = 0
    const working = document.getElementById(`working${experience.id}`)
    working.checked ? workingCheck = 1 : workingCheck = 0

    let end_date = '';
    
    endYear !== '0' && endDate !== '0' 
      ? end_date = [parseInt(endYear), parseInt(endDate)]
      : end_date = ''

    const location = document.getElementById(`country${experience.id}`).value
    const titleJob = document.getElementById(`title${experience.id}`).value

    let employment_type = ''
    const employmentType = document.getElementById(`employmentType${experience.id}`).value
    employmentType === 'pleaseSelect'
      ? employment_type = ''
      : employment_type = employmentType

    const descriptionJob = document.getElementById(`description${experience.id}`).value


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
        updateExperience(templateExperience)
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
        updateExperience(templateExperience)
      }else{
        console.error(experienceIncompleteMessage);
        alert(experienceIncompleteMessage);
      }
    }
  }

  const toggleEndDate = ()=>{
    const endYear = document.getElementById(`endYear${experience.id}`)
    const endDate = document.getElementById(`endDate${experience.id}`)
    const working = document.getElementById(`working${experience.id}`)

    if (working.checked) {
      endYear.setAttribute('disabled', '')
      endDate.setAttribute('disabled', '')
    }else{
      endYear.removeAttribute('disabled', '')
      endDate.removeAttribute('disabled', '')
    }
  }

  async function updateExperience (templateExperience){
    const postExperience = await fetch(`${urlAPI}/user/experience/?experience_id=${experience.id}`, {
      method: 'PUT',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(templateExperience)
    })
    const content = await postExperience.json()
    if (postExperience.status === 200) {
      closeUpdateModal(experience.id)
    }
  }
  
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
</style>

<div class="modal fade" id="modalUpdateExperience{experience.id}" tabindex="-1" aria-labelledby="modalUpdateExperience{experience.id}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalUpdateExperience{experience.id}Label">Update Experience</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">

        <div class="headModal">
          <h5>Where do you currently work?</h5>
          <p class="my-3">* Indicates required</p>
        </div>

        <div class="formExperience">
          <form action="">
            <div class="companyName">
              <label for="companyNameUpdate{experience.id}">Company Name*</label>
                <input type="text" name="companyNameUpdate{experience.id}" id="companyNameUpdate{experience.id}" placeholder="Ex: FlyLinkers" value={experience.company_name}>
            </div>

            <div class="dates">
              <div class="start me-md-1">
                <label for="startDate{experience.id}">Start date*</label>
                <div class="workStartDate d-md-flex justify-content-between">
                  <select name="startDate{experience.id}" id="startDate{experience.id}" class="me-md-1 mb-3">
                    {#each months as month}
                      {#if joinStartMonth === month.value}
                        <option value={month.value} selected>{month.month}</option>
                      {/if}
                       <option value={month.value}>{month.month}</option>
                    {/each}
                  </select>
                  <select name="startYear{experience.id}" id="startYear{experience.id}" class="mb-3">
                    <option value=0>Year</option>
                    {#each yearList as year}
                      {#if parseInt(dataStartYear) === year}
                        <option value={year} selected>{year}</option>
                      {/if}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="end">
                <label for="endDate{experience.id}">end date*</label>
                <div class="workEndDate d-md-flex justify-content-between">
                  {#if !experience.working}
                     <select name="endDate{experience.id}" id="endDate{experience.id}" class="me-md-1 mb-3">
                       {#each months as month}
                         {#if joinEndMonth === month.value}
                           <option value={month.value} selected>{month.month}</option>
                         {/if}
                          <option value={month.value}>{month.month}</option>
                       {/each}
                     </select>
                     <select name="endYear{experience.id}" id="endYear{experience.id}" class="mb-3">
                       <option value=0>Year</option>
                       {#each yearList as year}
                         {#if parseInt(dataEndYear) === year}
                           <option value={year} selected>{year}</option>
                         {/if}
                         <option value={year}>{year}</option>
                       {/each}
                     </select>
                  {:else}
                    <select name="endDate{experience.id}" id="endDate{experience.id}" disabled class="me-md-1 mb-3">
                      {#each months as month}
                        {#if joinEndMonth === month.value}
                          <option value={month.value} selected>{month.month}</option>
                        {/if}
                        <option value={month.value}>{month.month}</option>
                      {/each}
                    </select>
                    <select name="endYear{experience.id}" id="endYear{experience.id}" disabled class="mb-3">
                      <option value=0>Year</option>
                      {#each yearList as year}
                        {#if parseInt(dataEndYear) === year}
                          <option value={year} selected>{year}</option>
                        {/if}
                        <option value={year}>{year}</option>
                      {/each}
                    </select>
                  {/if}
                </div>
              </div>
            </div>

            <div class="working d-flex align-items-center">
              <input type="checkbox" name="working{experience.id}" id="working{experience.id}" checked={experience.working} on:click={toggleEndDate}>
              <label for="working{experience.id}">
                I am currently working in this role
              </label>
            </div>

            <label for="country{experience.id}">Location*</label>
            <input type="text" name="country{experience.id}" id="country{experience.id}" placeholder="Ex: Colombia" value={experience.location}>

            <label for="title{experience.id}">Title*</label>
            <input type="text" name="title{experience.id}" id="title{experience.id}" placeholder="Ex: Manager" value={experience.title}>

            <label for="employmentType{experience.id}">Employment type*</label>
            <select name="employmentType{experience.id}" id="employmentType{experience.id}">
              <option value="pleaseSelect">Please select</option>
              {#each employmentTypeList as employment}
                {#if experience.employment_type === employment}
                  <option value={employment} selected>{employment}</option>
                {/if}
                <option value={employment}>{employment}</option>
              {/each}
            </select>

            <label for="description{experience.id}">Description*</label>
            <textarea name="description{experience.id}" id="description{experience.id}" cols="30" rows="5" value={experience.description}></textarea>
          </form>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnUpdateExperience{experience.id}" type="button" class="btn btn-primary" on:click={addExpreience}>Save</button>
      </div>
    </div>
  </div>
</div>