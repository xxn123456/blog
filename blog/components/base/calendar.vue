<template>
  <div class="calendar-box">

    <div class="months">
      <span class="item arrow" @click="pickPrevMonth(currentYear, currentMonth)">❮</span>
      <span class="item year-month">
        <strong class="choose-year">
          <span>{{ currentYear }}</span>
          <span>{{ isEnLang ? 'Y' : '年' }}</span>
          <span>{{ currentMonth }}</span>
          <span>{{ isEnLang ? 'M' : '月' }}</span>
          <span>{{ currentDay }}</span>
          <span>{{ isEnLang ? 'D' : '日' }}</span>
        </strong>
      </span>
      <span class="item arrow" @click="pickNextMonth(currentYear, currentMonth)">❯</span>
    </div>

    <ul class="weekdays">
      <li v-for="(day, index) in weeksText" :key="index">{{ day }}</li>
    </ul>

    <div v-if="!days.length" class="days-loading">

    </div>
    <ul v-else class="days">
      <li v-for="(day, index) in days" :key="index">

        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span v-else class="item" :class="{
            'active':
              day.getFullYear() == new Date().getFullYear() &&
              day.getMonth() == new Date().getMonth() &&
              day.getDate() == new Date().getDate()
          }">

          {{ day.getDate() }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PcAsideCalendar',
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: []
      }
    },
    computed: {
      isEnLang() {
        //   return this.$store.getters['global/isEnLang']
        return false
      },
      weeksText() {
        return this.isEnLang ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['一', '二', '三', '四', '五', '六', '七']
      }
    },
    methods: {
      initDate(current) {
        const date = current ? new Date(current) : new Date()
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1
        this.currentWeek = date.getDay()
        if (this.currentWeek == 0) this.currentWeek = 7
        const strting = this.formatDate(this.currentYear, this.currentMonth, 1);

        // console.log("today:" + strting + "," + this.currentWeek)
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        for (let i = this.currentWeek - 1; i >= 0; i--) {
          const day = new Date(strting)
          day.setDate(day.getDate() - i)
          // console.log("y:" + day.getDate())
          this.days.push(day)
        }
        for (let i = 1; i <= 35 - this.currentWeek; i++) {
          const day = new Date(strting)
          day.setDate(day.getDate() + i)
          this.days.push(day)
        }
      },
      pickPrevMonth(year, month) {

        const day = new Date(this.formatDate(year, month, 1))

        let bb = day.setDate(0);

        this.initDate(this.formatDate(day.getFullYear(), day.getMonth() + 1, 1))
      },
      pickNextMonth(year, month) {
        const day = new Date(this.formatDate(year, month, 1))
        day.setDate(35)
        this.initDate(
          this.formatDate(
            day.getFullYear(),
            day.getMonth() + 1,
            1
          )
        )
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate(year, month, day) {
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        return `${year}-${month}-${day}`
      }
    },
    mounted() {
      this.initDate(null)
    }
  }

</script>

<style lang="scss" scoped>
  .calendar-box {
    min-height: 264px;
    margin-top: 15px;
    background-color: #fff;
    padding: 12px;

    >.months {
      padding: 0;

      overflow: hidden;
      display: flex;
      justify-content: space-between;
      color: #333;
      .item {
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;

        &.arrow {
          width: 32px;

          //   @include background-transition();
          cursor: pointer;


        }
      }
    }

    >.days,
    >.weekdays {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      color: #333333;
      cursor: pointer;

      >li {
        width: 40px;
        height: 40px;
        display: block;
        float: left;
        text-align: center;
      }
    }

    >.weekdays {
      height: 40px;
      line-height: 40px;
    }

    >.days-loading {
      width: 100%;
      height: 224px;
    }

    >.days {
      min-height: 160px;
      margin-bottom: 0;
      position: relative;

      >li {
        width: 40px;
        height: 40px;
        line-height: 40px;


        >.other-month {
          // opacity: .3;
          cursor: initial;
          color: #cfcfcf;
        }

        >.item {
          display: block;
          border-radius: 100%;



          >a {
            display: block;


            text-decoration: none;
            color: #555555;
            font-weight: 400;
          }



          &.active {

            background-color: #dddddd;
            // background-color: $module-hover-bg;
          }
        }
      }
    }
  }

</style>
