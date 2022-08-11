<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import { onMount } from 'svelte';
  import {translate} from '../../js/translate'
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
  export let urlLogOut, urlAPI, urlImages;

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

      const data = notification.data()
      const groups = data.groups
      const friendsRequests = data.friends
      const comments = data.comments
      const reactions = data.reactions

      // console.log('soy la flag dentro del primer snap');
      // console.log('soy el contador dentro del primer snap', countMessages);
      // console.log(groups);
      //read Chats
      if (groups !== undefined) {
        usergroups.set(groups)

        groups.forEach(chat => {
          let flag = 0
          countMessages = 0
          // console.log('reiniciando contador a 0');
          const q = query(collection(db, `message/${chat}/messages`), orderBy('sentAt', 'desc'), limit(2))
          // console.log(q);

          const snapChatId = onSnapshot(q, {includeMetadataChanges: true}, col =>{
            // console.log('1', col.docs[0].data(), '2', col.docs[1].data());
            
            const dataMain = JSON.parse(localStorage.getItem('data'))
            const userName = `${dataMain.name} ${dataMain.last_name}`
            // console.log(col, col.docs);
            // console.log('soy la flag dentro del segundo snap', flag);
            // console.log('soy el contador dentro del segundo snap', countMessages);
            
            if (col.docs[0]) {
              
              if (col.docChanges()[0]) {
                // console.log('soy el cambio',col.docChanges()[0]);
                if (col.docChanges()[0].type === "added" || col.docChanges()[0].type === "removed") {
                  // console.log('soy el cambio',col.docChanges()[0].type);
                  if (col.docs[0].data().sentBy !== userName) {
                    if (col.docs.length === 1) {
                     
                      if (!col.docs[0].data().seen) {
                        // console.log('entré al 1');
                        countMessages += 1
                        flag = 1
                      }
                     
                    }else if(col.docs.length === 2){
    
                      if (col.docs[1].data().seen) {
                        if (!col.docs[0].data().seen) {
                          // console.log('entre al 2a');
                          countMessages += 1
                          flag = 1
                        }else{
                          flag = 1
                        }
                      }else{
                        if (flag === 0) {
                          // console.log('entre al 2b');
                          countMessages += 1
                        }else{
                          // flag = 0
                        }
                      }
    
                    }
                  }
                }
              }

            }
            // snapChatId()
          })
        });
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
        if (countBubble === 0) {
          notificacionsBubbleCount.classList.add('d-none')
        }else{
          notificacionsBubbleCount.classList.remove('d-none')
        }
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

  const logOut = async()=>{
    const logout = await fetch(`${urlAPI}/user/logout/?token=${localStorage.getItem('user')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (logout.ok) {
      // const content = await logout.json()
      for (const key in localStorage) {
        if (Object.hasOwnProperty.call(localStorage, key)) {
          const item = localStorage[key];
          // console.log(key);
          key !== "lang" ? localStorage.removeItem(key) : false
        }
      }
      window.location.href = urlLogOut;
    }
  }

  const setLanguage = async (e)=>{
    if (e.target.value !== '') {
      console.log(e.target.value);
      localStorage.setItem('lang', e.target.value)
      await translate()
      const btnModalEx = document.getElementById('btnAddEx')
      btnModalEx ? btnModalEx.setAttribute('data-translatee', e.target.value) : false
    }
  }


  onMount(()=>{
    getUserNotifications()


    const observer = new MutationObserver(()=>{
      if (countMessages > 0){
        // if (countMessages === 1) {
        //   countMessages -= 1
        // }else{
        //   countMessages -= 2
        // }
        countMessages -= 1
        // console.log('soy conuntmessages',countMessages);
        // console.log('entré a reducir');
      } 
      // usergroups.set([])
      // getUserNotifications()
      // console.log('contador reducido en 1');
    })
    observer.observe(notificacionsChatsBubble, {attributes:true})

  })

</script>

<style>
  div i{
    text-decoration: none;
    color: #fff;
  }
  .dropdown-toggle:empty::after, .notificacions-bubble::after{
    content: initial
  }
  .dropdown-item, .icon img{
    cursor: pointer;
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
  /* .notification-desc{
    max-width: 220.19px;
  } */

  .notificationsList, .Header-nav-comment, .Header-nav-bell{
    cursor: pointer;
  }
  .notificationsList img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 30px;
    margin-right: 1rem;
    min-width: 50px;
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

  .select-language{
    border-radius: 20px;
    padding: 0.2rem;
    height: fit-content;
    margin-top: 5px;
    border: none;
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
      cursor: pointer;
    }
  }

</style>



<nav class="nav-container d-flex align-items-center">
  <div id="iconHome" class="icon Header-nav-home mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-home"></i>
    </a>
  </div>
  <div class="icon Header-nav-user-plus notification mx-3 fs-3">
    <FriendRequest {id} {urlAPI}/>
  </div>
  <!-- <div class="icon Header-nav-briefcase hidden mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-briefcase"></i>
    </a>
  </div> -->
  <div class="icon Header-nav-comment mx-3 fs-3 position-relative">
    <div class="dropdown">
      {#if countMessages > 0}
        <div id="notificacionsChatsBubble" class="notificacions-bubble dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{countMessages}</div>
      {:else}
        <div id="notificacionsChatsBubble" class="notificacions-bubble d-none"></div>
      {/if}
      <i class="fas fa-comment dropdown-toggle" id="chats" data-bs-toggle="dropdown" aria-expanded="false"></i>
      
      <ul class="dropdown-menu" aria-labelledby="chats" id="ulChatList">
        {#each $usergroups as groups}
          <ChatList {groups} {urlAPI} {id}/>
        {:else}
          <li class="dropdown-item chatList d-flex">
            <span data-translate="nav-no-chat">You haven't started any chat</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- notifications icon -->
  <div class="icon Header-nav-bell mx-3 fs-3 notification" id="notification" on:click={counterBubble}>
    <div class="dropdown">
      <i class="fas fa-bell dropdown-toggle" id="notifications" data-bs-toggle="dropdown" aria-expanded="false"></i>
      <!-- {#if countBubble > 0}
      {/if} -->
      <div id="notificacionsBubbleCount" class="notificacions-bubble d-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{countBubble}</div>
      <ul class="dropdown-menu" aria-labelledby="notifications">
        {#if notificationsList.length > 0}
          {#each notificationsList as notification}
            <!-- friendRequest -->
            {#if typeof(notification.id) === 'string'}
              <li class="d-flex notificationsList dropdown-item" data-email={notification.id}>
                <a on:click={visitProfile(notification.id)} href="/profile/{notification.id}" use:link use:active class="d-flex">
                  <img src="{urlImages}{notification.photo}" alt="userImage">
                  <span>
                    <div class="data-user-time d-flex justify-content-between">
                      <p class="notification-user-name">{notification.name}</p>
                      <p class="notification-time">{startTime(notification.date.toISOString())}</p>
                    </div>
                    <p data-translate="notification-Frequest" class="notification-desc">{notification.desc}</p>
                  </span>
                </a>
              </li>
            {:else}
              <!-- comment or reaction post -->
              <li class="d-flex notificationsList dropdown-item" data-id={notification.id}>
                <a href="/post/{notification.id}" use:link use:active class="d-flex" on:click={reload}>
                  <img src="{urlImages}{notification.photo}" alt="userImage">
                  <span>
                    <div class="data-user-time d-flex justify-content-between">
                      <p class="notification-user-name">{notification.name}</p>
                      <p class="notification-time">{startTime(notification.date.toISOString())}</p>
                    </div>
                    {#if notification.desc.includes('reacted')}
                      <p data-translate="notification-reaction" class="notification-desc">{notification.desc}</p>
                    {:else}
                      <p data-translate="notification-comment" class="notification-desc">{notification.desc}</p>
                    {/if}
                  </span>
                </a>
              </li>
              {/if}
          {/each}
        {:else}
          <p data-translate="nav-no-news" class="mx-3">you haven't news</p>
        {/if}
      </ul>
    </div>
  </div>

  <!-- profile icon -->
  <div class="icon Header-nav-user mx-3 fs-3">
    <a href="/profile" use:link use:active>
      {#if localStorage.getItem('profilePhoto')}
        <img id="headerUserImage" src="{urlImages}{localStorage.getItem('profilePhoto')}" alt="">
      {:else}
        <img id="headerUserImage" src="{urlImages}{photo}" alt="">
      {/if}
    </a>
  </div>
  <div class="icon Header-nav-grip-vertical mx-3 fs-3">
      <div class="dropdown">
        <img  src="../img/grid-icon.png" alt="" width="27" class="fas fa-grip-vertical dropdown-toggle" id="settings" data-bs-toggle="dropdown" aria-expanded="false">
        <ul class="dropdown-menu" aria-labelledby="settings">
          <li>
            <a href="/settings" use:link use:active>
              <span data-translate="nav-settings" class="dropdown-item">Settings</span>
            </a>
          </li>
          <li><span data-translate="nav-log-out" class="dropdown-item" on:click={logOut}>Log Out</span></li>
        </ul>
      </div>
  </div>

  <select class="select-language" name="selectLanguegeHeader" id="selectLanguegeHeader" on:change={setLanguage}>
    {#if localStorage.getItem("lang") === "Es"}
       <option value="En">En</option>
       <option value="Es" selected>Es</option>
    {:else}
       <option value="En" selected>En</option>
       <option value="Es">Es</option>
    {/if}
  </select>
  <!-- <div class="icon Header-nav-calendar-week hidden mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-calendar-week"></i>
    </a>
  </div> -->
</nav>

