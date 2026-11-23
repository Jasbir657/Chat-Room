import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from '../Auth/ui/Pages/LoginPage';
import Error from '../../Shared/ui/Pages/Error';
import ChatPage from '../../Shared/ui/Pages/ChatPage';
import ChatProtected from '../Layouts/ChatProtected';
import MainProtected from '../Layouts/MainProtected';


const AppRoutes = () => {

  const router = createBrowserRouter([
  {
    path: "/",
    element : <Error/>
  },
  {
    path : '/login',
    element : <MainProtected/>,
    children : [
      {
        path : '',
        element : <LoginPage/>
      },
    ]
  },{
    path : "/login/chat",
    element : <ChatProtected/>,
    children : [
      {
        path : "",
        element : <ChatPage/>
      }
    ]
  }
]);
    return  <RouterProvider router={router}/>
}

export default AppRoutes