<template>
    <div>
        <template v-for="(navMenu,index) in navMenus" v-if="!navMenu.hidden">
            <el-submenu :index="index+''" v-if="!navMenu.leaf">
                <template slot="title"><i :class="navMenu.iconCls"></i>{{navMenu.name}}</template>
                <el-menu-item v-for="child in navMenu.children" :index="child.path" :key="child.path"
                              v-if="!child.hidden">{{child.name}}
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="navMenu.leaf&&navMenu.children.length>0" :index="navMenu.children[0].path"><i
                    :class="navMenu.iconCls"></i>{{navMenu.children[0].name}}
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
