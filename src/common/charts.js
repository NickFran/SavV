const eCharts = require('../lib/echarts/echarts.js');

function initTimeline(state, deps, DOM_Deps) {
    const {DOM} = deps;
    const {pathDep, fileHandle, integrations} = DOM_Deps;
   
    
        let data = fileHandle.getAllSimpleData();
        let timelinePoints = [];
        for (const entry of JSON.parse(data)) {
            timelinePoints.push([entry.timestamps["formatted"][0], 0, entry.fileName]);
        }
        console.log("Timeline Points:", timelinePoints);

        // Calculate min and max timestamps for xAxis
        const timestamps = timelinePoints.map(pt => new Date(pt[0]).getTime());
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);
        // Expand range by 1 month on each side
        const minDate = new Date(minTimestamp);
        const maxDate = new Date(maxTimestamp);
        minDate.setMonth(minDate.getMonth() - 1);
        maxDate.setMonth(maxDate.getMonth() + 1);
        const extendedMinTimestamp = minDate.getTime();
        const extendedMaxTimestamp = maxDate.getTime();

        const chart = echarts.init(document.getElementById('timeline'));
        chart.resize();
        const option = {
            title: {
                text: 'Timeline',
                show: false,
                textStyle: {
                    color: '#007bff',
                    fontWeight: 'bold',
                    fontSize: 20
                }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: '#fff',
                borderColor: '#007bff',
                borderWidth: 1,
                textStyle: {
                    color: '#243744',
                    fontSize: 14
                },
                confine: false,
                formatter: function(params) {
                    if (params && params.data && Array.isArray(params.data) && params.data.length >= 3) {
                        return `<b style="color:#007bff">File:</b> ${String(params.data[2])}<br><b style="color:#243744">Timestamp:</b> ${String(params.data[0])}`;
                    }
                    return '';
                }
            },
                grid: {
                    left: '15%',
                    right: '15%',
                    top: '20%',
                    bottom: '50%',
                    containLabel: true
                },
            xAxis: {
                type: 'time',
                min: extendedMinTimestamp,
                max: extendedMaxTimestamp,
                axisPointer: {
                    show: true,
                    type: 'line',
                    snap: false,
                    label: {
                        show: true,
                        formatter: function(params) {
                            if (!params.value) return '';
                            const date = new Date(params.value);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');
                            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        }
                    }
                },
                axisLabel: {
                    rotate: 45,
                    color: '#243744',
                    fontSize: 13,
                    formatter: function(value) {
                        const date = new Date(value);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${month}-${day}`;
                    }
                },
                splitNumber: 15,
                axisLine: {
                    lineStyle: {
                        color: '#007bff',
                        width: 2
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#e0e0e0',
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                type: 'value',
                show: false,
                min: -1,
                max: 1
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 0,
                    end: 100,
                    backgroundColor: '#e0e0e0',
                    fillerColor: '#007bff33',
                    borderColor: '#007bff',
                    handleStyle: {
                        color: '#007bff',
                        borderColor: '#243744'
                    }
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 100
                }
            ],
            series: [{
                type: 'scatter',
                data: timelinePoints,
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    color: '#007bff',
                    borderColor: '#243744',
                    borderWidth: 2
                }
            }]
        };
        chart.setOption(option);
        window.addEventListener('resize', function() {
            chart.resize();
        });
        chart.on('dataZoom', function(params) {
        const axis = chart.getModel().getComponent('xAxis', 0);
        const extent = axis.axis.scale.getExtent();
        const min = extent[0];
        const max = extent[1];
        const minDate = new Date(min);
        const maxDate = new Date(max);
        mapTimelineZoomRange = [minDate.toISOString(), maxDate.toISOString()];
        console.log('Updated mapTimelineZoomRange:', mapTimelineZoomRange);
        function format24hr(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        document.getElementById('minTimelineRangeLabel').textContent = format24hr(minDate);
        document.getElementById('maxTimelineRangeLabel').textContent = format24hr(maxDate);
        DOM.leaf_filterPlatformsByTimeRange(state, DOM_Deps, mapTimelineZoomRange[0], mapTimelineZoomRange[1]);
    });
}

module.exports = { initTimeline };