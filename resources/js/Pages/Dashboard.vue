<script setup>
import useGeneralHelper from '@/Composable/common';
const { can } = useGeneralHelper();
</script>

<template>
    <div class="flex justify-between items-center mb-6">
        <h4 class="text-slate-900 dark:text-slate-200 text-lg font-medium">Dashboard</h4>
        <h1 v-if="can('branch.view')">Contoh</h1>
    </div>
</template>
