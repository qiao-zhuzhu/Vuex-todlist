import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //所有任务列表
        list: [],
        //vuex保存了文本框的内容
        inputValue: 'aaa',
        //声明一个变量保存最新id
        nextId: 5,
        viewKey: 'all'
    },
    mutations: {
        initList(state, data) {
            state.list = data;
        },
        // 为store中的inputvalue赋值
        setInputValue(state, val) {
            state.inputValue = val;
        },
        addItem(state) {
            // 生成一个任务事项对象
            const obj = {
                id: state.nextId,
                info: state.inputValue.trim(),
                done: false
            }

            //将事项添加到列表中即可
            state.list.push(obj);
            //重置文本框数据 id++
            state.nextId++;
            state.inputValue = '';
        },
        //根据id删除对应任务项
        removeItem(state, id) {
            //
            const i = state.list.findIndex(item => item.id === id)
                //
            if (i !== -1) {
                state.list.splice(i, 1)
            }
        },
        //根据param来修改状态 查询对应事项
        changeStatus(state, params) {
            const i = state.list.findIndex(item => item.id === params.id)
                //根据索引 更改其状态
            if (i !== -1) {
                state.list[i].done = params.status
            }
        },
        cleanDone(state) {
            state.list = state.list.filter(item => item.done === false)
        },
        changeKey(state, key) {
            state.viewKey = key
        }

    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                // console.log(data);
                context.commit('initList', data)
            })
        }
    },
    getters: {
        //
        unDoneLength(state) {
            return state.list.filter(item => item.done === false).length
        },
        infoList(state) {
            if (state.viewKey === 'all') {
                return state.list
            }
            if (state.viewKey === 'undone') {
                return state.list.filter(x => x.done === false)
            }
            if (state.viewKey === 'done') {
                return state.list.filter(x => x.done === true)
            }
        }

    }
})