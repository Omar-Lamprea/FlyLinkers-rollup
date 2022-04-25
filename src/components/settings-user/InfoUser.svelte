<script>
  import {onMount} from 'svelte'
  import Loader from '../Loader.svelte'
  import {db} from '../../js/firebase/config'
  import { doc, updateDoc } from "firebase/firestore";
  export let urlAPI;

  export let dataUser;
  // import {translate} from '../../js/translate'
  // translate()

  const update = async()=>{
    btnSave.setAttribute('disabled', '')
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
      if (response.ok) {
        const userDoc = doc(db, 'user',localStorage.getItem('userId'))
        await updateDoc(userDoc, {
          name: `${firstName.value} ${lastName.value}`
        });
        
        btnSave.removeAttribute('disabled')
        success.classList.remove('d-none')
        setTimeout(() => {
          dropdownUserInfo()
        }, 500);
      }else{
        fail.classList.remove('d-none')
      }
    }else{
      console.log('please complete all fields');
    }
  }

  const dropdownUserInfo = ()=>{
    toggleDropUserInfo.classList.toggle('dropdown-active')
    container.classList.toggle('container-active')
  }

  onMount(()=>{
    // getdata()
  })
</script>

<style>
  .Default-containers{
    overflow: hidden;
    height: 4rem;
    transition: all ease-in .5s;
  }
  .container-active{
    height: max-content;
  }
  .header-menu-user {
    margin-bottom: 1rem;
  }
  .header-menu-user i{
    color: var(--main-color);
    font-size: 1.5rem;
    transition: all ease-in .2s;
  }
  .dropdown-active{
    transform: rotate(180deg);
  }
  .section-title{
    color: var(--main-color);
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

<div id="container" class="Default-containers container-active">
  <div class="header-menu-user d-flex justify-content-between align-items-center">
    <p data-translate="title-user-info" class="section-title">User information</p>
    <i id="toggleDropUserInfo" class="fa-solid fa-square-caret-down dropdown-active" on:click={dropdownUserInfo}></i>
  </div>
  {#if dataUser}
    <form action="" class="d-flex flex-column px-3 px-md-0">
      <div class="name mb-3 d-md-flex justify-content-between">
        <div class="firstName" style="width:100%">
          <label data-translate="first-name" for="firstName">First name*</label>
          <input data-translate="first-name" id="firstName" type="text" placeholder="First name...." value={dataUser.name} required>
        </div>
  
        <div class="middleName mx-md-3" style="width:100%">
          <label data-translate="middle-name" for="middleName">Middle name</label>
          <input data-translate="middle-name" id="middleName" type="text" placeholder="Middle name...." value={dataUser.middle_name}>
        </div>
  
        <div class="lastName" style="width:100%">
          <label data-translate="last-name" for="lastName">Last name*</label>
          <input data-translate="last-name" id="lastName" type="text" placeholder="Last name...." value={dataUser.last_name} required>
        </div>
      </div>
  
      <div class="info mb-3 d-md-flex justify-content-center">
        <div class="title me-md-2" style="width:100%">
          <label data-translate="title" for="title">Title*</label>
          <input data-translate="title" id="title" type="text" placeholder="Title...." value={dataUser.title}>
        </div>
  
        <div class="mobile ms-md-2"style="width:100%">
          <label data-translate="mobile" for="mobile">Mobile</label>
          <input data-translate="mobile" id="mobile" type="tel" placeholder="Mobile...." value={dataUser.phone}>
        </div>
      </div>

      <div class="username mb-3 d-md-flex justify-content-center">
        <div class="username me-md-2"style="width:100%">
          <label data-translate="username" for="username">Username</label>
          <input data-translate="username" id="username" type="text" placeholder="username...." value={dataUser.username} disabled>
        </div>

        <div class="email ms-md-2"style="width:100%">
          <label data-translate="email" for="email">Email*</label>
          <input data-translate="email" id="email" type="email" placeholder="Email...." value={dataUser.email} required>
        </div>
      </div>
      
      <i id="success" class="fa-solid fa-check text-center icon-success d-none"></i>
      <i id="fail" class="fa-solid fa-bug text-center icon-success fail d-none"></i>
      <button id="btnSave" data-translate="btn-save" type="submit" class="btn btn-outline-primary btn-flylinkers btn-post mt-3" on:click|preventDefault={update}>Save</button>
    </form>
  {:else}
    <Loader />
  {/if}
</div>