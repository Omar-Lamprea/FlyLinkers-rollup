<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'

  import {db} from '../../js/firebase/config.js'
  import {collectionData} from 'rxfire/firestore'
  import {startWith} from 'rxjs/operators'
  import { collection,orderBy, query, doc, onSnapshot} from 'firebase/firestore';
  import { writable } from 'svelte/store';
  
  // import Notifications from './NotificationsHeader.svelte'
  import Notifications from './notifications/Notifications.svelte'
  import FriendRequest from './notifications/FriendRequest.svelte'
  import ChatList from './chatList/ChatList.svelte'

  export let photo, id;
  export let urlLogOut, urlAPI;

  let idStr = id.toString()
  
  let usergroups = writable([]);
  let notificationsFriends = writable([])
  let notificationsComments = writable([])
  let newChat;

  //read chats notifications
  function getGroupsChatNotificacions(){
    const userDoc = onSnapshot(doc(db, 'user', idStr), (doc) => {
      usergroups.set(doc.data().groups)
      newChat = doc.data().groups.length
    })
  }
  getGroupsChatNotificacions(usergroups)

  //read comments notifications
  function getCommentsNotifications(){
    const comment = onSnapshot(doc(db, 'user', idStr), (doc) =>{
      const commentsList = doc.data().comments
      if (commentsList !== undefined) {
        console.log('comments:', commentsList);
        notificationsComments.set(commentsList)
      }
    })
  }
  getCommentsNotifications()


  //read friend request notifications
  function getFriendRequestNotificacions(){
    const friendRequest = onSnapshot(doc(db, 'user', idStr), (doc) =>{
      const friendsList = doc.data().friends
      if (friendsList !== undefined) {
        // console.log('requests:', friendsList);
        notificationsFriends.set(friendsList)
      }
    })
  }
  getFriendRequestNotificacions()

  const logOut = ()=>{
    localStorage.clear();
    window.location.href = urlLogOut;
  }

</script>

<style>
  div i{
    text-decoration: none;
    color: #fff;
  }
  .dropdown-toggle:empty::after{
    content: initial
  }
  .dropdown-item:active{
    background-color: var(--main-color);
  }
  .Header-nav-user img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .notification{
    position: relative;
  }

  .notificacions-chats{
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
  @media screen and (max-width: 1200px){
    .nav-container{
      margin: .5rem 0;
    }
  }
  @media screen and (max-width: 480px){
    .hidden{
      display: none;
    }
    .icon{
      font-size: 1.7rem !important;
      margin: 0 0.8rem !important;
    }
  }

</style>



<nav class="nav-container d-flex">
  <div class="icon Header-nav-home mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-home"></i>
    </a>
  </div>
  <div class="icon Header-nav-user-plus notification mx-3 fs-3">
    <FriendRequest {id} {urlAPI}/>
  </div>
  <div class="icon Header-nav-briefcase hidden mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-briefcase"></i>
    </a>
  </div>
  <div class="icon Header-nav-comment mx-3 fs-3 position-relative">
    {#if newChat}
      <div class="notificacions-chats">{newChat}</div>
    {/if}

    <i class="fas fa-comment dropdown-toggle" id="chats" data-bs-toggle="dropdown" aria-expanded="false"></i>
    <ul class="dropdown-menu" aria-labelledby="chats">
      {#each $usergroups as groups}
         <ChatList {groups} {urlAPI} {id}/>
      {:else}
        <li class="dropdown-item chatList d-flex">
          <span>You haven't started any chat</span>
        </li>
      {/each}
    </ul>
  </div>
  <div class="icon Header-nav-bell mx-3 fs-3 notification" id="notification">
    <div class="dropdown">
      <i class="fas fa-bell dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
      <!-- {#if notifications >= 1}
         <div class="notifications">{notifications}</div>
      {/if} -->
      
      <ul class="dropdown-menu" aria-labelledby="notifications">
        {#each $notificationsComments as comment}
          <Notifications {comment}/>
        {/each}
        {#each $notificationsFriends as friend}
          <Notifications {friend}/>
        {/each}
      </ul>
    </div>


    <!-- <Notifications {id} {urlAPI}/> -->
  </div>
  <div class="icon Header-nav-user mx-3 fs-3">
    <a href="/profile" use:link use:active>
      {#if localStorage.getItem('profilePhoto')}
        <img id="headerUserImage" src="{urlAPI}{localStorage.getItem('profilePhoto')}" alt="">
      {:else}
        <img id="headerUserImage" src="{urlAPI}{photo}" alt="">
      {/if}
    </a>
  </div>
  <div class="icon Header-nav-grip-vertical mx-3 fs-3">
    <a href="/" use:link use:active>
      <div class="dropdown">
        <i class="fas fa-grip-vertical dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false" ></i>
        <ul class="dropdown-menu" aria-labelledby="settings">
          <li><span class="dropdown-item">Settings</span></li>
          <li><span class="dropdown-item" on:click={logOut}>Log Out</span></li>
        </ul>
      </div>
    </a>
  </div>
  <div class="icon Header-nav-calendar-week hidden mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-calendar-week"></i>
    </a>
  </div>
</nav>
