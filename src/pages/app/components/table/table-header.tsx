import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableHearderProps extends ComponentProps<"th">{

}

export function TableHearder(props:TableHearderProps){
  return(
    <th {...props}className={twMerge('py-3 px-4 text-white text-sm font-semibold text-left bg-indigo-400',props.className)}/>
  )
}