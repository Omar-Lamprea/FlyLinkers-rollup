<script>
  import User from './User.svelte'

  const data = [
    {
      img: 'https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/127117374_10225413017775737_3815254072231742375_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeE19bI-5yVUK7SutFpZunHWJ6wLAiwEawInrAsCLARrAnqS44ZXL6rQPIEhWQYj0hw&_nc_ohc=8H6N8H8UNDsAX80mduo&_nc_ht=scontent.feoh4-3.fna&oh=6aad0f7c896e1805286f20eee5274065&oe=6183BE18',
      name: 'Ben Morey',
      workTitle: 'Recrutier at Pilot',
      city: 'San Francisco, Ca'
    },
    {
      img: 'https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/127117374_10225413017775737_3815254072231742375_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeE19bI-5yVUK7SutFpZunHWJ6wLAiwEawInrAsCLARrAnqS44ZXL6rQPIEhWQYj0hw&_nc_ohc=8H6N8H8UNDsAX80mduo&_nc_ht=scontent.feoh4-3.fna&oh=6aad0f7c896e1805286f20eee5274065&oe=6183BE18',
      name: 'Jessica Mckellar',
      workTitle: 'Pilot',
      city: 'San Francisco, Ca'
    },
  ]
</script>

<style>
    .People h4{
    color: var(--main-color);
  }
</style>

<div class="People Default-containers">
  <div class="People-Ttitle mb-3 text-center">
    <h4>People</h4>
  </div>
  <div class="People-column">
    <div class="User">
      {#each data as UserDetails}
        <User {...UserDetails}/>
      {/each}
    </div>
  </div>
</div>