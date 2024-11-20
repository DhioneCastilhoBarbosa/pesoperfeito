
import { Button } from "@/components/ui/button"
import { Eye, EyeClosed} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import{toast} from 'sonner'
import api from "@/services/api"
import { AxiosError } from 'axios';



export function SiginForm() {
  const form = useForm()
  const[email,setEmail]= useState('')
  const[password, SetPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
 

 
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
    console.log(email)
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>){
    SetPassword(event.target.value)
    console.log(password)
  }

  async function handleClickLogin(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    
    try{
      
      const response  = await api.post('/api/login',{email, password})
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token)
      toast.success(`Bem-vindo,${response.data.username}`)
      navigate('/tickest')
    }
    catch(error){
      if (error instanceof AxiosError) {
        // Verificar o status da resposta
        switch (error.response?.status) {
          case 400:
            toast.error('Credenciais inválidas. Por favor, tente novamente.');
            break;
          case 403:
            toast.info('Usuário desativado. Entre em contato com o administrador.');
            break;
          case 500:
            toast.error('Erro interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            toast.error('Ocorreu um erro inesperado. Tente novamente.');
        }
      } else {
        // Caso o erro não tenha uma resposta do servidor (como problemas de rede)
        toast.error('Erro ao conectar ao servidor. Verifique sua conexão.');
      }
    }

  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  return (
    <Form {...form}>
      <form  onSubmit={handleClickLogin} className="space-y-12 w-96">
        <FormField
          control={form.control}
          name="username"
          render={({ }) => (
            <FormItem>
              <FormLabel >Email</FormLabel>
              <FormControl>
                <Input type="email" onChange={handleEmail}/>
              </FormControl>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Input type={showPassword ? "text" : "password"} placeholder="password" onChange={handlePassword} style={{ paddingRight: '2rem' }}  />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <Button className= "w-96"type="submit">login</Button>
      </form>
      
    </Form>
  )
}
