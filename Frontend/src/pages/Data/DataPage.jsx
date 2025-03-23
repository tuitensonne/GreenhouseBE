/* eslint-disable indent */
import { Card, CardContent, Typography, LinearProgress, Box, CssBaseline, Toolbar, Breadcrumbs, Link, Divider, Stack } from '@mui/material';
import { borderBottom, spacing, styled } from '@mui/system';
import Sidebar from '../../components/SideBar';
import Light from './Light';
import Humidity from './Humid';
import Temperature from './Temperature';
import Earth from './Earth';

const DataPage = () => {
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
                    <Light achieved={900} total={1000} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Temperature achieved={38} total={100} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Stack direction='column' spacing={2} justifyContent='center'>
                        {/* <Box sx={{ flex: 1, textAlign: 'center' }}> */}
                            <Humidity value={67} total={100} />
                        {/* </Box>
                        <Box sx={{ flex: 1, textAlign: 'center' }}> */}
                            <Earth value={67} total={100} />
                        {/* </Box> */}
                    </Stack>
                </Box>
                
            </Stack>
        </Box>
    </Box>
  );
};

export default DataPage;