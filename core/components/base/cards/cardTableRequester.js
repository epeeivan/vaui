import { getParent, isEmpty, isset, url } from "../../../component_f.js";
import xhr from "../../../formsubmitter/xhr.js";
import ui from "../../../ui.js";
import CircleImage from "../images/circleImage.js";
import { checkbox } from "../inputs/checkbox.js";
import tableLine, { activateLine, changeApparance, desactivateLine } from "../table/tableLine.js";
import tableCell from "../table/tablecell.js";
import badge from "../utilities/badge.js";
import link from "../utilities/link.js";
import cardTable from "./cardTable.js";
let Dom = new ui();
export class cardTableRequester extends cardTable {
    constructor(cardT) {

        super(cardT);
        if (isset(this.properties.url)) {
            this.lines_per_page = 10;

            let that = this;
            this.properties['datas'] = loadDataTableDatas(null, null, { url: this.properties.url })
            this.properties.headers = isset(this.properties.headers) && !isEmpty(this.properties.headers) ? JSON.parse(this.properties.headers) : Object.keys(this.properties.datas[0]);

            // console.log(this.properties.datas)
            this.get_child('footer').get_child('leftContainer').get_child('count').text = this.lines;
            this.get_child('footer').get_child('rightContainer').get_child('pageCounter').get_child('previous').events = {
                click: [
                    [prev, { url: this.properties.url, reload: true, headers: this.properties.headers }]]
            };
            this.get_child('footer').get_child('rightContainer').get_child('pageCounter').get_child('pagesText').get_child('pages').text = Math.ceil(this.properties.datas.length / this.lines_per_page);
            // replace the value with the result of the counter function

            this.get_child('footer').get_child('rightContainer').get_child('pageCounter').get_child('next').events = {
                click: [
                    [next, { url: this.properties.url, reload: true, headers: this.properties.headers }]
                ]
            };
            this.get_child('footer').get_child('rightContainer').get_child('container').get_child('lines_per_page').events = {
                change: [
                    [reloadDatas, { url: this.properties.url, reload: true, headers: this.properties.headers }],
                ],
                ready: [
                    [reloadDatasWhenAdd]
                ]
            }
            this.createHead();
            this.fillBody();

            document.addEventListener("reload_datatable", () => {
                let table = document.getElementById(this.getTable().attributes.id);
                if (isset(table)) {
                    reloadDatas(table, null, { url: this.properties.url, reload: true, headers: this.properties.headers }, true)
                }

            })
            // let keepedLines = countTableDatas(null, null, this.properties.url);
            // setInterval(() => {
            //     let lines = countTableDatas(null, null, this.properties.url);
            //     // console.log(parseInt(lines) +">"+ keepedLines)
            //     if (parseInt(lines) != keepedLines) {
            //         // alert();
            //         let table = document.getElementById(this.getTable().attributes.id);
            //         if (isset(table)) {
            //             reloadDatas(table, null, { url: this.properties.url, reload: true, headers: this.properties.headers }, true)
            //         }
            //         // console.log("new Line");
            //         keepedLines = lines;
            //     }

            // }, 5000);

        }
    }
    get headers() {
        return isset(this.properties.headers.length) ? this.properties.headers : Object.keys(this.properties.headers);

    }
    isCustomHeaders() {
        return isset(this.properties.headers.length) ? false : true;
    }
    createHead() {

        // console.log(this.properties.headers);
        this.getTable().add_child(new tableLine({ type: "h", borderless: (this.properties.borderless ?? null), round: this.properties.round ?? null }));
        this.getTable().last_child().add_child(new tableCell({ html: { check: new checkbox({ class: "checkerAll", target: "tableLine", class: "" }) }, type: "h" }), 'checker');
        this.getTable().last_child().get_child('checker').add_event('click', activeAllLinesFromCheckbox);

        this.headers.forEach(headerCell => {
            this.getTable().last_child().add_child(new tableCell({ text: this.properties.headers[headerCell].label ?? headerCell }));
        })



    }
    fillBody() {
        // console.log(this.lines_per_page);
        for (let index = 0; (index < this.lines_per_page && index < this.properties.datas.length); index++) {
            this.getTable().add_child(genFillBody(this.properties.headers, this.datas, index, this.properties.id ?? null));

        }
    }
}
function loadDataTableDatas(obj, e, params) {
    let datas = [];
    xhr({
        url: url(params.url),
        callback: (response) => {
            // alert(params.url);
            console.log(response);
            datas = JSON.parse(response).data
        }
    })

    return datas;
}
function reloadDatasWhenAdd() {
    alert()
}
function reloadDatas(obj, e, params, isTable = false) {
    if (isset(params.reload)) {
        let box = getParent(obj, isTable ? 2 : 4);
        let params_copy = {};
        Object.assign(params_copy, params);
        // 
        currentPage(box, 1);
        let filtersString = filters(box);
        let filtersParams = (!isEmpty(filtersString) ? '&' + filtersString : '');
        let suffix = '&start=' + start(box) + '&end=' + end(box) + filtersParams;

        // reauest to count database available lines
        let divider = params.url.indexOf('?') == -1 ? "?" : "&";
        params_copy.url = params.url + divider + 'count' + filtersParams;
        lines(box, loadDataTableDatas(obj, e, params_copy).length); //change this to the truely counter

        // calculate and set The pages
        pages(box, calcPages(box));
        // 
        clearTable(box);
        params_copy.url = params.url + suffix;
        fillBody(box, loadDataTableDatas(obj, e, params_copy), params.headers);
        // 
        // let suffix = '?' + start(box) + '&' + end(box) + (!isEmpty(filtersString) ? '&' + filtersString : '');
        // 
        // console.log(params_copy.url);
    }
}
function filters(box) {
    let filtersArray = [];
    let filters = {
        inputs: box.querySelectorAll('.filters input'),
        selects: box.querySelectorAll('.filters select'),
    }

    filters.inputs.forEach(input => {
        let name = input.getAttribute('name');
        !isEmpty(input.value) && isset(name) ? filtersArray.push(name + '=' + input.value) : '';
    });
    filters.selects.forEach(select => {
        let name = select.getAttribute('name');

        !isEmpty(select.value) && isset(name) ? filtersArray.push(name + '=' + select.value) : '';
    });

    return (filtersArray.length > 1) ? filtersArray.join('&') : (filtersArray.length == 1 ? filtersArray[0] : '');
}
function next(obj, e, params) {
    let box = getParent(obj, 4);
    if (currentPage(box) < pages(box)) {
        currentPage(box, currentPage(box) + 1);
        changeDatasPage(obj, e, box, params);
    }

}
function prev(obj, e, params) {
    let box = getParent(obj, 4);
    if (currentPage(box) > 1) {
        currentPage(box, currentPage(box) - 1);
        changeDatasPage(obj, e, box, params);
    }
}
function changeDatasPage(obj, e, box, params) {
    let filtersString = filters(box);
    let params_copy = {};
    Object.assign(params_copy, params);


    let suffix = '&start=' + start(box) + '&end=' + end(box) + (!isEmpty(filtersString) ? '&' + filtersString : '');
    params_copy.url = params.url + suffix;

    clearTable(box);
    fillBody(box, loadDataTableDatas(obj, e, params_copy), params.headers);
    // console.log(params_copy.url);
}
function calcPages(box) {
    return Math.ceil(lines(box) / linesPerPages(box));
}
function pages(box, pages = null) {
    return setGet(box, 'pages', pages)
}
function currentPage(box, currentPage = null) {
    return setGet(box, 'current_page', currentPage)

}
function lines(box, lines = null) {
    return setGet(box, 'lines-counter', lines)
}
function linesPerPages(box) {
    return parseInt(box.querySelector('.lines_per_page').value);
}
function start(box) {
    return (linesPerPages(box) * currentPage(box)) - linesPerPages(box);
}
function end(box) {
    return (linesPerPages(box) * currentPage(box)) - 1;
}
function clearTable(box) {
    let table = box.querySelector('table');
    let tableHeader = table.querySelectorAll('tr')[0];
    table.innerHTML = '';
    table.append(tableHeader);
}
function getHeader(headers) {
    return isset(headers.length) ? headers : Object.keys(headers);

}
function isCustomHeaders(headers) {
    return isset(headers.length) ? false : true;
}
function fillBody(box, datas, headers) {
    let table = box.querySelector('table');
    for (let index = 0; (index < datas.length && index < linesPerPages(box)); index++) {

        table.append(Dom.createElementFromStructure(genFillBody(headers, datas, index, table.getAttribute("id"))));
    }


}
function genFillBody(headers, datas, index, id = null) {
    let line = new tableLine({ type: "", });
    line.add_child(new tableCell({ html: { check: new checkbox({ class: "tableLine", value: isset(id) ? datas[index][id] : null, name: id }) }, type: "h" }), 'checker');

    line.get_child('checker').add_event('click', activeLineFromCheckbox);

    getHeader(headers).forEach(headerCell => {
        if (isCustomHeaders(headers)) {
            if (isset(headers[headerCell].type)) {

                switch (headers[headerCell].type) {
                    case "badge":
                        line.add_child(new tableCell({}));

                        line.last_child().html = {
                            badge: new badge
                                (
                                    {
                                        type: headers[headerCell].value[datas[index][headerCell]].type,
                                        label: headers[headerCell].value[datas[index][headerCell]].text,
                                    }
                                )
                        }
                        break;
                    case "link":
                        line.add_child(new tableCell({}));

                        line.last_child().html = {
                            link: new link
                                (
                                    {
                                        color: headers[headerCell].color ?? null,
                                        mode: headers[headerCell].mode ?? null,
                                        text: headers[headerCell].text ?? datas[index][headerCell]
                                    }
                                )
                        }
                        break;
                    case "circle-image":
                        line.add_child(new tableCell({}));

                        line.last_child().html = {
                            link: new CircleImage
                                (
                                    {
                                        width: headers[headerCell].width ?? null,
                                        src: datas[index][headerCell]
                                    }
                                )
                        }
                        break;
                    default:
                        break;
                }
            } else {
                line.add_child(new tableCell({ text: isset(datas[index][headerCell]) ? datas[index][headerCell] : '' }));
            }
        } else {
            line.add_child(new tableCell({ text: isset(datas[index][headerCell]) ? datas[index][headerCell] : '' }));

        }
    });
    return line;
}
function setGet(box, element, value = null) {
    let el = box.querySelector('.' + element);
    if (isset(value)) {
        el.innerText = value;
        return 0;
    }
    return parseInt(el.innerText);
}
export function selectedLines(tableId) {
    let table = document.getElementById(tableId);
    let ids = [];
    if (isset(table)) {
        let selectedLines = table.querySelectorAll("checkbox[checked]");
        selectedLines.forEach(selectedLine => {
            ids.push(selectedLine.value);
        });
    }
}
function countTableDatas(obj = null, e = null, uri) {
    let count = 0;
    xhr({
        url: url(uri) + '&count=',
        callback: (response) => {
            alert(url(uri) + '&count=')
            count = JSON.parse(response).data

        }
    })
    return count;
}
function activeAllLinesFromCheckbox(obj, e) {
    let input = obj.querySelector("input");
    let table = getParent(obj, 2);
    let lines = table.querySelectorAll('tr');

    for (let index = 1; index < lines.length; index++) {

        if (input.checked) {
            activateLine(lines[index])

        } else {
            desactivateLine(lines[index])

        }


    }
}
function activeLineFromCheckbox(obj, e) {
    let line = getParent(obj, 1);
    console.log(line)
    console.log(obj.querySelector("input").checked)
    !obj.querySelector("input").checked ? desactivateLine(line) : activateLine(line);
    // if (obj.classList.contains('checked')) {
    //     activateLine(line)
    // } else {
    //     desactivateLine(line)
    // }
}