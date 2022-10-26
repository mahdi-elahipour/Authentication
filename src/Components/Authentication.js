import { ToastContainer } from 'react-toastify';
import Registration from './Registration';
import Login from './Login';
import { Routes, Route } from 'react-router-dom'
const Authentication = () => {


    return (
        <>
            <ToastContainer rtl />
            <Routes>
                <Route path='/Login' element={<Login />} />
                <Route path='/Registration' element={<Registration />} />
                <Route path='/' element={<Registration />} />
            </Routes>

        </>

    )
}

export default Authentication;