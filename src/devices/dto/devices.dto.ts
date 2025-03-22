export interface DeviceAdafruitDto {
    topic: string,
    value: number
}

export interface CreateDeviceDTO {
    deviceType: string
    topic: string
    greenHouseId: number
    userId: number

    status: number
    value: number
    maxValue: number
    
    controllerType: string
    sensorType: string

}