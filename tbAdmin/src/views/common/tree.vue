<template>
    <div id="">
        <el-tree :data="data" node-key="ID" :expand-on-click-node="false" accordion ref="tree" @node-click="handleClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.Name }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            data: [],
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
                this.data = res.data.data
            })
        },
        handleClick(data, node, component) {
            console.log("树组件被点击:", data, node, component);
            this.$emit("treeClick", data, node, component)
        },

    },
}
</script>

<style scoped></style>