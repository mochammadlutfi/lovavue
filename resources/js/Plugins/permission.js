export default {
    bind(el, binding, vnode) {
      const userPermissions = vnode.context.$store.state.user.permissions;
      const requiredPermission = binding.value;
  
      if (!userPermissions.includes(requiredPermission)) {
        el.style.display = 'none';
      }
    }
  };