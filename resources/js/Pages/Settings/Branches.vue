<template>    
    <div class="flex justify-between items-center mb-6">
        <h4 class="text-slate-900 dark:text-slate-200 text-lg font-medium">{{ $t('branch') }}</h4>

        <div class="md:flex hidden items-center gap-2.5 text-sm font-semibold">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">{{ $t('dashboard') }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/settings' }">{{ $t('settings') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $t('branch') }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    
    <el-card body-class="p-0">
        <div class="flex justify-between items-center p-4">
            <el-select v-model="params.limit" placeholder="Pilih" style="width: 115px" @change="fetchData(1)">
                <el-option label="25" value="25"/>
                <el-option label="50" value="50"/>
                <el-option label="100" value="100"/>
            </el-select>

            <div class="flex items-center gap-2">
                <el-button type="primary" @click.prevent="filterShow = !filterShow" :plain="filterShow">
                    <i class="mgc_filter_line me-2"></i>
                    Filter
                </el-button>
                <el-button type="primary" @click.prevent="create">
                    <i class="mgc_add_line me-2"></i>
                    {{ $t('create') }}
                </el-button>
            </div>
        </div>
        <transition name="slide-down">
            <div class="card-filter p-4" v-if="filterShow">
                <el-form label-position="top" @submit.prevent="fetchData">
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-form-item :label="$t('name')">
                                <el-input v-model="params.name" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="12">
                            <el-form-item :label="$t('address')">
                                <el-input v-model="params.address" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <div class="flex items-center gap-2">
                        <el-button type="primary" native-type="submit">
                            <i class="mgc_search_line me-2"></i>
                            {{ $t("search") }}
                        </el-button>
                        <el-button type="primary" @click.prevent="resetFilter">
                            <i class="mgc_refresh_3_line me-2"></i>
                            Reset
                        </el-button>
                    </div>
                </el-form>
            </div>
        </transition>
        <el-table class="min-w-full" 
            :data="dataList" v-loading="loading">
            <el-table-column prop="name" :label="$t('name')" header-align="center"/>
            <el-table-column prop="address" :label="$t('address')" header-align="center"/>
            <el-table-column :label="$t('action')" align="center" width="100">
                <template #default="scope">
                    <el-dropdown popper-class="dropdown-action" trigger="click">
                        <el-button type="primary">
                        {{ $t('action') }}
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.prevent="onEdit(scope.row.id)">
                                    <i class="mgc_edit_line"></i>
                                    {{  $t('edit') }}
                                </el-dropdown-item>
                                <el-dropdown-item @click.prevent="onDelete(scope.row.id)" v-if="scope.row.id != 1">
                                    <i class="mgc_delete_2_line"></i>
                                    {{ $t('delete') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-between items-center p-4">
            <div class="flex items-center gap-2">
                <p class="mb-0">{{ $t('tablePaginate', { from: params.from, to: params.to, total:params.total }) }}</p>
            </div>
            <div class="flex items-center gap-2">
                <el-pagination class="float-end" background layout="prev, pager, next"  
                    :page-size="params.pageSize" 
                    :total="params.total" 
                    :current-page="params.page" 
                    @current-change="fetchData"
                />
            </div>
        </div>
    </el-card>
    <el-dialog
    v-model="modalForm"
    :title="modalTitle"
    class="rounded-md">
        <el-form :model="form" @submit.prevent="onSubmit" label-position="top">
            <el-form-item :label="$t('name')" :error="errors.name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item :label="$t('address')">
                <el-input type="textarea" v-model="form.address" />
            </el-form-item>
            <div class="text-right">
                <el-button type="danger" plain @click.prevent="modalForm = false">
                    <i class="mgc_close_fill me-2"></i>
                    {{ $t('cancel') }}
                </el-button>
                <el-button native-type="submit" type="primary">
                    <i class="mgc_check_fill me-2"></i>
                    {{ $t('save') }}
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
import SelectUser from "@/Components/Form/SelectUser.vue";
export default {
    components : {
        SelectUser
    },
    data(){
        return {
            loading : false,
            dataList : [],
            params : {
                page : 1,
                limit : 25,
                from : 0,
                to : 0,
                total  : 0,
                pageSize : 0,
                name : null,
                manager_id : null,
                address : null,
            },
            filterShow : false,
            modalTitle : this.$t('create') + ' ' + this.$t('branch'),
            modalForm : false,
            form : {
                id : null,
                name : null,
                manager_id : null,
                address : null,
            },
            errors : {}
        }
    },
    async mounted(){
        await this.fetchData()
    },
    methods : {
        resetFilter()
        {
            this.params.name = null;
            this.params.address = null;
            this.fetchData(1);
        },
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.errors = {};
                this.loading = true;
                const response = await axios.get('/settings/branch',{
                    params: this.params
                });
                if(response.status == 200){
                    this.dataList = response.data.data;
                    this.params.from = response.data.from;
                    this.params.to = response.data.to;
                    this.params.page = response.data.current_page;
                    this.params.total = response.data.total;
                    this.params.pageSize = response.data.per_page;
                }
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
        async onSubmit()
        {
            this.loadingForm = true;
            var url = (this.form.id) ? `/settings/branch/${this.form.id}/update` : '/settings/branch/store';
            await axios.post(url, this.form).then(response => {
                const data = response.data.result;
                console.log(data);
                ElMessage({
                    message: this.$t('success_msg'),
                    type: 'success',
                });
                this.modalForm = false;
                this.resetForm();
                this.fetchData();
            }).catch(error => {
                this.errors = error.validation;
                ElMessage({
                    message: this.$t('error_msg'),
                    type: 'error',
                });
            });
            this.loadingForm = false;
        },
        create(){
            this.modalForm = true;
        },
        resetForm(){
            this.form.id = null;
            this.form.name = null;
            this.form.address = null;
        },
        async onEdit(id){
            await axios.get(`/settings/branch/${id}`).then(response => {
                const data = response.data;
                console.log(data);
                this.form.id = data.id;
                this.form.name = data.name;
                this.form.address = data.address;
                this.modalTitle = this.$t('edit') +' '+this.$t('branch');
                this.modalForm = true;
            }).catch(error => {
                console.log(error);
            });
        },
        onDelete(id){
            ElMessageBox.confirm(this.$t("delete_warning"), this.$t('warning'), {
                confirmButtonText: this.$t("ok"),
                cancelButtonText: this.$t("cancel"),
                type: 'warning',
            }).then(() => {
                // User confirmed deletion
                axios.delete(`/settings/branch/${id}/delete`).then(() => {
                    // Deletion successful
                    this.fetchData();
                    ElMessage({
                        type: 'success',
                        message: this.$t('delete_success'),
                    });
                }).catch(error => {
                    // Error occurred during deletion
                    console.error('Error deleting branch:', error);
                    ElMessage({
                        type: 'error',
                        message: this.$t('delete_cancel'),
                    });
                });
            }).catch(() => {
                // User cancelled deletion
                ElMessage({
                    type: 'info',
                    message: this.$t('delete_cancel')
                });
            });
        },
    }
}
</script>