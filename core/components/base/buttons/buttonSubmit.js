import button from "./button";

export default class buttonSubmit extends button{
    constructor(buttonSubmit){
        super(buttonSubmit);
        this.set_attribute("type","submit");
    }
}