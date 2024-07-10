import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/admin/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import AuthLayout from './layouts/auth/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import ResendCodeView from './views/auth/ResendCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public layout */}
        <Route element={<AppLayout />}>
          <Route index path='/' element={<DashboardView />} />
          <Route path='/projects/create' element={<CreateProjectView />} />
          <Route path='/projects/:projectId' element={< ProjectDetailsView />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
        </Route>

        {/* authlayout */}
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginView />} />
          <Route path='/auth/register' element={<RegisterView />} />
          <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
          <Route path='/auth/request-code' element={<ResendCodeView />} />
          <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
          <Route path='/auth/new-password' element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}