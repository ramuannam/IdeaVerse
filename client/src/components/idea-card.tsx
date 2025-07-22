import { useState } from "react";
import { useLocation } from "wouter";
import { Star, Eye, Bookmark, University, Lightbulb, Info, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BusinessIdea } from "@shared/schema";

interface IdeaCardProps {
  idea: BusinessIdea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [_, setLocation] = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  const handleCardClick = () => {
    setLocation(`/idea/${idea.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Beverage": "bg-orange-100 text-orange-700",
      "Digital Marketing": "bg-purple-100 text-purple-700", 
      "Health & Fitness": "bg-green-100 text-green-700",
      "Delivery Services": "bg-blue-100 text-blue-700",
      "Handicrafts": "bg-pink-100 text-pink-700",
      "Education": "bg-indigo-100 text-indigo-700",
      "Agriculture": "bg-lime-100 text-lime-700",
      "Consulting": "bg-cyan-100 text-cyan-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const hasSuccessStory = idea.successStories && idea.successStories.length > 0;
  const hasGovernmentSupport = idea.governmentSupport?.available;

  return (
    <div className="masonry-item">
      <Card className="overflow-hidden hover-lift cursor-pointer group" onClick={handleCardClick}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={idea.imageUrl || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
            alt={idea.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className={getCategoryColor(idea.category)}>{idea.category}</Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {idea.rating ? (idea.rating / 10).toFixed(1) : "4.5"}
              </span>
            </div>
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{idea.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{idea.description}</p>
          
          {/* Success Story Highlight */}
          {hasSuccessStory && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
              <div className="flex items-center text-yellow-800 mb-1">
                <Lightbulb className="h-4 w-4 mr-2" />
                <span className="font-medium text-xs">Success Story</span>
              </div>
              <p className="text-yellow-700 text-xs">
                {idea.successStories![0].name} from {idea.successStories![0].location}: {idea.successStories![0].story.slice(0, 80)}...
              </p>
            </div>
          )}
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Investment</span>
              <span className="investment-badge text-white px-2 py-1 rounded text-xs font-medium">
                {formatCurrency(idea.investment.min)} - {formatCurrency(idea.investment.max)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Expertise</span>
              <span className="expertise-badge text-white px-2 py-1 rounded text-xs font-medium">
                {idea.expertise}
              </span>
            </div>
            {idea.trainingTime && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Training Time</span>
                <span className="text-gray-700 font-medium">{idea.trainingTime}</span>
              </div>
            )}
            {idea.monthlyEarning && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Monthly Earning</span>
                <span className="text-success font-semibold">
                  {formatCurrency(idea.monthlyEarning.min)} - {formatCurrency(idea.monthlyEarning.max)}
                </span>
              </div>
            )}
          </div>
          
          {/* Government Support */}
          {hasGovernmentSupport && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center text-green-700 mb-2">
                <University className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Government Support Available</span>
              </div>
              {idea.governmentSupport!.schemes && idea.governmentSupport!.schemes.length > 0 && (
                <ul className="text-green-600 text-xs space-y-1">
                  {idea.governmentSupport!.schemes.slice(0, 2).map((scheme, index) => (
                    <li key={index}>• {scheme}</li>
                  ))}
                  {idea.governmentSupport!.schemes.length > 2 && (
                    <li>• +{idea.governmentSupport!.schemes.length - 2} more schemes</li>
                  )}
                </ul>
              )}
            </div>
          )}
          
          {/* Special advantages badges */}
          {idea.specialAdvantages && idea.specialAdvantages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {idea.specialAdvantages.slice(0, 3).map((advantage, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {advantage}
                </Badge>
              ))}
              {idea.specialAdvantages.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{idea.specialAdvantages.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{idea.views || 0} views</span>
              </div>
              {idea.successRate && (
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{idea.successRate}% success</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkClick}
              className={isBookmarked ? "text-yellow-500" : "text-gray-400"}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
