<script>
  import {getUser} from '../js/firebase/config.js'

  export let id;
  const pickUpTab = ()=>{
    chatContainer.classList.toggle('minimize-chat')
    if (chatContainer.className.includes('minimize-chat')) {
      arrow.classList.add('rotate')
    }else{
      arrow.classList.remove('rotate')
    }
  }

  const closeChat = ()=>{
    // const chatContainer = document.getElementById('chatContainer')
    // localStorage.removeItem('chat')
    // chatContainer.remove()
    // chatContainer.style.display = 'none'
  }

  let data;
  const getUserChat = async()=>{
    data = await getUser(id)
    console.log(data);
  }

  getUserChat()

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
  }
  .header-chat i{
    /* transform:rotate(180deg); */
    color:var(--main-color);
    cursor: pointer;
    transition: all ease-in .5s;
  }
  .rotate{
    transform:rotate(180deg);
    transition: all ease-in .5s;
  }


  .messages{
    height: 80%;
  }
  .messages p{
    border: 1px solid var(--main-color);
    margin: .2rem 0;
    width: max-content;
    padding: .2rem .5rem;
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
  }

  .messageText{
    border-top: 1px solid var(--main-color);
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
      {#if data}
        <h6>Chatting with {data.name}</h6>
      {/if}
      <div class="chat-controller">
        <i id="arrow" class="fas fa-arrow-up px-1 rotate" on:click={pickUpTab}></i>
        <i id="closeChat" class="fas fa-times " on:click={closeChat}></i>
      </div>
    </div>

    <div class="messages p-3 pb-0 d-flex flex-column">
      <p class="friend">hola!</p>
      <p class="friend">cómo estás</p>
      <p class="me">Super bien! =D</p>
    </div>

    <div class="messageText d-flex">
      <input type="text" placeholder="write a message">
      <button class="btn-sendMessage">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</div>