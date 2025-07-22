import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Users, Clock, Heart } from "lucide-react";
import { Link } from "wouter";
import { BusinessIdea } from "@/lib/types";

interface BusinessIdeaCardProps {
  idea: BusinessIdea;
  onBookmark?: (id: number) => void;
  isBookmarked?: boolean;
}

export default function BusinessIdeaCard({ idea, onBookmark, isBookmarked = false }: BusinessIdeaCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-blue-200">
      <Link href={`/idea/${idea.id}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {idea.category}
              </Badge>
              {idea.isTrending && (
                <Badge variant="default" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {idea.expertiseLevel}
              </Badge>
            </div>
            {onBookmark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBookmark(idea.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            )}
          </div>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {idea.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {idea.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Investment Range */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Investment Range</div>
              <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                ₹{idea.minInvestment?.toLocaleString()} - ₹{idea.maxInvestment?.toLocaleString()}
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{idea.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{idea.viewCount} views</span>
              </div>
              {idea.timeToProfit && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{idea.timeToProfit}</span>
                </div>
              )}
            </div>
            
            {/* Success Rate */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">Success Rate</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${idea.successRate}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-green-600">{idea.successRate}%</span>
              </div>
            </div>
            
            {/* Target Demographic */}
            <div className="pt-2 border-t">
              <span className="text-xs text-gray-500">Target: {idea.targetDemographic}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}