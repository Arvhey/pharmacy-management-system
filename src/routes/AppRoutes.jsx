import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout  from '../layouts/MainLayout'
import AuthLayout  from '../layouts/AuthLayout'
import ProtectedRoute from '../components/auth/ProtectedRoute'

import Dashboard      from '../pages/Dashboard'
import Inventory      from '../pages/Inventory'
import MedicineGroups from '../pages/MedicineGroups'
import Reports        from '../pages/Reports'
import Login          from '../pages/Login'
import Register       from '../pages/Register'
import Profile        from '../pages/Profile'
import Settings       from '../pages/Settings'
import NotFound       from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected app routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/"                element={<Dashboard />} />
          <Route path="/inventory"       element={<Inventory />} />
          <Route path="/medicine-groups" element={<MedicineGroups />} />
          <Route path="/reports"         element={<Reports />} />
          <Route path="/profile"         element={<Profile />} />
          <Route path="/settings"        element={<Settings />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
