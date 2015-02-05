#!/bin/sh

echo $(date) >> /auto_test.txt
echo "I made it" >> /auto_test.txt
forever start /smartgardenserver/Smartgarden_control_v2.js

