import { useQuery } from "@tanstack/react-query";

interface Stats {
  totalIdeas: number;
  categories: number;
  successStories: number;
}

export default function HeroSection() {
  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  return (
    <section className="bg-gradient-to-br from-primary to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Next 
          <span className="text-yellow-400"> Big Idea</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          {stats?.totalIdeas || "10,000"}+ curated business ideas for middle-class entrepreneurs. From lazy Sunday projects to unicorn-inspired ventures - find your perfect opportunity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats?.totalIdeas?.toLocaleString() || "10,847"}</div>
            <div className="text-blue-200">Business Ideas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats?.successStories?.toLocaleString() || "2,341"}</div>
            <div className="text-blue-200">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats?.categories || "47"}</div>
            <div className="text-blue-200">Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
}
