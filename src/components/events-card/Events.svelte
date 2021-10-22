<script>
  import Event from './Event.svelte'

  const data = [
    {
      title: 'Flight Operation Conferences',
      eventLogo: 'https://arepa.s3.amazonaws.com/elmo002.jpg',
      date : '10/12/2021',
      start: '9:00am',
      end: '11:00pm',
      place: 'virtual',
      href: '/',
      linkName: 'https://www.linkedin.com/in/flylinkers.com'
    },
    {
      title: 'Comercial Avitaion Conferences',
      eventLogo: 'https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/127117374_10225413017775737_3815254072231742375_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeE19bI-5yVUK7SutFpZunHWJ6wLAiwEawInrAsCLARrAnqS44ZXL6rQPIEhWQYj0hw&_nc_ohc=8H6N8H8UNDsAX80mduo&_nc_ht=scontent.feoh4-3.fna&oh=6aad0f7c896e1805286f20eee5274065&oe=6183BE18',
      date : '10/12/2021',
      start: '9:00am',
      end: '11:00pm',
      place: 'virtual',
      href: '/',
      linkName: 'https://www.linkedin.com/in/flylinkers.com'
    },
    {
      title: 'Comercial Aviation Safety',
      eventLogo: 'https://arepa.s3.amazonaws.com/elmo002.jpg',
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