<template>
    <div id="">
        <el-card class="box-card">
            <el-page-header content="商品分类" title="分类管理"></el-page-header>

            <div class="block">
                <el-tree :data="data" node-key="id" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button type="text" size="mini" @click="() => append(data)">
                                添加
                            </el-button>
                            <el-button type="text" size="mini" @click="() => remove(node, data)">
                                删除
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-card>
    </div>
</template>

<script>
let id = 1000
export default {
    name: "Classification",
    components: {},
    data() {
        const data = [
            {
                id: 1,
                label: '一级 1',
                children: [
                    {
                        id: 4,
                        label: '二级 1-1',
                        children: [
                            {
                                id: 9,
                                label: '三级 1-1-1'
                            },
                            {
                                id: 10,
                                label: '三级 1-1-2'
                            }]
                    }]
            },
            {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            },
            {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];

        return {
            data: data,
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
            console.log("已经调用了getLI");
            this.$axios.get('/adminAPI/classification/list').then(res => {
                console.log("请求成功：", res);
            })
        },

        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

    },
}
</script>

<style scoped></style>