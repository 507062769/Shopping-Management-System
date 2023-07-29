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
                    <el-form :model="spu" :rules="goodsBaseAttrRules" ref="goodsBaseAttrRef" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="spu.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品描述" prop="desc">
                            <el-input v-model="spu.goodsDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="选择分类" prop="classification">
                            <el-cascader v-model="spu.classification" :options="classificationList" :props="zdyOption"
                                clearable filterable>
                                <template slot-scope="{ node, data }">
                                    <span>{{ data.Name }}</span>
                                </template>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="商品重量(kg)" prop="desc">
                            <el-input-number v-model="spu.weight" :precision="2" :step="0.1"></el-input-number>
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
                            <el-form :model="spu" :rules="specificationsRules" ref="specificationsRef" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item :label="attr.attr_Name" :key="attr.attr_ID"
                                    v-for="(attr, attrIndex) in group.attr">
                                    <el-select v-model="dataResp.specificationsForm[gIndex][attrIndex]" filterable
                                        placeholder="请选择">
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
                    <el-form :model="spu" :rules="salaAttrRules" ref="salaAttrRef" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item :label="salaAttr.attr_Name" prop="name" v-for="(salaAttr, sIndex) in salaAttrData"
                            :key="salaAttr.attr_ID">
                            <el-checkbox-group v-model="dataResp.salaAttrForm[sIndex]">
                                <el-checkbox :label="val" v-for="(val, vIndex) in salaAttr.value_Select.split('，') "
                                    :key="vIndex"
                                    v-show="vIndex !== salaAttr.value_Select.split('，').length - 1"></el-checkbox>
                                <span>
                                    <el-button icon="el-icon-plus" size="small" @click="showInput(sIndex)">自定义</el-button>
                                    <el-input v-model="inputText" placeholder="请输入内容" v-show="inputVisible[sIndex].view"
                                        @change="changeCustom(sIndex)"></el-input>
                                </span>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
                            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="24" v-show="this.scheduleActive === 3">
                <el-card class="box-card">
                    <el-table :data="spu.skus" style="width: 100%">
                        <el-table-column label="属性组合">
                            <el-table-column v-for="(item, index) in salaAttrData" :key="index" :lable="item.attr_Name"
                                width="80">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row[index] }}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="商品名称" width="120">
                            <template slot-scope="scope">
                                <el-input v-model="spu.goodsName"></el-input>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="goodsName" label="标题" width="120">
                            <template slot-scope="scope">
                                <el-input v-model="x"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsName" label="副标题" width="120">
                            <template slot-scope="scope">
                                <el-input v-model="x"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="价格" width="120">
                            <template slot-scope="scope">
                                <el-input v-model="x"></el-input>
                            </template>
                        </el-table-column> -->
                    </el-table>
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
            dataResp: {
                specificationsForm: {
                    0: {},
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {},
                    6: {},
                },
                salaAttrForm: {
                    0: [],
                    1: [],
                    2: [],
                },
            },
            spu: {
                goodsName: '',
                goodsDesc: "",
                classification: '',
                weight: "0.00",
                skus: [],
            },
            da: [],
            goodsBaseAttrRules: {

            },
            classificationList: [],
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            attrGroup: [],
            specificationsRules: {

            },
            inputText: '',
            salaAttrData: [],
            salaAttrRules: {},
            inputVisible: [
                { view: false },
                { view: false },
                { view: false },
                { view: false },

            ],
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
                    this.$axios.post(`/adminAPI/goods/getGroupByxflID/${this.spu.classification[2]}`).then(res => {
                        this.attrGroup = res.data.data
                    })
                    break;
                case 2:
                    this.$axios.post(`/adminAPI/goods/getSalaAttrByxflID/${this.spu.classification[2]}`).then(res => {
                        console.log('res:', res);
                        this.salaAttrData = res.data.data
                    })
                    break;
                case 3:
                    this.spu.skus = this.multiCartesian(this.dataResp.salaAttrForm)
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
        changeCustom(sIndex) {
            if (this.salaAttrData[sIndex].value_Select !== '') {
                this.salaAttrData[sIndex].value_Select += this.inputText + '，'
            }
            this.inputVisible[sIndex].view = !this.inputVisible[sIndex].view
            this.inputText = ''
        },
        multiCartesian(specs) {
            let max = 0;
            for (let i = 0; i < Object.keys(specs).length; i++) {
                max += specs[i].length
            }
            if (!specs || specs.length === 0) return []
            else return this.joinSpec([[]], specs, 0, Object.keys(specs).length - 1)
        },
        joinSpec(prevProducts, specs, i, max) {
            var currentProducts = [], currentProduct, currentSpecs = specs[i]
            if (i > max) return prevProducts
            prevProducts.forEach(prevProduct => {
                currentSpecs.forEach(spec => {
                    currentProduct = prevProduct.slice(0)
                    currentProduct.push(spec);  //bug所在
                    currentProducts.push(currentProduct)
                })
            })
            return this.joinSpec(currentProducts, specs, ++i, max)
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