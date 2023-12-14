import Component from "../../../component.js";
import { isEmpty, isset } from "../../../component_f.js";
import { metamorphItem } from "../../base/metamorphItem/metamorphItem.js";
import badge from "../../base/utilities/badge.js";

export class miCourse extends metamorphItem {
    constructor(miCourse) {
        super(miCourse);
    }

    init(miCourse) {
        super.init(miCourse);
        this.struture();
    }
    struture() {
        this.get_child("content").attributes.class = isset(this.properties.vertical) ? "w-full space-y-5" : "lg:flex w-full lg:space-x-2 space-y-2 lg:space-0";
        this.get_child("content").add_child(this.left(), "left");
        if (isset(this.properties.badge)) {
            this.get_child("content").add_child(this.right(), "right");

        }
        isset(this.properties.vertical) ? this.add_class("space-y-5") : "";

    }
    right() {
        let right = new Component({
            name: "div",
            attributes: { class: "" },
            html: {
                badge: new badge({ type: this.properties.type ?? "", label: this.properties.badge ?? "" }),
            }
        });

        if (isset(this.properties.vertical)) {
            right.add_class("flex");
            right.get_child("badge").add_class("mx-auto");
        }

        return right;
    }
    left() {
        let boxClass = !isset(this.properties.vertical) ? "space-x-2 flex " : "flex flex-wrap"
        let left = new Component({
            name: "div",
            attributes: {
                class: "content  lg:mr-auto"
            },
        })

        if (isset(this.properties.subject) || isset(this.properties.author)) {
            left.add_child(
                this.biLine(
                    {
                        left: { text: this.properties.subject ?? "" },
                        middle: { text: this.properties.speciality ?? "", color: "dark:text-white" },
                        right: { text: this.properties.author ?? "", color: "text-primary-100" }
                    }
                ), "tea");
        }
        if (isset(this.properties.date) || isset(this.properties.hour)) {
            left.add_child(
                this.biLine(
                    {
                        left: { text: this.properties.date ?? "", color: "dark:text-white" },
                        middle: { text: this.properties.start ?? "", color: "dark:text-white" },
                        right: { text: this.properties.hour ?? "", color: "text-primary-100 dark:text-white" }
                    }
                ), "date");
        }
        if (isset(this.properties.location) || isset(this.properties.room)) {
            left.add_child(
                this.biLine(
                    {
                        left: { text: this.properties.location ?? "" },
                        right: { text: this.properties.room ?? "", color: "text-primary-100 dark:text-white" }
                    }
                ), "location");
        }
        return left;
    }
    biLine(infos = {}) {
        let boxClass = !isset(this.properties.vertical) ? "space-x-2 flex " : "flex flex-wrap"

        let biLine = new Component({
            name: "div",
            attributes: { class: boxClass },
            html: {
                container: new Component({
                    name: "div",
                    attributes: {
                        class: isset(this.properties.vertical) ? "mx-auto flex space-x-2 " : "flex space-x-2"
                    }
                })
            }
        })

        if (isset(infos.left)) {
            biLine.get_child("container").add_child(this.biLineItem(infos.left));
        }
        if (isset(infos.middle)) {
            biLine.get_child("container").add_child(this.biLineItem(infos.middle));
        }
        if (isset(infos.right)) {
            biLine.get_child("container").add_child(this.biLineItem(infos.right));
        }
        return biLine;
    }
    biLineItem(iInfos = {}) {
        return new Component(
            {
                name: "span",
                attributes: {
                    class: (iInfos.color ?? " text-slate-500") + (isEmpty(iInfos.text) ? " hidden" : "")
                },
                text: iInfos.text ?? ""
            });
    }
}