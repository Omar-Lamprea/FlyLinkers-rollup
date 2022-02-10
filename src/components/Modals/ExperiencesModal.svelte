<script>
  export let userProfile, urlAPI;
  import {closeModal} from '../../js/closeModals'
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

    if (userProfile !== '' && company_name !== '' && start_date !== '' && workingCheck !== '' &&
    end_date !== '' && location !== '' && titleJob !== '' && employment_type !== '' && descriptionJob) {
      let templateExperience;
      
      if (workingCheck === 0) {
        templateExperience = {
          "profile": userProfile,
          "company_name": company_name,
          "start_date": [2020, 2],
          "working": 0,
          "end_date": end_date,
          "location": location,
          "title": titleJob,
          "employment_type": employment_type,
          "description": descriptionJob
        }
      }
      if (workingCheck === 1) {
        templateExperience = {
          "profile": userProfile,
          "company_name": company_name,
          "start_date": [2020, 2],
          "working": 1,
          "location": location,
          "title": titleJob,
          "employment_type": employment_type,
          "description": descriptionJob
        }
      }
      console.log(templateExperience);
      addNewExperience(templateExperience)
      
    }else{
      console.error('please complete all the fields');
      alert('please complete all the fields');
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
    console.log(templateExperience);
    const postExperience = await fetch(`${urlAPI}/user/experience/`, {
      method: 'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(templateExperience)
    })
    const content = await postExperience.json()
    console.log(content);
    if (content) {
      closeModal('modalExperience')
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

<div class="modal fade" id="modalExperience" tabindex="-1" aria-labelledby="modalExperienceLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalExperienceLabel">Add Experience</h5>
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
              <label for="postCompanyName">Company Name*</label>
                <input type="text" name="postCompanyName" id="postCompanyName" placeholder="Ex: FlyLinkers">
            </div>

            <div class="dates">
              <div class="start me-md-1">
                <label for="postStartDate">Start date*</label>
                <div class="workStartDate d-md-flex justify-content-between">
                  <select name="postStartDate" id="postStartDate" class="me-md-1 mb-3">
                    {#each months as month}
                       <option value={month.value}>{month.month}</option>
                    {/each}
                  </select>
                  <select name="postStartYear" id="postStartYear" class="mb-3">
                    <option value=0>Year</option>
                    {#each yearList as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <div class="end">
                <label for="postEndDate">end date*</label>
                <div class="workEndDate d-md-flex justify-content-between">
                  <select name="postEndDate" id="postEndDate" class="me-md-1 mb-3">
                    {#each months as month}
                       <option value={month.value}>{month.month}</option>
                    {/each}
                  </select>
                  <select name="postEndYear" id="postEndYear" class="mb-3">
                    <option value=0>Year</option>
                    {#each yearList as year}
                      <option value={year}>{year}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>

            <div class="working d-flex align-items-center">
              <input type="checkbox" name="postWorking" id="postWorking" on:click={toggleEndDate}>
              <label for="postWorking">
                I am currently working in this role
              </label>
            </div>

            <label for="postCountry">Location*</label>
            <input type="text" name="postCountry" id="postCountry" placeholder="Ex: Colombia">

            <label for="postTitle">Title*</label>
            <input type="text" name="postTitle" id="postTitle" placeholder="Ex: Manager">

            <label for="postEmploymentType">Employment type*</label>
            <select name="postEmploymentType" id="postEmploymentType">
              <option value="pleaseSelect">Please select</option>
              {#each employmentTypeList as employment}
                <option value={employment}>{employment}</option>
              {/each}
            </select>

            <label for="postDescriptionExperience">Description*</label>
            <textarea name="postDescriptionExperience" id="postDescriptionExperience" cols="30" rows="5"></textarea>
          </form>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="btnAddExperience" type="button" class="btn btn-primary" on:click={addExpreience}>Save</button>
      </div>
    </div>
  </div>
</div>