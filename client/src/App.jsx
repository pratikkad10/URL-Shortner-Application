import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Links from './pages/Links/Links';
import CreateLink from './pages/Links/CreateLink';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';

import Privacy from './pages/Public/Privacy';
import Terms from './pages/Public/Terms';
import Status from './pages/Public/Status';
import Contact from './pages/Public/Contact';

import Pricing from './pages/Public/Pricing';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/status" element={<Status />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Routes (Dashboard) */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/links" element={<Links />} />
              <Route path="/links/create" element={<CreateLink />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
