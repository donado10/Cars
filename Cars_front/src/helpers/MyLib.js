exports.calculRemainingTime = (expireTime) => {
  const actualDate = new Date().getTime();

  let remainTime = expireTime - actualDate;

  remainTime = remainTime < 0 ? 0 : remainTime;
  return remainTime;
};
