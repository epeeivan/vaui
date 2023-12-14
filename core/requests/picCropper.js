import { isset } from "../component_f.js";
import { Dom } from "../ui.js";

let cropper = null;
export function connectPicCropper() {
    const picSelector = document.getElementById('pic_selector');
    if (isset(picSelector)) {
        picSelector.addEventListener("change", () => {
            let preview = document.querySelector("#profile_image .preview");

            if (isset(preview)) {
                preview.innerHTML = '';
                preview.append(Dom.createElementFromStructure({ name: 'img', attributes: { style: 'max-height:300px' } }));
                let img = document.querySelector("#profile_image .preview img");

                getImg(picSelector, img)

                cropper = new Cropper(img, {
                    aspectRatio: 2 / 2,
                    cropBoxResizable: false,
                    crop(event) {
                    },
                });

            }
        })
    }
}

export function getCroppedImage(formData = null, name = null, submitter = null) {
    cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob)
        if (isset(formData) && isset(name)) {
            // var urlCreator = window.URL || window.webkitURL;
            // blob.name = urlCreator.createObjectURL(blob);
            formData.append(name, blob, 'cropped.png');
            if (isset(submitter)) {
                submitter.callback(submitter.callBackParams.form, formData, submitter.callBackParams.callBack);
            }
        }
        // document.getElementById("settings_profile_image").src = urlCreator.createObjectURL(blob);

    })
}

function getImg(input, img) {
    const file = input.files[0]; // 0 = get the first file
    let url = window.URL.createObjectURL(file);
    img.src = url
}
