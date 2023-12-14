import { config } from "./config.js";
import ui from "./ui.js";



export function definePropsFromElement(obj) {
    if (obj.attributes != undefined) {
        var swi_ = {};
        var oa = obj.attributes;
        for (const attr_index in oa) {
            if (isset(oa[attr_index].value)) {
                swi_[oa[attr_index].name] = oa[attr_index].value;
            }
        }
        return swi_;
    } else {
        return obj;
    }

}

export function register(selector, actions) {
    if (document.readyState == "complete") {
        try {
            apply(selector, actions);
        } catch (e) {

        }
    }
}
export function activeSliderControl(obj) {
    let silderControlActive = document.querySelector(".slider-control-active");
    if (isset(silderControlActive)) {
        toggleSliderControlClasses(silderControlActive)
    }
    toggleSliderControlClasses(obj)

}

export function toggleSliderControlClasses(obj) {
    obj.classList.toggle("border-2");
    obj.classList.toggle("border-primary-100");
    obj.classList.toggle("text-primary-100");
    obj.classList.toggle("slider-control-active");
}

export function slide(control, e) {
    e.preventDefault()
    let sliders = document.querySelectorAll("." + control.getAttribute("slider"));
    let margin = 100 * parseInt(control.getAttribute("target"));
    // slider.setAttribute("s")
    console.log(sliders)
    sliders.forEach(slider => {
        slider.style.marginLeft = "-" + margin + "%";

    });
}
/**
 * 
 * @returns 
 */

export function defineWidth(width) {
    if (isset(width)) {
        switch (width) {
            case "xs":
                return "py-1 px-2 text-xs ";
            case "sm":
                return "py-1.5 px-2.5 text-sm";
            case "lg":
                return "py-2 px-3 text-lg";
            case "xl":
                return "py-2.5 px-3.5 text-xl";
            case "none":
                return "";
            default:
                break;
        }
    }
    return "py-1 px-2 text-sm ";
}

export function defineTextWidth(width) {
    if (isset(width)) {
        switch (width) {
            case "xs":
                return "text-xs";
            case "sm":
                return "text-sm";
            case "lg":
                return "text-lg";
            case "xl":
                return "text-xl";
            default:
                break;
        }
    }
    return "text-sm";
}
export function defineIconWidth(width = null) {
    if (isset(width)) {
        switch (width) {
            case "xs":
                return 14;
            case "sm":
                return 18;
            case "lg":
                return 22;
            case "xl":
                return 26;
            default:
                break;
        }
    }
    return 14;
}
function apply(selector, actions) {
    let Dom = new ui();

    let elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        try {
            element.replaceWith(Dom.createElementFromStructure(actions(element)));

        } catch (error) {
            console.log(error);
        }

    })
}

export function childNodes(element) {
    let childNodes = element.childNodes;
    let childNodesWithoutText = []
    for (let index = 0; index < childNodes.length; index++) {
        if (childNodes[index].nodeType != 3 && childNodes[index].nodeType != 8) {
            childNodesWithoutText.push(childNodes[index]);
        } else {
            if (childNodes[index].nodeType == 3 && !isEmpty(childNodes[index].nodeValue)) {
                childNodesWithoutText.push(childNodes[index]);

            }
        }

    }
    return childNodesWithoutText;
}

export function toggleClasses(obj, selectors = []) {
    selectors.forEach(selector => {
        obj.classList.toggle(selector);
    });
}
export function displayTarget(obj, e, target) {
    let hTarget = document.querySelectorAll("." + target);
    hTarget.forEach(target => {
        if (isset(target)) {
            target.classList.toggle("hidden");
        }
    });

}

export function emit(obj, eventName, params = {}) {
    const event = new CustomEvent(eventName, params)
}

export function isset(el) {
    return (el != undefined && el != null) ? true : false;
}
export function reloadIcons() {
    lucide.createIcons();

}

export function isEmpty(string) {
    return (string == "" || string == "\n" || string == "\n        ") ? true : false;
}
export function getParent(obj, level, result = []) {
    if (level > 0) {
        getParent(obj.parentNode, level - 1, result);
    } else {
        result.push(obj)
    }
    return result[0];
}
export function urlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return urlParams;
}

export function url(url = null) {
    return config.baseUrl + (url ?? '');
}
export function hostUrl(url = null) {
    return config.hostUrl + (url ?? '');
}
export function userId() {
    let oider = document.getElementById("oider");

    return isset(oider) ? parseInt(oider.getAttribute("uid")) : null;
}
export function schoolId() {
    let oeider = document.getElementById("oeider");
    return isset(oeider) ? parseInt(oeider.getAttribute("eid")) : null;
}