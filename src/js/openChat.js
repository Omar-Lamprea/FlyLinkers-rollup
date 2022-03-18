export const openChat = (id) =>{
  localStorage.setItem(`chat-${id}`, id)
  return id
}