export async function getExperiences(urlAPI, userProfile){
  const response = await fetch(`${urlAPI}/user/experience/?profile_id=${userProfile}`)
  const content = await response.json()
  return content
}