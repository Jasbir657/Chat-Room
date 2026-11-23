import { useNavigate } from "react-router";

export const  useSharedHook  = () => {

    const navigate = useNavigate()
    
    return {
        navigate
    }

}