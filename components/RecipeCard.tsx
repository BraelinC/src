import { Clock, Users, Bookmark } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  servings: number;
  category: string;
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

export function RecipeCard({
  id,
  title,
  image,
  prepTime,
  servings,
  category,
  isSaved = false,
  onSave,
}: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden group">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 h-8 w-8 rounded-full"
          onClick={() => onSave?.(id)}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2">{title}</h3>
          <Badge variant="outline" className="shrink-0 text-xs">
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{prepTime} min</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings} servings</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
