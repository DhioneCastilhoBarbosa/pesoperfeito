import { Helmet } from 'react-helmet-async'
import { SiginForm } from './components/form'
import Img from '../../assets/5024147.jpg'
export function SignIn() {
  return (
    <>
      <Helmet title="Login" />
      <div className="flex flex-row items-center h-full justify-between">
        <div className="lg:w-2/5 sm:w-full h-full flex flex-col items-center justify-around gap-8 px-6  bg-indigo-200">
            <div className=''>
              <h1>Peso Perfeito</h1>
            </div>
            <div className='mb-28'>
              <SiginForm />
            </div> 
        </div>
        <div className='flex flex-row items-center justify-center hidden md:block lg:mr-36 md:mr-20'>
          <img src={Img} alt=""  className='lg:h-[700px] md:h-[500px] sm:h-[400px]'/>
        </div>
      </div>

    </>
  )
}
