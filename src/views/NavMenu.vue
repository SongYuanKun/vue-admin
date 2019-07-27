<template>
    <div>
        <template v-for="(navMenus,index) in navMenus" v-if="!navMenus.hidden">
            <el-submenu :index="index+''" v-if="!navMenus.leaf">
                <template slot="title"><i :class="navMenus.iconCls"></i>{{navMenus.name}}</template>
                <el-menu-item v-for="child in navMenus.children" :index="child.path" :key="child.path"
                              v-if="!child.hidden">{{child.name}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="navMenus.leaf&&navMenus.children.length>0" :index="navMenus.children[0].path"><i
                    :class="navMenus.iconCls"></i>{{navMenus.children[0].name}}
            </el-menu-item>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'navMenus',
        props: ['navMenus'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style>
</style>
