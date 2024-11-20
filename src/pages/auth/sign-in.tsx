import { Helmet } from 'react-helmet-async'
import { SiginForm } from './components/form'
import Img from '../../assets/5024147.jpg'
import { Weight } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export function SignIn() {
  const navigate = useNavigate()
  function handleClickRegister(){
    navigate('/register')
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex flex-row items-center h-full justify-between">
        <div className="lg:w-2/5 sm:w-full h-full flex flex-col items-center justify-around gap-8 px-6  bg-indigo-200">
            <div className='flex flex-col items-center justify-center'>
              <Weight size={150}/>
              <h1 className='text-md font-semibold'>Peso Perfeito</h1>
            </div>
            <div className='mb-16 flex flex-col items-center gap-4'>
              <SiginForm />

            <div className='flex gap-2 text-sm'>
              <p> Não tem uma conta? </p>
              <button className='font-bold' onClick={handleClickRegister}>Registre-se</button>
            </div>
            </div>
            

        </div>
        <div className='flex flex-row items-center justify-center hidden md:block lg:mr-36 md:mr-20'>
          <img src={Img} alt=""  className='lg:h-[700px] md:h-[500px] sm:h-[400px]'/>
        </div>
      </div>

    </>
  )
}
