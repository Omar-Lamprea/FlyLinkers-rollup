<script>
  export let title, eventLogo, date, start, end, place, href, linkName
</script>

<style>
  .Event{
    font-size: 12px;
  }
  .Event h6{
    color: var(--main-color);
    margin-left: 1rem;
  }
  .Event-img img{
    width: 65px;
    height: 65px;
    border-radius: 1rem;
    object-fit: cover;
  }
  .Event-link{
    font-size: 11px;
    border-bottom: 1px solid var(--main-color);
  }
  .Event-details{
    padding-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
  }
  .Event-details p{
    font-size: 10px;
  }
  .Event ul{
    padding-left: 0rem;
  }
  .Event li{
    list-style: none;
  }
  .Event i{
    font-size: 8px;
    margin-right: .1rem;
    color: var(--main-color);
  }
</style>

<div class="Event">
  <ul>
    <li>
      <div class="Event-row d-flex align-items-center">
        <!-- <i class="fas fa-circle"></i> -->
        <h6>{title}</h6>
      </div>
      <div class="d-flex mt-1">
        <div class="Event-img">
          <img src="{eventLogo}" alt="" class="ms-3">
        </div>
        <div class="Event-details ms-3">
          <p>Date: <span>{date}</span></p>
          <p>Start time: <span>{start}</span></p>
          <p>Final hour: <span>{end}</span></p>
          <p>Place: <span></span>{place}</p>
        </div>
      </div>
      <div class="Event-link mx-3 mt-2 pb-2">
        <a href="{href}">{linkName}</a>
      </div>
    </li>
  </ul>
</div>