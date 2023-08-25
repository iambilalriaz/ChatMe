import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './router';
import AppToast from './components/Toast';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <AppToast />
    </Provider>
  );
};

export default App;
