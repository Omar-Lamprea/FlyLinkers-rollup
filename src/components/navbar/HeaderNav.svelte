<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  
  import Notifications from './NotificationsHeader.svelte'
  import {getMessages, getGroupUser, getUser} from '../../js/firebase/config.js'
  import ChatList from './chatList/ChatList.svelte'

  export let photo, id;
  export let urlLogOut, urlAPI;
  export let getUserMainToFirestore;

  const chatList = [];
  let flagChat = false

  getUserMainToFirestore.groups.forEach(async group =>{
    chatList.push(await getGroupUser(group))
    setTimeout(() => {
      flagChat = true
    }, 500);
  })

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

</style>



<nav class="nav-container d-flex">
  <div class="Header-nav-home mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-home"></i>
    </a>
  </div>
  <div class="Header-nav-user-plus mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-user-plus"></i>
    </a>
  </div>
  <div class="Header-nav-briefcase mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-briefcase"></i>
    </a>
  </div>
  <div class="Header-nav-comment mx-3 fs-3">
    <i class="fas fa-comment dropdown-toggle" id="chats" data-bs-toggle="dropdown" aria-expanded="false"></i>
    <ul class="dropdown-menu" aria-labelledby="chats">
      {#if flagChat}
        {#each chatList as chatId}
          <ChatList {chatId} {urlAPI} {id}/>
        {/each}
      {/if}
    </ul>
  </div>
  <div class="Header-nav-bell mx-3 fs-3 notification" id="notification">
      <Notifications {id} {urlAPI}/>
  </div>
  <div class="Header-nav-user mx-3 fs-3">
    <a href="/profile" use:link use:active>
      {#if localStorage.getItem('profilePhoto')}
        <img src="{urlAPI}{localStorage.getItem('profilePhoto')}" alt="">
      {:else}
        <img src="{urlAPI}{photo}" alt="">
      {/if}
    </a>
  </div>
  <div class="Header-nav-grip-vertical mx-3 fs-3">
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
  <div class="Header-nav-calendar-week mx-3 fs-3">
    <a href="/" use:link use:active>
      <i class="fas fa-calendar-week"></i>
    </a>
  </div>
</nav>
