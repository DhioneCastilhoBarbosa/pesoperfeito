import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Table } from './components/table/table'
import { TableHearder } from './components/table/table-header'
import { tickets } from '@/data/tickets-list'
import { TableRow } from './components/table/table-row'
import { TableCell } from './components/table/table-cell'
import { IconButton } from './components/icon-button'

export function Dashboard() {
  return (
    <>
      <Helmet title="Tickets" />
      <div className='flex flex-col gap-4'>
        <div className='flex gap-3 items-center'>
          <h1 className='text-2xl font-bold'>Tickets</h1>
          <div className='px-3 w-72 py-1.5 border border-black/10 rounded-lg flex items-center gap-3'>
            <Search className='size-4 text-indigo-500'/>
            <input 
              type="text" 
              className='bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0'
              placeholder='Busca tickets...'
            />
          </div>
        </div>
        <Table >
          <thead className='bg-indigo-400 rounded-lg'>
            <tr className='bg-indigo-400 rounded-lg'>
              <TableHearder style={{width:64}}>
                <input type="checkbox" className='size-4 bg-indigo-600/20 rounded border-indigo-600/10' />
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
              <TableHearder style={{width:64}}/>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket)=>{
              return(
               <TableRow>
                  <TableCell>
                    <input type="checkbox" className='size-4 bg-black/20 rounded border-indigo-600/10' />
                  </TableCell>
                  <TableCell>{ticket.ticketId}</TableCell>
                  <TableCell>
                      <span className='font-semibold text-indigo-400'>{ticket.name}</span>
                  </TableCell>
                  <TableCell>{ticket.mrt}</TableCell>
                  <TableCell>{ticket.Produto}</TableCell>
                  <TableCell>{ticket.operator}</TableCell>
                  <TableCell>
                  <span className='font-semibold text-indigo-400'>{ticket.Plate}</span>
                  </TableCell>
                  <TableCell>{(ticket.data_hora).toUTCString()}</TableCell>
                  <TableCell>{ticket.location}</TableCell>
                  <TableCell>{ticket.gross_weight}</TableCell>
                  <TableCell>{ticket.net_weight}</TableCell>
                  <TableCell>{ticket.tare}</TableCell>
                  <TableCell>
                  </TableCell>
               </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <tr >
            <TableCell className='bg-indigo-200 text-indigo-500 rounded-bl-md'colSpan={3}>
              Mostrando {tickets.length} de {10} itens
            </TableCell>
            <TableCell className='text-right bg-indigo-200 text-indigo-500 rounded-br-md' colSpan={10}>
              <div className='inline-flex items-center gap-8'>
                <span>Pagina {10} de {20}</span>
                <div className='flex gap-1.5'>
                  <IconButton >
                    <ChevronsLeft className='size-4'/>
                  </IconButton>
                  <IconButton >
                    <ChevronLeft className='size-4'/>
                  </IconButton>
                  <IconButton >
                    <ChevronRight className='size-4'/>
                  </IconButton>
                  <IconButton >
                    <ChevronsRight className='size-4'/>
                  </IconButton>
                </div>
              </div>
            </TableCell>
            </tr>
          </tfoot>
        </Table>

      </div>
    </>
  )
}
