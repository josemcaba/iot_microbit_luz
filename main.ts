ESP8266_IoT.iotSwitchEvent(ESP8266_IoT.KidsIotSwitchState.off, function () {
    basic.showIcon(IconNames.Sad)
})
ESP8266_IoT.iotSwitchEvent(ESP8266_IoT.KidsIotSwitchState.on, function () {
    basic.showIcon(IconNames.Happy)
})
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
basic.showIcon(IconNames.SmallDiamond)
ESP8266_IoT.connectWifi("wiot", "a1b2c3d4")
basic.showIcon(IconNames.Diamond)
ESP8266_IoT.connectKidsiot("3a98OSfKko3Xge0G", "1")
basic.showIcon(IconNames.Target)
OLED.init(128, 64)
basic.forever(function () {
    OLED.clear()
    OLED.writeString("Nivel de luz: ")
    ESP8266_IoT.connectKidsiot("3a98OSfKko3Xge0G", "1")
    ESP8266_IoT.uploadKidsiot(Environment.ReadLightIntensity(AnalogPin.P2))
    OLED.writeNumNewLine(Environment.ReadLightIntensity(AnalogPin.P2))
    OLED.writeString("Temperatura: ")
    ESP8266_IoT.connectKidsiot("3a98OSfKko3Xge0G", "2")
    ESP8266_IoT.uploadKidsiot(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    basic.pause(60000)
})
control.inBackground(function () {
    while (true) {
        basic.showLeds(`
            . # . # .
            # . # . #
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.pause(5000)
        if (ESP8266_IoT.kidsiotState(false)) {
            basic.showIcon(IconNames.Diamond)
            ESP8266_IoT.connectKidsiot("3a98OSfKko3Xge0G", "1")
            basic.showIcon(IconNames.Target)
        }
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(5000)
    }
})
