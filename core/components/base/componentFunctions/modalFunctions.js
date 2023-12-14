import { getParent, isset } from "../../../component_f.js";

export function openModal(obj, e, id) {
    isset(e)?e.preventDefault():"";
    let modal = document.getElementById(id);
    modal.classList.toggle("hidden");

}
export function closeModal(obj, e, level) {
    let modal = getParent(obj, level);
    modal.classList.toggle("hidden");

}
