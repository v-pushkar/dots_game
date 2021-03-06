const initialState = {
  gameResalt: { winner: null },
  winner: null,
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
    // case "ON_GAME_START":
    //   return {
    //     ...state,
    //     isGameStart: true,
    //     gameResalt: { name: state.userName, winner: null, date: null }
    //   };
    case "ON_GAME_STOP":
      return {
        ...state,
        isGameStart: false,
        activCell: null,
        clickedCell: null,
        gameResalt: { name: state.userName, winner: null }
      };
    case "ON_GAME_START":
      return {
        ...state,
        winner: null,
        isGameStart: true,
        playGround: createPlayGround(parseInt(state.gameMode[0])),
        activCell: null,
        clickedCell: null,
        gameResalt: { name: state.userName, winner: null, date: null }
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
    case "ON_GET_WINNER":
     
      return {
        ...state,
        winner: action.payload,
        gameResalt: {
          ...state.gameResalt,
          winner: action.payload,
          date: new Date()
        }
      };
    default:
      return state;
  }
};
export default reducer;
