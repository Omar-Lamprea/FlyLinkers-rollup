<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import {db} from '../../../js/firebase/config'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit} from 'firebase/firestore';


  let notifications = 0;

  export let id, urlAPI;

  let friendRequest = [];

  const showFriendRequest = async () =>{
    const response = await fetch(`${urlAPI}/friend/request/?user_id=${id}`)
    const content = await response.json()
    friendRequest = content.reverse()
    notifications = friendRequest.length
  }

  const snapFriends = onSnapshot(doc(db, 'user', id.toString()), (notification)=>{
    const friendsRequests = notification.data().friends

    if (friendsRequests !== undefined) {
        friendsRequests.forEach(request => {
          showFriendRequest()
        });
      }
  });

  const acceptRequest = async(Friendid, email) =>{
    const redirect = window.location.hash
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
    if (response.ok) {
      window.location.href = `${redirect}profile/${email}`
    }
  }

  const declineRequest = async(FriendId) =>{
    console.log('eliminar', FriendId);
    // const response = await fetch(`${urlAPI}/friend/request/`, {
    //   method : 'DELETE',
    //   headers : {
    //     'Content-Type': 'application/json'
    //   },
    //   body:JSON.stringify({
    //     sender_id: Friendid,
	  //     receptor_id: id
    //   })
    // })
    // const content = await response.json()
    // if (response.ok) {
    //   window.location.reload()
    // }
  }

  const viewUserProfile = (email) => {
    window.location.pathname = `profile/${email}`
  }
  const visitProfile = (email) =>{
    localStorage.setItem('visitProfile', email)
    window.location.reload()
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
  .dropdown-item:active a{
    color: #fefefe;
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
  .dropdown-item a{
    color: var(--main-color);
  }
  

  /* .notifications{
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
  } */
  
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
  <i class="fas fa-user-plus dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
  {#if notifications >= 1}
     <!-- <div class="notifications">{notifications}</div> -->
  {/if}
  
  <ul class="dropdown-menu" aria-labelledby="notifications">
    {#each friendRequest as request}
       <li>
          <span class="dropdown-item">
            <a href="/profile/{request.email}" use:link use:active class="d-flex">
              <div class="userData">
                <img src="{urlAPI}{request.photo}" alt="">
                <span>{request.name} {request.last_name}</span>
              </div>
            </a>
            <div class="btns-request">
              <button class="btn-request btn-success" on:click={acceptRequest(request.id, request.email)}>Accept</button>
              <button id="declineRequest" class="btn-request btn-decline" on:click={declineRequest(request.id)}>Decline</button>
            </div>
          </span>
      </li>
    {:else}
       <p class="text-center">You haven't news</p>
    {/each}
  </ul>
</div>