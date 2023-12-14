import { definePropsFromElement } from "../../../component_f.js";
import { modal } from "./modal.js";

export class opaque extends Component
{
    constructor(mod){
        super();
        this.name = "div";
        this.properties = definePropsFromElement(mod);
        this.attributes = {
            class:"h-screen w-screen bg-black/[0.2] flex"
        }
        this.add_child(new modal(mod),"modal");
    }
}