#! /bin/bash
#
# function: read humidity
#
# Initializing analogue output board pin number 3 (Linux pin# 22)
echo -n "22" > /sys/class/gpio/export
echo -n "out" > /sys/class/gpio/gpio22/direction
echo -n "0" > /sys/class/gpio/gpio22/value

humidity=$(cat /sys/bus/iio/devices/iio:device0/in_voltage3_raw)
echo "$(date) humidity sensor is on and humidity state is $humidity" >> /smartgardendata/smartgarden_log.txt
cat /dev/null > /smartgardendata/humidity.txt
echo "$humidity" > /smartgardendata/humidity.txt
echo -n "22" > /sys/class/gpio/unexport


