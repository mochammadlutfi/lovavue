<template>
    <el-card class="shadow-sm sm:rounded-lg" v-loading="loading">
        <el-form :model="form" @submit.prevent="onSubmit" label-position="top">
            <el-form-item :label="$t('user.avatar')" :error="errors.company_address">
                <upload-image v-model="form.logo_dark_sm"/>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :md="12">
                    <el-form-item :label="$t('name')" :error="errors.app_name">
                        <el-input v-model="form.app_name" />
                    </el-form-item>
                    <el-form-item :label="$t('username')" :error="errors.company_email">
                        <el-input v-model="form.company_email" />
                    </el-form-item>
                </el-col>
                <el-col :md="12">
                    <el-form-item :label="$t('email')" :error="errors.company_name">
                        <el-input v-model="form.company_name" />
                    </el-form-item>
                    <el-form-item :label="$t('phone')" :error="errors.company_phone">
                        <el-input v-model="form.company_phone" />
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="text-right">
                <el-button native-type="submit" type="primary">
                    <i class="mgc_check_fill me-2"></i>
                    {{ $t('save') }}
                </el-button>
            </div>
        </el-form>
    </el-card>
</template>

<script setup>
import { defineProps, onMounted, defineEmits, ref } from 'vue';
import SelectBranch from '@/Components/Form/SelectBranch.vue';
import SelectDateFormat from '@/Components/Form/SelectDateFormat.vue';
import SelectTimeFormat from '@/Components/Form/SelectTimeFormat.vue';
import UploadImage from '@/Components/Form/UploadImage.vue';
import { useI18n } from 'vue-i18n';
const t = useI18n();

const emit = defineEmits(['childinit']);
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});


const form = ref({
    avatar : null,
    name : null,
    username : null,
    email : null,
});
const errors = ref({});
const loading = ref(false);

const onSubmit = async () => {
    loading.value = true;
    const url = '/settings/email/update';
    try {
        const response = await axios.post(url, form.value);
        console.log(response.data.result);
        ElMessage({message: t('success_msg'), type: 'success'});
    } catch (error) {
        errors.value = error.validation;
        ElMessage({message: t('error_msg'), type: 'error'});
    } finally {
        loading.value = false;
    }
};

const fetchData = async () => {
  try {
    errors.value = {};
    loading.value = true;
    const response = await axios.get('/profile');
    if (response.status === 200) {
      form.value.app_name = response.data.app_name;
      form.value.company_name = response.data.company_name;
      form.value.company_email = response.data.company_email;
      form.value.company_phone = response.data.company_phone;
      form.value.company_address = response.data.company_address;
      form.value.logo_light = response.data.logo_light;
      form.value.logo_dark = response.data.logo_dark;
      form.value.logo_light_sm = response.data.logo_light_sm;
      form.value.logo_dark_sm = response.data.logo_dark_sm;
      form.value.branch = response.data.branch;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  emit('childinit', 'Devices');
  fetchData();
});
</script>


