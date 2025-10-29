import { useState } from "react";
import { Home, BookOpen, Plus, MessageSquare, Link, Users } from "lucide-react";
import { Header } from "./components/Header";
import { CommunityCard } from "./components/CommunityCard";
import { RecipeCard } from "./components/RecipeCard";
import { ChatInterface } from "./components/ChatInterface";
import { RecipeForm } from "./components/RecipeForm";
import { RecipeExtractor } from "./components/RecipeExtractor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// Mock data for communities
const communities = [
  {
    id: "1",
    name: "Italian Pasta Masters",
    image: "https://images.unsplash.com/photo-1612078960243-177e68303e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBjb29raW5nfGVufDF8fHx8MTc2MDU2OTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    recipeCount: 156,
    memberCount: 2340,
    nationalities: ["🇮🇹 Italian"],
    creator: {
      name: "Chef Giovanni",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 12.99,
    priceType: "month" as const,
  },
  {
    id: "2",
    name: "Asian Fusion Kitchen",
    image: "https://images.unsplash.com/photo-1687684987020-5373255b5dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZvb2QlMjBkaXNoZXN8ZW58MXx8fHwxNzYwNTY5MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    recipeCount: 203,
    memberCount: 3500,
    nationalities: ["🇯🇵 Japanese", "🇹🇭 Thai", "🇰🇷 Korean"],
    creator: {
      name: "Chef Yuki",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 15.99,
    priceType: "month" as const,
  },
  {
    id: "3",
    name: "Mexican Street Food",
    image: "https://images.unsplash.com/photo-1615818449536-f26c1e1fe0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc2MDUzNzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    recipeCount: 98,
    memberCount: 1890,
    nationalities: ["🇲🇽 Mexican"],
    creator: {
      name: "Chef Maria",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 9.99,
    priceType: "month" as const,
  },
  {
    id: "4",
    name: "French Pastry Academy",
    image: "https://images.unsplash.com/photo-1496890607984-d27fca8a68ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBwYXN0cnklMjBkZXNzZXJ0fGVufDF8fHx8MTc2MDU2OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
    recipeCount: 127,
    memberCount: 2670,
    nationalities: ["🇫🇷 French"],
    creator: {
      name: "Chef Pierre",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 19.99,
    priceType: "month" as const,
  },
  {
    id: "5",
    name: "Healthy Meal Prep",
    image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MDUyMDc4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    recipeCount: 189,
    memberCount: 5200,
    nationalities: ["🌍 International"],
    creator: {
      name: "Chef Sarah",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 0,
    priceType: "free" as const,
  },
  {
    id: "6",
    name: "Vegan Delights",
    image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MDUyMDc4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    recipeCount: 234,
    memberCount: 4120,
    nationalities: ["🌱 Plant-Based"],
    creator: {
      name: "Chef Alex",
      avatar: "https://images.unsplash.com/photo-1759209402969-be3ea5027356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA0ODgzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    price: 11.99,
    priceType: "month" as const,
  },
];

// Mock data for recipes
const mockRecipes = [
  {
    id: "1",
    title: "Creamy Carbonara Pasta",
    image: "https://images.unsplash.com/photo-1612078960243-177e68303e7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBjb29raW5nfGVufDF8fHx8MTc2MDU2OTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 25,
    servings: 4,
    category: "Dinner",
  },
  {
    id: "2",
    title: "Rainbow Buddha Bowl",
    image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MDUyMDc4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 20,
    servings: 2,
    category: "Lunch",
  },
  {
    id: "3",
    title: "Spicy Chicken Tacos",
    image: "https://images.unsplash.com/photo-1615818449536-f26c1e1fe0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc2MDUzNzM5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 30,
    servings: 4,
    category: "Dinner",
  },
  {
    id: "4",
    title: "Chocolate Croissants",
    image: "https://images.unsplash.com/photo-1496890607984-d27fca8a68ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBwYXN0cnklMjBkZXNzZXJ0fGVufDF8fHx8MTc2MDU2OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    prepTime: 45,
    servings: 6,
    category: "Breakfast",
  },
];

export default function App() {
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const handleSaveRecipe = (id: string) => {
    setSavedRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="communities" className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid mb-8">
            <TabsTrigger value="communities" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Communities</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">My Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </TabsTrigger>
            <TabsTrigger value="extract" className="gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Extract</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-6">
            <div>
              <h1>Discover Communities</h1>
              <p className="text-gray-600 mt-1">
                Join chef-led communities and access exclusive recipes, videos, and cooking tips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <CommunityCard key={community.id} {...community} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div>
              <h1>My Recipes</h1>
              <p className="text-gray-600 mt-1">
                Browse and manage your saved recipes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={handleSaveRecipe}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div>
              <h1>Create New Recipe</h1>
              <p className="text-gray-600 mt-1">
                Add your own recipes to your collection
              </p>
            </div>

            <RecipeForm />
          </TabsContent>

          <TabsContent value="extract" className="space-y-6">
            <div>
              <h1>Recipe Extractor</h1>
              <p className="text-gray-600 mt-1">
                Extract recipes from any website and add them to your meal plans
              </p>
            </div>

            <RecipeExtractor />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div>
              <h1>AI Recipe Assistant</h1>
              <p className="text-gray-600 mt-1">
                Get personalized cooking help, recipe suggestions, and nutritional advice
              </p>
            </div>

            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="home" className="space-y-6">
            <div>
              <h1>Welcome to Healthy Mama</h1>
              <p className="text-gray-600 mt-1">
                Your complete recipe management and community platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-8 rounded-lg">
                <h2 className="text-white mb-2">Create & Save Recipes</h2>
                <p className="text-rose-50 mb-4">
                  Build your personal recipe collection with our easy-to-use tools
                </p>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Create recipes
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Extract from web
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
                <h2 className="text-white mb-2">AI Assistant</h2>
                <p className="text-blue-50 mb-4">
                  Get instant help with cooking questions, substitutions, and meal ideas
                </p>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    24/7 support
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Smart suggestions
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-lg">
                <h2 className="text-white mb-2">Join Communities</h2>
                <p className="text-green-50 mb-4">
                  Connect with professional chefs and access exclusive content
                </p>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Expert recipes
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Video tutorials
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-lg">
                <h2 className="text-white mb-2">Meal Planning</h2>
                <p className="text-orange-50 mb-4">
                  Organize your recipes into meal plans for easy weekly preparation
                </p>
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Weekly plans
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded">
                    Shopping lists
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4">Featured Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    isSaved={savedRecipes.includes(recipe.id)}
                    onSave={handleSaveRecipe}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
