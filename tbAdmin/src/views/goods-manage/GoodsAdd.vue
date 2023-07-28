<template>
    <div id="">
        <el-page-header content="添加商品" title="商品管理"></el-page-header>

        <el-row>
            <el-col :span="24">
                <el-steps :active="scheduleActive" finish-status="success">
                    <el-step title="基本信息"></el-step>
                    <el-step title="规格参数"></el-step>
                    <el-step title="销售属性"></el-step>
                    <el-step title="SKU信息"></el-step>
                    <el-step title="保存完成"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="24" v-show="this.scheduleActive === 0">
                <el-card class="box-card">
                    <el-form :model="goodsBaseAttrForm" :rules="goodsBaseAttrRules" ref="goodsBaseAttrRef"
                        label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="goodsBaseAttrForm.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品描述" prop="desc">
                            <el-input v-model="goodsBaseAttrForm.goodsDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="选择分类" prop="classification">
                            <el-cascader v-model="goodsBaseAttrForm.classification" :options="classificationList"
                                :props="zdyOption" clearable filterable>
                                <template slot-scope="{ node, data }">
                                    <span>{{ data.Name }}</span>
                                </template>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="商品重量(kg)" prop="desc">
                            <el-input-number v-model="goodsBaseAttrForm.weight" :precision="2"
                                :step="0.1"></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="24" v-show="this.scheduleActive === 1">
                <el-card class="box-card">
                    <el-tabs tab-position="left">
                        <el-tab-pane :label="group.attr_Group_Name" :key="group.attr_Group_ID"
                            v-for="(group, gIndex) in attrGroup">
                            <el-form :model="specificationsForm.gIndex" :rules="specificationsRules" ref="specificationsRef"
                                label-width="100px" class="demo-ruleForm">
                                <el-form-item :label="attr.attr_Name" :key="attr.attr_ID"
                                    v-for="(attr, attrIndex) in group.attr">
                                    <el-select v-model="specificationsForm[gIndex][attrIndex]" filterable placeholder="请选择">
                                        <el-option v-for="(val, valIndex) in attr.value_Select.split('，')" :key="valIndex"
                                            :label="val" :value="val">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
                                    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
            <el-col :span="24" v-show="this.scheduleActive === 2">
                <el-card class="box-card">
                    <el-form :model="salaAttrForm" :rules="salaAttrRules" ref="salaAttrRef" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item :label="salaAttr.attr_Name" prop="name" v-for="(salaAttr, sIndex) in salaAttrData"
                            :key="salaAttr.attr_ID">
                            <el-checkbox-group v-model="salaAttrForm[sIndex]">
                                <el-checkbox :label="val" v-for="(val, vIndex) in salaAttr.value_Select.split('，') "
                                    :key="vIndex"
                                    v-show="vIndex !== salaAttr.value_Select.split('，').length - 1"></el-checkbox>
                                <span>
                                    <el-button icon="el-icon-plus" size="small" @click="showInput(sIndex)">自定义</el-button>
                                    <el-input v-model="salaAttrForm[sIndex].add" placeholder="请输入内容"
                                        v-show="inputVisible[sIndex].view"></el-input>
                                </span>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>

            <el-col :span="24" v-show="this.scheduleActive === 3">
                <el-card class="box-card">

                </el-card>
            </el-col>

            <el-col :span="24" v-show="this.scheduleActive === 4">
                <el-card class="box-card">

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: "GoodsAdd",
    components: {},
    data() {
        return {
            x: '',
            scheduleActive: 0,
            goodsBaseAttrForm: {
                goodsName: '',
                goodsDesc: "",
                classification: '',
                weight: "0.00",
            },
            goodsBaseAttrRules: {

            },
            classificationList: [],
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },

            attrGroup: [],
            specificationsForm: {
                0: {},
                1: {},
                2: {},
                3: {},
                4: {},
                5: {},
                6: {},
            },
            specificationsRules: {

            },

            salaAttrForm: {
                0: [],
                1: [],
                2: [],
            },
            salaAttrData: [],
            salaAttrRules: {},

            inputVisible: [
                { view: false },
                { view: false },
                { view: false },
                { view: false },

            ]
        }
    },
    create() { },
    mounted() {
        this.getClassification()
    },
    watch: {},
    computed: {},
    methods: {
        getClassification() {
            this.classificationList = JSON.parse(localStorage.getItem("classificationList"))
        },
        next() {
            this.scheduleActive++
            switch (this.scheduleActive) {
                case 0:

                    break;
                case 1:
                    this.$axios.post(`/adminAPI/goods/getGroupByxflID/${this.goodsBaseAttrForm.classification[2]}`).then(res => {
                        this.attrGroup = res.data.data
                    })
                    break;
                case 2:
                    this.$axios.post(`/adminAPI/goods/getSalaAttrByxflID/${this.goodsBaseAttrForm.classification[2]}`).then(res => {
                        console.log('res:', res);
                        this.salaAttrData = res.data.data
                    })
                    break;
                case 3:

                    break;
                case 4:

                    break;
                default:
                    this.scheduleActive = 0
                    break;
            }

        },
        back() {
            this.scheduleActive--
        },
        showInput(sIndex) {
            this.inputVisible[sIndex].view = true;
        },
    },
}
</script>

<style scoped lang="less">
.box-card {
    width: 80%;
    margin: 20px auto;
}
</style>