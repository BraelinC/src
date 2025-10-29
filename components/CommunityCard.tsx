import { Star, Users, ChefHat, DollarSign, BookOpen } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CommunityCardProps {
  name: string;
  image: string;
  rating: number;
  recipeCount: number;
  memberCount: number;
  nationalities: string[];
  creator: {
    name: string;
    avatar: string;
  };
  price: number;
  priceType: "month" | "year" | "free";
}

export function CommunityCard({
  name,
  image,
  rating,
  recipeCount,
  memberCount,
  nationalities,
  creator,
  price,
  priceType,
}: CommunityCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="line-clamp-1">{name}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-emerald-500" />
            <span>{recipeCount}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{memberCount.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {nationalities.map((nationality, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {nationality}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>
                <ChefHat className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">{creator.name}</span>
          </div>
          
          <div className="flex items-center gap-1 text-rose-600">
            {price === 0 ? (
              <span className="text-sm">Free</span>
            ) : (
              <>
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">
                  {price}/{priceType === "month" ? "mo" : "yr"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}