import { register } from "./component_f.js";
import button from "./components/base/buttons/button.js";
import buttonDarkMode from "./components/base/buttons/buttonDarkMode.js";
import squareIcon from "./components/base/buttons/squareIcon.js";
import card from "./components/base/cards/card.js";
import cardCounter from "./components/base/cards/cardCounter.js";
import cardOverview from "./components/base/cards/cardOverview.js";
import cardTable from "./components/base/cards/cardTable.js";
import { dropdownButton } from "./components/base/dropdowns/dropdownButton.js";
import dropdownButtonIcon from "./components/base/dropdowns/dropdownButtonIcon.js";
import dropdownSearch from "./components/base/dropdowns/dropdownSearch.js";
import basicInputLabel from "./components/base/inputs/basicInputLabel.js";
import basicSelectLabel from "./components/base/inputs/basicSelectLabel.js";
import basicInput from "./components/base/inputs/basicinput.js";
import basicSelect from "./components/base/inputs/basicselect.js";
import { checkbox } from "./components/base/inputs/checkbox.js";
import customSelect from "./components/base/inputs/customSelect.js";
import customSelectLabel from "./components/base/inputs/customSelectLabel.js";
import customSelectMultiple from "./components/base/inputs/customSelectMultiple.js";
import customSelectMultipleLabel from "./components/base/inputs/customSelectMultipleLabel.js";
import { modal } from "./components/base/modal/modal.js";
import { modalContent } from "./components/base/modal/modalContent.js";
import { modalForm } from "./components/base/modal/modal_form.js";
import siderbar from "./components/base/sidebar/sidebar.js";
import { slider } from "./components/base/slider/slider.js";
import { sliderControl } from "./components/base/slider/sliderControl.js";
import { c_alert } from "./components/base/utilities/alert.js";
import badge from "./components/base/utilities/badge.js";
import divider from "./components/base/utilities/divider.js";
import link from "./components/base/utilities/link.js";
import { metamorphItem } from "./components/base/metamorphItem/metamorphItem.js";
import { title } from "./components/base/utilities/title.js";
import { miCourse } from "./components/specific/methamorphItem.js/miCourse.js";
import { miCourseFullIcon } from "./components/specific/methamorphItem.js/miCourseFullIcon.js";
import cardLine from "./components/base/cards/cardLine.js";
import { miItem } from "./components/specific/methamorphItem.js/miItem.js";
import { switcher } from "./components/base/utilities/switcher.js";
import textAreaLabel from "./components/base/inputs/textAreaLabel.js";
import { modalConfirm } from "./components/base/modal/modalConfirm.js";
import { miNotif } from "./components/specific/methamorphItem.js/miNotif.js";
import { stepper } from "./components/base/stepper/stepper.js";
import { cardTableRequester } from "./components/base/cards/cardTableRequester.js";
import { miCourseItem } from "./components/specific/methamorphItem.js/miCourseItem.js";
import cardImage from "./components/base/cards/cardImage.js";
import { genderBox } from "./components/base/utilities/genderBox.js";
import Tbut from "./components/base/buttons/Tbut.js";
import ProgressBar from "./components/base/progressbar/progressbar.js";
import InfiniteSlider from "./components/base/infiniteSlider/infiniteSlider.js";
import { InsControl } from "./components/base/infiniteSlider/InsControl.js";
import ListDetail from "./components/base/list/listDetail/listDetail.js";
import fileUploader from "./components/base/utilities/fileUploader.js";
import { spreadSheet } from "./components/base/table/spreadSheet.js";
import { basicPhoneNumberInput } from "./components/base/inputs/basicPhoneNumberInput.js";

export let Reg = {
    basic_input: (option) => {
        return new basicInput(option);
    },
    basic_input_label: (option) => {
        return new basicInputLabel(option);
    },
    checkbox: (option) => {
        return new checkbox(option);
    },
    basic_button: (but) => {
        return new button(but);
    },
    link: (but) => {
        return new link(but);
    },
    divider: (div) => {
        return new divider(div);
    },
    button_dark_mode: (but) => {
        return new buttonDarkMode(but);
    },
    badge: (but) => {
        return new badge(but);
    },
    basic_select: (sel) => {
        return new basicSelect(sel);
    },
    basic_select_label: (sel) => {
        return new basicSelectLabel(sel);
    },
    metamorph_item: (sel) => {
        return new metamorphItem(sel);
    },
    mi_course: (sel) => {
        return new miCourse(sel);
    },
    mi_course_item: (sel) => {
        return new miCourseItem(sel);
    },
    mi_course_full_icon: (sel) => {
        return new miCourseFullIcon(sel);
    },
    mi_item: (sel) => {
        return new miItem(sel);
    },
    mi_notif: (sel) => {
        return new miNotif(sel);
    },
    textarea_label: (sel) => {
        return new textAreaLabel(sel);
    },
    switcher: (sel) => {
        return new switcher(sel);
    },

    custom_select: (sel) => {
        return new customSelect(sel);
    },
    custom_select_label: (sel) => {
        return new customSelectLabel(sel);
    },
    custom_select_multiple: (sel) => {
        return new customSelectMultiple(sel);
    },
    custom_select_multiple_label: (sel) => {
        return new customSelectMultipleLabel(sel);
    },
    card: (but) => {
        return new card(but);
    },
    card_overview: (card_overview) => {
        return new cardOverview(card_overview);
    },
    card_counter: (card_counter) => {
        return new cardCounter(card_counter);
    },
    card_table: (card_counter) => {
        return new cardTable(card_counter);
    },
    card_table_requester: (ctr) => {
        return new cardTableRequester(ctr);
    },
    square_icon: (sqr) => {
        return new squareIcon(sqr);
    },
    dropdown_button_icon: (dbi) => {
        return new dropdownButtonIcon(dbi);
    },
    dropdown_button: (dbi) => {
        return new dropdownButton(dbi);
    },
    dropdown_search: (dbi) => {
        return new dropdownSearch(dbi);
    },
    title: (dbi) => {
        return new title(dbi);
    },
    slider: (dbi) => {
        return new slider(dbi);
    },
    slider_control: (dbi) => {
        return new sliderControl(dbi);
    },
    alert: (dbi) => {
        return new c_alert(dbi);
    },
    modal: (dbi) => {
        return new modal(dbi);
    },
    modal_content: (dbi) => {
        return new modalContent(dbi);
    },
    modal_form: (dbi) => {
        return new modalForm(dbi);
    },
    modal_confirm: (dbi) => {
        return new modalConfirm(dbi);
    },
    sidebar: (dbi) => {
        return new siderbar(dbi);
    },
    stepper: (dbi) => {
        return new stepper(dbi);
    },
    card_image: (c) => {
        return new cardImage(c);
    },
    gender_box: (c) => {
        return new genderBox(c);
    },
    but: (c) => {
        return new Tbut(c);
    },
    progress_bar: (c) => {
        return new ProgressBar(c);
    },
    infinite_slider: (c) => {
        return new InfiniteSlider(c);
    },
    infinite_slider_control: (c) => {
        return new InsControl(c);
    },
    list_detail: (c) => {
        return new ListDetail(c);
    },
    file_uploader: (c) => {
        return new fileUploader(c);
    },
    spread_sheet: (c) => {
        return new spreadSheet(c);
    },
    basic_phone_number_input: (c) => {
        return new basicPhoneNumberInput(c);
    },
}
