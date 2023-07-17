<template>
    <div>
        <el-card class="box-card">
            <el-page-header content="商品分类" title="分类管理"></el-page-header>

            <div class="block">
                <div style="display: flex;">
                    <el-button type="primary" @click="addDFL">添加一级分类</el-button>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                    </el-input>
                </div>
                <el-tree :data="data" node-key="ID" :expand-on-click-node="false" accordion :filter-node-method="filterNode"
                    ref="tree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <div class="ClassificationName">
                            <span>{{ data.Name }}</span>
                        </div>
                        <div class="Operation">
                            <el-button type="text" size="mini" @click="() => append(node, data)" v-show="node.level < 3">
                                添加子类
                            </el-button>
                            <el-button type="text" size="mini" @click="() => edit(node, data)">
                                编辑
                            </el-button>
                            <el-button type="text" size="mini" @click="() => remove(node, data)">
                                删除
                            </el-button>
                        </div>
                    </span>
                </el-tree>
            </div>
            <el-dialog title="添加" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-input v-model="form.Name" placeholder="请输入名称"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addClassification">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "Classification",
    components: {},
    data() {
        return {
            data: [],
            form: {
                ID: null,
                Name: "",
                level: 0,
                parentID: null,
                state: ''
            },
            filterText: '',
            dialogVisible: false,
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    mounted() {
        this.getClassification()
    },
    methods: {
        getClassification() {
            this.$axios.get('/adminAPI/classification/list').then(res => {
                this.data = res.data.data
            })
        },

        append(node, data) {
            switch (node.level) {
                case 1:
                    this.form.level = 1
                    break;
                case 2:
                    this.form.level = 2
                    break;
            }
            this.form.state = 'add'
            this.form.parentID = data.ID
            this.dialogVisible = true
        },

        edit(node, data) {
            this.form = {
                state: "edit",
                Name: data.Name,
                ID: data.ID,
                level: node.level
            }
            this.dialogVisible = true
        },

        remove(node, data) {

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form = {
                    ID: data.ID,
                    Name: data.Name,
                    level: node.level
                }
                this.$axios.delete(`/adminAPI/classification/delClass/${node.level}/${data.ID}`).then(res => {
                    this.form = {}
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getClassification()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '分类中存在值，不能删除!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });





        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },

        addDFL() {
            this.dialogVisible = true,
                this.form.state = 'add'
        },

        addClassification() {
            this.dialogVisible = false
            // if (this.form.state === 'add') {
            console.log("当前状态：", this.form.state);
            this.$axios.post(`/adminAPI/classification/${this.form.state}Class`, this.form).then(res => {
                console.log("修改成功");
                this.form = {}
                this.getClassification()
            })
            // } else if (this.form.state === 'edit') {
            //     this.$axios.put('/adminAPI/classification/editClass', this.form).then(res => {
            //         this.form = {}

            //     })
            // }

        },

        filterNode(value, data) {
            if (!value) return true;
            return data.Name.indexOf(value) !== -1;
        }

    },
}
</script>

<style scoped>
.el-tree-node__content {
    height: 35px;
    line-height: 35px;
}

.custom-tree-node {
    display: flex;
    width: 100%;
}

.ClassificationName {
    width: 85%;
}

.Operation {
    width: 15%;
}

.block {
    margin-top: 40px;
}

.el-tree {
    margin-top: 20px;
}
</style>