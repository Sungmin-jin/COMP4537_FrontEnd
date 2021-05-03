import { GET_CHAT_IDS } from "../action/types";

const initialState = {
  myChatIds: [],
  sellerChatIds: [],
  chats: [],
  loading: true,
};

export default function chatReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAT_IDS:
      return {
        ...state,
        loading: false,
        myChatIds: payload.myChatIds,
        sellerChatIds: payload.sellerChatIds,
      };
    default:
      return state;
  }
}
