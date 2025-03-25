import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  PaginationItem,
  CssBaseline,
  Divider,
  Breadcrumbs,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Sidebar from '../../components/SideBar';
import {fetchDevices} from '../../apis/deviceApi';
import {sendDataToDevice} from '../../apis/deviceApi';
import {jwtDecode} from 'jwt-decode';

const DeviceTable = () => {
  // Sample data for the table
  const [devices, setDevices] = useState([])

  // State for pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const getDevices = async   () => {
      try {
        const response = await fetchDevices(page)
        setDevices(response.data)
        console.log('Devices:', devices)
        setTotalPages(response.pagination.totalPages)
      } catch (error) {
        console.error('Error fetching devices:', error)
      }
    };
    getDevices()
  }, [page])

  // Handle checkbox toggle
  const sendDataToDeviceAsync = useCallback(async (cid, status, value, userId) => {
    try {
      await sendDataToDevice(cid, status, value, userId)
    } catch (error) {
      console.error('Không thể cập nhật thiết bị:', error)
      // Rollback về trạng thái ngược lại nếu API thất bại
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.CID === cid ? { ...device, status: status === 1 ? 0 : 1 } : device
        )
      )
    }
  }, [])

  const handleCheckboxChange = useCallback((cid, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1
    const newValue = currentStatus === 1 ? 0 : 28

    // Kiểm tra trạng thái trước và sau khi cập nhật
    console.log(`Trước: CID=${cid}, status=${currentStatus}, sẽ thành ${newStatus}`)

    // Cập nhật trạng thái ngay lập tức
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.CID === cid ? { ...device, status: newStatus } : device
      )
    )

    // Gửi API ở background
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.sub

    if (!userId) {
      console.error('Thiếu ID người dùng!')
      return
    }

    sendDataToDeviceAsync(cid, newStatus, newValue, userId)
  }, [sendDataToDeviceAsync])


  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
                component="main"
                sx={{ flexGrow: 1, backgroundColor: '#f4f4f4', minHeight: '100vh', p: 3 }}
              >
            <Typography variant='h4' sx={{ mb: 2 }}>Devices</Typography>
            <Breadcrumbs sx={{}} aria-label="breadcrumb">
                <Typography color="inherit" sx={{ borderBottom:3 }}>Devices</Typography>
            </Breadcrumbs>

            <Divider sx={{ mb: 3 }} color='#DDE1E6' ></Divider>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary">
                    New Device
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Paper
                    component="form"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 300,
                      border: '1px solid #ccc'
                    }}
                  >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                    <IconButton type="submit" sx={{ p: '10px' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
              {/* Table Section */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="device table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">On</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Author</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">Type</Typography>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.CID}>
                        <TableCell>
                          <Checkbox
                            checked={device.status === 1}
                            onChange={() => handleCheckboxChange(device.CID, device.status)}
                          />
                        </TableCell>
                        <TableCell>{device.topic}</TableCell>
                        <TableCell>{device.controllerType}</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                            Change
                          </Button>
                          <IconButton>
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination Section */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIosIcon,
                        next: ArrowForwardIosIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </Box>
            </Box>
        </Box>

    </Box>
  );
};

export default DeviceTable;