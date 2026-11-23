import { useForm } from "react-hook-form";
import { logInUser } from "../hooks/AuthAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const useAuth = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const LoginForm = async (data) => {
    try {
      await dispatch(logInUser(data));
      console.log(data);
      navigate("/login/chat")
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    reset,
    handleSubmit,
    errors,
    LoginForm
  };
};

export default useAuth;