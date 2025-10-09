export const hasPermission = (permissionId) => {
  const permissions =
    JSON.parse(localStorage.getItem("user_permissions")) || [];
  return permissions.includes(permissionId);
};
