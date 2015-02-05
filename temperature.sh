#! /bin/bash
#
# function: read temperature

#
# Initializing analogue output board pin number 2 (Linux pin# 23)
echo -n "23" > /sys/class/gpio/export
echo -n "out" > /sys/class/gpio/gpio23/direction
echo -n "0" > /sys/class/gpio/gpio23/value

temperature=$(cat /sys/bus/iio/devices/iio:device0/in_voltage2_raw)
echo "$(date) temperature  sensor is on and humidity state is $temperature" >> /smartgardendata/smartgarden_log.txt
cat /dev/null > /smartgardendata/temperature.txt
echo "$temperature" > /smartgardendata/temperature.txt
echo -n "23" > /sys/class/gpio/unexport


