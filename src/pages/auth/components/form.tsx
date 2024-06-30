
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { promise } from "zod"


export function SiginForm() {
  const form = useForm()
  const[email,setEmail]= useState('')
  const[password, SetPassword]=useState('')
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
      
      navigate('/')
    }
    else{
      toast.error('Usuario ou senha incorreto!')
    }
    
  }


  return (
    <Form {...form}>
      <form  onSubmit={handleClickLogin} className="space-y-12 w-96">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Email</FormLabel>
              <FormControl>
                <Input type="email" onChange={handleEmail}/>
              </FormControl>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" onChange={handlePassword} />
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
