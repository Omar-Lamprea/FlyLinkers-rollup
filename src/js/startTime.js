export default function startTime (create_time){
  let datePost;

  const postDate = new Date(create_time)
  const dateNow = new Date()
  const substractDate = (dateNow - postDate)

  const minute = 60_000
  const hour = minute * 60
  const days = hour * 24
  const week = days * 7
  const month = week * 4
  const year = month * 12

  let daysCount = (1 * substractDate)/ days;
  let timePost;

  // console.log(Math.round(daysCount));
  if (substractDate < hour) {
    timePost = (1 * substractDate)/ minute 
    datePost = Math.floor(timePost) + 'Min'
    return datePost
  }
  if (daysCount < 1 && substractDate > hour){
    timePost = (1 * substractDate)/ hour 
    datePost = Math.floor(timePost) + 'H'
    return datePost
  }
  if (daysCount >= 1) {
    timePost = daysCount
    datePost = Math.ceil(timePost) + ' D'
    return datePost
  }
  if (daysCount >= 7){
    timePost = (1 * substractDate)/ week 
    datePost = Math.floor(timePost) + ' W'

    if (timePost >= 4) {
      timePost = (1 * substractDate)/ month 
      datePost = Math.floor(timePost) + ' M'

      if (timePost >= 12) {
        timePost = (1 * substractDate)/ year 
        datePost = Math.floor(timePost) + ' Year'
      }
    }
    return datePost
  }
  return datePost
}