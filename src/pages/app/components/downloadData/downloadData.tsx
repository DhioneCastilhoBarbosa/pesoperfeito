
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import * as Papa from "papaparse";

interface DownloadDataProps{
  data: string[]
}

interface DataItem {
  pesoBruto: string | number;
  local: string;
  dataHora: string;
  placa: string;
  allTickets: string;
  cliente: string;
  produto: string;
  ticketId: string;
  tara: number;
  MTR: string;
  operador: string;
  pesoLiquido: number;
}
export default function DownloadData({data}: DownloadDataProps){
  const [loading, setLoading] = useState(false)

  
  const handleDownload = () => {
    setLoading(true);
    setTimeout(()=>{
  
      const orderedData: DataItem[] = (data as any[]).map((item) => {
        const orderedItem: DataItem = {
          pesoBruto: item.pesoBruto || '',  
          local: item.local || '',
          dataHora: item.dataHora || '',
          placa: item.placa || '',
          allTickets: item.allTickets || '',
          cliente: item.cliente || '',
          produto: item.produto || '',
          ticketId: item.ticketId || '',
          tara: item.tara || 0,
          MTR: item.MTR || '',
          operador: item.operador || '',
          pesoLiquido: item.pesoLiquido || 0,
        };
    
        return orderedItem;
      });
    
      const customOrder: string[] = [
        "ticketId","cliente","MTR","produto","operador","placa","dataHora",
        "local","pesoBruto","pesoLiquido","tara",
      ];
    
      const finalOrderedData = orderedData.map(item => {
        const orderedItem: Record<string, any> = {};
        customOrder.forEach(key => {
          orderedItem[key as keyof DataItem] = item[key as keyof DataItem]; 
        });
        return orderedItem;
      });
    
    
      const csv = Papa.unparse(finalOrderedData, {
        delimiter: ";"  
      });
    
      // Criar o Blob para download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "relatorio.csv");
      link.click();
    
      setLoading(false);
    } ,1000)
  };
  
  
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
 