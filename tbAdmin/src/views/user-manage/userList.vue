<template>
    <div id="">
        <el-card class="box-card">
            <el-page-header content="用户列表" title="用户管理"></el-page-header>
            <el-table :data="userInfoList" stripe border>
                <el-table-column label="用户名" prop="userName" width="250" align="center">
                </el-table-column>
                <el-table-column label="头像" width="250" align="center">
                    <template slot-scope="scope">
                        <el-avatar :size="50"
                            :src="scope.row.avatar ? 'http://localhost:3000' + scope.row.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="性别" width="250" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.sex === 0">保密</template>
                        <template v-else-if="scope.row.sex === 1">男</template>
                        <template v-else-if="scope.row.sex === 2">女</template>
                        <template v-else>错误</template>
                    </template>
                </el-table-column>
                <el-table-column label="角色" width="250" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.role === 1">管理员</el-tag>
                        <el-tag v-else-if="scope.row.role === 2" type="warning">商家</el-tag>
                        <el-tag v-else-if="scope.row.role === 3" type="success">观察者</el-tag>
                        <el-tag v-else type="danger">错误</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="254" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.userName === 'admin'" size="mini" type="danger"
                            @click="handleDelete(scope.$index, scope.row)" disabled>删除</el-button>
                        <el-button v-else size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="30%">
                <el-form :model="userInfo" :rules="userInfoRule" ref="userInfoRuleRef" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord">
                        <el-input v-model="userInfo.passWord" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="userInfo.sex">
                            <el-radio :label="0">保密</el-radio>
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="userInfo.role" placeholder="请选择">
                            <el-option v-for="r in roles" :key="r.rid" :label="r.roleName" :value="r.rid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitUserEdit('userInfoRuleRef')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "userList",
    components: {},
    data() {
        return {
            userInfoList: [],
            dialogVisible: false,
            userInfo: {
                avatarFile: ""
            },
            userInfoRule: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 20, message: '长度在20个字符', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { max: 20, message: '长度在10个字符', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'blur' },
                ],
            },
            roles: [
                {
                    rid: 1,
                    roleName: '管理员'
                }, {
                    rid: 2,
                    roleName: '商家'
                }, {
                    rid: 3,
                    roleName: '观察者'
                },
            ]
        }
    },
    create() { },
    mounted() {
        this.getUserInfoList()
    },
    watch: {},
    computed: {},
    methods: {
        getUserInfoList() {
            this.$axios.get('/adminAPI/user/list').then(res => {
                this.userInfoList = res.data.data
            })
        },
        handleEdit(row) {
            this.userInfo = row
            this.dialogVisible = true;
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/adminAPI/user/list/${row.uid}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getUserInfoList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        submitUserEdit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) { //符合规则
                    console.log("当前的this.userInfo：", this.userInfo);
                    this.$axios.put('/adminAPI/user/list', this.userInfo).then(res => {
                        console.log(res);
                        // 返回200就更新localStore里的用户信息，并提醒用户更新成功
                        if (res.data.code === '200') {
                            this.$message({
                                message: "编辑成功",
                                type: 'success'
                            });
                            this.dialogVisible = false;
                        } else {
                            this.$message({
                                message: "出错啦！",
                                type: 'warning'
                            });
                        }
                    })


                }
            })
        }
    },
}
</script>

<style scoped>
.el-table {
    margin-top: 40px;
    width: 100%;
}
</style>