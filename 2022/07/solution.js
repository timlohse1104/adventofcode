'use strict';

import * as fs from 'fs/promises';

const input = await fs.readFile('input.txt', 'utf-8');

// Solution for https://adventofcode.com/2022/day/6

console.log(
  input
    .split('\n')
    .map((l, i, a) => {
      const dir = { name: '', size: 0, content: [] };
      if (/^\$\s(cd)\s\w+/.test(l)) {
        let j = i + 2;
        dir.name = l.replace('$ cd ', '');
        while (!/^\$.+/.test(a[j]) && a[j]) {
          dir.content.push({ type: /^\d+/.test(a[j]) ? 'file' : 'dir', size: /^\d+/.test(a[j]) ? Number(a[j].replace(/\s\w+.\w+/, '')) : 0 });
          j++;
        }
      }
      dir.size = dir.content.reduce((a, c) => a + c.size, 0);
      return dir;
    })
    .filter((l) => l.name !== '')
    .map((d, i, a) => {
      d.content.forEach((c) => {
        if (c.type === 'dir') d.size += a.find((e) => e.name === d.name)?.size;
      });
      return d;
    })
    .reduce((a, c) => a + (c.size <= 100000 ? c.size : 0), 0)
);

