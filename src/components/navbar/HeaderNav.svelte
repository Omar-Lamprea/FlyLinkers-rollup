<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import { onMount } from 'svelte';

  import {db, getGroupUser} from '../../js/firebase/config.js'
  import {collectionData} from 'rxfire/firestore'
  import {startWith} from 'rxjs/operators'
  import { collection, orderBy, getDoc, updateDoc, query, doc, onSnapshot, limit} from 'firebase/firestore';
  import { writable } from 'svelte/store';
  
  // import Notifications from './NotificationsHeader.svelte'
  // import Notifications from './notifications/Notifications.svelte'
  import FriendRequest from './notifications/FriendRequest.svelte'
  import ChatList from './notifications/Chats.svelte'
  import startTime from '../../js/startTime'
  

  export let photo, id;
  export let urlLogOut, urlAPI;

  let idStr = id.toString()
  
  let usergroups = writable([]);
  let newChat;

  let notificationsList = []
  let notificationsChats = []
  let countBubble = 0
  let countMessages = 0


  function getUserNotifications(){
    const notifications = onSnapshot(doc(db, 'user', idStr), (notification)=>{
      notificationsList = []
      notificationsChats = []
      countBubble = 0
      countMessages = 0

      const data = notification.data()
      const groups = data.groups
      const friendsRequests = data.friends
      const comments = data.comments
      const reactions = data.reactions

      //read Chats
      if (groups !== undefined) {
        usergroups.set(groups)
        
        groups.forEach(chat => {
          const q = query(collection(db, `message/${chat}/messages`), orderBy('sentAt', 'desc'), limit(1))
          const snapChatId = onSnapshot(q, col =>{
            col.forEach(doc => {
              // countMessages = 0
              if (!doc.data().seen) {
                // console.log(doc.data());
                countMessages += 1
                console.log(countMessages);
                localStorage.setItem('countMessages', countMessages )
                console.log(countMessages);
              }
            });
          })
        });




        // groups.forEach(chat => {
        //   const q = query(collection(db, `message/${chat}/messages`), orderBy('sentAt', 'desc'), limit(1))
        //   const snapChatId = onSnapshot(q, col =>{
        //     col.forEach(doc => {
        //       // console.log(doc.data().sentAt);
        //       const dataMessage = doc.data()
        //       const liChatMessage = document.getElementsByClassName('unreadMessage')
        //       console.log(liChatMessage);
        //       countMessages = liChatMessage.length
        //       if (!dataMessage.seen) {
        //         console.log('nueva notificacion');
        //         const dataMain = JSON.parse(localStorage.getItem('data'))
        //         const name = `${dataMain.name} ${dataMain.last_name}`
        //         if (name !== dataMessage.sentBy) {
        //           notificacionsChatsBubble.classList.remove('d-none')
        //           countMessages += 1
        //         }
        //       }
        //       if (countMessages === 0) {
        //         notificacionsChatsBubble.classList.add('d-none')
        //       }
        //       // console.log(countMessages);
        //     });
        //   })
        // });
      }

      //read Comments
      if (comments !== undefined){
        comments.forEach(comment => {
          // console.log(comment.create_at.toDate().toISOString());
          const obj = {
            photo: comment.photo,
            name: comment.name,
            desc: 'has commented your post',
            date : comment.create_at.toDate(),
            id: comment.post_id,
            seen: comment.seen
          }
          if(!obj.seen){
            countBubble += 1
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
            seen: request.seen
          }
          //recargar solicitudes

          if(!obj.seen){
            countBubble += 1
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
            seen: reaction.seen
          }
          if(!obj.seen){
            countBubble += 1
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
    // console.log(notificationsList);
    // console.log(countBubble);
  }

  const logOut = ()=>{
    localStorage.clear();
    window.location.href = urlLogOut;
  }

  function visitProfile(email){
    localStorage.setItem('visitProfile', email)
  }

  async function reload(){
    window.location.reload()
  }

  async function counterBubble(){
    if (notificationsList.length > 0) {
      const userDoc = doc(db, 'user', idStr)
      const docSnap = await getDoc(userDoc)
  
      if (docSnap.exists()) {
        const userData = docSnap.data()
        const reactionsList = []
        const commentsList = []
        const friendsList = []
        
        if (userData.reactions) {
          userData.reactions.forEach(reaction => {
            const template = {
              create_at: reaction.create_at,
              name: reaction.name,
              photo: reaction.photo,
              post_id: reaction.post_id,
              seen: undefined,
              user_id: reaction.user_id
            }
            if (!reaction.seen) {
              template.seen = true
            }else{
              template.seen = true
            }
            reactionsList.push(template)
          })
        }
        
        if (userData.comments) {
          userData.comments.forEach(comment => {
            const template = {
              comment: comment.comment,
              create_at: comment.create_at,
              name: comment.name,
              photo: comment.photo,
              post_id: comment.post_id,
              seen: undefined,
              user_id: comment.user_id
            }
            if (!comment.seen) {
              template.seen = true
            }else{
              template.seen = true
            }
            commentsList.push(template)
          })
        }

        if (userData.friends) {
          userData.friends.forEach(friend => {
            const template = {
              create_at: friend.create_at,
              name: friend.name,
              photo: friend.photo,
              email: friend.email,
              seen: undefined,
              sender_id: friend.sender_id
            }
            if (!friend.seen) {
              template.seen = true
            }else{
              template.seen = true
            }
            friendsList.push(template)
          })
        }
        // console.log(friendsList);
        updateDoc(userDoc,{
          friends: friendsList,
          reactions: reactionsList, 
          comments: commentsList
        })
      }
    }
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
  .dropdown-menu{
    max-height: 40vh;
    overflow-y: auto;
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

  .notificacions-bubble{
    position: absolute;
    top: 6px;
    left: 14px;
    background-color: #d70000;
    border-radius: 50%;
    font-size: .85rem;
    font-weight: 700;
    height: 20px;
    width: 20px;
    text-align: center;
    color: white;
  }
  .notification-time{
    color: grey
  }
  .notification-desc{
    width: 210.19px;
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
    width: 100%;
    color: inherit;
  }
  .notificationsList span{
    width: 100%;
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
  <div id="iconHome" class="icon Header-nav-home mx-3 fs-3">
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
    <div id="notificacionsChatsBubble" class="notificacions-bubble d-none">!</div>
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

  <!-- notifications icon -->
  <div class="icon Header-nav-bell mx-3 fs-3 notification" id="notification" on:click={counterBubble}>
    <div class="dropdown">
      <i class="fas fa-bell dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
      {#if countBubble > 0}
         <div class="notificacions-bubble">{countBubble}</div>
      {/if}
      <ul class="dropdown-menu" aria-labelledby="notifications">
        {#each notificationsList as notification}
          <!-- friendRequest -->
          {#if typeof(notification.id) === 'string'}
             <li class="d-flex notificationsList dropdown-item" data-email={notification.id}>
              <a on:click={visitProfile(notification.id)} href="/profile/{notification.id}" use:link use:active class="d-flex">
                <img src="{urlAPI}/{notification.photo}" alt="userImage">
                <span>
                  <div class="data-user-time d-flex justify-content-between">
                    <p class="notification-user-name">{notification.name}</p>
                    <p class="notification-time">{startTime(notification.date.toISOString())}</p>
                  </div>
                  <p class="notification-desc">{notification.desc}</p>
                </span>
              </a>
            </li>
          {:else}
            <!-- comment or reaction post -->
             <li class="d-flex notificationsList dropdown-item" data-id={notification.id}>
              <a href="/post/{notification.id}" use:link use:active class="d-flex" on:click={reload}>
                <img src="{urlAPI}/{notification.photo}" alt="userImage">
                <span>
                  <div class="data-user-time d-flex justify-content-between">
                    <p class="notification-user-name">{notification.name}</p>
                    <p class="notification-time">{startTime(notification.date.toISOString())}</p>
                  </div>
                  <p class="notification-desc">{notification.desc}</p>
                </span>
              </a>
            </li>
            {/if}
        {/each}
      </ul>
    </div>
  </div>

  <!-- profile icon -->
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
      <div class="dropdown">
        <i class="fas fa-grip-vertical dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false" ></i>
        <ul class="dropdown-menu" aria-labelledby="settings">
          <li>
            <a href="/settings" use:link use:active>
              <span class="dropdown-item">Settings</span>
            </a>
          </li>
          <li><span class="dropdown-item" on:click={logOut}>Log Out</span></li>
        </ul>
      </div>
  </div>
  <div class="icon Header-nav-calendar-week hidden mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-calendar-week"></i>
    </a>
  </div>
</nav>

