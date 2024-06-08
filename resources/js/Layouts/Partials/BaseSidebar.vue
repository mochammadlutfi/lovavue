<template>
    <div id="page-sidebar">

        <!-- Sidenav Brand Logo -->
        <router-link to="/dashboard" class="logo">
            <!-- Light Brand Logo -->
            <div class="logo-light">
                <img :src="app.logo_dark" class="logo-lg h-6" alt="Light logo">
                <img src="/images/logo-sm.png" class="logo-sm" alt="Small logo">
            </div>

            <!-- Dark Brand Logo -->
            <div class="logo-dark">
                <img :src="app.logo_light" class="logo-lg h-6" alt="Dark logo">
                <img src="/images/logo-sm.png" class="logo-sm" alt="Small logo">
            </div>
        </router-link>
        
        <el-scrollbar class="scrollbar">
            <el-menu class="menu-ver" :collapse="isCollapse" router :default-active="$route.path">
                <template v-for="(node, index) in navigation" :key="`node-${index}`" >
                    <template v-if="node.sub">
                        <el-sub-menu :index="node.subActivePaths" popper-class="submenu-popper">
                            <template #title>
                                <i :class="`${node.icon} el-icon`"></i>
                                <span v-if="node.name" class="menu-text">{{ t(`${node.name}`) }}</span>
                            </template>
                            <el-menu-item :index="su.to"  v-for="(su, si) in node.sub" :key="si" :route="su.to">
                                {{ t(`${su.name}`) }}
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="node.to" :route="node.to">
                            <i :class="`${node.icon} el-icon`"></i>
                            <template #title>
                                <span v-if="node.name" class="menu-text">{{ t(node.name) }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script setup>
import menuList from '@/menu.js';
import simplebar from 'simplebar-vue';
import { useAppBaseStore } from '@/stores/base';
import { ref, computed } from 'vue';
const navigation = ref(menuList.main);
const appBase = useAppBaseStore();
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const app = computed(() => appBase.app);

const isCollapse = computed(() => appBase.settings.sidebarMini);

</script>
