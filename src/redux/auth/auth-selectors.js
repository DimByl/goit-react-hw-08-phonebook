const getIsAuthorized = (state) => state.auth.isAuthorized;
const getUserName = (state) => state.auth.user.name;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getIsAuthorized,
  getUserName,
};
