import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Ticket, Weight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Table } from './components/table/table'
import { TableHearder } from './components/table/table-header'
import { paginate, tickets,filterByDate } from '@/data/tickets-list'
import { TableRow } from './components/table/table-row'
import { TableCell } from './components/table/table-cell'
import { IconButton } from './components/icon-button'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'

export function Dashboard() {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const pageSize = 10;

  const searchedTickets = tickets.filter(ticket =>
    ticket.ticketId.toString().includes(searchTerm) ||
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTickets = filterByDate(
    searchedTickets,
    startDate ? new Date(startDate) : new Date('1900-01-01'),
    endDate ? new Date(endDate) : new Date()
  );
  const pages = paginate(filteredTickets, pageSize);
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const totalNetWeight = filteredTickets.reduce((sum, ticket) => sum + parseFloat(ticket.net_weight), 0).toFixed(2);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    setCurrentPage(1);
  };

  
  function goToFirstPage(){
    setCurrentPage(1)
  }

  function goToPreviousPage(){
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage(){
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function goToLastPage(){
    setCurrentPage(totalPages)
  }

  
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className=' flex-1 z-0 mt-20 px-4'>
      <Helmet title="Tickets" />
      <div className='flex flex-col gap-4 mb-20 relative'>

      <div className='flex  items-center gap-3'>
            <Ticket className='rotate-45 size-10'/>
            <h1 className='text-2xl font-bold'>Tickets</h1>
           </div>

        <div className='flex gap-3 items-center justify-between mb-1'>
           
          <div className='flex items-center gap-3'>
            
            <div className={`px-3 w-72 py-1.5 border rounded-lg flex items-center gap-3 focus:border-indigo-200 ${isFocused ? 'border-indigo-200 border-2' : 'border-black/10'}`}
              tabIndex={0} // Permite que a div seja focada usando o teclado
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <Search className='size-4 text-indigo-500'/>
              <input 
                type="text" 
                className='bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 '
                placeholder='Buscar por ticket ou Cliente'
                value={searchTerm}
                onChange={handleSearch}
              />

            </div>
            <div className='flex gap-3 items-center  justify-center'>
            <input
              type="date"
              className='border rounded-lg px-2 py-1 text-gray-400 focus:ring-0 outline-indigo-200'
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              className='border rounded-lg px-2 py-1 text-gray-400 focus:ring-0 outline-indigo-200'
              value={endDate}
              onChange={handleEndDateChange}
            />
            </div>
          </div>

          <div className='flex items-center justify-center gap-10 '>
          <div className='flex flex-col items-center justify-start bg-indigo-200 p-2 rounded-md w-44 h-28'>
            <p className='text-sm text-white font-semibold'>Total de Tickes</p>
            <Separator/>
            <div className='flex items-center gap-1 pt-4 text-2xl font-bold'>
              <Ticket/>
             {tickets.length}
            </div>
          </div>

          <div className='flex flex-col items-center justify-start bg-indigo-200 p-2 rounded-md h-28'>
            <p className='text-sm text-white font-semibold'>Peso liquido total</p>
            <Separator/>
            <div className='flex items-center gap-1 pt-4 text-2xl font-bold'>
              <Weight/>
             {totalNetWeight}
             <p>Kg</p>
            </div>
          </div>
        </div>

        </div>
        
        {filteredTickets.length === 0 ?(
          <div className='flex items-center justify-center rounded-lg text-center text-red-500 border border-red-400 h-24'>
            Nenhum ticket encontrado para o critérios de busca especificados.
          </div>
        ):(
        <Table >
          <thead className='rounded-lg'>
            <tr>
              <TableHearder className='rounded-tl-lg' style={{width:64}}>
                
              </TableHearder>
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
            {pages[currentPage-1].map((tickets)=>{
              return(
               <TableRow key={tickets.ticketId}>
                  <TableCell>
                    <input type="checkbox" className='size-4 bg-black/20 rounded border-indigo-600/10' />
                  </TableCell>
                  <TableCell>{tickets.ticketId}</TableCell>
                  <TableCell>
                      <span className='font-semibold text-indigo-400'>{tickets.name}</span>
                  </TableCell>
                  <TableCell>{tickets.mrt}</TableCell>
                  <TableCell>{tickets.Produto}</TableCell>
                  <TableCell>{tickets.operator}</TableCell>
                  <TableCell>
                  <span className='font-semibold text-indigo-400'>{tickets.Plate}</span>
                  </TableCell>
                  <TableCell>{(tickets.data_hora)}</TableCell>
                  <TableCell>{tickets.location}</TableCell>
                  <TableCell>{tickets.gross_weight}</TableCell>
                  <TableCell>{tickets.net_weight}</TableCell>
                  <TableCell>{tickets.tare}</TableCell>
                  <TableCell>
                  </TableCell>
               </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <tr >
            <TableCell className='bg-indigo-200 text-indigo-500 rounded-bl-md'colSpan={3}>
              Mostrando {currentPage*10} de {tickets.length} itens
            </TableCell>
            <TableCell className='text-right bg-indigo-200 text-indigo-500 rounded-br-md' colSpan={10}>
              <div className='inline-flex items-center gap-8'>
                <span>Pagina {currentPage} de {totalPages}</span>
                <div className='flex gap-1.5'>
                  <IconButton onClick={goToFirstPage} disabled={currentPage===1}>
                    <ChevronsLeft className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToPreviousPage}disabled={currentPage===1}>
                    <ChevronLeft className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={currentPage===totalPages}>
                    <ChevronRight className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={currentPage===totalPages} >
                    <ChevronsRight className='size-4'/>
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
