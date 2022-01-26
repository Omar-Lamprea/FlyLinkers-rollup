export const openChat = (id) =>{
  localStorage.setItem('chat', id)
  return id
}