#!/bin/bash

cat /dev/null > /smartgardendata/status.html



temperatureexist="0"
while [ "$temperatureexist" -eq "0" ]
do 
	if [ -s "/smartgardendata/temperature.txt" ]
	then


		echo "<p>temperature : $(cat /smartgardendata/temperature.txt)</p> " >> /smartgardendata/status.html

		temperatureexist="1"
        fi
done






humidityexist="0"
while [ "$humidityexist" -eq "0" ]

do
        if [ -s "/smartgardendata/humidity.txt" ]
        then

		echo "<p>humidity : $(cat /smartgardendata/humidity.txt)</p> " >> /smartgardendata/status.html
	
                humidityexist="1"
        fi
done







lightnessexist="0"
while [ "$lightnessexist" -eq "0" ]
do
        if [ -s "/smartgardendata/lightness.txt" ]
        then

		echo "<p>lightness : $(cat /smartgardendata/lightness.txt)</p> " >> /smartgardendata/status.html
		

                lightnessexist="1"
        fi
done







soilmoistureexist="0"
while [ "$soilmoistureexist" -eq "0" ]
do
        if [ -s "/smartgardendata/soilmoisture.txt" ]
        then

		echo "<p>soilmoisture : $(cat /smartgardendata/soilmoisture.txt)</p> " >> /smartgardendata/status.html
		

                soilmoistureexist="1"
        fi
done

smartwateringstatusexist="0"
while [ "$smartwateringstatusexist" -eq "0" ]
do
echo "reading..."
        if [ -s "/smartgardendata/smartwatering.txt" ]
        then
            smartwatering="$(cat /smartgardendata/smartwatering.txt)"
	    if [[ $smartwatering == 0* ]]
            then    
		echo "<p>smart watering control : $(cat /smartgardendata/smartwatering.txt)</p> before"
                echo "<p>smart watering control: OFF</p> " >> /smartgardendata/status.html
                echo "<p>smart watering control: $(cat /smartgardendata/smartwatering.txt)</p> after "
                
	    fi
	    if [[ $smartwatering == 1* ]]
            then
                echo "<p>smart watering control : $(cat /smartgardendata/smartwatering.txt)</p> before"
                echo "<p>smart watering control: ON</p> " >> /smartgardendata/status.html
                echo "<p>smart watering control: $(cat /smartgardendata/smartwatering.txt)</p> after "
                
            fi

                smartwateringstatusexist="1"
        fi
done

wateringstatusexist="0"
while [ "$wateringstatusexist" -eq "0" ]
do
echo "readomg..."
        if [ -s "/smartgardendata/wateringstatus.txt" ]
        then
		echo "<p>watering : $(cat /smartgardendata/wateringstatus.txt)</p> before"
                echo "<p>watering : $(cat /smartgardendata/wateringstatus.txt)</p> " >> /smartgardendata/status.html
		echo "<p>watering : $(cat /smartgardendata/wateringstatus.txt)</p> after "                
		echo "</p><p></p><p>" >> /smartgardendata/status.html
                wateringstatusexist="1"
        fi
done









