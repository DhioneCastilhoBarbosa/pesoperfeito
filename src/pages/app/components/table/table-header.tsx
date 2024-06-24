import { ComponentProps } from "react";

interface TableHearderProps extends ComponentProps<"th">{

}

export function TableHearder(props:TableHearderProps){
  return(
    <th {...props}className="py-3 px-4 text-white text-sm font-semibold text-left"/>
  )
}