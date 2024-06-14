
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';


const useGeneralHelper = () => {
    const authStore = useAuthStore();

    const dayjsObject = (date) => {
        if (date == undefined) {
            return dayjs().tz(appSetting.value.timezone);
        } else {
            return dayjs(date).tz(appSetting.value.timezone);
        }
    }

    const can = (permission) => {
        computed(() => {
            return authStore.checkPermission(permission);
        });
    };

    return {
        can
    };
}


export default useGeneralHelper;