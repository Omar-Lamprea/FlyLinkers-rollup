<script>
  import Event from './Event.svelte'
  // import Chat from '../../views/Chat.svelte'
  import { onMount } from 'svelte';

  const eventsAPI = 'https://news.flylinkers.com/wp-json/wp/v2/event'

  let data;
  const getEvents = async () =>{
    try {
      const response = await fetch(eventsAPI)
      if (response.ok) {
        const content = await response.json()
        data = []
        content.forEach(ev => {
          if (ev.status === "publish") {
            data.push({
              title: ev.slug.charAt(0).toUpperCase() + ev.slug.slice(1).replaceAll('-', ' '),
              eventLogo: ev.fimg_url,
              date : ev.date,
              start: '9:00am',
              end: '11:00pm',
              place: 'virtual',
              href: ev.link,
              linkName: ev.excerpt.rendered
            })
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }



  onMount(async ()=>{
    await getEvents()
  })

  // const data = [
  //   {
  //     title: 'Flight Operation Conferences',
  //     eventLogo: '../img/airplane.jpg',
  //     date : '10/12/2021',
  //     start: '9:00am',
  //     end: '11:00pm',
  //     place: 'virtual',
  //     href: '/',
  //     linkName: 'linkedin.com/in/flylinkers.com'
  //   },
  //   {
  //     title: 'Comercial Aviation Conferences',
  //     eventLogo: '../img/airplane.jpg',
  //     date : '10/12/2021',
  //     start: '9:00am',
  //     end: '11:00pm',
  //     place: 'virtual',
  //     href: '/',
  //     linkName: 'linkedin.com/in/flylinkers.com'
  //   },
  //   {
  //     title: 'Comercial Aviation Safety',
  //     eventLogo: '../img/airplane.jpg',
  //     date : '10/12/2021',
  //     start: '9:00am',
  //     end: '11:00pm',
  //     place: 'virtual',
  //     href: '/',
  //     linkName: 'linkedin.com/in/flylinkers.com'
  //   },
  // ]

</script>

<style>
  .Events h4{
    color: var(--main-color);
  }
</style>

<div class="Events Default-containers d-none d-lg-block px-2">
    <div class="Events-title mb-3 text-center">
      <h4 data-translate="title-upcoming-events">Upcoming events</h4>
    </div>

    <div class="Events-column">
      <div class="Event">
        {#if data}
          {#each data as event}
            <Event {...event}/>
          {/each}
        {/if}
      </div>
    </div>
</div>