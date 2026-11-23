import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ChatProtected = () => {

  let {isAuthenticated} = useSelector((state)=>state.auth)
  
  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <Outlet/>
  )
}

export default ChatProtected