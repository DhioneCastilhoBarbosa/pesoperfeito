import { ComponentProps } from "react";

interface TablePros extends ComponentProps<'table'>{}

export function Table( props: TablePros){
  return(
    <div className="border-collapse border border-indigo-600/10 rounded-lg ">
      <table className="w-full rounded-lg" {...props}/>
    </div>
  )
}