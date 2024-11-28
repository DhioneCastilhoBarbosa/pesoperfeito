import { ChevronLeft, ChevronRight, Search, Ticket, Weight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Table } from './components/table/table';
import { TableHearder } from './components/table/table-header';
import { TableRow } from './components/table/table-row';
import { TableCell } from './components/table/table-cell';
import { IconButton } from './components/icon-button';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import api from '@/services/api';
import DownloadData from './components/downloadData/downloadData';

type FetchTicketsParams = {
  clientName?: string; // Nome do cliente
  placa?: string; // ticket id
  startDate?: string; // Data inicial é opcional
  endDate?: string;   // Data final é opcional
};

type Ticket = {
  cliente: string;
  data: string;
  [key: string]: any; // Caso haja outros campos no ticket
};

type FetchTicketsResponse = {
  items: Ticket[]; // A resposta contém uma lista de tickets
};



export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
  const[TicketTotals, setTicketTotals] = useState<string>('0');
  const [pagesCache, setPagesCache] = useState<{ [key: number]: any[] }>({});
  const [keysCache, setKeysCache] = useState<{ [key: number]: any }>({});
  const [totalNetWeight, setTotalNetWeight] = useState<string>('0');
  const [totalGrossWeight, setTotalGrossWeight] = useState<string>('0');
  const [totalPages, setTotalPages] = useState(0);
  const [searchDisplay, setSearchDisplay] = useState(false);

  const [inputValue, setInputValue] = useState("");
  
  const itemPerPage = 10

  const isLicensePlate = (term: string) => {
    if (term.includes('-')) {
      const oldPattern = /^[A-Z]{3}-[0-9]{4}$/i;
      return oldPattern.test(term);
    }else{
      const mercosulPattern = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i;
      return mercosulPattern.test(term)
    }
  };

 
  const fetchTicketsByClient = async ({
    clientName,
    placa,
    startDate,
    endDate,
  }: FetchTicketsParams): Promise<Ticket[]> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autorização não encontrado');
        return [];
      }
  
      const response = await api.get<FetchTicketsResponse>('/api/tickets-by-client-name', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        params: {
          clientName,
          placa,
          startDate,
          endDate,
        },
      });
  
      if (response.data && Array.isArray(response.data.items)) {
        setTicketTotals(response.data.items.length.toString());
        // Calcula os totais de peso bruto e peso líquido
        setTotalPages(1)
        const { totalGrossWeight, totalNetWeight } = response.data.items.reduce(
          (totals, item) => {
            return {
            totalGrossWeight: totals.totalGrossWeight + (item.pesoBruto || 0),
            totalNetWeight: totals.totalNetWeight + (item.pesoLiquido || 0),
            };
        },
    { totalGrossWeight: 0, totalNetWeight: 0 } // Valores iniciais
  );

        // Define os valores calculados
        setTotalGrossWeight(totalGrossWeight.toString());
        setTotalNetWeight(totalNetWeight.toString());
        return response.data.items; // Retorna a lista de tickets
      } else {
        console.error('A resposta da API não contém "items" ou não é válida.');
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar os tickets:', error);
      return [];
    }finally {
    
    }
  };
  
  
  
  async function fetchTickets(page = 1, evaluatedKey: any = null) {
    // Se já temos a página no cache, reutilize-a
    
    /*if (pagesCache[page]) {
      setTickets(pagesCache[page]);
      setLastEvaluatedKey(keysCache[page]);
      return;
    }*/
  
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autorização não encontrado');
        return;
      }
  
      const response = await api.get('/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: itemPerPage,
          lastEvaluatedKey: evaluatedKey,
        },
      });

      //console.log("response", response.data)
  
      if (response.data && Array.isArray(response.data.items)) {
        const newTickets = response.data.items;
        const newKey = response.data.lastEvaluatedKey;
  
        // Atualize o estado e os caches
        setTickets(newTickets);
        setLastEvaluatedKey(newKey);
  
        // Salva o cache para navegação futura
        setPagesCache(prev => ({ ...prev, [page]: newTickets }));
        setKeysCache(prev => ({ ...prev, [page + 1]: newKey })); // Associa o key da próxima página
        setTicketTotals(response.data.totalItems);
        setTotalNetWeight(response.data.totalPesoLiquido);
        setTotalGrossWeight(response.data.totalPesoBruto)
        setTotalPages(Math.ceil(Number(response.data.totalItems) / itemPerPage));
        return response.data.items;
      } else {
        console.error('A resposta da API não contém "items" ou não é válida.');
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar tickets:', error);
      return [];
    } finally {
     
    } 
  }
  
  
  useEffect(() => {
    const fetchData = async () => {
      
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm && startDate === '' && endDate === '') {
        const searchParams: FetchTicketsParams = isLicensePlate(trimmedSearchTerm)
        ?{placa: trimmedSearchTerm}
        :{clientName: trimmedSearchTerm};


          const searchedTickets = await fetchTicketsByClient({
           ...searchParams,
            startDate,
            endDate,
          });
          setTickets(searchedTickets);
          setSearchDisplay(true);
          
      }else if(trimmedSearchTerm==='' && startDate.length>0 && endDate.length>0){
        const searchedTickets = await fetchTicketsByClient({
           startDate,
           endDate,
         });
         setTickets(searchedTickets);
         setSearchDisplay(true);
      } else{
        const evaluatedKey = keysCache[currentPage] || null;
        await fetchTickets(currentPage, evaluatedKey);
        setSearchDisplay(false);
        
      }
    };
    fetchData();
    
  }, [searchTerm, startDate, endDate, currentPage,]);
  

  
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setTickets([]); // Limpa os tickets para evitar dados antigos
    setCurrentPage(1); // Reseta a página para 1 ao busca
    setInputValue(value);
  
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    setCurrentPage(1); // Reseta a página para 1 ao mudar a data de início
    
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    setCurrentPage(1); // Reseta a página para 1 ao mudar a data de fim
  };

  function goToPreviousPage() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
  
      if (pagesCache[newPage]) {
        // Carrega do cache se disponível
        setTickets(pagesCache[newPage]);
        setLastEvaluatedKey(keysCache[newPage]);
        setCurrentPage(newPage);
      } else {
        // Faz uma nova chamada com o lastEvaluatedKey correto
        fetchTickets(newPage, keysCache[newPage]);
        setCurrentPage(newPage);
      }
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
  
      if (pagesCache[newPage]) {
        // Carrega do cache se disponível
        setTickets(pagesCache[newPage]);
        setLastEvaluatedKey(keysCache[newPage]);
        setCurrentPage(newPage);
      } else {
        // Faz uma nova chamada com o lastEvaluatedKey atual
        fetchTickets(newPage, lastEvaluatedKey);
        setCurrentPage(newPage);
      }
    }
  }

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  return (
    <div className=' flex-1 z-0 mt-14 px-4'>
      <Helmet title="Tickets"/>
      <div className='flex flex-col gap-4 mb-20 relative'>

      <div className='flex items-center gap-3'>
            <Ticket className='rotate-45 size-10'/>
            <h1 className='text-2xl font-bold'>Tickets</h1>
      </div>

        <div className='flex flex-col md:flex-row gap-3 items-center justify-between mb-1 '>
           
          <div className='flex flex-col md:flex-row gap-6 md:items-end items-start border border-indigo-400 py-5 px-10 rounded-md w-full md:w-auto'>
            
            <div className={`px-3 md:w-72 w-full py-1.5 border rounded-lg flex items-baseline gap-3 focus:border-indigo-200 ${isFocused ? 'border-indigo-200 border-2' : 'border-black/10'}`}
              tabIndex={0} 
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <Search className='size-4 text-indigo-500'/>
              <input 
                type="text" 
                className='bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 md:w-44'
                placeholder='Buscar por Cliente ou Placa'
                value={inputValue}
                onChange={handleSearch}
              />

            </div>

            <div className='flex flex-row gap-4 items-center justify-between w-full md:justify-center md:w-auto'>
            <div className='flex flex-col gap-1 '>
              <p>Data inicial</p>
              <input
                type="date"
                className='border rounded-lg px-2 py-1 text-gray-400 focus:ring-0 outline-indigo-200'
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            
            <div className='flex flex-col gap-1'>
              <p>Data final</p>
              <input
                type="date"
                className='border rounded-lg px-2 py-1 text-gray-400 focus:ring-0 outline-indigo-200'
                value={endDate}
                onChange={handleEndDateChange}
              />
              </div>
            </div>

            <div className='flex  w-full md:pl-2'>
              <DownloadData data={tickets}/>
            </div>
          </div>

          <div className='flex items-center md:justify-center justify-between gap-4 w-full md:w-auto'>
            <div className='flex flex-col items-center justify-start bg-indigo-200 p-2 rounded-md md:w-36 w-32 h-28 shadow-lg transform transition-transform duration-300 hover:scale-110'>
              <p className='text-xs md:text-sm text-white font-semibold'>Total de Tickes</p>
              <Separator/>
              <div className='flex items-center gap-1 pt-4 text-2xl font-bold text-lg md:text-2xl'>
                <Ticket/>
              {TicketTotals}
              </div>
            </div>

            <div className='flex flex-col items-center justify-start bg-indigo-200 p-2 rounded-md md:w-36 w-32 h-28 shadow-lg transform transition-transform duration-300 hover:scale-110'>
              <p className='text-xs md:text-sm text-white font-semibold'>Peso Bruto total</p>
              <Separator/>
              <div className='flex items-center gap-1 pt-4 font-bold text-lg md:text-2xl'>
                <Weight/>
              {totalGrossWeight}
              <p>Kg</p>
              </div>
            </div>

            <div className='flex flex-col items-center justify-start bg-indigo-200 p-2 rounded-md md:w-36 w-32 h-28 shadow-lg transform transition-transform duration-300 hover:scale-110'>
              <p className='text-xs md:text-sm text-white font-semibold'>Peso liquido total</p>
              <Separator/>
              <div className='flex items-center gap-1 pt-4 text-2xl font-bold text-lg md:text-2xl'>
                <Weight/>
              {totalNetWeight}
              <p>Kg</p>
              </div>
            </div>
        </div>

       </div>
        
        {tickets.length === 0  ?(
          <div className='flex items-center justify-center rounded-lg text-center text-red-500 border border-red-400 h-24'>
            Nenhum ticket encontrado.
          </div>
        ):(
        <Table >
          <thead className='rounded-lg'>
            <tr>
             
              <TableHearder>Ticket</TableHearder>
              <TableHearder>Cliente</TableHearder>
              <TableHearder>MTR</TableHearder>
              <TableHearder>Produto</TableHearder>
              <TableHearder>Operador</TableHearder>
              <TableHearder>Placa</TableHearder>
              <TableHearder>Data/Hora</TableHearder>
              <TableHearder>Local</TableHearder>
              <TableHearder>Peso Bruto</TableHearder>
              <TableHearder>Peso Liquido</TableHearder>
              <TableHearder>Tara</TableHearder>
              <TableHearder  className='rounded-tr-lg' style={{width:64}}/>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket)=>{
              return(
               <TableRow key={ticket.ticketId}>
                  
                  <TableCell>{ticket.ticketId}</TableCell>
                  <TableCell>
                      <span className='font-semibold text-indigo-400'>{ticket.cliente}</span>
                  </TableCell>
                  <TableCell>{ticket.MTR}</TableCell>
                  <TableCell>{ticket.produto}</TableCell>
                  <TableCell>{ticket.operador}</TableCell>
                  <TableCell>
                  <span className='font-semibold text-indigo-400'>{ticket.placa}</span>
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        }).format(new Date(ticket.dataHora))}
                  </TableCell>
                  <TableCell>{ticket.local}</TableCell>
                  <TableCell>{ticket.pesoBruto}</TableCell>
                  <TableCell>{ticket.pesoLiquido}</TableCell>
                  <TableCell>{ticket.tara}</TableCell>
                  <TableCell>
                  </TableCell>
               </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <tr >
            <TableCell className='bg-indigo-200 text-indigo-500 rounded-bl-md'colSpan={3}>
             {!searchDisplay ? ( `Mostrando ${currentPage*10} de ${TicketTotals} itens`) : (`Total de ${TicketTotals} itens encontrados`)}
            </TableCell>
            <TableCell className='text-right bg-indigo-200 text-indigo-500 rounded-br-md' colSpan={10}>
              <div className='inline-flex items-center gap-8'>
                <span>Pagina {currentPage} de {totalPages}</span>
                <div className='flex gap-3'>
                  <IconButton onClick={goToPreviousPage}disabled={currentPage===1}>
                    <ChevronLeft className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={currentPage===totalPages}>
                    <ChevronRight className='size-4'/>
                  </IconButton>
                </div>
              </div>
            </TableCell>
            </tr>
          </tfoot>
        </Table>
      )}
      </div>
    </div>
  )
}