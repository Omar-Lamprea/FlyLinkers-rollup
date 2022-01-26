<script>
  import UserPotho from './UserPhoto.svelte'
  import Modal from '../Modal.svelte'

  export let name, last_name, title, email , photo, id, aboutMe, urlAPI;
  export let userMain;

  const editDescription = ()=>{
    editAboutMe.classList.toggle('d-none')
  }

  let dataDescription;

  const valueTextArea = (e) =>{
    dataDescription = e.target.value
  }

  const updateDescription = async () =>{
     const response = await fetch(`${urlAPI}/user/profile/?user=${id}`,{
       method : 'PUT',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        about: dataDescription
      })
     })
     const content = response.json()
     if (content) {
      userDescription.textContent = dataDescription
      editAboutMe.classList.toggle('d-none')
     }
  }


  let friend = false;
  let friendRequest = false
  const searchFriends = async ()=>{
    const response = await fetch(`${urlAPI}/friend/user/?user=${userMain}`)
    const content = await response.json()
    content.forEach(el => {
      if (el.id === id) {
        friend = true
      }
    });

    const getfriendRequest = await fetch(`${urlAPI}/friend/request/?user_id=${id}`)
    const requests = await getfriendRequest.json()
    requests.forEach(el =>{
      if (el.id === userMain) {
        friendRequest = true
      }
    })
  }

  const sendFriendRequest = async()=>{
    const response = await fetch(`${urlAPI}/friend/request/`,{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        sender_id: userMain,
	      receptor_id: id
      })
    })
    const content = await response.json()
    console.log(content);
    if (content.Detail === 'OK') {
      btnSendFriendRequest.textContent = "request sent"
      btnSendFriendRequest.setAttribute('disabled','')
    }
  }
</script>

<style>
  .Profile-card{
    padding-bottom: 0;
  }
  .Profile-card-info {
    width: 100%;
  }
  .Profile-card-info span {
    font-size: 18px;
    font-weight: normal;
  }
  .Profile-card-info p{
    font-size: 14px;
  }
  .Profile-card-info p span{
    color: var(--main-color);
    font-size: inherit;
    font-weight: bold;
  }
  .Profile-card-user{
    color: var(--main-color);
  }
  .Profile-card-user h2{
    font-size: 18px;
  }

  .Profile-description i{
    color: var(--main-color);
  }
  .Profile-description .edit-description{
    cursor: pointer;
    width: max-content;
  }

  .Profile-card-text i, .Profile-card-text span{
    color: var(--main-color);
    font-weight: bold;
  }
  .Profile-card-text{
    margin: 2rem 0;
  }
  
  .btn-outline-primary:disabled{
    color: gray;
    border: 1px solid grey;
  }

</style>
<div class="UserDetails Default-containers mt-3">
  <div class="row">
    <div class="col-6">

      <div class="Profile-card">
        <div class="Profile-card-content d-flex flex-column">
          <UserPotho {photo} {urlAPI}/>
          <div class="Profile-card-info mt-2">
            <div class="Profile-card-user">
              <h2>{name} {last_name}</h2>
              <span>{title}</span>
              <!-- <p>Colombia</p> -->
            </div>
            <div class="Profile-description my-3">
              {#if email === localStorage.getItem('user')}
                <p class="edit-description" on:click={editDescription}>
                  <i class="fas fa-pen"></i>
                  About me...
                </p>
              {/if}
              <div class="Profile-description-text my-2">
                {#if aboutMe}
                  <p id="userDescription">{aboutMe}</p>
                {/if}
                <div id="editAboutMe" class="d-none d-flex flex-column">
                  <textarea name="" id="textArea" on:keyup={valueTextArea} cols="30" rows="3" style="width: 100%;" value={aboutMe}></textarea>
                  <button class="btn btn-outline-primary btn-flylinkers m-0 d-flex align-self-end" on:click={updateDescription}>Update</button>
                </div>
              </div>
              <div class="Profile-description-contact">
                <p>Email</p>
                <p style="color: var(--main-color); cursor:pointer">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="Profile-card-text text-end d-flex flex-column align-items-end">
        {#if email === localStorage.getItem('user')}
          <p type="button" class="mb-3" data-bs-toggle="modal" data-bs-target="#editProfile"><i class="fas fa-pen"></i> Edit profile</p>
          <Modal {id} {urlAPI}/>

          <div class="Profile-card-statistics">
            <p>Who viewed your profile-card <span>3.8K</span></p> 
            <p>Views of your post <span>3.8K</span></p> 
          </div>
          <div class="Profile-card-buttons mt-5">
            <button class="btn btn-outline-primary btn-flylinkers"><i class="fas fa-pen"></i> I have interest in...</button>
            <button class="btn btn-outline-primary btn-flylinkers">Add selection</button>
          </div>
        {:else}
          <div class="d-none" on:load={searchFriends()}></div>
          {#if !friend}
            {#if friendRequest}
              <button id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1" disabled>Send friend request</button>
              {:else}
                <button id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1" on:click={sendFriendRequest}>Send friend request</button>
            {/if}
          {:else}
            <button class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Friends</button>
          {/if}
          <button id="btInitChat" data-chat={id} class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Send a Message</button>
        {/if}
      </div>
    </div>
  </div>
</div>