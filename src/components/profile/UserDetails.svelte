<script>
  import {link} from 'svelte-spa-router';
  import active from 'svelte-spa-router/active'
  import UserPotho from './UserPhoto.svelte'
  import CoverPhotoModal from '../Modals/profile/CoverPhotoModal.svelte'
  import ProfilePhotoModal from '../Modals/profile/ProfilePhotoModal.svelte'
  import {friendsRequestFirebase} from '../../js/firebase/friendsRequestFirebase'
  import {addFriend, declineFriend} from '../../js/friendRequests'
  import {onMount} from 'svelte'
  import ReportUserModal from '../Modals/ReportUserModal.svelte';

  export let name, last_name, title, email , photo, id, aboutMe, urlAPI, urlImages;
  let userMain = localStorage.getItem('userId');

  // console.log(userMain);
  const dataJson = JSON.parse(localStorage.getItem('data'))

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
    // console.log(id, dataJson.id);

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
      // console.log(el.id, parseInt(userMain));
      if (el.id === dataJson.id) {
        btnSendFriendRequest.setAttribute('disabled', '')
      }
      // if (el.id === id) {
      //   friendRequest = true
      // }
    })

    // console.log(userMain);
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
      if (localStorage.getItem('lang') === 'en') {
        btnSendFriendRequest.textContent = "Request sent"
      }else{
        btnSendFriendRequest.textContent = "Solicitud enviada"
      }
      btnSendFriendRequest.setAttribute('disabled','')

      const getUserData = await fetch(`${urlAPI}/user/create/?id=${userMain}`)
      const contentUserDate = await getUserData.json()

      const template = {
        sender_id : parseInt(userMain),
        name: `${contentUserDate[0].name} ${contentUserDate[0].last_name}`,
        photo: contentUserDate[0].photo,
        email: contentUserDate[0].username,
        create_at: new Date(),
        seen: false
      }
      friendsRequestFirebase(template, id)
    }
  }

  const acceptRequest = () =>{
    addFriend(urlAPI, id.toString(), userMain, localStorage.getItem('visitProfile'))
  }

  const declineRequest = async () =>{
    let response = await declineFriend(urlAPI, id.toString(), userMain, localStorage.getItem('visitProfile'))
    if (response) {
      friendRequest = false
    }
  }

  const reportUser =()=>{
    console.log('hiii');
  }

  onMount(()=>{
    if (id !== dataJson.id) {
      searchFriends()
    }

  })
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
    /* color: var(--main-color); */
    font-size: inherit;
    /* font-weight: bold; */
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

  .Profile-card-text i{
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

  .edit-profile-content{
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: end;
    margin: 1rem 0;
  }

  .report-user{
    background-color: transparent;
    border: none;
    width: fit-content;
    align-self: flex-end;
    padding: 0;
  }
  .report-user i{
    margin: 0 .5rem;
    color: #cb0719;
  }


</style>
<div class="UserDetails Default-containers mt-3">
  <div class="row">
    <div class="col-12 col-lg-6">

      <div class="Profile-card">
        <div class="Profile-card-content d-flex flex-column">
          <UserPotho {photo} {urlAPI} {urlImages} {id}/>
          <div class="Profile-card-info mt-2">
            <div class="Profile-card-user p-3 p-md-0 mt-4 mt-md-0">
              <h2>{name} {last_name}</h2>
              <span>{title}</span>
              <!-- <p>Colombia</p> -->  
            </div>
            <div class="Profile-description m-3 mx-md-0">
              {#if email === dataJson.email}
                <p class="edit-description" on:click={editDescription}>
                  <i class="fas fa-pen"></i>
                  <span data-translate="profile-about-me">About me...</span> 
                </p>
              {/if}
              <div class="Profile-description-text my-2">
                {#if aboutMe}
                  <p id="userDescription">{aboutMe}</p>
                {/if}
                <div id="editAboutMe" class="d-none d-flex flex-column">
                  <textarea name="" id="textArea" on:keyup={valueTextArea} cols="30" rows="3" style="width: 100%;" value={aboutMe}></textarea>
                  <button class="btn btn-outline-primary btn-flylinkers m-0 mt-1 d-flex align-self-end" on:click={updateDescription}>Update</button>
                </div>
              </div>
              <div class="Profile-description-contact">
                <p data-translate="profile-email">Email</p>
                <a href="mailto:{email}">
                  <p style="color: var(--main-color); cursor:pointer">{email}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div class="Profile-card-text text-end d-flex flex-column align-items-end mt-0 mt-md-3 px-3 px-md-0" style="height:100%">
        {#if id === dataJson.id}
        <div class="edit-profile-content d-flex flex-column">

          <a href="/network/{id}" class="d-flex mb-2 align-items-center text-center" use:link use:active>
            <i class="fa-solid fa-users"></i>
            <p class="text-center ms-1" style="color: rgb(38, 38, 38);;">Network</p>
          </a>

          <a href="/settings" use:link use:active>
            <p type="button" class="mb-3" style="color:rgba(38, 38, 38, 07)">
              <i class="fas fa-pen"></i>
              <span data-translate="edit-profile">Edit profile</span>
            </p>
          </a>
          <CoverPhotoModal {id} {urlAPI} {urlImages}/>
          <ProfilePhotoModal {id} {urlAPI} {urlImages}/>
        </div>

          
          <!-- <div class="Profile-card-buttons mt-5">
            <button class="btn btn-outline-primary btn-flylinkers disabled" disabled>
              <i class="fas fa-pen"></i>
              <span data-translate="profile-btn-interests">I have interest in...</span> 
            </button>
            <button data-translate="profile-btn-selection" class="btn mt-0 mt-lg-1 mt-xl-0 btn-outline-primary btn-flylinkers disabled" disabled>Add section</button>
          </div> -->
        {:else}
          <div class="d-flex flex-column justify-content-evenly" style="height: 100%;">
            <a href="/network/{id}" class="d-flex  justify-content-end align-items-center text-center" use:link use:active>
              <i class="fa-solid fa-users"></i>
              <p class="text-center ms-1" style="color: rgb(38, 38, 38);;">Network</p>
            </a>

            <button class="report-user d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#reportUserModal" on:click={reportUser}>
              <i class="fa-solid fa-flag"></i>
              Report user
            </button>

            <div class="btns-action-user d-flex flex-column">
              {#if !friend}
                {#if friendRequest}
                  <div class="btn-friend-request mb-3">
                    <button data-translate="btn-accept-request" id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1 accept-friend" on:click={acceptRequest}>Accept friends request</button>
                    <button data-translate="btn-deny-request" id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1 decline-friend" on:click={declineRequest}>Decline friend request</button>
                  </div>
                {:else}
                  <button data-translate="send-friend-request" id="btnSendFriendRequest" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1" on:click={sendFriendRequest}>Send friend request</button>
                {/if}
              {:else}
                <button data-translate="is-friend" class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Friends</button>
              {/if}
              <button data-translate="send-message" id="btInitChat-{id}" data-chat={id} class="btn btn-outline-primary btn-flylinkers align-self-end mt-1">Send a message</button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>


<ReportUserModal {id} {urlAPI}/>