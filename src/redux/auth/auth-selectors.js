export const getIsAuthorized = (state) => state.auth.isAuthorized;
export const getUserName = (state) => state.auth.user.name;

export const getLoadingUser = (state) => state.auth.loading;
export const getError = (state) => state.auth.error;
