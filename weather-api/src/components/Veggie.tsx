import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

// Fetch vegetarian recipes
const fetchVeggies = async () => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const getData = localStorage.getItem("veggies");

  if (getData && getData !== "undefined") {
    return JSON.parse(getData);
  } else {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=vegetarian&number=12`
    );
    const data = await resp.json();
    localStorage.setItem("veggies", JSON.stringify(data.recipes));
    return data.recipes;
  }
};

const Veggie: React.FC = () => {
  const { data: veggies, isLoading } = useQuery({
    queryKey: ["veggies"],
    queryFn: fetchVeggies,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  // **Group recipes into slides of 4 images**
  const slides = [];
  for (let i = 0; i < veggies.length; i += 4) {
    slides.push(veggies.slice(i, i + 4));
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-center mb-6">Vegetarian Picks</h3>
      <Carousel className="relative max-w-4xl mx-auto">
        <CarouselContent>
          {slides.map((group, index) => (
            <CarouselItem key={index} className="flex justify-center gap-4">
              {group.map(({ title, id, image } : { title: string; id: number; image: string }) => (
                <div
                  key={id}
                  className="relative w-64 h-80 overflow-hidden rounded-2xl shadow-lg"
                >
                  <Link to={`/recipe/${id}`}>
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 font-semibold">
                      {title}
                    </div>
                  </Link>
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Veggie;
