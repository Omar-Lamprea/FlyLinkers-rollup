export default function expandTextArea(e){
  const btnSendPost = document.getElementById('btn-sendPost')
  const postImg = document.getElementById('postImg')
  if (e.key === 'Enter') {
    e.target.rows ++
  }
  if (e.target.value !== '') {
    btnSendPost.removeAttribute('disabled')
  }else{
    btnSendPost.setAttribute('disabled', '')
    if (postImg.src) {
      btnSendPost.removeAttribute('disabled')
    }
  }
}