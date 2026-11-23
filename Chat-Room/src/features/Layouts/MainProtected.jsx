import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const MainProtected = () => {   

  let {isAuthenticated} = useSelector((state)=>state.auth)

  if(isAuthenticated){
    <Navigate to={"/login/chat"}/>
  }

  return (
    <Outlet/>
  )
}

export default MainProtected