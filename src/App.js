import './App.css'
import React from 'react'
import {createBrowserRouter,RouterProvider} from  'react-router-dom';
import RootLayout from './components/rootLayout/RootLayout';
import Intro from './pages/intro/Intro'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import AddBlog from './pages/addBlog/AddBlog'
import MyBlogs from './pages/myBlogs/MyBlogs'
import Profile from './pages/profile/Profile'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Intro/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:'/addBlog',
          element:<AddBlog/>
        },
        {
          path:'/myBlogs',
          element:<MyBlogs/>
        },
        {
          path:'profile',
          element:<Profile/>
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
