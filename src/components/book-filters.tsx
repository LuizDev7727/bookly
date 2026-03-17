import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookFilters() {
  return (
    <div className="flex items-center gap-x-4">
      <Input className="w-full" placeholder="Buscar por título ou autor..." />
      <Select>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Lendo">Lendo</SelectItem>
            <SelectItem value="Lido">Lido</SelectItem>
            <SelectItem value="Quero Ler">Quero Ler</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
