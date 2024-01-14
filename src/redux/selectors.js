export const getIsAuthenticated = (state) => state.users.isAuthenticated;
export const getUserToken = (state) => state.users.user?.data.token;
export const getTokenValability = (state) =>
  state.users.user?.data.tokenValability;

export const getUserInfo = (state) => state.users.user.data.user;
export const getUserError = (state) => state.users.error;
export const getIsLoadingUser = (state) => state.users.isLoading;
export const getUser = (state) => state.users.userInfo;
export const getMessage = (state) => state.users.message;

export const getCalories = (state) => state.diary.publicInfo;
export const getDiaryError = (state) => state.diary.error;
export const getDiariesData = (state) => state.diary.diaries;
export const getDate = (state) => state.diary.date;
export const getSearchResults = (state) => state.diary.searchResults;
export const getSearchQuery = (state) => state.diary.searchQuery;
export const getIsLoadingDiary = (state) => state.diary.isLoading;

export const selectModal = (state) => state.modal;
