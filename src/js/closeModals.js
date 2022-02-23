export function closeUpdateModal(id){
  $(`#modalUpdateExperience${id}`).modal('hide');
}

export function closeModal(id){
  $(`#${id}`).modal('hide');
}

export function openModal(id){
  $(`#${id}`).modal('show');
}