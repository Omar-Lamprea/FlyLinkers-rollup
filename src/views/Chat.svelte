<script>
  import {db, getUser, validateGroup , getMessages, getMessage, newMessage, newGroup} from '../js/firebase/config.js'
  import {collectionData} from 'rxfire/firestore'
  import {startWith} from 'rxjs/operators'
  import { collection,orderBy, query} from 'firebase/firestore';
  import { writable } from 'svelte/store';
  import {onMount} from 'svelte'
  import Loader from '../components/Loader.svelte'

  export let id, userMain;

  const pickUpTab = ()=>{
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
    if (e.key === 'Enter' || e.type === 'click') {
      if (inputMessage.value !== '') {
        // console.log(groupId);
        if (groupId) {
          newMessage(groupId, user1.name, inputMessage.value)
        }else{
          inputMessage.setAttribute('disabled', '')
          await newGroup(user1, user2, inputMessage.value)
          await getUserChat()
          inputMessage.removeAttribute('disabled')
        }
        inputMessage.value = ''

        setTimeout(() => {
          scrollChat()
        }, 50);
      }
    }
  }

  let chats = writable([]);
  const getContainerMessages = ()=>{
    const messageRef = collection(db, `message/${groupId}/messages`)
    const q = query(messageRef, orderBy('sentAt'))
    chats = collectionData(q, 'id').pipe(startWith([]))
  }

  onMount( async () =>{
    await getUserChat()
    getContainerMessages()
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
    bottom: 0rem;
    transition: all ease-in .5s;
  }

  .chat{
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
    height: 80%;
    overflow-y: auto;
    scroll-behavior: smooth
  }
  .messages p{
    border: 1px solid var(--main-color);
    margin: .2rem 0;
    width: fit-content;
    max-width: 15rem;
    padding: .5rem;
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
  }

  .messageText{
    border-top: 1px solid var(--main-color);
    height: 10%;
  }
  .messageText input{
    width: 100%;
    border: none;
  }
  .messageText input:focus-visible{
    outline:none
  }

  .btn-sendMessage{
    background-color: white;
    border: none;
    background-color: #f3f3f3;
  }
  .btn-sendMessage i:hover{
    color: var(--main-color);
  }
</style>

<div id="chatContainer" class="row chat-container minimize-chat">
  <div class="chat col-3">

    <div class="header-chat d-flex justify-content-between align-items-center">
      {#if user2}
        <h6 style="color: #fff;">{user2.name}</h6>
      {/if}
      <div class="chat-controller">
        <i id="arrow" class="fas fa-arrow-up px-1 rotate" on:click={pickUpTab}></i>
        <i id="closeChat" class="fas fa-times "></i>
      </div>
    </div>

    <div id="messagesContainer" class="messages p-3  d-flex flex-column">
      {#if groupId}
          {#each $chats as message}
            {#if message.sentBy !== user1.name}
              <p class="friend">{message.messageText}</p>
            {:else}
              <p class="me">{message.messageText}</p>
            {/if}
          {/each}
      {:else}
        <!-- <p class="empty-chat">Do you want start a new conversation with this person?</p>
        <button class="btn-empty-chat btn-start" on:click={}>Yes</button>
        <button class="btn-empty-chat">No</button> -->
      {/if}
    </div>

    <div class="messageText d-flex">
      <input id="inputMessage" type="text" placeholder="write a message" autocomplete="off" on:keyup={sendMessage}>
      <button id="btnSentMessage" class="btn-sendMessage" on:click={sendMessage}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</div>