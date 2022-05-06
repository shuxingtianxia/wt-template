<template>
  <div class="add-or-edit">
    <wt-button-mult :button-arr="buttonArr" :is-show-border="true" :btn-loading="btnLoading" @clickBtn="clickBtn"></wt-button-mult>
    <wt-form-panel ref="wtFormPanel" :data-source="dataSource" :options="options" :fields="fields" :mode="dataSource.id ? 'edit': 'add'">
      <template v-slot:fromFactoryId>
        <el-select v-model="dataSource.fromFactoryId" filterable :filter-method="filterMethod" style="width: 280px" @change="handleChange($event, 'fromFactoryId')">
          <el-option v-for="item in options.fromFactoryId" :key="item.id" :value="item.id" :label="item.country">
            {{ item.city }}
          </el-option>
        </el-select>
        <span v-show="fromCity" class="city">始发地：{{ fromCity }}</span>
        <span v-show="formAddress" class="city">起运地地址：{{ formAddress }}</span>
      </template>
      <template v-slot:toFactoryId>
        <el-select v-model="dataSource.toFactoryId" filterable :filter-method="filterMethod1" style="width: 280px" @change="handleChange($event, 'toFactoryId')">
          <el-option v-for="item in options.toFactoryId" :key="item.id" :value="item.id" :label="item.country">
            {{ item.city }}
          </el-option>
        </el-select>
        <span v-show="toCity" class="city">目的地：{{ toCity }}</span>
        <span v-show="toAddress" class="city">收货地址：{{ toAddress }}</span>
      </template>
    </wt-form-panel>
  </div>
</template>
<script>
import { fields } from './config/add'
import { clearData } from '@/utils/clearData'
export default {
  name: 'PathConfigureAdd',
  data() {
    return {
      btnLoading: false, // 加载
      buttonArr: [
        {
          icon: 'el-icon-plus',
          text: '保存',
          type: 'primary',
          clickType: 'add'
        },
        {
          icon: 'el-icon-plus',
          text: '返回',
          clickType: 'back'
        }
      ],
      // 下拉列表
      options: {
        radio: [{ label: '广东', value: 440 }, { label: '广西', value: 550 }],
        checkbox: [{ label: '广东', value: 440 }, { label: '广西', value: 550 }],
        select: [{ label: '广东', value: 440 }, { label: '广西', value: 550 }],
        fromFactoryId: [{ country: '广东', city: '深圳' }, { country: '江西', city: '赣州' }]
      },
      fields,
      dataSource: {
        detail: '',
        checkbox: [],
        file1: [{
          attachAddress: '/srm/tempFiles_dev',
          createdBy: '',
          fileSize: 12742,
          id: '951424661443784704',
          originalAddress: '文件1.xlsx',
          suffix: 'xlsx',
          title: '951424661346910208.xlsx',
          type: 'DF',
          updatedBy: ''
        }, {
          attachAddress: '/srm/tempFiles_dev',
          createdBy: '',
          fileSize: 12742,
          id: '951424661443784704',
          originalAddress: '文件2.xlsx',
          suffix: 'xlsx',
          title: '951424661346910208.xlsx',
          type: 'DF',
          updatedBy: ''
        }]
      },
      fromCity: '',
      formAddress: '',
      toCity: '',
      toAddress: ''
    }
  },
  created() {
    this.routerPath = this.$route.fullPath
    // 获取目的国
    this.getFactory()
  },
  activated() {
    if (this.routerPath === this.$route.fullPath) return
    this.routerPath = this.$route.fullPath
    clearData(this.dataSource)
    // 获取目的国
    this.getFactory()
  },
  methods: {
    getFactory() {
      this.$api.getFactoryAll({}).then(res => {
        if (res.code === 200) {
          this.options = { ...this.options, ...{
            old: res.data,
            fromFactoryId: res.data,
            toFactoryId: res.data
          }}
        }
      })
    },
    // 点击顶部按钮
    clickBtn(type) {
      switch (type) {
        case 'add': {
          this.$refs.wtFormPanel.validate((bool) => {
          })
          break
        }
        default:
          break
      }
    },
    // 下拉菜单改变
    handleChange(val, name) {
      // this
      const selectOption = this.options[name].find(item => item.id === val)
      if (name === 'fromFactoryId') {
        this.fromCity = selectOption.city
        this.formAddress = selectOption.address
      } else if (name === 'toFactoryId') {
        this.toCity = selectOption.city
        this.toAddress = selectOption.address
      }

      console.log('val', selectOption)
    },
    // 搜索
    filterMethod(val) {
      const filterList = this.options.old.filter(item => item.city.includes(val))
      this.$set(this.options, 'fromFactoryId', filterList)
    },
    filterMethod1(val) {
      const filterList = this.options.old.filter(item => item.city.includes(val))
      this.$set(this.options, 'toFactoryId', filterList)
    }
  }
}
</script>
<style lang='scss' scoped>
.city {
  margin-left: 80px;
  color: #aaa;
}
</style>
