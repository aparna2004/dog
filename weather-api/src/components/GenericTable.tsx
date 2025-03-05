import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface GenericTableProps {
  headers: string[]; // Array of table headers
  data: string[][]; // 2D array of data (each row is an array of cell values)
}

const GenericTable = ({ headers, data }: GenericTableProps) => {
  return (
    <Table className="w-full border border-pink-500 shadow-lg rounded-s overflow-hidden">
      <TableCaption className="text-pink-400 font-light italic">
        list of weather metrics.
      </TableCaption>
      <TableHeader className="bg-purple-950">
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="p-3 text-orange-400 font-bold uppercase">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-purple-950">
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-purple-900 transition duration-200">
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className="p-3 text-white border-t border-pink-500">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
