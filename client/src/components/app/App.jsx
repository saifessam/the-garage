import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UserToken } from '../../context/UserToken';
import StartPage from '../../pages/StartPage';
import ServiceProvidersPage from '../../pages/ServiceProvidersPage';
import ServiceProvidersInfoPage from '../../pages/ServiceProvidersInfoPage';
import AdsInfoPage from '../../pages/AdsInfoPage';
import CarsPage from '../../pages/CarsPage';
import CarsRentalPage from '../../pages/CarsRentalPage';
import SparePartsPage from '../../pages/SparePartsPage';
import SearchPage from '../../pages/SearchPage';
import CartPage from '../../pages/CartPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import SubmitPage from '../../pages/SubmitPage';
import AccountDetailsPage from '../../pages/AccountDetailsPage';
import PlacedAdsPage from '../../pages/PlacedAdsPage';
import AdminsEntryPage from '../../pages/AdminsEntryPage';
import DashboardServiceProvidersPage from '../../pages/DashboardServiceProvidersPage';
import DashboardUsersPage from '../../pages/DashboardUsersPage';
import DashboardAdsPage from '../../pages/DashboardAdsPage';
import ErrorPage from '../../pages/ErrorPage';
import './styles.css';
import OrdersPage from '../../pages/OrdersPage';

const App = () => {
  const { token, isAdmin } = useContext(UserToken);

  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  const renderAdminPages = () => {
    if (token && isAdmin) {
      return (
        <>
          <Route path="" element={<AdminsEntryPage />} />
          <Route path="dashboard/service-providers" element={<DashboardServiceProvidersPage />} />
          <Route path="dashboard/users" element={<DashboardUsersPage />} />
          <Route path="dashboard/ads" element={<DashboardAdsPage />} />
        </>
      );
    }
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<StartPage />} />
          <Route path="service-providers">
            <Route path="all" element={<ServiceProvidersPage />} />
            <Route path=":id" element={<ServiceProvidersInfoPage />} />
          </Route>
          <Route path="cars">
            <Route path="all" element={<CarsPage />} />
            <Route path=":id" element={<AdsInfoPage />} />
          </Route>
          <Route path="cars-rental">
            <Route path="all" element={<CarsRentalPage />} />
            <Route path=":id" element={<AdsInfoPage />} />
          </Route>
          <Route path="spare-parts">
            <Route path="all" element={<SparePartsPage />} />
            <Route path=":id" element={<AdsInfoPage />} />
          </Route>
          <Route path="search/:criteria/:query" element={<SearchPage />} />
          {token && (
            <Route path="cart">
              <Route path="items" element={<CartPage />} />
            </Route>
          )}
          <Route path="account">
            <Route path="profile">
              {token && (
                <>
                  <Route path="account-details" element={<AccountDetailsPage />} />
                  <Route path="placed-ads" element={<PlacedAdsPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="dashboard" element={<AccountDetailsPage />} />
                </>
              )}
            </Route>
            {!token && <Route path="login" element={<LoginPage />} />}
            {!token && <Route path="register" element={<RegisterPage />} />}
            {!token && <Route path="submit" element={<SubmitPage />} />}
          </Route>
          <Route path="admin">{renderAdminPages()}</Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
