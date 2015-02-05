#! /bin/bash
#
# watering is constantly off
#
# Initializing digital output board pin number 8 (Linux output pin# 26)
echo -n "26" > /sys/class/gpio/export
echo -n "out" > /sys/class/gpio/gpio26/direction
echo -n "strong" > /sys/class/gpio/gpio26/drive
echo -n "0" > /sys/class/gpio/gpio26/value
echo "$(date) watering  turned off and pin state is $(cat /sys/class/gpio/gpio26/value)" >> /smartgardendata/smartgarden_log.txt
echo -n "26" > /sys/class/gpio/unexport


