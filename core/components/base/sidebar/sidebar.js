import Component from "../../../component.js";
import { childNodes, definePropsFromElement, isset } from "../../../component_f.js";
import sidebarItem from "./sidebarItem.js";


export default class siderbar extends Component {
    constructor(sidebar) {
        super();
        this.properties = definePropsFromElement(sidebar);
        this.name = "nav"
        this.attributes = {
            class: "transition-allease-in duration-100 lg:max-w-[250px] absolute block lg:relative dark:bg-dark-100  lg:ml-0 -ml-[100%]  z-40 lg:min-w-[250px] w-full h-full px-3 py-5 ease-linear flex flex-wrap" + (this.properties.class ?? ""),
            id: this.properties.id ?? ""
        }
        // 
        isset(this.properties.bordered) ? this.add_class("border-r-2") : null;
        // 
        this.add_child(new Component({
            name: "ul",
            attributes: {
                class: "w-full space-y-2"
            }
        }), "top")

        // this.get_child("top").add_child(new sidebarItem({ text: this.properties["app-name"] ?? "", first: "", logo: this.properties.logo ?? "" }));


        let sidebarItems = childNodes(sidebar);
        sidebarItems.forEach(sideItem => {
            if (sideItem.nodeName != "#text") {
                if (isset(sideItem.attributes.bottom)) {
                    if (!isset(this.html.bottom)) {
                        this.add_child(new Component({
                            name: "ul",
                            attributes: {
                                class: "mt-auto w-full"
                            }
                        }), "bottom")
                    }
                    this.get_child("bottom").add_child(new sidebarItem(sideItem));

                } else {
                    this.get_child("top").add_child(new sidebarItem(sideItem));
                }
            }

        });

        // this.last_child().add_child(new Co);
    }
}