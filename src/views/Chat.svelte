<script>
  import {db, getUser, validateGroup , getMessages, getMessage, newMessage, newGroup} from '../js/firebase/config.js'
  import {collectionData} from 'rxfire/firestore'
  import {startWith} from 'rxjs/operators'
  import { collection,onSnapshot,orderBy, query} from 'firebase/firestore';
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
  import Loader from '../components/Loader.svelte'

  export let id, userMain;


  const pickUpTab = ()=>{
    const chatContainer = document.getElementById(`chatContainer-${id}`)
    chatContainer.classList.toggle('minimize-chat')
    if (chatContainer.className.includes('minimize-chat')) {
      arrow.classList.add('rotate')
    }else{
      arrow.classList.remove('rotate')
    }
  }

  let user1;
  let user2;
  let groupId;

  const getUserChat = async()=>{
    user1 =  await getUser(userMain)
    user2 = await getUser(id)
    groupId = validateGroup(user1, user2)
    // console.log(groupId);
    if (groupId) {
      // console.log('entré al grupo:', groupId);
      getContainerMessages()
    }else{
      // console.log('group not found');
    }
  }

  const scrollChat = () =>{
    const scrollWindow = document.getElementById('messagesContainer')
    scrollWindow.scrollTop = scrollWindow.scrollHeight - scrollWindow.clientHeight
  }

  const sendMessage = async (e) => {
    let targetInput = inputMessage.value.length
    targetInput >= 1 ? btnSentMessage.removeAttribute('disabled') : btnSentMessage.setAttribute('disabled', '')

    if (e.key === 'Enter' || e.type === 'click') {
      if (inputMessage.value !== '') {
        // console.log(groupId);
        if (groupId) {
          newMessage(groupId, user1.name, inputMessage.value)
        }else{
          inputMessage.setAttribute('disabled', '')
          btnSentMessage.setAttribute('disabled', '')
          await newGroup(user1, user2, inputMessage.value)
          await getUserChat()
          inputMessage.removeAttribute('disabled')
          btnSentMessage.removeAttribute('disabled')
        }
        inputMessage.value = ''

        setTimeout(() => {
          scrollChat()
        }, 100);
      }
    }
  }

  let chats = writable([]);
  let arrChats = []
  const getContainerMessages = async ()=>{
    const messageRef =collection(db, `message/${groupId}/messages`)
    const q =  query(messageRef, orderBy('sentAt'))
    chats = collectionData(q, 'id').pipe(startWith([]))
  }

  onMount( async () =>{
    await getUserChat()
    await getContainerMessages()
    setTimeout(() => {
      scrollChat()
    }, 300);
  })

</script>

<style>
  .chat-container{
    position: fixed;
    bottom: -23rem;
    right: 2%;
    transition: all ease-in .5s;
  }
  .minimize-chat{
    bottom: 0rem !important;
    transition: all ease-in .5s;
  }

  .chat{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--main-color);
    border-radius: 5px 5px 0 0;
    width: 300px;
    height: 400px;
    background-color: white;
    padding: 0;
  }

  .header-chat{
    border-bottom: 1px solid var(--main-color);
    padding: .5rem 1rem;
    background-color: var(--main-color);
  }
  .header-chat i{
    /* transform:rotate(180deg); */
    background-color: var(--main-color);
    color: #fff;
    cursor: pointer;
    transition: all ease-in .5s;
  }
  .header-chat h6{
    cursor: pointer;
  }
  .rotate{
    transform:rotate(180deg);
    transition: all ease-in .5s;
  }


  .messages{
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth
  }
  .messages p, .messages a{
    border: 1px solid var(--main-color);
    margin: .2rem 0;
    width: fit-content;
    max-width: 15rem;
    padding: .5rem;
    word-break: break-all;
  }

  .messages a{
    text-decoration: underline;
    color: blue;
  }
  .messages .aLink{
    color: #fff;
  }

  .friend{
    background-color: var(--main-color);
    color: white;
    border-radius: 5px 5px 5px 0px;
  }
  .me{
    border-radius: 5px 5px 0px 5px;
    display: flex;
    align-self: flex-end;
    background-color: #f8f8f8;
    color: rgba(38, 38, 38, 07);
  }

  .messageText{
    border-top: 1px solid var(--main-color);
    height: 40px;
  }
  .messageText textarea{
    resize: none;
    width: 100%;
    border: none;
    background-color: #f3f3f3;
  }
  .messageText textarea:focus-visible{
    outline:none
  }

  .btn-sendMessage{
    color: white;
    border: none;
    background-color: var(--main-color);
  }
  .btn-sendMessage:hover{
    background-color: var(--hover-main-color);
  }
  .chat-controller .arrow{
    font-size: 1.2rem;
  }

  @media screen and (max-width: 620px){
    .chat-container{
      z-index: 10000;
    }
    .chat{
      height: 100vh;
      width: 100vw;
    }
    .chat-container{
      bottom: -95%;
      /* top: 100%; */
    }

  }

</style>

<div id="chatContainer-{id}" class=" row chat-container minimize-chat">
  <div class="chat col-3">

    <div class="header-chat d-flex justify-content-between align-items-center">
      {#if user2}
        <h6 style="color: #fff;">{user2.name}</h6>
      {/if}
      <div class="chat-controller">
        <i id="arrow" class="fas fa-arrow-up px-1 rotate " on:click={pickUpTab}></i>
        <i id="closeChat-{id}" data-chat={id} class="arrow fas fa-times mx-2"></i>
      </div>
    </div>

    <div id="messagesContainer" class="messages p-3 p-4 p-md-3 d-flex flex-column">
      {#if groupId}
        {#each $chats as message}
          {#if message.sentBy !== user1.name}
            {#if !message.messageText.includes('https://')}
              <p class="friend">{message.messageText}</p>
            {:else}
              <a href="{message.messageText}" target="_blank" class="friend aLink">{message.messageText}</a>
            {/if}
          {:else}
            {#if !message.messageText.includes('https://')}
              <p class="me">{message.messageText}</p>
            {:else}
              <a href="{message.messageText}" target="_blank" class="me">{message.messageText}</a>
            {/if}
          {/if}
        {/each}
      {/if}
    </div>

    <div class="messageText d-flex">
      <textarea id="inputMessage" type="text" placeholder="write a message" autocomplete="off" on:keyup={sendMessage}></textarea>
      <button id="btnSentMessage" class="btn-sendMessage" disabled on:click={sendMessage}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</div>