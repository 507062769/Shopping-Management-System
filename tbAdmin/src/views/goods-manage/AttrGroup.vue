<template>
    <div id="">

        <el-row :gutter="15">
            <el-col :span="6">
                <tree @treeClick="handleClickTree"></tree>
            </el-col>
            <el-col :span="18">
                <div class="attrBtn">
                    <el-input v-model="attrName" placeholder="参数名"></el-input>
                    <el-button type="success" round>查询</el-button>
                    <el-button type="primary" round>新增</el-button>
                    <el-button type="danger" round>批量删除</el-button>
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
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                                    disabled>删除</el-button>

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
    </div>
</template>

<script>
import tree from '../common/tree'
export default {
    name: "",
    components: { tree },
    data() {
        return {
            attrName: '',
            attrGroupData: [],
            currentPage4: 4
        }
    },
    create() { },
    mounted() { },
    watch: {},
    computed: {},
    methods: {
        handleEdit() {

        },
        handleDelete() {

        },
        handleSelectionChange() {

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClickTree(data, node, component) {
            console.log("父组件手坳辣", data, node, component);
            console.log("收到：", data.ID);
            this.$axios.post(`/adminAPI/Goods/attr_group/${data.ID}`).then(res => {
                console.log(res);
                this.attrGroupData = res.data.data
                console.log("data:", this.attrGroupData);
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