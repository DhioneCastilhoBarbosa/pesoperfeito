import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'>{

}

export function TableRow(props: TableRowProps){
  return(
    <tr {...props}className="border-b border-indigo-600/10 hover:bg-indigo-600/10"/>
  )
}