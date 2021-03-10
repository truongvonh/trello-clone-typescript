export const AUTH_ENDPOINT = {
  LOGIN: '/auth/login',
  LOG_OUT: '/auth/log-out',
  GET_USER_LOGIN: '/auth/user-info',
};

export const DEVICE_ENDPOINT = {
  REGISTER: '/device/register',
};

export const BOARD_ENDPOINT = {
  CREATE_BOARD: '/board',
  GET_BOARD_OF_USER: (userId: string) => `board/${userId}`,
};

export const UNSPLASH_ENDPOINT = {
  GET_ALL: '/unsplash',
};

export const LIST_ENDPOINT = {
  GET_ALL: (boardId: string) => `/lists/${boardId}`,
  ON_UPDATE_LIST: (listId: string) => `/lists/${listId}`,
  CREATE_LIST: `/lists`,
};

export const CARD_ENDPOINT = {
  NEW_CARD: `/card`,
  UPDATE_CARD: (cardId: string) => `/card/${cardId}`,
  UPDATE_CARD_ORDER: (cardId: string) => `/card/${cardId}/order`,
};
