import { useState } from "react";
import { Link as LinkIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

export function RecipeExtractor() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extractedRecipe, setExtractedRecipe] = useState<any>(null);

  const handleExtract = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    
    // Simulate extraction process
    setTimeout(() => {
      setExtractedRecipe({
        title: "Extracted Recipe Title",
        prepTime: 30,
        servings: 4,
        ingredients: [
          "2 cups all-purpose flour",
          "1 cup sugar",
          "1/2 cup butter",
          "2 eggs",
          "1 tsp vanilla extract",
        ],
        instructions: [
          "Preheat oven to 350°F (175°C)",
          "Mix dry ingredients in a bowl",
          "Cream butter and sugar together",
          "Add eggs and vanilla",
          "Bake for 25-30 minutes",
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleAddToMealPlan = () => {
    console.log("Adding to meal plan...");
    // Reset after adding
    setExtractedRecipe(null);
    setUrl("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2>Extract Recipe from URL</h2>
            <p className="text-sm text-gray-600 mt-1">
              Paste a recipe URL and we'll extract all the details for you
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Recipe URL</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/recipe"
                  className="pl-9"
                />
              </div>
              <Button onClick={handleExtract} disabled={isLoading || !url.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  "Extract"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {extractedRecipe && (
        <Card className="p-6">
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Recipe successfully extracted!
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <h3>{extractedRecipe.title}</h3>
              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <span>Prep: {extractedRecipe.prepTime} min</span>
                <span>Servings: {extractedRecipe.servings}</span>
              </div>
            </div>

            <div>
              <h4 className="mb-2">Ingredients</h4>
              <ul className="space-y-1">
                {extractedRecipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Instructions</h4>
              <ol className="space-y-2">
                {extractedRecipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex gap-2">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <span className="mt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setExtractedRecipe(null)}>
                Extract Another
              </Button>
              <Button onClick={handleAddToMealPlan}>
                Add to Meal Plan
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
