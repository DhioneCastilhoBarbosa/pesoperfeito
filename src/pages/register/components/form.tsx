
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import api from "@/services/api"
import { AxiosError } from 'axios';
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"




export function RegisterForm() {
  const form = useForm()
  const[email,setEmail]= useState('')
  const[username,setUsername]= useState('')
  const[password, SetPassword]=useState('')
  const[confirmPassword, SetConfirmPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

 
  function handleEmail(event: React.ChangeEvent<HTMLInputElement>){
    setEmail(event.target.value)
    console.log(email)
  }

  function handleUsername(event: React.ChangeEvent<HTMLInputElement>){
    setUsername(event.target.value)
    console.log(username)
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>){
    SetPassword(event.target.value)
    console.log(password)
  }

  function handleConfirmPassword(event: React.ChangeEvent<HTMLInputElement>){
    (event.target.value)
    SetConfirmPassword(event.target.value)
    console.log(confirmPassword)
  }

  async function handleClickRegister(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    try{
        if(password !== confirmPassword){
          toast.error('A semha e confirmacao de senha nao sao identicas. Verifique e tente novamente.')
        }else{
        await api.post('/api/register',{email, username, password})
        toast.success('Usuário registrado com sucesso!')
        navigate("/")
        }
    }
    catch(error){
      if(error instanceof AxiosError){
        switch (error.response?.status) {
          case 500:
            toast.error('Erro ao registrar usuário.');
            break;
          default:
            toast.error('Ocorreu um erro inesperado. Tente novamente.');
        }
      }else {
        // Caso o erro não tenha uma resposta do servidor (como problemas de rede)
        toast.error('Erro ao conectar ao servidor. Verifique sua conexão.');
      }
    }
  }
  

  const togglePasswordVisibilityPassword = () => setShowPassword(!showPassword);
  const togglePasswordVisibilityConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  return (
    <Form {...form}>
      <form  onSubmit={handleClickRegister} className="space-y-12 w-96 ">
        <FormField
          control={form.control}
          name="register"
          render={({ }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text"placeholder="Digite o seu nome"onChange={handleUsername}/>
              </FormControl>
              <FormLabel >Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Digite o seu email" onChange={handleEmail}/>
              </FormControl>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Input type={showPassword ? "text" : "password"} placeholder="Digite a sua senha" onChange={handlePassword} />
                  <button
                    type="button"
                    onClick={togglePasswordVisibilityPassword}
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
              <FormLabel>Confirme Password</FormLabel>
              <FormControl>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Input type={showConfirmPassword ? "text" : "password"} placeholder="Repita a sua senha" onChange={handleConfirmPassword} />
                  <button
                    type="button"
                    onClick={togglePasswordVisibilityConfirmPassword}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {showConfirmPassword ? <EyeClosed /> : <Eye />}
                </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <Button className= "w-96"type="submit" >Registrar</Button>
      </form>
      
    </Form>
  )
}
