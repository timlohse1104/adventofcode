import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

const translateAssingments = (s) => {
  const first = s.slice(0, s.indexOf('-'));
  const second = s.slice(s.indexOf('-') + 1);
  const calcNumbers = (a, b) => {
    let n = '';
    for (let i = Number(a); i < Number(b); i++) {
      n += `${i},`;
    }
    return n;
  };
  return first !== second ? `${calcNumbers(first, second)}${second}` : first;
};

console.log(
  input
    .split('\n')
    .map((l) => l.split(',').map((assingment) => translateAssingments(assingment)))
    .filter((e) => e[1].includes(e[0]) || e[0].includes(e[1])).length
);
