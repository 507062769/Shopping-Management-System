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
                    <el-form :model="goodsForm" :rules="goodsRules" ref="goodsRef" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="goodsForm.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品描述" prop="desc">
                            <el-input v-model="goodsForm.goodsDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="选择分类" prop="classification">
                            <el-cascader v-model="goodsForm.classification" :options="classificationList" :props="zdyOption"
                                clearable filterable>
                                <template slot-scope="{ node, data }">
                                    <span>{{ data.Name }}</span>
                                </template>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="商品重量(kg)" prop="desc">
                            <el-input-number v-model="goodsForm.weight" :precision="2" :step="0.1"></el-input-number>
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
                            <el-form :model="specificationsForm" :rules="specificationsRules" ref="specificationsRef"
                                label-width="100px" class="demo-ruleForm">
                                <el-form-item :label="attr.attr_Name" prop="name" v-for="(attr, attrIndex) in group.attr">
                                    <el-select v-model="specificationsForm[attrIndex]" filterable placeholder="请选择">
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
            scheduleActive: 0,
            goodsForm: {
                goodsName: '',
                goodsDesc: "",
                classification: '',
                weight: "0.00",
            },
            goodsRules: {

            },
            classificationList: [],
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            attrGroup: [],
            specificationsForm: {},
            specificationsRules: {

            },
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
                    this.$axios.post(`/adminAPI/goods/getGroupByxflID/${this.goodsForm.classification[2]}`).then(res => {
                        this.attrGroup = res.data.data
                        console.log('attrGroup:', this.attrGroup);
                    })
                    break;
                case 2:

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
        }
    },
}
</script>

<style scoped lang="less">
.box-card {
    width: 80%;
    margin: 20px auto;
}
</style>