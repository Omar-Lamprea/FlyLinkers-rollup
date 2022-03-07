export async function addFriend(urlAPI, friendId, userId, email){
  const redirect = `${window.location.origin}/#/profile/${email}`
  const response = await fetch(`${urlAPI}/friend/request/`, {
    method : 'PUT',
    headers : {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      sender_id: friendId,
      receptor_id: userId
    })
  })

  if (response.ok) {
    console.log(redirect);
    window.location.href = redirect
    window.location.reload()
  }
}

export async function declineFriend(urlAPI, friendId, userId, email){
  const redirect = `${window.location.host}/#/profile/${email}`
  const response = await fetch(`${urlAPI}/friend/request/`, {
    method : 'DELETE',
    headers : {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      sender_id: friendId,
      receptor_id: userId
    })
  })

  if (response.ok) {
    window.location.reload()
  }
}