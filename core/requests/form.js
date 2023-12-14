import { isset, url } from "../component_f.js";
import xhr from "../formsubmitter/xhr.js";

export function connectSelectLoaders() {
    loadOnChange(".customer_selector", ".customer_machines", { url: "machine/get/", value: "MACH_ID", text: "MACH_NAME", id: "ID" });
}

function loadOnChange(selector, selectsToFillSelector, infos) {
    let select = document.querySelector(selector);
    if (isset(select)) {
        select.addEventListener("change", (e) => {
            let selectsToFill = document.querySelectorAll(selectsToFillSelector);
            alert()
            xhr({
                url: url(infos.url) + "?" + infos.id + "=" + select.value + "&token=142386898564fdebd41311e",
                callback: (response) => {
                    let parsedResponse = JSON.parse(response);
                    if (isset(parsedResponse.data)) {
                        selectsToFill.forEach(selectToFill => {
                            selectToFill.innerHTML = "";
                            parsedResponse.data.forEach(line => {
                                let option = document.createElement("option");
                                option.setAttribute("value", line[infos.value]);
                                option.innerText = line[infos.text];
                                selectToFill.append(option);
                            });
                        });
                    }

                }
            })

        })
    }

}