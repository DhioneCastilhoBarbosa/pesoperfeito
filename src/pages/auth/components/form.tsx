
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
    if(email==="demostracao@pesoperfeito.com.br" && password==='admin123'){
      
      navigate('/tickest')
    }
    else{
      toast.error('Usuario ou senha incorreto!')
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
