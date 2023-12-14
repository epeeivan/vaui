import button from "../buttons/button.js";
import { modal } from "./modal.js";

export class modalConfirm extends modal {
    constructor(modalConfirm) {
        super(modalConfirm);
    }
    footer() {
        let footer = super.footer();
        footer.get_child("buttonsContainer").attributes.class = "flex space-x-2 ml-auto"
        footer.get_child("buttonsContainer").add_child(
            new button(
                {
                    color: "danger",
                    class:"confirm",
                    icon:this.properties["accept-button-icon"]??null,
                    text: this.properties["accept-button"]??"no",
                }
            ), "acceptButton"
        );
        return footer;
    }
}