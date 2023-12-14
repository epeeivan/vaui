import { childNodes, isEmpty, isset } from "../../../component_f.js";
import { changeApparance } from "../table/tableLine.js";



export function showContextMenu() {

}
export function hideContextMenu() {
    let contextMenu = document.querySelector(".context-menu.open");
    isset(contextMenu) ? contextMenu.classList.add("hidden") : '';
}

export function hideCustomContextMenu() {
    document.addEventListener("click", (e) => {
        hideContextMenu();

    })
}
export function hideCustomContextMenuOnScroll() {

}
export function moveContextMenu(obj, e, context_param) {
    e.preventDefault()
    let contextMenu = obj.querySelector('.context-menu');
    contextMenu.classList.remove('hidden')
    contextMenu.classList.add('open')
    console.log(e);
    contextMenu.style.left = e.layerX + "px";
    contextMenu.style.top = (e.layerY + 60) + "px";

    if (isset(context_param)) {
        contextMenu.querySelectorAll("a").forEach(link => {
            let href = link.getAttribute("href"), defaultHref = link.getAttribute("default-href");

            if (link.hasAttribute("href") && !isEmpty(href)) {
                if (link.hasAttribute("default-href")) {
                    link.setAttribute("href", defaultHref + (defaultHref.indexOf("?") == -1 ? "?" : "&") + context_param)

                } else {
                    link.setAttribute("default-href", href);

                    link.setAttribute("href", href + (href.indexOf("?") == -1 ? "?" : "&") + context_param)
                }
            }
        });
    }

}
export function randomColor() {

    return Math.floor(Math.random() * 16777215).toString(16);
}
export function randomRgbColor() {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
export function convertToRGB(code) {
    if (code.length != 6) {
        console.log("Only six-digit hex colors are allowed.");
    }

    var aRgbHex = code.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return "rgba(" + aRgb.join(",") + ")";
}
export function getTextColorFromBackground(rgba) {
    rgba = rgba.match(/\d+/g);
    if ((rgba[0] * 0.299) + (rgba[1] * 0.587) + (rgba[2] * 0.114) > 186) {
        return 'black';
    } else {
        return 'white';
    }
}