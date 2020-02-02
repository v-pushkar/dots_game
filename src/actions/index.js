export const getGameSettings = data => ({
  type: "GET_GAME_SETTINGS",
  payload: data
});

export const winnersListToState = data => {
  return { type: "GET_WINNERS_LIST", payload: data };
};

export const onUserNameEnter = val => ({
  type: "ON_USERNAME_ENTER",
  payload: val
});
export const onModeSelect = val => ({
  type: "ON_MODE_SELECT",
  payload: val
});
export const onPlaygroundClick = val => ({
  type: "ON_PLAYGROUND_CLICK",
  payload: val
});

export const onGameStart = ()=>({
    type: "ON_GAME_START"
})
export const onGameStop = ()=>({
    type:"ON_GAME_STOP"
})
export const changePlayground = (data)=>({
    type: "ON_CHANGE_PLAYGROUND",
    payload:data
})
export const activeCellToState = (cell)=>({
    type: "ACTIVE_CELL_GENERATE",
    payload: cell
})

export const ifGetError = err => ({
  type: "IF_GER_ERROR",
  payload: err
});
