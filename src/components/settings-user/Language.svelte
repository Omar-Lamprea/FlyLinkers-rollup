<script>
  import {translate} from '../../js/translate'
  const dropdownUserInfo = ()=>{
    toggleLanguage.classList.toggle('dropdown-active')
    containerLanguage.classList.toggle('container-active')
  }

  const setLanguage = (e)=>{
    if (e.target.value !== '') {
      localStorage.setItem('lang', e.target.value)
      translate()
    }
    // window.location.reload()
  }
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
  .description-lang{
    color: #6b6b6b;
  }
  .select-language{
    width: 16rem;
  }

</style>

<div id="containerLanguage" class="Default-containers container-active">
  <div class="header-description-userMenu d-flex justify-content-between align-items-center">
    <p data-translate="title-lang" class="section-title">Language</p>
    <i id="toggleLanguage" class="fa-solid fa-square-caret-down dropdown-active" on:click={dropdownUserInfo}></i>
  </div>
  <div class="description-lang">
    <p data-translate="p1" class="mb-2">Select the language you use on Flylinkers.</p>
    <p data-translate="p2" class="mb-2">You can change it back at any time.</p>
  </div>
  <select class="select-language" name="selectLanguege" id="selectLanguege" on:change={setLanguage}>
    <option data-translate="select-lg-1" value="">Select language</option>
    <option data-translate="select-lg-2" value="En">English</option>
    <option data-translate="select-lg-3" value="Es">Spanish</option>
  </select>
</div>