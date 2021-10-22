<script>
  export let title, eventLogo, date, start, end, place, href, linkName
</script>

<style>
  .Event{
    font-size: 12px;
  }
  .Event h6{
    color: var(--main-color);
    margin-left: .5rem;
  }
  .Event-img img{
    width: 80%;
    border-radius: 1rem;
  }
  .Event-link{
    font-size: 11px;
  }
  .Event-details{
    padding-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
  }
  .Event ul{
    padding-left: 0rem;
  }
  .Event li{
    list-style: none;
  }
  .Event i{
    font-size: 9px;
    margin-right: .1rem;
    color: var(--main-color);
  }
</style>

<div class="Event">
  <ul>
    <li>
      <div class="Event-row d-flex align-items-center">
        <i class="fas fa-circle"></i>
        <h6>{title}</h6>
      </div>
      <div class="row mt-1">
        <div class="Event-img col-6 d-flex align-items-end justify-content-end">
          <img src="{eventLogo}" alt="">
        </div>
        <div class="Event-details col-6">
          <p>Date: <span>{date}</span></p>
          <p>Start time: <span>{start}</span></p>
          <p>Final hour: <span>{end}</span></p>
          <p>Place: <span></span>{place}</p>
        </div>
      </div>
      <div class="Event-link m-3">
        <a href="{href}">{linkName}</a>
      </div>
    </li>
  </ul>
</div>