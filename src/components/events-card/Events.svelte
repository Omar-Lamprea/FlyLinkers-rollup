<script>
  import Event from './Event.svelte'
  import Chat from '../../views/Chat.svelte'

  const data = [
    {
      title: 'Flight Operation Conferences',
      eventLogo: '../img/airplane.jpg',
      date : '10/12/2021',
      start: '9:00am',
      end: '11:00pm',
      place: 'virtual',
      href: '/',
      linkName: 'https://www.linkedin.com/in/flylinkers.com'
    },
    {
      title: 'Comercial Avitaion Conferences',
      eventLogo: '../img/airplane.jpg',
      date : '10/12/2021',
      start: '9:00am',
      end: '11:00pm',
      place: 'virtual',
      href: '/',
      linkName: 'https://www.linkedin.com/in/flylinkers.com'
    },
    {
      title: 'Comercial Aviation Safety',
      eventLogo: '../img/airplane.jpg',
      date : '10/12/2021',
      start: '9:00am',
      end: '11:00pm',
      place: 'virtual',
      href: '/',
      linkName: 'https://www.linkedin.com/in/flylinkers.com'
    },
  ]

</script>

<style>
  .Events h4{
    color: var(--main-color);
  }
</style>

<div class="Events Default-containers px-2">
    <div class="Events-title mb-3 text-center">
      <h4>Upcoming events</h4>
    </div>

    <div class="Events-column">
      <div class="Event">
        {#each data as event}
          <Event {...event}/>
        {/each}
      </div>
    </div>
</div>