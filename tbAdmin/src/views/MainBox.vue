<template>
    <div id="">
        <el-container>
            <sideMenu></sideMenu>
            <el-container direction="vertical">
                <topHeader></topHeader>
                <div class="context">
                    <router-view></router-view>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import topHeader from "../components/mainBox/topHeader"
import sideMenu from "../components/mainBox/sideMenu"
export default {
    name: "MainBox",
    components: { topHeader, sideMenu },
    data() {
        return {
        }
    },
    create() { },
    mounted() { },
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style scoped>
.context {
    margin: 20px;
}
</style>