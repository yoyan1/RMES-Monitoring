<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/home/overview' }]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Students',
                icon: 'pi pi-fw pi-server',
                to: '/pages/students'
            },
            {
                label: 'Attendance',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/crud'
            },
            {
                label: 'Request',
                icon: 'pi pi-fw pi-inbox',
                to: '/pages/timeline'
            },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-users',
                to: '/pages/notfound'
            },
            {
                label: 'Setting',
                icon: 'pi pi-fw pi-cog',
                to: '/pages/empty'
            }
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu ">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item  :item="item" :index="i"></app-menu-item>
            <li v-if="item" class="menu-separator"></li>
        </template>
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
