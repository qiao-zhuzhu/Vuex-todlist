<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="$store.state.inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="add">添加事项</a-button>

    <a-list bordered :dataSource="$store.getters.infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="changeStatus($event,item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{$store.getters.unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="$store.state.viewKey==='all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="$store.state.viewKey==='undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="$store.state.viewKey==='done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
     
    }
  },
  created(){
    // 调用vuex提供的actions来获取json数据
    this.$store.dispatch('getList')
  },
  methods:{
    //监听文本框内容变化
    handleInputChange(e){
      // 调用mutation来改变inputvalue中的值
      this.$store.commit('setInputValue',e.target.value)
    },
    add(){
      //点击添加事项按钮时触发执行
      this.$store.commit('addItem')
    },
    removeItemById(id){
      this.$store.commit('removeItem',id)
    },
    //
    changeStatus(e,id){
      // console.log(e.target.checked);
      // console.log(id);
      // 定义一个参数对象 来组合id和需要改变的状态
      const params ={status:e.target.checked,id};
      this.$store.commit('changeStatus',params)
    },
    clean(){
      this.$store.commit('cleanDone')
    },
    changeList(key){
       this.$store.commit('changeKey',key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
