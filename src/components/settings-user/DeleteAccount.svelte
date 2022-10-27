<script>
  import {translate} from '../../js/translate'
  import DeleteAccount from '../../components/Modals/DeleteAccount'

  export let id, urlAPI
  const dropdownUserInfo = ()=>{
    toggleAccount.classList.toggle('dropdown-active')
    containerAccount.classList.toggle('container-active')
  }


</script>

<style>
  .Default-containers{
    overflow: hidden;
    height: 3.5rem;
    transition: all ease-in .5s;
  }
  .container-active{
    height: max-content;
  }
  .header-description-userMenu{
    margin-bottom: 1rem;
  }
  .header-description-userMenu i{
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
  /* .description-lang{
    color: #6b6b6b;
  }
  .select-language{
    width: 16rem;
  } */

  .delete-account button{
    background-color: transparent;
    border: none;
    color: #c61f1f;
    font-weight: 700;
  }

</style>

<div id="containerAccount" class="Default-containers container-active">
  <div class="header-description-userMenu mx-3 mx-md-0 d-flex justify-content-between align-items-center">
    <p data-translate="title-account" class="section-title">Account</p>
    <i id="toggleAccount" class="fa-solid fa-square-caret-down dropdown-active" on:click={dropdownUserInfo}></i>
  </div>

  <div class="delete-account mx-2">
    <button class="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#deleteAccount{id}">
      <i class="fa-solid fa-user-xmark mx-1"></i>
      <p data-translate="delete-account">Delete account</p>
    </button>
  </div>

</div>



<DeleteAccount {id} {urlAPI}/>