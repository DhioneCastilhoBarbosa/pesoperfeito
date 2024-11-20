import * as Dialog from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react'; // Spinner de exemplo, você pode usar outros ou criar o seu próprio
export function LoadingDialog({ isOpen }: { isOpen: boolean }){
  return(
  <Dialog.Root open={isOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md flex items-center gap-4">
          <Loader2 className="animate-spin size-8" /> {/* Spinner */}
          <span>Carregando...</span>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>)
}