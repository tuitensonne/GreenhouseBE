
import { ToastContainer } from 'react-toastify'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './pages/Auth/Auth.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import DataPage from './pages/Data/DataPage.jsx'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/Slices/userSlice.js'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/Login' replace={true} />
  return <Outlet />
}


function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <div style={{ height: '100vh', background: '#EEEEEE' }}>
      <div>
        <ToastContainer />
        <Routes>
          <Route element={<ProtectedRoute user={currentUser}/>}> 
            {/* //phải đăng nhập mới được vào các route bên trong nhe */}
          </Route>
          {/* <Route path='/data' element={<DataPage/>}/> */}
          <Route path='/' element={<HomePage/>}/>
          <Route path='/data' element={<DataPage/>}/>
          <Route path='/Signup' element={<Auth/>}/>
          <Route path='/Login' element={<Auth/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
