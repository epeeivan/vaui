import { isset, url } from "../component_f.js";
import Notif from "../notif/js/notif.js";
import { getCroppedImage } from "../requests/picCropper.js";
import ui from "../ui.js";
import xhr from "./xhr.js";
let notif = new Notif();
let Dom = new ui();
/**
 * 
 *
 * @param callback
 */
export function catchSubmit() {
    let forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!form.hasAttribute("no_request")) {
                buildAndSendFormRequest(form, showResponse);
            }
        })
    });
}
/**
 *
 * @param form
 * @param response
 */
function showResponse(form, response) {
    /* handle an eventually reload */
    console.log(response);
    if (JSON.parse(response).url != undefined) {
        window.location.href = JSON.parse(response).url;
    }
    /* handle the notification response */
    if (JSON.parse(response).message != undefined) {
        switch (JSON.parse(response).status) {
            case true:
                notif.notify("success", JSON.parse(response).message, Dom);
                break;
            case false:
                notif.notify("warning", JSON.parse(response).message, Dom);
                break;
            case undefined:
                notif.notify("danger", "bad response", Dom);
                break;
        }
    }

    /* reset the form after reauest success */
    if (JSON.parse(response) && isset(JSON.parse(response).status) && JSON.parse(response).status) {
        let event = new CustomEvent("reload_datatable", { "details": "nothing else" });
        document.dispatchEvent(event);
        // form.reset();
    }
}
/**
 *
 * @param form
 * @param callback
 */
function buildAndSendFormRequest(form, callback) {
    let formData = new FormData(form);

    let pic_selector = document.getElementById("pic_selector");

    if (isset(pic_selector)) {
        let pic_name = pic_selector.getAttribute("p_name");
        getCroppedImage(
            formData,
            pic_name,
            {
                callback: sendFormRequest,
                callBackParams: {
                    callBack:callback,
                    form:form
                }
            }
        );
    } else {
        sendFormRequest(form, formData, callback);
    }

    // formData.se
    //
    console.log(formData);

}

function sendFormRequest(form, formData, callback) {
    let method = form.getAttribute('method');
    let action = form.getAttribute('action');
    //
    xhr({
        method: method,
        url: url(action),
        async: true,
        data: formData,
        callback: (param) => {
            callback(form, param)
        }
    })
}
