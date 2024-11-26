
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface DownloadProps{
  loading: boolean;
}
export default function DownloadData(){
  const [loading, setLoading] = useState(false)

  const handleDownload = ()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)

    } ,2000)
  }
  
  return(
    <div>
      <Button 
      className=" flex items-center justify-center  bg-indigo-400 hover:bg-indigo-300 shadow-lg w-32 "
      onClick={handleDownload}
      >
        
        {loading?(
          <div className="flex items-center justify-center gap-2 max-w-full">
            <Loader2 className="animate-spin size-8" />
            <span>Baixando</span>
          </div>
        ):
        (
          <div className=" flex  items-center justify-center gap-2 max-w-full">
            <Download/>
            Relatório
          </div>
        )}
        
      </Button>
    </div>
  )
}
 