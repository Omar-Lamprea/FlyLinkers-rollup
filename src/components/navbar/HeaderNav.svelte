<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import { onMount } from 'svelte';

  import {db} from '../../js/firebase/config.js'
  import {collectionData} from 'rxfire/firestore'
  import {startWith} from 'rxjs/operators'
  import { collection,orderBy, query, doc, onSnapshot} from 'firebase/firestore';
  import { writable } from 'svelte/store';
  
  // import Notifications from './NotificationsHeader.svelte'
  import Notifications from './notifications/Notifications.svelte'
  import FriendRequest from './notifications/FriendRequest.svelte'
  import ChatList from './notifications/Chats.svelte'
  import PostModal from '../Modals/PostModal.svelte'
  import {openModal} from '../../js/closeModals'
  

  export let photo, id;
  export let urlLogOut, urlAPI;

  let idStr = id.toString()
  
  let usergroups = writable([]);
  let newChat;

  let notificationsFriends = writable([])
  let notificationsComments = writable([])

  let notificationsList = []

  function getUserNotifications(){
    const notifications = onSnapshot(doc(db, 'user', idStr), (notification)=>{
      notificationsList = []
      const data = notification.data()
      const idChats = data.groups
      const friendsRequests = data.friends
      const comments = data.comments
      const reactions = data.reactions

      //read Chats
      if (idChats !== undefined) {
        usergroups.set(idChats)
        newChat = idChats.length
      }

      //read Comments
      if (comments !== undefined){
        comments.forEach(comment => {
          const obj = {
            photo: comment.photo,
            name: comment.name,
            desc: 'has commented your post',
            date : comment.create_at.toDate(),
            id: comment.post_id
          }
          notificationsList.push(obj)
        });
      }

      //read friends requests
      if (friendsRequests !== undefined) {
        friendsRequests.forEach(request => {
          const obj = {
            photo: request.photo,
            name: request.name,
            desc: 'has sent you a friend request',
            date : request.create_at.toDate(),
            id: request.email,
          }
          notificationsList.push(obj)
        });
      }

      //read reactions
      if (reactions !== undefined) {
        reactions.forEach(reaction => {
          const obj = {
            photo: reaction.photo,
            name: reaction.name,
            desc: 'has reacted to your post',
            date : reaction.create_at.toDate(),
            id: reaction.post_id,
          }
          notificationsList.push(obj)
        });
      }

      updateNotifications()
    })
  }
  

  const updateNotifications = () =>{
    notificationsList.sort(function(a, b){
      return b.date - a.date
    })
    console.log(notificationsList);
  }

  const logOut = ()=>{
    localStorage.clear();
    window.location.href = urlLogOut;
  }

  function visitProfile(email){
    localStorage.setItem('visitProfile', email)
  }

  function reload(){
    window.location.reload()
  }

  onMount(()=>{
    getUserNotifications()
  })

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

  .notificationsList{
    cursor: pointer;
  }
  .notificationsList img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 30px;
    margin-right: 1rem;
  }
  .notificationsList .notification-user-name{
    color: var(--main-color);
    font-weight: bold;
  }
  .notificationsList a{
    color: inherit;
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
        {#each notificationsList as notification}
          <!-- friendRequest -->
          {#if typeof(notification.id) === 'string'}
             <li class="d-flex notificationsList dropdown-item" data-email={notification.id}>
              <a on:click={visitProfile(notification.id)} href="/profile/{notification.id}" use:link use:active class="d-flex">
                <img src="{urlAPI}/{notification.photo}" alt="userImage">
                <span>
                  <p class="notification-user-name">{notification.name}</p>
                  <p>{notification.desc}</p>
                </span>
              </a>
            </li>
          {:else}
            <!-- comment or reaction post -->
             <!-- <li class="d-flex notificationsList dropdown-item" data-id={notification.id} data-bs-toggle="modal" data-bs-target="#exampleModal"> -->
             <li class="d-flex notificationsList dropdown-item" data-id={notification.id}>
              <a href="/post/{notification.id}" use:link use:active class="d-flex" on:click={reload}>
                <img src="{urlAPI}/{notification.photo}" alt="userImage">
                <span>
                  <p class="notification-user-name">{notification.name}</p>
                  <p>{notification.desc}</p>
                </span>
              </a>
            </li>
            {/if}
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

