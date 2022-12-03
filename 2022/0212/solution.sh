#!/bin/bash

cat input.txt | sed 's,A X,4,;s,A Y,8,;s,A Z,3,;s,B X,1,;s,B Y,5,;s,B Z,9,;s,C X,7,;s,C Y,2,;s,C Z,6,' i|tr '\n' +|sed 's,+$,\n,'|bc