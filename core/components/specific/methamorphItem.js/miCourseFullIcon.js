import { miCourse } from "./miCourse.js";

export class miCourseFullIcon extends miCourse {
    constructor(miCourseF) {
        super(miCourseF);
    }
    init(miCourseF) {
        super.init(miCourseF);
        this.attributes.class = "bg-white dark:bg-dark-300 dark:border-dark-200 rounded-lg border-[1px] flex text-sm space-x-2";
        this.get_child("icon").attributes.class = "icon min-w-[100px] max-w-[100px] min-h-[100px]  rounded-l-lg flex bg-secondary-100/[0.2]";
        this.get_child("content").add_class("p-2 pl-0")
    }
}