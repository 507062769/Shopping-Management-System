<template>
    <div id="">
        <el-card class="box-card">
            <el-page-header content="商品分类" title="分类管理"></el-page-header>
            <div>
                <el-button type="primary" @click="dialogVisible = true">添加一级分类</el-button>
            </div>
            <div class="block">
                <el-tree :data="data" node-key="ID" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ data.Name }}</span>
                        <el-button type="text" size="mini" @click="() => append(node, data)" v-show="node.level < 3">
                            添加子类
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                            删除
                        </el-button>
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
                Name: "",
                level: 0,
                parentID: null,
            },

            dialogVisible: false,
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
            this.$axios.get('/adminAPI/classification/list').then(res => {
                let data = res.data.data
                for (let item in data) {
                    data[item]["children"] = data[item]["children"];
                }
                this.data = data
            })
        },

        append(node, data) {
            switch (node.level) {
                case 1:
                    this.form.level = 1
                    console.log("这是添加中分类");
                    break;
                case 2:
                    this.form.level = 2
                    console.log("这是添加小分类");
                    break;
            }
            this.form.parentID = data.ID
            this.dialogVisible = true
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        addClassification() {
            this.dialogVisible = false
            this.$axios.post("/adminAPI/classification/addClass", this.form).then(res => {
                this.getClassification()
                // this.getClassification()
            })
        }


    },
}
</script>

<style scoped></style>