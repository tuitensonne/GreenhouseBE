/* eslint-disable indent */
import { Card, CardContent, Typography, LinearProgress, Box, CssBaseline, Toolbar, Breadcrumbs, Link, Divider, Stack } from '@mui/material';
import { borderBottom, spacing, styled } from '@mui/system';
import Sidebar from '../../components/SideBar';
import Light from './Light';
import Humidity from './Humid';
import Temperature from './Temperature';
import Earth from './Earth';
import { useEffect, useState } from 'react';
import { subscribeGreenhouseData } from '../../apis/deviceApi';

const DataPage = () => {
    const [humidityValue, setHumidityValue] = useState(null)
    const [lightValue, setLightValue] = useState(null)
    const [temperatureValue, setTemperatureValue] = useState(null)
    const [earthValue, setEarthValue] = useState(null)
    const [error, setError] = useState(null)

    const handleSensorData = (sensorData) => {
        sensorData.forEach(({ sensorType, value }) => {
            switch (sensorType) {
                case 'humidity':
                    setHumidityValue(value)
                    break
                case 'light':
                    setLightValue(value)
                    break
                case 'temperature':
                    setTemperatureValue(value)
                    break
                case 'earth':
                    setEarthValue(value)
                    break
                default:
                    console.warn('Loại cảm biến không xác định:', sensorType)
            }
        })
    }

    useEffect(() => {
        const greenhouseId = 1
        const eventSource = subscribeGreenhouseData(
            greenhouseId,
            (newData) => {
                if (Array.isArray(newData)) {
                handleSensorData(newData)
            }
            },
            (err) => setError('Không thể kết nối SSE')
        )

        return () => {
            eventSource.close()
        }
    }, [])

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
                component="main"
                sx={{ flexGrow: 1, backgroundColor: '#f4f4f4', minHeight: '100vh', p: 3 }}
              >
            <Typography variant='h4' sx={{ mb: 2 }}>Data</Typography>
            <Breadcrumbs sx={{}} aria-label="breadcrumb">
                <Typography color="inherit" sx={{ borderBottom:3 }}>Data</Typography>
            </Breadcrumbs>
            <Divider sx={{ mb: 3 }} color='#DDE1E6' ></Divider>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="stretch">
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Light achieved={lightValue !== null ? `${lightValue}` : '--'} total={100} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Temperature achieved={temperatureValue !== null ? `${temperatureValue}` : '--'} total={100} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Stack direction='column' spacing={2} justifyContent='center'>
                        {/* <Box sx={{ flex: 1, textAlign: 'center' }}> */}
                            <Humidity value={humidityValue !== null ? `${humidityValue}` : '--'} total={100} />
                        {/* </Box>
                        <Box sx={{ flex: 1, textAlign: 'center' }}> */}
                            <Earth value={earthValue !== null ? `${earthValue}` : '--'} total={100} />
                        {/* </Box> */}
                    </Stack>
                </Box>
                
            </Stack>
        </Box>
    </Box>
  );
};

export default DataPage;