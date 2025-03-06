import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void; // Function to trigger search
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting search:", searchTerm); // Debugging
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center gap-2 w-full max-w-lg mx-auto p-4">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3"
        placeholder={placeholder}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default Search;
