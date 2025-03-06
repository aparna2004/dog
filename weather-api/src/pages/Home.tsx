import { FC, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Search from "@/components/Search";
import Random from "../components/Random";
import Veggie from "../components/Veggie";
import { Button } from "@/components/ui/button";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const Home: FC = () => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch search results
  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return; // Ignore empty search
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}`
      );
      setSearchedRecipes(response.data.results);
    } catch (err) {
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Search Bar (Calls handleSearch instead of navigating) */}
      <Search placeholder="Search for recipes..." onSearch={handleSearch} />

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6">
        <Button asChild>
          <a href="/cuisines/italian">Italian Cuisine</a>
        </Button>
        <Button asChild>
          <a href="/cuisines/mexican">Mexican Cuisine</a>
        </Button>
        <Button asChild>
          <a href="/cuisines/indian">Indian Cuisine</a>
        </Button>
        <Button asChild>
          <a href="/random">Random Recipes</a>
        </Button>
      </div>

      {/* Show Loading or Error */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display Searched Recipes */}
      {searchedRecipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {searchedRecipes.map(({ id, title, image }) => (
            <div key={id} className="max-w-sm rounded-lg shadow-md overflow-hidden">
              <a href={`/recipe/${id}`}>
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{title}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Original Recipe Sections (Only show when no search is active) */}
      {searchedRecipes.length === 0 && (
        <>
          <Random />
          <Veggie />
        </>
      )}
    </motion.div>
  );
};

export default Home;
