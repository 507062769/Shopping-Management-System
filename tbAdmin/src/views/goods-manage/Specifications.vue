<template>
    <div id="">
        <el-row :gutter="15">
            <el-col :span="6">
                <tree @treeClick="handleClickTree"></tree>
            </el-col>
            <el-col :span="18">
                <div class="attrBtn">
                    <el-input v-model="attrName" placeholder="参数名"></el-input>
                    <el-button type="success" round @click="attrNameSearch">查询</el-button>
                    <el-button type="primary" round @click="handleAddAttr">新增</el-button>
                    <el-button type="danger" round @click="handleBatchDelData">批量删除</el-button>
                </div>
                <div class="attrList">
                    <el-table border ref="multipleTable" :data="attrData" tooltip-effect="dark" style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="attr_ID" label="属性ID" width="70" align="center">
                        </el-table-column>
                        <el-table-column prop="attr_Name" label="属性名" width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="attr_Type" label="属性类型" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="value_Type" label="值类型" width="65" align="center">
                        </el-table-column>
                        <el-table-column prop="value_Select" label="可选值" width="190" align="center">
                        </el-table-column>
                        <el-table-column prop="xflID" label="所属类别" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="groupName" label="所属分组" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="enable" label="是否可见" width="80" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="190" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog title="添加属性" :visible.sync="dialogFormVisible">
                        <el-form :model="attrForm">
                            <el-form-item label="属性名称" label-width="100px">
                                <el-input v-model="attrForm.attr_Name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="属性类型" label-width="100px">
                                <el-select v-model="attrForm.attr_Type" placeholder="请选择属性类型">
                                    <el-option label="规格参数" value="1"></el-option>
                                    <el-option label="销售属性" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="值类型" label-width="100px">
                                <el-switch style="display: block" v-model="attrForm.value_Type" active-value="0"
                                    active-color="#13ce66" inactive-color="#ff4949" inactive-value="1" active-text="多值"
                                    inactive-text="单值">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="可选值" label-width="100px">
                                <el-select v-model="attrForm.value_Select" multiple filterable allow-create
                                    placeholder="请输入可选值">
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属分类" label-width="100px">
                                <el-cascader v-model="attrForm.xflID" :options="classificationList" :props="zdyOption"
                                    clearable filterable @change="handleClassificationChange">
                                    <template slot-scope="{ node, data }">
                                        <span>{{ data.Name }}</span>
                                        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                                    </template>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="所属分组" label-width="100px">
                                <el-select v-model="attrForm.groupName" filterable placeholder="请选择">
                                    <el-option v-for="item in attrGroup" :key="item.attr_Group_ID"
                                        :label="item.attr_Group_Name" :value="item.attr_Group_Name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label=" 是否可见" label-width="100px">
                                <el-switch v-model="attrForm.enable" active-color="#13ce66" active-value="1"
                                    inactive-color="#ff4949" inactive-value="0">
                                </el-switch>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitAttrForm">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <!-- <div class="footer">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import tree from '../common/tree'
export default {
    name: "",
    components: { tree },
    data() {
        return {
            attrName: "",
            attrData: [],
            attrForm: {},
            dialogFormVisible: false,
            classificationList: [],
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            attrGroup: []
        }
    },
    create() { },
    mounted() {
        this.getAttrList()
        this.getClassificationList()
    },
    watch: {},
    computed: {},
    methods: {
        getClassificationList() {
            this.$axios.get('/adminAPI/classification/list').then(res => {
                this.classificationList = res.data.data
            })
        },
        getAttrList() {
            this.$axios.get("/adminAPI/Goods/attr/getAttrList").then(res => {
                this.attrData = res.data.data
            })
        },
        handleClickTree(data, node, component) {

        },
        attrNameSearch() {

        },
        handleAddAttr() {
            this.dialogFormVisible = true
        },
        handleBatchDelData() {

        },
        handleSelectionChange() {

        },
        handleEdit() {

        },
        handleDelete() {

        },
        submitAttrForm() {
            console.log("我要提交的内容：", this.attrForm);
            this.$axios.post("/adminAPI/Goods/attr/addAttr", this.attrForm).then(res => {
                this.dialogFormVisible = false;
                this.attrForm = {}
                this.getAttrList()
            })
        },
        handleClassificationChange(val) {
            this.$axios.post(`/adminAPI/Goods/attr_group/getGroup/${val.length}/${val[2]}`).then(res => {
                this.attrGroup = res.data.data
            })
        },
    },
}
</script>

<style scoped lang="less">
.attrBtn {
    display: flex;

    .el-input {
        width: 250px;
        margin-right: 10px;

        /deep/ .el-input__inner {
            border-radius: 20px;
        }
    }
}

.attrList {
    width: 96%;
}
</style>