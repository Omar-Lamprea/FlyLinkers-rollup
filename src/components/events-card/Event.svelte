<script>
  export let title, eventLogo, date, href, linkName


  const fullDate = new Date(date[0])
  date = fullDate.toDateString().slice(3)

  let start= fullDate.toLocaleTimeString('en-US', { hour12: true })
  start = start.slice(0, -6) + start.slice(-2)

  linkName = linkName.replace('[&hellip;]', '...')
  linkName.length >= 50 
    ? linkName = linkName.slice(3,100) + "..." 
    : linkName = linkName.slice(3) + "..."


</script>

<style>
  .Event{
    font-size: 12px;
    /* border-bottom: 1px solid var(--main-color); */
  }
  .Event h6{
    color: var(--main-color);
    /* margin-left: 1rem; */
  }
  .Event-img img{
    width: 65px;
    height: 65px;
    border-radius: 1rem;
    object-fit: cover;
  }
  .Event-link a{
    color: gray
  }
  .Event-details{
    padding-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
  }
  .Event-details p{
    /* font-size: 12px; */
    color: grey;
    font-weight: 700;
  }
  .Event-details p span{
    font-weight: normal;
  }

  .Event ul{
    padding-left: 0rem;
  }
  .Event li{
    list-style: none;
  }
  .Event i{
    font-size: 6px;
    /* margin-right: .1rem; */
    margin: .4rem;
    color: var(--main-color);
  }
</style>

<div class="Event mb-3">
  <ul>
    <li>
      <a href="{href}" target="_blank">
        <div class="Event-row d-flex align-items-start">
          <i class="fa-solid fa-circle"></i>
          <h6>{title}</h6>
        </div>
        <div class="d-flex mt-1">
          <div class="Event-img">
            <img src="{eventLogo}" alt="" class="ms-3">
          </div>
          <div class="Event-details ms-3">
            <p>Date: <span>{date}</span></p>
            <p>Time: <span>{start}</span></p>
          </div>
        </div>
        <!-- <div class="Event-link mx-3 mt-1">
          <a href="{href}" target="_blank">
            <p>{linkName}</p>
          </a>
        </div> -->
      </a>
    </li>
  </ul>
</div>