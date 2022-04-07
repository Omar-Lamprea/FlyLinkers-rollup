import i18next from 'i18next';
import Es from '../Locales/es'
import En from '../Locales/en'

export async function translate(){
  // console.log(navigator.language)

  // localStorage functions and assignment to values to btnLanguage
  // const langEs = () =>{
  //   localStorage.setItem(btnLanguage, "es")
  //   btnLanguage.value = "es"
  // }
  // const langEn = () =>{
  //   localStorage.setItem(btnLanguage, "en")
  //   btnLanguage.value = "en"
  // }

  // //Navigator language Validation and dropdown init
  // if(navigator.language.includes('es')){
  //   btnLanguage.children[0].innerHTML = 'Es'
  //   btnLanguage.children[0].value = "es"
    
  //   btnLanguage.children[1].innerHTML = "En"
  //   btnLanguage.children[1].value = "en"
  // }else{
  //   btnLanguage.children[0].innerHTML = 'En'
  //   btnLanguage.children[0].value = "en"

  //   btnLanguage.children[1].innerHTML = "Es"
  //   btnLanguage.children[1].value = "es"
  // }

  // // dropdown listener(change )
  // btnLanguage.addEventListener('change', e =>{
  //   if(btnLanguage.value === "es"){
  //     langEs()
  //     location.reload()
  //   }
  //   if(btnLanguage.value === "en"){
  //     langEn()
  //     location.reload()
  //   }
  // })

  //saving btnLanguage.value
  // if(localStorage.getItem(btnLanguage) === null) localStorage.setItem(btnLanguage, btnLanguage.value)
  // if(localStorage.getItem(btnLanguage) === "es") langEs()
  // if(localStorage.getItem(btnLanguage) === "en") langEn()
  
  //init i18next library
  await i18next.init({
    lng: localStorage.getItem('lang'),
    debug: false,
    resources: {
      Es, En
    }
  });

  const datas = document.querySelectorAll('[data-translate]')
  // console.log(datas);
  datas.forEach(item => {
    if(item.hasAttribute('placeholder')){
      item.setAttribute('placeholder', `${i18next.t(item.dataset.translate)}`)
    }else{
      item.innerHTML = i18next.t(item.dataset.translate)
    }
  })
}