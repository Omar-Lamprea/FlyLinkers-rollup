<script>

</script>

<style>
  .modal-content{
    height: 90vh;
    overflow: auto;
  }
  form input, textarea{
    width: 100%;
  }
  .dates .start, .end{
    width: 100%;
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
              <label for="companyName">Company Name*</label>
              <input type="text" name="companyName" id="companyName" placeholder="Ex:FlyLinkers">
            </div>

            <div class="dates d-md-flex">
              <div class="start me-md-1">
                <label for="startDate">Start date*</label>
                <input type="date" name="startDate" id="startDate" class="">
              </div>
              <div class="end">
                <label for="endDate">end date*</label>
                <input type="date" name="endDate" id="endDate">
              </div>
            </div>

            <div class="working d-flex align-items-center">
              <label for="working">
                I am currently working in this role
              </label>
              <input type="checkbox" name="working" id="working">
            </div>

            <label for="location">Location*</label>
            <input type="text" name="location" id="location" placeholder="Ex:Colombia">

            <label for="title">Title*</label>
            <input type="text" name="title" id="title" placeholder="Ex:¨Manager">

            <label for="employmentType">Employment type*</label>
            <select name="employmentType" id="employmentType">
              <option value="pleaseSelect" selected>Please select</option>
              <option value="full-time">Full-time</option>
              <option value="full-time">Full-time</option>
              <option value="full-time">Full-time</option>
              <option value="full-time">Full-time</option>
              <option value="full-time">Full-time</option>
            </select>

            <label for="description">Description*</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
          </form>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>