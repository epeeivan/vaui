import Component from "../../../component.js";
import { isset } from "../../../component_f.js";
import card from "../../base/cards/card.js";

export default class cardDetails extends card {
    constructor(card) {
        super(card);
        this.get_child("body").add_child(
            new Component({
                name: "div",
                attributes: {
                    class: "space-y-5 w-full" + (isset(this.properties["large-img"]) ? "" : "p-5")
                }
            })
            , "content")



        if (isset(this.properties["large-img"])) {
            this.get_child("body").get_child("content").add_child(this.cover(), "cover")
        }else{
            isset(this.properties.src) ? this.get_child("body").get_child("content").add_child(this.image(), "image") : null;

        }
        this.get_child("body").get_child("content").add_child(new Component({ name: "div" }), "title_box");
        isset(this.properties.title) ? this.get_child("body").get_child("content").get_child("title_box").add_child(this.title(this.properties.title), "title") : null;
        isset(this.properties["sub-title"]) ? this.get_child("body").get_child("content").get_child("title_box").add_child(this.subTitle(this.properties["sub-title"]), "subtitle") : null;
        isset(this.properties.description) ? this.get_child("body").get_child("content").add_child(this.description(this.properties.description), "description") : null;
        this.get_child("body").get_child("content").add_child(this.actions(), "actions")
        this.html.header = { name: "span" };
    }

    image() {
        return new Component({
            name: "img",
            attributes: {
                class: this.properties["large-img"] ? "w-full rounded-2xl min-h-[200px]" : "max-h-[100px] ",
                src: this.properties.src,
                alt: this.properties.alt
            }
        })
    }
    cover() {
        return new Component({
            name: "div",
            attributes: {
                class: "w-full bg-cover bg-center rounded-2xl min-h-[200px] max-h-[200px]",
                style: "background-image:url(" + this.properties.src + ");",
            }
        })
    }
    title(text) {
        return new Component({
            name: "h1",
            attributes: {
                class: "text-2xl font-black uppercase text-yellow-600"
            },
            text: text
        })
    }
    subTitle(text) {
        let subTitle = this.title(text);
        subTitle.name = "p";
        subTitle.attributes.class = "font-lighter uppercase text-secondary-500";
        return subTitle;
    }
    description(text) {
        let description = this.subTitle(text);
        description.attributes.class = "text-white text-sm font-light";
        return description;
    }
    actions() {
        let actions = new Component({
            name: "div",
            attributes: {
                class: "space-x-3 flex"
            }
        })
        return actions;

        // iss
    }
}