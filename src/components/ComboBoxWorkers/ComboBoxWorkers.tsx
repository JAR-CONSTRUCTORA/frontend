import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { useDataStore } from '@/store/dataStore'
import { User } from '@/types'

const ComboBoxWorkers = () => {
  const { workers } = useDataStore()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<User>()
  console.log(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? `${value.firstName} ${value.lastName}`
            : 'Selecciona un trabajador...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar un trabajador..." className="h-9" />
          <CommandList>
            <CommandGroup>
              {workers?.map((worker) => (
                <CommandItem key={worker._id} onSelect={() => setValue(worker)}>
                  {worker.firstName} {worker.lastName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBoxWorkers
