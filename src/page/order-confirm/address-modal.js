/**
 * author :  yangshaojun
 * create time : 2017-12-13 13:31
 */
var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js');
var templateAddressModal = require('./address-modal.string');


var addressModal = {
    show: function (option) {
        //  option的绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        //     渲染页面
        this.loadModal();
        //     绑定 事件
        this.bindEvent();
    },
    //     渲染页面
    loadModal: function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        //     放入容器
        this.$modalWrap.html(addressModalHtml);
        //     加载省份
        this.loadProvince();

    },
    bindEvent: function () {
        var _this = this;

        //  省份和城市二级联动
        //  选择 省份之后、加载城市
        this.$modalWrap.find('#receiver-province').change(function () {
            // 取出省份的值
            var selectedProvince = $.trim($(this).val());
            _this.option.changed = true;
            // debugger;
            _this.loadCites(selectedProvince);
        })

        //  提交收货地址
        this.$modalWrap.find('.address-btn').click(function (e) {

            e.preventDefault();
            //  获取  表单的值
            var reveiverInfo = _this.getReceiverInfo();
            var isUpdate = _this.option.isUpdate;
            //  添加新地址 并验证通过
            if (!isUpdate && reveiverInfo.status) {
                //     请求接口
                _address.save(reveiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功');
                    //  关闭 弹窗
                    _this.hide();
                    //  查询 加载地址
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })


                //      更新 收货地址
            } else if (isUpdate && reveiverInfo.status) {
                //         更新 收件人地址 并且验证通过
                //     请求接口
                _address.update(reveiverInfo.data, function (res) {
                    _mm.successTips('地址修改成功');
                    //  关闭 弹窗
                    _this.hide();
                    //  查询 加载地址
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);


                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })


            } else {
                //     地址 表单验证 不通过
                _mm.errorTips(reveiverInfo.errMsg || '好像哪里不对了');
            }

        })

        // 点击 查号 或者 蒙版区域、关闭弹窗
        this.$modalWrap.find('.close').click(function () {
            _this.hide();
        })
        this.$modalWrap.find('.close-warp').click(function () {
            _this.hide();
        })
        //  保证点击 modal内容区 不关闭 弹窗、防止 事件冒泡
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        })
    },
    //     加载省份
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [];
        //     选择框
        var $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //  如果 是更新地址、并且有省份信息、做省份信息回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            // debugger;
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市
            this.loadCites(this.option.data.receiverProvince);
        }
    },
    /**
     * //     加载城市
     * @param provinceName  省份的值
     */
    loadCites: function (provinceName) {
        //  拿到城市列表
        var cities = _cities.getCities(provinceName) || [];
        var $citySelect = this.$modalWrap.find('#receiver-city');
        //      渲染城市列表
        // debugger;
        $citySelect.html(this.getSelectOption(cities));

        if (!this.option.changed) {
            //  如果 是更新地址、并且有城市信息、做城市信息息回填
            if (this.option.isUpdate && this.option.data.receiverCity) {
                $citySelect.val(this.option.data.receiverCity);
                // 加载城市
                // $citySelect.html(this.getSelectOption(cities));
            }
            this.option.changed = false;
        }

    },
    //  获取 select框的 option、输入的是 array、输出是 html
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, len = optionArray.length; i < len; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    //  获取 表单 的 收件人的值、做表单验证
    getReceiverInfo: function () {
        var receiverInfo = {};
        var result = {
            status: false
        };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
        }
        //  表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人省份';

        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人城市';

        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人电话';

        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人地址';

        } else {
            //     所有验证 都通过了
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    //  关闭 弹窗
    hide: function () {
        this.$modalWrap.empty();
    }
}

module.exports = addressModal;