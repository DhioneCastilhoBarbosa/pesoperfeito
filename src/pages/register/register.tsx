import { Helmet } from "react-helmet-async";
import { RegisterForm } from "./components/form";
import Img from '../../assets/Placeholder-rafiki.svg'
import { useNavigate } from "react-router-dom";
import { Weight } from "lucide-react";

export function Register(){
  const navigate = useNavigate()

  function handleClickRegister(){
    navigate("/")
  }
  return (
  <>
    <Helmet title="Register" />
    <div className="flex flex-row items-center h-full justify-between">
      <div className="lg:w-2/5 sm:w-full h-full flex flex-col items-center justify-around gap-8 px-6  bg-indigo-200">
          <div className='flex flex-col items-center justify-center'>
            <Weight size={150}/>
            <h1 className='text-md font-semibold'>Peso Perfeito</h1>
          </div>
          <div className='mb-4 flex flex-col items-center'>
          <p className="mb-4 font-bold text-lg">Cria a sua conta para acesso.</p>
            <RegisterForm/>
          </div>
          <div className='flex gap-2 text-sm'>
          <p>Ja tem uma conta? </p>
          <button className='font-bold mb-4' onClick={handleClickRegister}>Faca o login</button>
          </div>
      </div>
      <div className='flex flex-row items-center justify-center hidden md:block lg:mr-36 md:mr-20'>
        <img src={Img} alt=""  className='lg:h-[700px] md:h-[500px] sm:h-[400px]'/>
      </div>
    </div>

  </>)
}