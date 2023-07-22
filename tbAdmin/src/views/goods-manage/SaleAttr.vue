<template>
    <div id="">
        <el-row :gutter="15">
            <el-col :span="6">
                <tree @treeClick="handleClickTree"></tree>
            </el-col>
            <el-col :span="18">
                <div class="attrBtn">
                    <el-input v-model="searchAttrName" placeholder="请输入要搜索的属性名" clearable></el-input>
                    <el-button type="success" round @click="attrNameSearch">查询</el-button>
                    <el-button type="primary" round @click="handleAddAttr">新增</el-button>
                    <el-button type="danger" round @click="handleBatchDelData">批量删除</el-button>
                </div>
                <div class="attrList">
                    <el-table border ref="multipleTable" :data="attrData" tooltip-effect="dark" style="width: 100%"
                        max-height="500" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="50" align="center" fixed>
                        </el-table-column>
                        <el-table-column prop="attr_ID" label="属性ID" width="70" align="center" fixed>
                        </el-table-column>
                        <el-table-column prop="attr_Name" label="属性名" width="120" align="center" fixed>
                        </el-table-column>
                        <el-table-column prop="attr_Type" label="属性类型" width="100" align="center">
                            <template slot-scope="scope">
                                <el-tag size="medium" v-show="scope.row.attr_Type === '0'">销售属性</el-tag>
                                <el-tag size="medium" v-show="scope.row.attr_Type === '1'">规格参数</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value_Type" label="值类型" width="80" align="center">
                            <template slot-scope="scope">
                                <el-tag size="medium" v-show="scope.row.value_Type === '0'">多值</el-tag>
                                <el-tag size="medium" v-show="scope.row.value_Type === '1'">单值</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value_Select" label="可选值" width="180" align="center">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.value_Select }}</p>
                                    <el-tag slot="reference" size="medium">{{ scope.row.value_Select }}</el-tag>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xflName" label="所属类别" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="enable" label="是否可见" width="80" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="190" align="center" fixed="right">
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
                                    <el-option label="规格参数" value="1" disabled></el-option>
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
                            <el-form-item label=" 是否启用" label-width="100px">
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
            // 搜索框的值
            searchAttrName: "",
            // table展示的内容来源
            attrData: [],
            // 添加/编辑时数据存放地
            attrForm: {
                attr_ID: '',
                attr_Name: '',
                attr_Type: '',
                value_Type: '0',
                value_Select: '',
                xflName: '',
                enable: '1',

            },
            // 添加/编辑的 dialog 是否显示
            dialogFormVisible: false,
            // 三级分类集合
            classificationList: [],
            // 自定义树展示方式
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            // 属性组的内容
            attrGroup: [],
            // 属性与组的关系字段
            attr_group_relation: [],
            batchDelData: [],
        }
    },
    create() { },
    mounted() {
        // this.getAttrGroupRelation()

        this.getAttrList()
        this.getClassificationList()
    },
    watch: {},
    computed: {},
    methods: {
        // 获取三级分类列表
        getClassificationList() {
            this.classificationList = JSON.parse(localStorage.getItem("classificationList"))
        },
        // 获取属性列表并显示对应的名称
        getAttrList() {
            this.$axios.get(`/adminAPI/Goods/attr/getAttrList`, { params: { 'attr_Type': '0' } }).then(res => {
                this.attrData = res.data.data
                const attrGroupList = JSON.parse(localStorage.getItem("attr_group_list"))
                this.attrData.forEach(data => {
                    this.classificationList.forEach(Dfl => {
                        Dfl["children"].forEach(Zfl => {
                            Zfl["children"].forEach(xfl => {
                                if (data.xflID === xfl.ID) data['xflName'] = xfl.Name
                            })
                        })
                    });
                    this.attr_group_relation.forEach(rela => {
                        if (data.attr_ID === rela.attr_ID) {
                            attrGroupList.forEach(group => {
                                if (group.attr_Group_ID === rela.attr_Group_ID) {
                                    data['groupName'] = group.attr_Group_Name;
                                    data['attr_group_ID'] = group.attr_Group_ID
                                }
                            })
                        }
                    })
                })
            })
        },

        // getAttrGroupRelation() {
        //     this.$axios.get("/adminAPI/Goods/attr_group_relation/getList").then(res => {
        //         this.attr_group_relation = res.data.data
        //     })
        // },
        // 处理点击分类后的逻辑
        handleClickTree(data, node, component) {

        },

        // 处理点搜索按钮后逻辑
        attrNameSearch() {
            this.searchAttrName !== '' ? this.$axios.post(`/adminAPI/Goods/attr/searchName`, { searchName: this.searchAttrName, attr_Type: '0' }).then(res => {
                console.log(res);
                this.attrData = res.data.data
            }) : this.getAttrList()
        },
        // 处理点击添加的逻辑
        handleAddAttr() {
            this.dialogFormVisible = true
        },
        // 处理批量删除
        handleBatchDelData() {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/adminAPI/Goods/attr/delAttr`, { data: this.batchDelData }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    })
                    this.getAttrList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //  处理 选中分类后的逻辑
        handleSelectionChange(val) {
            this.batchDelData = []
            val.forEach(item => {
                this.batchDelData.push(item.attr_ID)
            });
        },
        // 处理编辑
        handleEdit(row) {
            console.log("我点了编辑：", row);
            // this.attrForm = row
            // // this.attrForm.value_Select.push('aa')
            // console.log("我在看attrForm：", this.attrForm);
            // // console.log("值选择：", );
            // this.value = row.value_Select.split('，')
            // console.log(this.value);
            // this.dialogFormVisible = true
        },
        // 处理删除 
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const arr = []
                arr.push(row.attr_ID)
                this.$axios.delete(`/adminAPI/Goods/attr/delAttr`, { data: arr }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.attrData.pop(index)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 处理提交表单
        submitAttrForm() {
            this.$axios.post("/adminAPI/Goods/attr/addAttr", this.attrForm).then(res => {
                if (res.data.data.attr_ID) {
                    this.$axios.post("/adminAPI/Goods/attr_group_relation/addRelation",
                        {
                            attr_ID: res.data.data.attr_ID,
                            attr_Group_ID: this.attrForm.attr_group_ID
                        })
                        .then(resp => {
                            this.attr_group_relation.push(resp.data.data)
                        })
                }
                this.dialogFormVisible = false;
                this.attrForm = {}
                this.getAttrList()
            })
        },
        // 处理分类被选中后逻辑
        handleClassificationChange(val) {
            if (val) {
                this.$axios.post(`/adminAPI/Goods/attr_group/getGroup/${val.length}/${val[2]}`).then(res => {
                    this.attrGroup = res.data.data
                })
            }

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