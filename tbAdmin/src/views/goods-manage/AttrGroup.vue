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
                    <el-button type="danger" round @click="handleDelete">批量删除</el-button>
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
                                <el-button size="mini" @click="handleRelevance(scope.row)">关联</el-button>
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

        <el-dialog title="关联属性" :visible.sync="relevanceVisible">
            <el-button type="primary" round @click="handleAddRelevance">新建关联</el-button>
            <el-button type="danger" round @click="removeRelevance">批量删除</el-button>
            <el-table ref="relevanceRef" :data="relevanceData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="attr_ID" label="ID" width="120" align="center">
                </el-table-column>
                <el-table-column prop="attr_Name" label="属性名" width="120" align="center">
                </el-table-column>
                <!-- <el-table-column prop="value_Select" label="可选值" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.value_Select }}</p>
                            <el-tag slot="reference" size="medium">{{ scope.row.value_Select }}</el-tag>
                        </el-popover>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" width="190" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger"
                            @click="removeRelevance(scope.$index, scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="选择属性" :visible.sync="addRelevanceVisible" width="500px">
            <el-table :data="attrByRelevanceData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" fixed>
                </el-table-column>
                <el-table-column prop="attr_Name" label="属性名" width="120" align="center">
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
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRelevanceVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectRelevanceSubmit">添加关联</el-button>
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
            relevanceVisible: false,
            addRelevanceVisible: false,
            // 要添加的数据
            addGroupForm: {
                state: 'add'
            },
            relevanceForm: {},
            // 三级分类展示
            classificationList: [],
            // 自定义树组件的选项
            zdyOption: {
                value: 'ID',
                label: 'Name',
                children: 'children'
            },
            batchDelData: [],
            relevanceData: [],
            attrByRelevanceData: [],
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
                localStorage.setItem("attr_group_list", JSON.stringify(this.attrGroupData))
            })
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row && (this.batchDelData = [], this.batchDelData.push(row))
                this.$axios.delete(`/adminAPI/Goods/attr_group/delGroup`, { data: this.batchDelData }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    })
                    this.getGroupList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSelectionChange(val) {
            this.batchDelData = []
            val.forEach(item => {
                this.batchDelData.push(item)
            });
            console.log("当前复选框中有：", this.batchDelData);
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
        handleRelevance(row) {
            this.relevanceVisible = true
            localStorage.setItem("currentGroup", JSON.stringify(row))
            console.log('row:', row);
            this.$axios.post(`/adminAPI/Goods/attr_group/getRelevance/${row.attr_Group_ID}`).then(res => {
                console.log('res:', res);
                this.relevanceData = res.data.data
                for (let i = 0; i < this.relevanceData.length; i++) {
                    this.relevanceData[i].attr_Group_ID = row.attr_Group_ID
                }
            })
        },
        removeRelevance(index, row) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row && (this.batchDelData = [], this.batchDelData.push(row))
                this.$axios.delete("/adminAPI/Goods/attr_group_relation/delRelevance",
                    { data: this.batchDelData })
                    .then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        this.handleRelevance(JSON.parse(localStorage.getItem("currentGroup")))
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        handleAddGroup() {
            this.addGroupVisible = true
            this.addGroupForm = {
                state: 'add',
            }
        },
        addGroup() {
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
        handleAddRelevance() {
            this.addRelevanceVisible = true
            this.$axios.get("/adminAPI/Goods/attr_group_relation/getNotGroupRelation",
                { params: { currentGroup: JSON.parse(localStorage.getItem("currentGroup")) } })
                .then(res => {
                    console.log("res:", res);
                    this.attrByRelevanceData = res.data.data
                })
        },
        selectRelevanceSubmit() {
            let data = JSON.parse(localStorage.getItem("currentGroup"))
            this.batchDelData.forEach(val => {
                val.attr_Group_ID = data.attr_Group_ID
            })
            this.$axios.post("/adminAPI/Goods/attr_group_relation/addRelation", this.batchDelData).then(res => {
                this.$message({
                    type: 'success',
                    message: '关联成功!'
                })
                this.addRelevanceVisible = false;
                this.handleRelevance(data)

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

.el-cascader {
    width: 600px;
}
</style>