import i18next from 'i18next';
import Es from '../Locales/es'
import En from '../Locales/en'

export async function translate(){  
  //init i18next library
  await i18next.init({
    lng: localStorage.getItem('lang'),
    debug: false,
    resources: {
      Es, En
    }
  });

  const datas = document.querySelectorAll('[data-translate]')
  datas.forEach(item => {
    if(item.hasAttribute('placeholder')){
      item.setAttribute('placeholder', `${i18next.t(item.dataset.translate)}`)
    }else{
      item.innerHTML = i18next.t(item.dataset.translate)
    }
  })
}