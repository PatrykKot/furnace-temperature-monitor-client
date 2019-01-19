<template>
    <div :id="containerId" class="chart-container">
    </div>
</template>

<script>
    import {guid} from "../../utils/randomUtil";
    import {clearArray} from "../../utils/arrayUtil";
    import moment from 'moment'
    import Highcharts from 'highcharts/highstock'
    import TemperatureService from "../../services/temperature/TemperatureService";
    import _ from 'lodash'

    export default {
        name: "HistoryView",
        props: ['id', 'date'],

        data: () => ({
            loadedChartData: [],
            loadedNavigatorData: []
        }),

        computed: {
            containerId() {
                return guid()
            },

            chartData() {
                return this.loadedChartData
                    .map(item => {
                        return [item.x, item.y]
                    })
                    .sort((a, b) => a[0] - b[0])
            },

            navigatorData() {
                return this.loadedNavigatorData
                    .map(item => {
                        return [item.x, item.y]
                    })
                    .sort((a, b) => a[0] - b[0])
            },

            max() {
                return moment(this.date).add(1, 'd').valueOf()
            },

            min() {
                return moment(this.date).valueOf()
            },

            formattedDayTemperatureText() {
                return moment(this.day).format('Do MMMM, dddd')
            }
        },

        watch: {
            chartData() {
                if (this.chart) {
                    this.chart.series[0].setData(this.chartData)
                }
            }
        },

        mounted() {
            this.init()
        },

        methods: {
            init() {
                this.destroyChart()
                this.loadNavigatorData()
                    .then(() => this.buildChart())
            },

            loadNavigatorData() {
                return TemperatureService.getSimplifiedHistoryBetween(this.id, this.min, this.max)
                    .then(result => {
                        clearArray(this.loadedNavigatorData)
                        result.forEach(item => this.loadedNavigatorData.push(item))
                    })
            },

            buildChart() {
                let me = this
                this.chart = Highcharts.stockChart(this.containerId, {
                    chart: {
                        type: 'spline',
                    },

                    rangeSelector: {
                        inputEnabled: false,
                        buttonTheme: {
                            visibility: 'hidden'
                        },
                        labelStyle: {
                            visibility: 'hidden'
                        }
                    },

                    title: {
                        text: this.formattedDayTemperatureText
                    },

                    xAxis: {
                        type: 'timeline',

                        events: {
                            afterSetExtremes: (event) => {
                                me.onAfterSetExtremes(me, event)
                            }
                        }
                    },

                    series: [{
                        data: this.navigatorData
                    }],

                    navigator: {
                        adaptToUpdatedData: false,
                        series: {
                            data: this.navigatorData
                        },
                    },

                    credits: {
                        enabled: false
                    },
                })
            },

            onAfterSetExtremes: _.debounce((me, event) => {
                me.loadBetween(Math.floor(event.min), Math.ceil(event.max))
            }, 1000),

            loadBetween: function (from, to) {
                TemperatureService.getSimplifiedHistoryBetween(this.id, from, to)
                    .then(result => {
                        clearArray(this.loadedChartData)
                        result.forEach(item => this.loadedChartData.push(item))
                    })
            },

            destroyChart() {
                clearArray(this.loadedChartData)
                clearArray(this.loadedNavigatorData)

                if (this.chart) {
                    this.chart.destroy()
                }
            }
        },

        beforeDestroy() {
            this.destroyChart()
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 100%;
        width: 100%;
        position: absolute;
    }
</style>