import './App.css';
import { BrowserRouter as Router, Routes, Route , useNavigate} from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import BookLabTest from './pages/BookLabTest';
import MyLabTests from './pages/MyLabTests';
import MedicineOrder from './pages/MedicineOrder';
import MyMedicineOrders from './pages/MyMedicineOrder';
import Home from './pages/home';
import Layout from './pages/Layout';
import Cardiology from './pages/Cardiology';
import VitaminDTest from './pages/VitaminDTest';
import ProtectedRoute from './pages/ProtectedRoute';
import Profile from './pages/Profile';
import DiabetesCare from './pages/DiabetesCare';
import DoctorSpecialty from './pages/DoctorSpecialty';
import LabTestPage from './pages/LabTestPage';
import MedicineCategory from './pages/MedicineCategory';
import AdminDashboard from './pages/AdminDashboard';
import AdminAppointments from './pages/AdminAppointments';
import AdminLabTests from './pages/AdminLabPanel';
import AdminMedicineOrders from './pages/AdminMedicinePanel';
import AdminRoute from './pages/AdminRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
          <Route path="/book-lab" element={<ProtectedRoute><BookLabTest /></ProtectedRoute>} />
          <Route path="/my-labs" element={<ProtectedRoute><MyLabTests /></ProtectedRoute>} />
          <Route path="/order-medicine" element={<ProtectedRoute><MedicineOrder /></ProtectedRoute>} />
          <Route path="/my-medicines" element={<ProtectedRoute><MyMedicineOrders /></ProtectedRoute>} />
          {/* Legacy routes for backward compatibility */}
          <Route path="/doctors/cardiology" element={<ProtectedRoute><DoctorSpecialty /></ProtectedRoute>} />
          <Route path="/doctors/Cardiology" element={<ProtectedRoute><Cardiology /></ProtectedRoute>} />
          <Route path="/book-lab/vitamin-d" element={<ProtectedRoute><VitaminDTest /></ProtectedRoute>} />
          <Route path="/order-medicine/diabetes-care" element={<ProtectedRoute><DiabetesCare /></ProtectedRoute>} />
          
          {/* Dynamic routes for all specialties, tests, and categories */}
          <Route path="/doctors/:specialty" element={<ProtectedRoute><DoctorSpecialty /></ProtectedRoute>} />
          <Route path="/book-lab/:testName" element={<ProtectedRoute><LabTestPage /></ProtectedRoute>} />
          <Route path="/order-medicine/:category" element={<ProtectedRoute><MedicineCategory /></ProtectedRoute>} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>} >
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Home />} />  
          </Route>
          <Route path= "/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path= "/admin/appointments" element={<AdminRoute><AdminAppointments /></AdminRoute>} />
          <Route path= "/admin/lab-tests" element={<AdminRoute><AdminLabTests /></AdminRoute>} />
          <Route path= "/admin/medicine-orders" element={<AdminRoute><AdminMedicineOrders /></AdminRoute>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
