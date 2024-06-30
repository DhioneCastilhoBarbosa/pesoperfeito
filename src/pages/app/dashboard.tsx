import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Table } from './components/table/table'
import { TableHearder } from './components/table/table-header'
import { paginate, tickets } from '@/data/tickets-list'
import { TableRow } from './components/table/table-row'
import { TableCell } from './components/table/table-cell'
import { IconButton } from './components/icon-button'
import { useState } from 'react'

export function Dashboard() {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticketId.toString().includes(searchTerm) ||
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pages = paginate(filteredTickets, pageSize);
  const totalPages = pages.length;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
  return (
    <div>
      <Helmet title="Tickets" />
      <div className='flex flex-col gap-4 mb-20'>
        <div className='flex gap-3 items-center mb-6'>
          <h1 className='text-2xl font-bold'>Tickets</h1>
          <div className='px-3 w-72 py-1.5 border border-black/10 rounded-lg flex items-center gap-3'>
            <Search className='size-4 text-indigo-500'/>
            <input 
              type="text" 
              className='bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0'
              placeholder='Buscar por ticket ou Cliente'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
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
               <TableRow>
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

      </div>
    </div>
  )
}
