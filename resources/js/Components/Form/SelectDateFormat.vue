<template>
    <el-select v-model="selected" value-key="id"
    filterable 
    clearable 
    remote
    @change="selectChange"
    autocomplete="off"
    :loading="isLoading"
    :placeholder="placeholder">
        <el-option
            v-for="item in dataList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
    </el-select>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  placeholder: {
    type: String,
    default: '',
  },
});


const emit = defineEmits(['update:modelValue']);

const dataList = ref([
    
]);
const selected = ref(props.modelValue);
const isLoading = ref(false);

watch(() => props.modelValue, (newValue) => {
    selected.value = newValue;
});

const selectChange = (v) => {
  emit('update:modelValue', v);
};
</script>