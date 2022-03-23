<script>
  import {onMount} from 'svelte'
  import Loader from '../Loader.svelte'
  export let urlAPI;

  export let dataUser;
  // const getdata = async ()=>{
  //   const response = await fetch(`${urlAPI}/user/create/?id=${localStorage.getItem('userId')}`)
  //   const content = await response.json()
  //   if (response.ok) {
  //     data = content[0]
  //   }
  // }

  const update = async()=>{
    if (firstName.value !== '' && lastName.value !== '' && email.value) {
      const response = await fetch(`${urlAPI}/user/create/?id=${localStorage.getItem('userId')}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName.value,
          middle_name: middleName.value,
          last_name: lastName.value,
          title: title.value,
          email: email.value,
          mobile: mobile.value
        })
      })
      const content = await response.json()
      console.log(response);
      if (response.ok) {
        success.classList.remove('d-none')
      }else{
        fail.classList.remove('d-none')
      }
    }else{
      console.log('please complete all fields');
    }
  }

  onMount(()=>{
    // getdata()
  })
</script>

<style>
  .section-title{
    color: var(--main-color);
    margin-bottom: 1rem;
    font-weight: 700;
  }
  .btn-post{
    width: 50%;
    background-color: #199aaf;
    color: #fefefe;
  }
  form input{
    border-radius: 5px;
    border: 1px solid var(--main-color);
    width: 100%;
  }
  .icon-success{
    color: #ffffff;
    font-size: 1.5rem;
    background-color: #179aaf;
    border-radius: 50px;
    display: flex;
    align-self: center;
    padding: 7px 9px;
  }
  .fail{
    background-color: #af1717;
  }
</style>

<div class="Default-containers">
  <p class="section-title">User information</p>
  {#if dataUser}
    <form action="" class="d-flex flex-column px-3 px-md-0">
      <div class="name mb-3 d-md-flex justify-content-between">
        <div class="firstName" style="width:100%">
          <label for="firstName">First name*</label>
          <input id="firstName" type="text" placeholder="First name...." value={dataUser.name} required>
        </div>
  
        <div class="middleName mx-md-3" style="width:100%">
          <label for="middleName">Middle name</label>
          <input id="middleName" type="text" placeholder="Middle name...." value={dataUser.middle_name}>
        </div>
  
        <div class="lastName" style="width:100%">
          <label for="lastName">Last name*</label>
          <input id="lastName" type="text" placeholder="Last name...." value={dataUser.last_name} required>
        </div>
      </div>
  
      <div class="info mb-3 d-md-flex justify-content-center">
        <div class="title me-md-2" style="width:100%">
          <label for="title">Title*</label>
          <input id="title" type="text" placeholder="Title...." value={dataUser.title}>
        </div>
  
        <div class="mobile ms-md-2"style="width:100%">
          <label for="mobile">Mobile</label>
          <input id="mobile" type="tel" placeholder="Mobile...." disabled>
        </div>
      </div>

      <div class="username mb-3 d-md-flex justify-content-center">
        <div class="username me-md-2"style="width:100%">
          <label for="username">Username</label>
          <input id="username" type="text" placeholder="username...." disabled>
        </div>

        <div class="email ms-md-2"style="width:100%">
          <label for="email">Email*</label>
          <input id="email" type="email" placeholder="Email...." value={dataUser.email} required>
        </div>
      </div>
      
      <i id="success" class="fa-solid fa-check text-center icon-success d-none"></i>
      <i id="fail" class="fa-solid fa-bug text-center icon-success fail d-none"></i>
      <button type="submit" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" on:click={update}>Save</button>
    </form>
  {:else}
    <Loader />
  {/if}
</div>