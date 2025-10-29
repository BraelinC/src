import { Heart } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
          <span className="text-rose-600">Healthy Mama</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">Sign In</button>
        </div>
      </div>
    </header>
  );
}
