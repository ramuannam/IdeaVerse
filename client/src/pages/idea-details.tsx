import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Star, TrendingUp, Users, MapPin, Clock, DollarSign, Award, BookOpen, Shield } from "lucide-react";
import { BusinessIdea, SuccessStory, GovernmentSupport, TrainingResource, ImplementationStep, Tag } from "@/lib/types";

export default function IdeaDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  const { data: idea, isLoading, error } = useQuery({
    queryKey: [`/api/ideas/${id}`],
    enabled: !!id,
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userId] = useState(1); // Mock user ID - replace with authentication

  // Check if bookmarked
  const { data: bookmarkStatus } = useQuery({
    queryKey: [`/api/bookmarks/check`, userId, id],
    queryFn: async () => {
      const response = await fetch(`/api/bookmarks/check?userId=${userId}&businessIdeaId=${id}`);
      const data = await response.json();
      return data;
    },
    enabled: !!id && !!userId,
  });

  useEffect(() => {
    if (bookmarkStatus) {
      setIsBookmarked(bookmarkStatus.bookmarked);
    }
  }, [bookmarkStatus]);

  const toggleBookmarkMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/bookmarks/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          businessIdeaId: parseInt(id!)
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setIsBookmarked(data.bookmarked);
      queryClient.invalidateQueries({ queryKey: [`/api/bookmarks/check`, userId, id] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading business idea details...</p>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>Business idea not found or unable to load details.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const businessIdea = idea as BusinessIdea;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ideas
            </Button>
          </Link>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Main details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{businessIdea.category}</Badge>
                      {businessIdea.isTrending && (
                        <Badge variant="default" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="outline">{businessIdea.expertiseLevel}</Badge>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl">{businessIdea.title}</CardTitle>
                    <CardDescription className="text-base">{businessIdea.description}</CardDescription>
                  </div>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleBookmarkMutation.mutate()}
                    disabled={toggleBookmarkMutation.isPending}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 pt-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{businessIdea.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{businessIdea.viewCount} views</span>
                  </div>
                  {businessIdea.timeToProfit && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{businessIdea.timeToProfit}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Detailed description */}
            {businessIdea.detailedDescription && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {businessIdea.detailedDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tabbed content */}
            <Tabs defaultValue="investment" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="investment">Investment</TabsTrigger>
                <TabsTrigger value="success">Success Stories</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="investment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Investment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Initial Investment</h4>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          ₹{businessIdea.minInvestment?.toLocaleString()} - ₹{businessIdea.maxInvestment?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-semibold text-green-900 dark:text-green-100">Success Rate</h4>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">{businessIdea.successRate}%</p>
                      </div>
                    </div>
                    
                    {businessIdea.requirements && (
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <p className="text-gray-600 dark:text-gray-400">{businessIdea.requirements}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="success" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Success Stories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {businessIdea.successStories && businessIdea.successStories.length > 0 ? (
                      <div className="space-y-4">
                        {businessIdea.successStories.map((story: SuccessStory, index: number) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{story.name}</h4>
                                {story.location && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {story.location}
                                  </p>
                                )}
                              </div>
                              {story.earnings && (
                                <Badge variant="secondary">₹{story.earnings}</Badge>
                              )}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{story.story}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No success stories available yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Government Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {businessIdea.governmentSupport && businessIdea.governmentSupport.length > 0 ? (
                      <div className="space-y-3">
                        {businessIdea.governmentSupport.map((support: GovernmentSupport, index: number) => (
                          <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-green-800 dark:text-green-200">{support.supportDetail}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No specific government support schemes available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Training & Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {businessIdea.trainingResources && businessIdea.trainingResources.length > 0 ? (
                      <div className="space-y-3">
                        {businessIdea.trainingResources.map((resource: TrainingResource, index: number) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">{resource.resource}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No specific training resources listed.</p>
                    )}

                    {businessIdea.steps && businessIdea.steps.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Implementation Steps</h4>
                        <div className="space-y-2">
                          {businessIdea.steps.map((step: ImplementationStep, index: number) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{step.step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Quick stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Target Demographic</span>
                  <span className="font-semibold">{businessIdea.targetDemographic}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Expertise Level</span>
                  <span className="font-semibold">{businessIdea.expertiseLevel}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-semibold text-green-600">{businessIdea.successRate}%</span>
                </div>
                {businessIdea.timeToProfit && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Time to Profit</span>
                      <span className="font-semibold">{businessIdea.timeToProfit}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            {businessIdea.tags && businessIdea.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {businessIdea.tags.map((tag: Tag, index: number) => (
                      <Badge key={index} variant="outline">
                        {tag.tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">Ready to Start?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join thousands who are building successful businesses with our comprehensive guidance.
                  </p>
                  <Button className="w-full">
                    Get Started Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}