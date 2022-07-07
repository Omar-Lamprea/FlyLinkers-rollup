const urlAPI = 'https://api.flylinkers.com'
const userId = localStorage.getItem('userId')

const updateReaction = async (commentId, userId, type)=>{
  let reactionType;
  if(type){
    if(type === "like"){
      reactionType = {
        like: 1
      }
    }else if(type === "love"){
      reactionType = {
        love: 1
      }
    }
  }else{
    reactionType = {}
  }

  const response = await fetch(`${urlAPI}/post/reacts/?comment_id=${commentId}&user=${userId}`,{
    method: "PUT",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reactionType)
  })

  if (response.ok) {
    const content = await response.json()
    return 'Ok'
    // window.location.reload()
  }else{
    console.log(response);
    return 'Error'
  }
}

const postReaction =  async (commentId, userId, type) =>{
  let reactionType;

  if(type === "like"){
    reactionType = {
      "user_id": userId,
      "comment_id": commentId,
      "like": 1
    }
  }else if(type === "love"){
    reactionType = {
      "user_id": userId,
      "comment_id": commentId,
      "love": 1
    }
  }

  const response = await fetch(`${urlAPI}/post/reacts/?comment_id=${commentId}&user=${userId}`, {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reactionType)
  })

  if (response.ok) {
    const content = await response.json()
    return 'Ok'
    // window.location.reload()
  }else{
    console.log(response);
    return 'Error'
  }
}

export async function sendLike(icon, count, commentId, userId){
  let result = false
  const user = await getReactionUser(commentId, userId)

  if(user){
    if(user.like){
      // console.log('update like to dislike', user);
      await updateReaction(commentId, userId) === 'Ok' ? result = 'update like to dislike' : result = 'Error'
    }else if(user.love){
      // console.log('update like and dislove', user);
      await updateReaction(commentId, userId, "like") === 'Ok' ? result = 'update like and dislove' : result = 'Error'
    }else{
      // console.log('update to like', user);
      await updateReaction(commentId, userId, "like") === 'Ok' ? result = 'update to like' : result = 'Error'
    }
  }else{
    // console.log('new like reaction', user);
    await postReaction(commentId, userId, "like")  === 'Ok' ? result = 'new like reaction' : result = 'Error'
  }
  return result;
}

export async function sendLove(icon, count, commentId, userId){
  const user = await getReactionUser(commentId, userId)
  let result = false
  if(user){
    if(user.love){
      // console.log('update love to dislove', user);
      await updateReaction(commentId, userId) === "Ok" ? result = 'update love to dislove' : result = 'Error'
    }else if(user.like){
      // console.log('update love and dislike', user);
      await  updateReaction(commentId, userId, "love") === "Ok" ? result = 'update love and dislike' : result = 'Error'
    }else{
      // console.log('update to love', user);
      await updateReaction(commentId, userId, "love") === "Ok" ? result = 'update to love' : result = 'Error'
    }
  }else{
    // console.log('new love reaction', user);
    await postReaction(commentId, userId, "love") === "Ok" ? result = 'new love reaction' : result = 'Error'
  }
  return result
}


export async function getReactionUser(commentId, userId){
  const response = await fetch(`${urlAPI}/post/reacts/?comment_id=${commentId}`)
  if (response.ok) {
    const content = await response.json()
    // const reaction = (r) => r.id === parseInt(userId);
    // return content.some(reaction)
    const reaction = content.find(r => r.id === parseInt(userId));
    return reaction
  }
  return false
}