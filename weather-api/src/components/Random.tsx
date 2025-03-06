import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const fetchRandomRecipes = async () => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const resp = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`
  );
  const data = await resp.json();
  return data.recipes;
};

const Random: React.FC = () => {
  const { data: random, isLoading, error } = useQuery({
    queryKey: ["randomRecipes"],
    queryFn: fetchRandomRecipes,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-64 h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Failed to load recipes.</p>;
  }

  // **Group recipes into chunks of 4 per slide**
  const slides = [];
  for (let i = 0; i < random.length; i += 4) {
    slides.push(random.slice(i, i + 4));
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-center mb-6">Random Picks</h3>
      <Carousel className="relative max-w-4xl mx-auto">
        <CarouselContent>
          {slides.map((group, index) => (
            <CarouselItem key={index} className="flex justify-center gap-4">
              {group.map(({ title, id, image }: { title: string; id: number; image: string }) => (
                <div key={id} className="relative w-64 h-64 overflow-hidden rounded-2xl shadow-lg">
                  <Link to={`/recipe/${id}`}>
                    <p className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 font-semibold">
                      {title}
                    </p>
                    <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
                  </Link>
                </div>
              ))}            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Random;
