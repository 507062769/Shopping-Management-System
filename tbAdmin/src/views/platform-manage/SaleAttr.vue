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
                    <el-button type="danger" round @click="handleDelete">批量删除</el-button>
                </div>
                <div class="attrList">
                    <el-table border ref="multipleTable" :data="attrData" tooltip-effect="dark" style="width: 100%"
                        max-height="700" @selection-change="handleSelectionChange">
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
                        <!-- <el-table-column prop="groupName" label="所属分组" width="80" align="center">
                        </el-table-column> -->
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

                    <el-dialog title="添加属性" :visible.sync="dialogFormVisible" :before-close="closeDialog">
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
                                <el-cascader v-model="attrForm.classifition" :options="classificationList"
                                    :props="zdyOption" clearable filterable>
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
                value_Type: '',
                value_Select: '',
                classifition: '',
                xflName: '',
                enable: '1',
                state: 'add',
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
            // 属性与组的关系字段
            attr_group_relation: [],
            batchDelData: [],
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
        // 获取三级分类列表
        getClassificationList() {
            this.classificationList = JSON.parse(localStorage.getItem("classificationList"))
        },
        // 获取属性列表并显示对应的名称
        getAttrList() {
            this.$axios.get(`/adminAPI/Platform/attr/getAttrList`, { params: { 'attr_Type': '0' } }).then(res => {
                this.attrData = res.data.data
                this.attrData.forEach(data => {
                    this.classificationList.forEach(Dfl => {
                        Dfl["children"].forEach(Zfl => {
                            Zfl["children"].forEach(xfl => {
                                if (data.xflID === xfl.ID) data['xflName'] = xfl.Name
                            })
                        })
                    });
                })
            })
        },
        // 处理点击分类后的逻辑
        handleClickTree(data, node, component) {
            console.log('点击的数据：', data, "节点是：", node);
            this.$axios.post(`/adminAPI/Platform/attr/getAttr/${node.level}/${data.ID}`, { attr_Type: '0' }).then(res => {
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
        // 处理点搜索按钮后逻辑
        attrNameSearch() {
            this.searchAttrName !== '' ? this.$axios.post(`/adminAPI/Platform/attr/searchName`, { searchName: this.searchAttrName, attr_Type: '0' }).then(res => {
                console.log(res);
                this.attrData = res.data.data
            }) : this.getAttrList()
        },
        // 处理点击添加的逻辑
        handleAddAttr() {
            this.dialogFormVisible = true
        },
        //  处理 多选分类后的逻辑
        handleSelectionChange(val) {
            this.batchDelData = []
            val.forEach(item => {
                this.batchDelData.push({ attr_ID: item.attr_ID })
            });
        },
        // 处理编辑
        async handleEdit(row) {
            console.log("我点了编辑：", row)
            this.dialogFormVisible = true
            await this.$axios.post(`/adminAPI/Platform/attr_group/getGroup/${row.xflID}`).then(res => {
                this.attrGroup = res.data.data
            })
            this.attrForm = {
                attr_ID: row.attr_ID,
                attr_Name: row.attr_Name,
                attr_Type: row.attr_Type,
                value_Type: row.value_Type,
                value_Select: row.value_Select,
                xflID: row.xflID,
                attr_group_ID: row.attr_group_ID,
                groupName: row.xflName,
                enable: row.enable,
                state: 'edit',
            }
            // this.value_Select = row.value_Select.split('，')
            // console.log("我点了编辑：", row, this.attrGroup, this.attrForm);

        },
        // 处理删除 
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                row && (this.batchDelData = [], this.batchDelData.push(row))
                this.$axios.delete(`/adminAPI/Platform/attr/delAttr`, { data: this.batchDelData }).then(res => {
                    this.$axios.delete("/adminAPI/Platform/attr_group_relation/delRelevanceByAttr", { data: this.batchDelData }).then(resp => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getAttrList()
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 处理提交表单
        async submitAttrForm() {
            if (this.attrForm.state === 'add') {
                await this.$axios.post("/adminAPI/Platform/attr/addAttr", this.attrForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    })
                    this.attrForm = {
                        attr_ID: '',
                        attr_Name: '',
                        attr_Type: '',
                        value_Type: '1',
                        value_Select: '',
                        xflName: '',
                        groupName: '',
                        enable: '1',
                        attr_group_ID: '',
                        state: 'add',
                    }
                })
            } else if (this.attrForm.state === 'edit') {
                this.$axios.put("/adminAPI/Platform/attr/putAttr", this.attrForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '编辑成功！'
                    })
                })
            }
            this.getAttrList()
            this.dialogFormVisible = false;
        },
        closeDialog() {
            this.attrForm = {}
            this.dialogFormVisible = false
        }
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