

//requests
import { isset, reloadIcons, url } from "./component_f.js";
import { hideCustomContextMenu, hideCustomContextMenuOnScroll } from "./components/base/contextMenu/contextMenu_f.js";
import { catchSubmit } from "./formsubmitter/formSubmitter.js";
import xhr from "./formsubmitter/xhr.js";
import { htmlToComponent } from "./htmlToComponent.js";
import { loadChartDatas } from "./requests/chart.js";
import { connectSelectLoaders } from "./requests/form.js";
import { connectPicCropper } from "./requests/picCropper.js";
import ui from "./ui.js";

let Dom = new ui;
let deleteUrl = "";



document.addEventListener('readystatechange', () => {
    if (document.readyState == 'complete') {
        let page = document.querySelector(".page");
        htmlToComponent(page);
        fadeBody()
        page.replaceWith(Dom.createElementFromStructure(htmlToComponent(page)));
        hideCustomContextMenu();
        hideCustomContextMenuOnScroll()
        //
        let menuClosers = document.querySelectorAll(".menu-closer");
        let menu = document.getElementById("main-menu");
        menuClosers.forEach(closer => {
            closer.addEventListener("click", () => {
                menu.classList.toggle("hidden")
            })
        });
        hideCustomContextMenu();
        catchSubmit();
        connect_dash_chart_filters_form_triggers();
        let chartFilters = document.querySelector(".dash_chart_filters_form");
        if (isset(chartFilters)) {
            loadChartDatas(document.querySelector(".dash_chart_filters_form"));
        }
        connectDeleteTriggers();
        connectConfirmDeleteTrigger()
        connectSelectLoaders();
        connectPicCropper();
        // lucide.createIcons();
        

    }
})
function connectDeleteTriggers() {
    let deleteTriggers = document.querySelectorAll(".delete-trigger");
    deleteTriggers.forEach(deleteTrigger => {
        deleteTrigger.addEventListener("click", () => {
            deleteUrl = deleteTrigger.getAttribute("href").split("&")[0];
        })
    });
}
function connectConfirmDeleteTrigger() {
    let confirm_delete = document.querySelector(".confirm-delete");
    if (isset(confirm_delete)) {
        confirm_delete.addEventListener("click", () => {
            let checkers = document.querySelectorAll("table .tableLine input");
            let toDelete = "";
            checkers.forEach(checker => {
                toDelete += (checker.checked ? checker.value + "," : "");
            });

            console.log(toDelete);
            console.log(deleteUrl);
            xhr({
                url: deleteUrl + "&id=" + toDelete,
                callback: (response) => {
                    console.log(response)
                    let event = new CustomEvent("reload_datatable", { "details": "nothing else" });
                    document.dispatchEvent(event);
                }
            })
        })
    }

}

document.addEventListener("content_loaded", (e) => {
    catchSubmit();
    reloadIcons();
    connectSelectLoaders();
    connect_dash_chart_filters_form_triggers();
    connectDeleteTriggers();
    connectPicCropper();

    let chart_filters = document.querySelector(".dash_chart_filters_form")
    if (isset(chart_filters)) {
        loadChartDatas(chart_filters);
    }
})
document.addEventListener("reload_dash_chart", (e) => {
    loadChartDatas(e.detail, true);
})
function fadeBody() {
    let opacity = 0
    var fade = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            document.querySelector("body").style.opacity = opacity;
        }

    }, 10);
}

function connect_dash_chart_filters_form_triggers() {
    let formSelects = document.querySelectorAll(".dash_chart_filters_form select");
    formSelects.forEach(select => {
        select.addEventListener("change", () => {
            let event = new CustomEvent("reload_dash_chart", { "detail": document.querySelector(".dash_chart_filters_form") });
            document.dispatchEvent(event);
        })
    });
}


