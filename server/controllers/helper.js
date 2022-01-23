const express = require('express');

const helper = {};

helper.generateRandomUrl = () => {
  let randomNums = [];
  let code;
  for (let i = 0; i < 7; i++) {
    code = Math.floor(Math.random() * 52) + 65;
    randomNums.push(code);
  }
  randomNums = randomNums.map(num => {
    if (num > 90 && num < 97) {
      return num + 26;
    } else {
      return num;
    }
  });

  const url = String.fromCharCode(...randomNums);

  return url;
}

helper.acknowledgeReceipt = (req, res, next) => {
  res.status(201).send('received'); 
  next(); 
}

helper.sanitizeInput = (str) => {

  // regex stuff here

  return str;
};

module.exports = helper;
