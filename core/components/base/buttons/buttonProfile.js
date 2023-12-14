import button from "./button.js";

export class buttonProfile extends button{
    constructor(buttonProfile){
        super(buttonProfile);
        this.events = {
            click:[showProfileOrEdit],
        }
    }
}

function showProfileOrEdit(obj,e){
    if(obj.getAttribute("id") == "showProfile"){
        if (document.querySelector(".blockSkills").classList.contains("hidden")) {
            document.querySelector(".blockSkills").classList.toggle("hidden") 
            document.querySelector(".blockEditProfile").classList.toggle("hidden");
            
        }

    }else{
        if (document.querySelector(".blockEditProfile").classList.contains("hidden")) {
            document.querySelector(".blockSkills").classList.toggle("hidden") 
            document.querySelector(".blockEditProfile").classList.toggle("hidden");
            
        }   
    }

}