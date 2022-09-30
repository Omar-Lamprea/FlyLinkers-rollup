export const googleTranslateJs = async (text) =>{
  try {
    if (text) {
      // const API_KEY = 'AIzaSyBLxDf_fbc_6Yvst0Z0nLSPIW52J2dFbuc'
      const API_KEY = 'AIzaSyAw0uECgfavfakbO_S1JRUi-n9SaKvi7Mo'
      let res = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,{
        q: text,
        target: localStorage.getItem('lang')
      });
    
      if (res.status === 200) {
        return res.data.data.translations[0];
      }else{
        return res
      }
    }else{
      return ""
    }
  } catch (error) {
    console.log(error);
    return ""
  }
}