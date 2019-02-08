// components/mainBtn/mainBtn.js
Component({
    /**
     * 组件的属性列表，外部传入的值
     */
    properties: {
        icon: {
            type: String,
            value: ''
        },
        haveIcon: {
            type: Boolean,
            value: true
        },
        text: {
            type: String,
            value: ''
        },
        width: {
            type: Number,
            value: 246
        }
    },

    /**
     * 组件的初始数据，自己的值
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        btnTap: function() {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption)
        }
    }
})