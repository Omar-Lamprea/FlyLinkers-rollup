<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import UserPotho from './UserPhoto.svelte'
  import CoverPhotoModal from '../Modals/CoverPhotoModal.svelte'
  import ProfilePhotoModal from '../Modals/ProfilePhotoModal.svelte'
  import {friendsRequestFirebase} from '../../js/firebase/friendsRequestFirebase'
  import {addFriend, declineFriend} from '../../js/friendRequests'

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
      if (el.id === parseInt(userMain)) {
        friendRequest = true
      }
    })

    const getMyFriendsRequest = await fetch(`${urlAPI}/friend/request/?user_id=${userMain}`)
    const requestsFriend = await getMyFriendsRequest.json()
    requestsFriend.forEach(el =>{
      if (el.id === id) {
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

      const getUserData = await fetch(`${urlAPI}/user/create/?id=${userMain}`)
      const contentUserDate = await getUserData.json()

      const template = {
        sender_id : parseInt(userMain),
        name: `${contentUserDate[0].name} ${contentUserDate[0].last_name}`,
        photo: contentUserDate[0].photo,
        email: contentUserDate[0].email,
        create_at: new Date(),
        seen: false
      }
      friendsRequestFirebase(template, id)
    }
  }

  const acceptRequest = () =>{
    addFriend(urlAPI, id.toString(), userMain, email)
  }

  const declineRequest = async () =>{
    let response = await declineFriend(urlAPI, id.toString(), userMain, email)
    if (response) {
      friendRequest = false
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

  .disabled i{
    color: gray;
  }

  .accept-friend{
    color: var(--main-color);
  }
  .accept-friend:hover{
    color: #fff;
    background-color: var(--main-color);
  }

  .decline-friend{
    color: #d70000;
    border-color: #d70000;
  }
  .decline-friend:hover{
    color: #fff;
    background-color: #d70000;
  }

</style>
<div class="UserDetails Default-containers mt-3">
  <div class="row">
    <div class="col-12 col-lg-6">

      <div class="Profile-card">
        <div class="Profile-card-content d-flex flex-column">
          <UserPotho {photo} {urlAPI} {id}/>
          <div class="Profile-card-info mt-2">
            <div class="Profile-card-user p-3 p-md-0">
              <h2>{name} {last_name}</h2>
              <span>{title}</span>
              <!-- <p>Colombia</p> -->
            </div>
            <div class="Profile-description px-3 px-md-0 my-3">
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
    <div class="col-12 col-lg-6">
      <div class="Profile-card-text text-end d-flex flex-column align-items-end mt-0 mt-md-3 px-3 px-md-0">
        {#if email === localStorage.getItem('user')}
        <a href="/settings" use:link use:active>
          <p type="button" class="mb-3" style="color:rgba(38, 38, 38, 07)"><i class="fas fa-pen"></i> Edit profile</p>
        </a>
          <CoverPhotoModal {id} {urlAPI}/>
          <ProfilePhotoModal {id} {urlAPI}/>

          <div class="Profile-card-statistics">
            <p>Who viewed your profile-card <span>3.8K</span></p> 
            <p>Views of your post <span>3.8K</span></p> 
          </div>
          <div class="Profile-card-buttons mt-5">
            <button class="btn btn-outline-primary btn-flylinkers disabled" disabled><i class="fas fa-pen"></i> I have interest in...</button>
            <button class="btn btn-outline-primary btn-flylinkers disabled" disabled>Add selection</button>
          </div>
        {:else}
          <div class="d-none" on:load={searchFriends()}></div>
          {#if !friend}
            {#if friendRequest}
            <div class="btn-friend-request mb-3">
              <button id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1 accept-friend" on:click={acceptRequest}>Accept friends request</button>
              <button id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1 decline-friend" on:click={declineRequest}>Decline friend request</button>
            </div>
              {:else}
                <button id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1" on:click={sendFriendRequest}>Send friend request</button>
            {/if}
          {:else}
            <button class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Friends</button>
          {/if}
          <button id="btInitChat" data-chat={id} class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Send a message</button>
        {/if}
      </div>
    </div>
  </div>
</div>