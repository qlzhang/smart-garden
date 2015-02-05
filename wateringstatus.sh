#! /bin/bash
#
# function: read watering status

# Initializing digital  output board pin number 8 (Linux pin# 26)

echo -n "26" > /sys/class/gpio/export


echo $(cat /sys/class/gpio/gpio26/value) > /smartgardendata/wateringstatus.txt

echo "$(date) watering  state is $(cat /sys/class/gpio/gpio26/value)" >> /smartgardendata/smartgarden_log.txt
echo -n "26" > /sys/class/gpio/unexport










