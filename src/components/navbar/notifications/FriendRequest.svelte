<script>
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'
  import {db} from '../../../js/firebase/config'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit} from 'firebase/firestore';
  import {addFriend, declineFriend} from '../../../js/friendRequests'
  import { writable } from 'svelte/store';

  let notifications = 0;

  export let id, urlAPI;

  let friendRequest = writable([]);

  const showFriendRequest = async () =>{
    const response = await fetch(`${urlAPI}/friend/request/?user_id=${id}`)
    const content = await response.json()
    friendRequest.set(content.reverse())
    notifications = $friendRequest.length
  }

  const snapFriends = onSnapshot(doc(db, 'user', id.toString()), (notification)=>{
    const friendsRequests = notification.data().friends

    if (friendsRequests !== undefined) {
        friendsRequests.forEach(request => {
          showFriendRequest()
        });
      }
  });

  const acceptRequest = async(friendId, email) =>{
    addFriend(urlAPI, friendId, id, email)
  }

  const declineRequest = async(friendId, email) =>{
    let response = await declineFriend(urlAPI, friendId, id, email)
    if (response) {
      friendRequest.update(arr => {
        return arr.filter(req => req.id !== friendId)
      })
    }
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

  .your-network-nav{
    border-top: 1px solid #c2c2c2;
    color: #000;
    /* padding: 0.5rem 0; */
  }
  .your-network-nav:hover{
    background-color: #efefef;
  }

</style>

<div class="dropdown">
  <i class="fas fa-user-plus dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
  {#if notifications >= 1}
     <!-- <div class="notifications">{notifications}</div> -->
  {/if}
  
  <ul class="dropdown-menu" aria-labelledby="notifications">
    {#each $friendRequest as request}
       <li>
          <span class="dropdown-item">
            <a href="/profile/{request.username}" use:link use:active class="d-flex">
              <div class="userData">
                <img src="{urlAPI}{request.photo}" alt="">
                <span>{request.name} {request.last_name}</span>
              </div>
            </a>
            <div class="btns-request">
              <button data-translate="nav-acept-request" class="btn-request btn-success" on:click={acceptRequest(request.id, request.username)}>Accept</button>
              <button  data-translate="nav-deline-request" id="declineRequest" class="btn-request btn-decline" on:click={declineRequest(request.id, request.email)}>Decline</button>
            </div>
          </span>
      </li>
    {:else}
       <p data-translate="nav-no-request" class="py-2 text-center">You haven't news</p>
       <!-- <a href="/network/{id}" class="text-center" use:link use:active>
        <p class="text-center">Your Network</p>
      </a> -->
    {/each}

    <a href="/network/{id}" class="text-center" use:link use:active>
      <p data-translate="your-network" class="your-network-nav py-2 text-center">Your Network</p>
    </a>
  </ul>
</div>