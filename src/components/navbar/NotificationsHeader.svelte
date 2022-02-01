<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'


  let notifications = 0;

  export let id, urlAPI;

  let friendRequest = [];

  const showFriendRequest = async () =>{
    const response = await fetch(`${urlAPI}/friend/request/?user_id=${id}`)
    const content = await response.json()
    friendRequest = content
    notifications = friendRequest.length
  }

  showFriendRequest()

  const acceptRequest = async(Friendid) =>{
    const response = await fetch(`${urlAPI}/friend/request/`, {
      method : 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        sender_id: Friendid,
	      receptor_id: id
      })
    })
    const content = await response.json()
    if (content.Detail === 'OK') {
      window.location.reload()
    }
  }

  const viewUserProfile = (email) => {
    window.location.pathname = `profile/${email}`
  }
  const visitProfile = (email) =>{
    localStorage.setItem('visitProfile', email)
  }

</script>

<style>

  .dropdown{
    cursor: pointer;
  }
  .dropdown-toggle:empty::after{
      content: initial
    }
  .dropdown-item:active{
    background-color: var(--main-color);
  }
  .dropdown-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-item img{
    border-radius: 50%;
    height: 50px;
    width: 50px;
    object-fit: cover;
    border: 1px solid var(--main-color);
    padding: .1rem;
  }

  .notifications{
    position: absolute;
    top: 6px;
    left: 14px;
    background-color: #d70000;
    border-radius: 50%;
    font-size: .8rem;
    font-weight: 500;
    height: 20px;
    width: 20px;
    text-align: center;
    color: white;
  }
  
  .userData{
    cursor: pointer;
  }

  .btns-request{
    display: flex;
    flex-direction: column;
  }
  .btn-request{
    background-color: #fefefe;
    border: 1px solid var(--main-color);
    color: #000;
    border-radius: 2rem;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem
  }

  .btn-success:hover{
    background-color: var(--main-color);
    color: #fefefe;
  }
  .btn-decline:hover{
    background-color: #de4848;
    border: 1px solid #de4848;
    color: #fefefe;
  }

</style>

<div class="dropdown">
  <i class="fas fa-bell dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
  {#if notifications >= 1}
     <div class="notifications">{notifications}</div>
  {/if}
  
  <ul class="dropdown-menu" aria-labelledby="notifications">
    {#each friendRequest as request}
       <!-- <li>
         <span class="dropdown-item">
           <div class="userData" on:click={viewUserProfile(request.email)}>
             <img src="{urlAPI}{request.photo}" alt="">
             <span>{request.name} {request.last_name}</span>
           </div>
           <div class="btns-request">
             <button class="btn-request btn-success" on:click={acceptRequest(request.id)}>Accept</button>
             <button id="declineRequest" class="btn-request btn-decline">Decline</button>
           </div>
         </span>
       </li> -->
       <li>
        <a on:click={visitProfile(request.email)} href="/profile/{request.email}" use:link use:active class="d-flex">
          <span class="dropdown-item">
            <div class="userData">
              <img src="{urlAPI}{request.photo}" alt="">
              <span>{request.name} {request.last_name}</span>
            </div>
            <div class="btns-request">
              <button class="btn-request btn-success" on:click={acceptRequest(request.id)}>Accept</button>
              <button id="declineRequest" class="btn-request btn-decline">Decline</button>
            </div>
          </span>
        </a>
      </li>
    {:else}
       <p class="text-center">you haven't news</p>
    {/each}
  </ul>
</div>