#! /bin/bash
#
# function: read  lightness
#
# Initializing analogue output board pin number 1 (Linux pin# 36)
echo -n "36" > /sys/class/gpio/export
echo -n "out" > /sys/class/gpio/gpio36/direction
echo -n "0" > /sys/class/gpio/gpio36/value

lightness=$(cat /sys/bus/iio/devices/iio:device0/in_voltage1_raw)
echo "$(date) lightness  sensor is on and lightness state is $lightness" >> /smartgardendata/smartgarden_log.txt
cat /dev/null > /smartgardendata/lightness.txt
echo "$lightness" > /smartgardendata/lightness.txt
echo -n "36" > /sys/class/gpio/unexport


