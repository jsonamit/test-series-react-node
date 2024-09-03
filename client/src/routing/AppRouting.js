import { BrowserRouter as Router, Route, Routes,Outlet,Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import SignupPage from '../pages/signup/SignupPage';
import Header from '../layouts/header/HeaderComponent';
// import Footer from '../layouts/footer/FooterComponent';
import DashboardPage from '../pages/dashboard/DashboardPage';
import StartTestSeries from '../pages/start-testSeries/StartTestSeries'
import { useSelector } from 'react-redux';
import NotFoundPage from '../pages/404/NotFoundPage';
import PublicRoute from './PublicRoute';

const AppRouting = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
                <Route path="*" element={<NotFoundPage />} />
            
                { 
                    isAuthenticated ? (
                        <Route element={<Layout />}>
                            <Route path="/dash" element={<DashboardPage />} />
                            <Route path="/start" element={<StartTestSeries />} />
                        </Route>
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )
                }
            </Routes>
        </Router>
    );
}

const Layout = () => {
    return (
      <div>
        <Header />
            <Outlet />
        {/* <Footer /> */}
      </div>
    );
  };

export default AppRouting;