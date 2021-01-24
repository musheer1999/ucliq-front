const initialState = {
  name: "",
  phoneNo: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_ANON_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_ANON_PHONE":
      return {
        ...state,
        phoneNo: action.payload,
      };
    default:
      return state;
  }
}
