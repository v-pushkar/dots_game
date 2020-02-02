import { act } from "@testing-library/react";

const initialState = {
  gameResalt: null,
  gameSettings: {},
  winnersList: null,
  userName: "",
  playGround: [],
  activCell: null,
  clickedCell: null,
  gameMode: null,
  isGameStart: false
};
const createPlayGround = size => {
  const matrix = new Array(size).fill(0).map((o, i) => new Array(size).fill(0));
  return matrix;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GAME_SETTINGS":
      return {
        ...state,
        gameSettings: action.payload
      };
    case "GET_WINNERS_LIST":
      return {
        ...state,
        winnersList: action.payload
      };
    case "ON_USERNAME_ENTER":
      return {
        ...state,
        userName: action.payload
      };
    case "ON_MODE_SELECT":
      return {
        ...state,
        gameMode: action.payload.split("-"),
        playGround: createPlayGround(parseInt(action.payload.split("-")[0]))
      };
    case "CREATE_PLAYGROUND":
      return {
        ...state,
        playGround: action.payload
      };
    case "ON_GAME_START":
      return {
        ...state,
        isGameStart: true,
        gameResalt: { name: state.userName, winner: null, date: null }
      };
    case "ON_GAME_STOP":
      return {
        ...state,
        isGameStart: false,
        playGround: createPlayGround(parseInt(state.gameMode[0])),
        activCell: null,
        clickedCell: null
      };
    case "ON_CHANGE_PLAYGROUND":
      return {
        ...state,
        playGround: action.payload
      };
    case "ACTIVE_CELL_GENERATE":
      return {
        ...state,
        activCell: action.payload
      };
    case "ON_PLAYGROUND_CLICK":
      return {
        ...state,
        clickedCell: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
