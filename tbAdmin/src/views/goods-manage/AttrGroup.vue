<template>
    <div id="">

        <el-row :gutter="15">
            <el-col :span="6">
                <tree @treeClick="handleClickTree"></tree>
            </el-col>
            <el-col :span="18">
                <div class="attrBtn">
                    <el-input v-model="attrGroupName" placeholder="参数名"></el-input>
                    <el-button type="success" round @click="groupNameSearch">查询</el-button>
                    <el-button type="primary" round @click="handleAddGroup">新增</el-button>
                    <el-button type="danger" round @click="handleBatchDelData">批量删除</el-button>
                </div>
                <div class="attrList">
                    <el-table border ref="multipleTable" :data="attrGroupData" tooltip-effect="dark" style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="attr_Group_ID" label="分组ID" width="150" align="center">
                        </el-table-column>
                        <el-table-column prop="attr_Group_Name" label="组名" width="240" align="center">
                        </el-table-column>
                        <el-table-column prop="xflID" label="所属分类ID" width="220" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="263" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="footer">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="新增分组" :visible.sync="addGroupVisible" :before-close="close">
            <el-form :model="addGroupForm">
                <el-form-item label="分组名称" label-width="120px">
                    <el-input v-model="addGroupForm.attr_Group_Name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属类别ID" label-width="120px" prop="classification">
                    <el-cascader v-model="addGroupForm.classificationID" :options="classificationList" :props="zdyOption"
                        clearable>
                        <template slot-scope="{ node, data }">
                            <span>{{ data.Name }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGroupVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGroup">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tree from '../common/tree'
export default {
    name: "",
    components: { tree },
    data() {
        return {
            // 搜索框内容
            attrGroupName: '',
            // 表格展示的内容
            attrGroupData: [],
            // 分页
            currentPage4: 4,
            // 添加页面是否展示
            addGroupVisible: false,
            // 要添加的数据
            addGroupForm: {
                state: 'add'
            },
            // 三级分类展示
            classificationList: [],
            // 自定义树组件的选项
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            batchDelData: [],
        }
    },
    create() { },
    mounted() {
        this.getClassificationList()
        this.getGroupList()
    },
    watch: {},
    computed: {},
    methods: {
        getClassificationList() {
            this.$axios.get('/adminAPI/classification/list').then(res => {
                this.classificationList = res.data.data
            })
        },
        getGroupList() {
            this.$axios.get("/adminAPI/Goods/attr_group/getGroupList").then(res => {
                this.attrGroupData = res.data.data
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const arr = []
                arr.push(row.attr_Group_ID)
                this.$axios.delete(`/adminAPI/Goods/attr_group/delGroup`, { data: arr }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    })
                    this.attrGroupData.splice(index, 1)
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleBatchDelData() {
            this.$axios.delete(`/adminAPI/Goods/attr_group/delGroup`, { data: this.batchDelData }).then(res => {
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            })
        },
        handleSelectionChange(val) {
            this.batchDelData = []
            val.forEach(item => {
                this.batchDelData.push(item.attr_Group_ID)
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClickTree(data, node, component) {
            this.$axios.post(`/adminAPI/Goods/attr_group/getGroup/${node.level}/${data.ID}`).then(res => {
                this.attrGroupData = res.data.data
            })
        },
        handleEdit(row) {
            this.addGroupVisible = true;
            this.addGroupForm = {
                attr_Group_Name: row.attr_Group_Name,
                classificationID: [row.dflID, row.zflID, row.xflID],
                attr_Group_ID: row.attr_Group_ID,
                state: 'edit',
            }
        },
        handleAddGroup() {
            this.addGroupVisible = true
            this.addGroupForm = {
                state: 'add',
            }
        },
        addGroup() {
            console.log("要穿的值：", this.addGroupForm);
            if (this.addGroupForm.state === 'edit') {
                this.$axios.put("/adminAPI/Goods/attr_group/putGroup", this.addGroupForm).then(res => {
                    this.addGroupVisible = false
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    })
                    this.getGroupList()
                })
            } else if (this.addGroupForm.state === 'add') {
                this.addGroupVisible = false
                this.$axios.post("/adminAPI/Goods/attr_group/addGroup", this.addGroupForm).then(res => {
                    this.attrGroupData.push(res.data.data)
                })
            }
            this.addGroupForm = {}
        },
        close() {
            this.addGroupVisible = false;
            this.addGroupForm = {}
        },
        groupNameSearch() {
            this.attrGroupName !== '' ?
                this.$axios.post(`/adminAPI/Goods/attr_group/searchName/${this.attrGroupName}`).then(res => {
                    this.attrGroupData = res.data.data
                }) :
                this.getGroupList()
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

.el-cascader {
    width: 600px;
}
</style>