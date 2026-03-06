import Vue from 'vue'
import dayjs from "dayjs"
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
Vue.prototype.$dayjs = dayjs;