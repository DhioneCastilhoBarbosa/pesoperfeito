
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
import { useForm } from "react-hook-form"



export function SiginForm() {
  const form = useForm()
  return (
    <Form {...form}>
      <form className="space-y-12 w-96">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Email</FormLabel>
              <FormControl>
                <Input placeholder="email" />
              </FormControl>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" />
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
