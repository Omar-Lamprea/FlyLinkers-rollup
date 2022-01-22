<script>
  import {getUser, validateGroup , getMessages, newMessage, newGroup} from '../js/firebase/config.js'
  import Loader from '../components/Loader.svelte'

  export let id, userMain;
  console.log(id,userMain);

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
  let showMessages;
  let groupId;

  const getUserChat = async()=>{
    user1 =  await getUser(userMain)
    user2 = await getUser(id)
    groupId = validateGroup(user1, user2)

    if (groupId) {
      console.log(groupId);
      showMessages = await getMessages(groupId)
      console.log(showMessages);
    }else{
      console.log('no existe el grupo');
      // newGroup()
    }
  }

  getUserChat()


  const sendMessage = async (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        if (groupId) {
          newMessage(groupId, user1.name, e.target.value)


          



        }else{
          newGroup(user1, user2, e.target.value)
          getUserChat()
        }

        e.target.value = ''
        await getUserChat()

        scrollChat()

      }
    }
  }

  const scrollChat = () =>{
    const scrollWindow = document.getElementById('messagesContainer')
    scrollWindow.scrollTop = scrollWindow.scrollHeight - scrollWindow.clientHeight
  }

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
  .rotate{
    transform:rotate(180deg);
    transition: all ease-in .5s;
  }


  .messages{
    height: 80%;
    overflow-y: auto;
  }
  .messages p{
    border: 1px solid var(--main-color);
    margin: .2rem 0;
    width: fit-content;
    max-width: 13rem;
    padding: .5rem;
  }
  .empty-chat{
    border: 1px solid var(--main-color);
    margin: 0.2rem 0;
    width: 14rem;
    padding: 0.5rem;
    align-self: center;
    border-radius: 30px;
    text-align: center;
    background-color: #199aaf;
    color: #fefefe;
    font-weight: 500;
  }
  .btn-empty-chat{
    background-color: #d70000;
    color: #fff;
    border: none;
    margin: .25rem 2rem;
    border-radius: 50px;
    font-weight: bold;
  }
  .btn-start{
    background-color: #4f92ff;
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
        <h6 style="color: #fff;">Chatting with {user2.name}</h6>
      {/if}
      <div class="chat-controller">
        <i id="arrow" class="fas fa-arrow-up px-1 rotate" on:click={pickUpTab}></i>
        <i id="closeChat" class="fas fa-times "></i>
      </div>
    </div>

    <div id="messagesContainer" class="messages p-3  d-flex flex-column">
      {#if groupId}
        {#if showMessages}
          {#each showMessages as message}
            {#if message.sentBy === user2.name}
              <p class="friend">{message.messageText}</p>
            {:else}
              <p class="me">{message.messageText}</p>
            {/if}
          {/each}
        {:else}
          <Loader/>
        {/if}
      
      {:else}
        <!-- <p class="empty-chat">Do you want start a new conversation with this person?</p>
        <button class="btn-empty-chat btn-start" on:click={}>Yes</button>
        <button class="btn-empty-chat">No</button> -->
      {/if}


    </div>

    <div class="messageText d-flex">
      <input type="text" placeholder="write a message" on:keyup={sendMessage}>
      <button class="btn-sendMessage">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</div>