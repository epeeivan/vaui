import { isset } from "../../../component_f.js";

export function activeStep(obj, e, datas) {
    let stepper = document.querySelector("." + datas.stepper);
    if (isset(stepper)) {
        let steps = stepper.querySelectorAll("fieldset");
        if (isset(steps)) {
            if (isset(steps[datas.step])) {
                applyType(steps[datas.step], "active");

                if (datas.step > 0) {
                    applyType(steps[datas.step - 1], "complete");
                }
                if (isset(steps[parseInt(datas.step) + 1])) {
                    applyType(steps[parseInt(datas.step) + 1], "");
                }

            }
        }
    }
}
function applyType(step, type) {
    let legend = step.querySelector("legend");
    step.setAttribute("class", stepType(type).fieldset + (step.hasAttribute("dashed") ? "border-dashed" : ""));
    legend.setAttribute("class", stepType(type).legend + " " + definePosition(step.getAttribute("pos")));
}
function definePosition(pos) {
    switch (pos) {
        case "left":
            return "mr-auto";
        case "right":
            return "ml-auto";
        case "center":
            return "mx-auto";
    }
}
function stepType(type) {
    let base = "w-[50px] h-[50px] flex rounded-full ";
    let fBase = " w-full border-t-2 ";
    switch (type) {
        case "active":
            return { legend: base + "bg-primary-600 text-white", fieldset: " border-primary-600 " + fBase };
        case "complete":
            return { legend: base + "bg-success-600 text-white", fieldset: "border-success-600 " + fBase };

        case "danger":
            return { legend: base + "bg-danger-100 text-white", fieldset: "border-danger-100 " + fBase };

        default:
            return { legend: base + "bg-secondary-100/[0.5] text-secondary-100", fieldset: "border-secondary-100 " + fBase };

    }
    return "";
}