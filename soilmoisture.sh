#! /bin/bash
#
# function: read soil moisture
#
# Initializing analogue output board pin number 0 (Linux pin# 37)
echo -n "37" > /sys/class/gpio/export
echo -n "out" > /sys/class/gpio/gpio37/direction
echo -n "0" > /sys/class/gpio/gpio37/value

soilmoisture=$(cat /sys/bus/iio/devices/iio:device0/in_voltage0_raw)
echo "$(date) soil moisture sensor is on and soild moisture state is $soilmoisture" >> /smartgardendata/smartgarden_log.txt
cat /dev/null > /smartgardendata/soilmoisture.txt
echo "$soilmoisture" > /smartgardendata/soilmoisture.txt
echo -n "37" > /sys/class/gpio/unexport


