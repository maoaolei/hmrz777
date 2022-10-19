<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-select v-model="currentYear" @change="updateDate">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="currentMonth" @change="updateDate">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{ date }" class="content">
        <div class="date-content">
          <span class="text"> {{ date.getDate() }}</span>
          <span v-if="date.getDay()===6 ||date.getDay()===0" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  data() {
    return {
      years: [],
      currentYear: 2022,
      currentMonth: 10,
      currentDate: new Date()
    }
  },
  created() {
    this.initYear()
  },
  methods: {
    initYear() {
      const date = new Date()
      this.years = Array(11).fill(date.getFullYear()).map((item, index) => {
        return item - 5 + index
      })
    },
    updateDate() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }

}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td,.el-calendar-table  tr:first-child td {
    border: none;
  }
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
</style>
