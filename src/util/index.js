export const createRandomNum = max =>
  Math.floor(Math.random() * Math.floor(max));

export const selectRumdomCell = size => {
  const x = createRandomNum(size);
  const y = createRandomNum(size);
  return { y, x };
};
export const checkGameStatus = arr => {
  const checkedArr = arr.reduce((acc, it) => [...acc, ...it]);
  const minWinPoints = Math.ceil(checkedArr.length / 2);
  let userWins = 0;
  let computerWins = 0;
  checkedArr.forEach(it => {
    if (it === 1) {
      userWins += 1;
    }
    if (it === -2) {
      computerWins += 1;
    }
  });
  if (userWins >= minWinPoints || computerWins >= minWinPoints) {
    return userWins >= minWinPoints ? "user" : "computer";
  } else {
    return false;
  }
};
export const getDate = () => {
  const date = new Date();
  const time = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-us", { month: "long" });
  return `${time}; ${day} ${month} ${year}`;
};
