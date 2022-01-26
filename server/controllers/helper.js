

const helper = {};

helper.generateRandomUrl = () => {
  let randomNums = [];
  let code;
  for (let i = 0; i < 7; i++) {
    code = Math.floor(Math.random() * 52) + 65;
    randomNums.push(code);
  }
  randomNums = randomNums.map(num => {
    if (num > 90 && num < 97) return num + 26;
    else return num;
  });

  const url = String.fromCharCode(...randomNums);

  return url;
}

helper.sanitizeInput = (str) => {

  const pattern = /^(https?:\/\/)/i;

  if (pattern.test(str)) return str;
  else return 'https://' + str;

};

helper.sanitizeEmail = (str) => {
  str = str.trim();
  const emailPattern = /^[a-zA-Z\d\.\-_]+@[a-zA-Z\d\.\-_]+\.[a-zA-Z]+$/i;

  if (emailPattern.test(str)) return true;
  else return false;
};

module.exports = helper;
