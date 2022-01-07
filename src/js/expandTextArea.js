export default function expandTextArea(e){
  if (e.key === 'Enter') {
    e.target.rows ++
  }
}