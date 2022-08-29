<script>
  export let id, urlAPI;
  import { closeModal } from "../../js/closeModals";
  import { deleteFirebaseAccount } from "../../js/firebase/config";
  import Loader from "../Loader.svelte";
  let sizeLoader = {
    size : "35px",
    left : "70px",
    top : "20px",
    height: "40px"
  }

  const closeAccount = async () =>{
    console.log('chao');
    const loader = document.getElementById(`reportLoader-${id}`)
    const check = document.getElementById(`icon-check-${id}`)

    // console.log('enviando');
    loader.classList.remove('d-none')

    const response = await fetch(`${urlAPI}/user/delete/`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "user_id": id
      })
    })

    const content = await response.json()

    if (response.ok){
      console.log(content);
      loader.classList.add('d-none')
      check.classList.remove('d-none')

      //eliminar de firebase
      
      setTimeout(async () => {
        closeModal(`deleteAccount${id}`)
        check.classList.add('d-none')
        localStorage.clear()
        await deleteFirebaseAccount(id)
        window.location.reload()
      }, 1000);
    }else{
      console.log(content);
    }
  }


</script>

<style>
  .icon-check-report{
    font-size: 2rem;
    color: var(--main-color);
  }
</style>

<div class="modal fade" id="deleteAccount{id}" tabindex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 data-translate="modal-delete-account-title" class="modal-title" id="deleteAccountLabel">Report post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="mb-2" data-translate="modal-delete-account-body">¿Estás seguro de enviar un reporte de esta publicación?</p>
      </div>
      <div class="modal-footer">
        <div id="reportLoader-{id}" class="m-0 d-none">
          <Loader {sizeLoader}/>
        </div>
        <i id="icon-check-{id}" class="me-3 fa-solid fa-circle-check icon-check-report d-none"></i>
        <button data-translate="modal-delete-xp-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button data-translate="delete" type="button" class="btn btn-danger" on:click={closeAccount}>Enviar</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal -->
<!-- <div class="modal fade" id="deleteAccount{id}" tabindex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 data-translate="modal-report-post-title" class="modal-title" id="deleteAccountLabel">Report post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="mb-2">¿Cuál es el motivo de tu reporte?</p>
        <div class="report-check">
          <label><input type="checkbox" id="spam" name="reportPostList"/><span class="mx-2">Es spam</span></label>
          <label><input type="checkbox" id="info-false" name="reportPostList"/><span class="mx-2">Contiene información falsa</span></label>
          <label><input type="checkbox" id="bullying" name="reportPostList"/><span class="mx-2">Acoso o insitación al odio</span></label>
          <label><input type="checkbox" id="violence" name="reportPostList"/><span class="mx-2">Violencia o agresión física</span></label>
          <label><input type="checkbox" id="adult" name="reportPostList"/><span class="mx-2">Contenido para adultos</span></label>
          <label><input type="checkbox" id="Copyright" name="reportPostList"/><span class="mx-2">Infringe derechos de autor o propiedad intelectual</span></label>
        </div>
      </div>
      <div class="modal-footer">
        <button data-translate="modal-delete-xp-btn-close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button tton data-translate="modal-delete-xp-btn-del" type="button" class="btn btn-danger" data-bs-dismiss="modal">Enviar</button>
      </div>
    </div>
  </div>
</div> -->