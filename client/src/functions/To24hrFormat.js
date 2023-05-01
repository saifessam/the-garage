const To24hrFormat = (time) => {
  let intTime = parseInt(time);
  if (intTime > 12) {
    return `${intTime - 12}:00 PM`;
  } else {
    if (time === '00:00') {
      return `12:00 AM`;
    } else {
      return `${time} AM`;
    }
  }
};

export default To24hrFormat;
