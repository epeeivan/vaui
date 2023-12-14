import { isEmpty, isset, url } from "../component_f.js";
import xhr from "../formsubmitter/xhr.js";
let DashboardChart = null;

export function loadChartDatas(form, reload = false) {
    let sufix = "";
    let formData = new FormData(form);
    let method = form.getAttribute('method');
    let action = form.getAttribute('action');
    console.log(isEmpty(formData.get("int_state")));
    switch (true) {
        case !isEmpty(formData.get("int_state")) && isEmpty(formData.get("year")) && isEmpty(formData.get("month")) && isEmpty(formData.get("date")):
        // sufix += "&group_by=INT_STATE";
        case !isEmpty(formData.get("id")):
            sufix += ("&id=" + formData.get("id"));
        case isEmpty(formData.get("int_state")):
            sufix += ("&int_state=" + formData.get("int_state"));
        case isEmpty(formData.get("int_date")):
            sufix += ("&int_date=" + formData.get("int_date"));
            break;
        default:
            break;
    }
    //
    xhr({
        method: method,
        url: url(action + sufix),
        async: true,
        data: formData,
        callback: (response) => {
            let respArray = JSON.parse(response);
            let chartDatas = { months: [], datas: [] }
            respArray.data.forEach(line => {
                chartDatas.months.push(line.month);
                chartDatas.datas.push(line.count);
            });
            drawChart(chartDatas, reload);
        }
    })
}
export function drawChart(datas = [], reload = false) {
    const data = {
        labels: datas.months,
        datasets: [{
            label: 'Statistics',
            data: datas.datas,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    if (!reload) {
        const ctx = document.getElementById('myChart');
        if (isset(ctx)) {
            DashboardChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    } else {
        DashboardChart.data = data;
        DashboardChart.update();
    }


}