import EducationalContent from "@/components/learn/EducationalContent";
import TopicGuides from "@/components/learn/TopicGuides";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Learn() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Climate Change");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  
  const categoryImages = {
    "Climate Change": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format&fit=crop",
    "Biodiversity": "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=800&auto=format&fit=crop",
    "Pollution": "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop",
    "Sustainable Living": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
    "Conservation": "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&auto=format&fit=crop"
  };

  const categoryDescriptions = {
    "Climate Change": "Learn about the science of climate change, its impacts on our planet, and solutions to address this global challenge. Climate change refers to long-term shifts in temperatures and weather patterns, largely driven by human activities, especially the burning of fossil fuels. These activities increase heat-trapping greenhouse gas levels which raises Earth's average temperature, causing more frequent and severe weather events, rising sea levels, and disruption to ecosystems worldwide.",
    
    "Biodiversity": "Explore the incredible diversity of life on Earth, from the smallest microorganisms to the largest mammals. Biodiversity refers to the variety of plants, animals, and microorganisms that exist on our planet, all interconnected within complex ecosystems. Today, species are disappearing at an alarming rate due to habitat destruction, pollution, climate change, and other human activities. Understanding biodiversity is crucial for maintaining ecosystem health, developing medicines, supporting agriculture, and fostering resilience to environmental changes.",
    
    "Pollution": "Understand the various types of pollution affecting our air, water, and land, and how we can reduce our environmental footprint. Pollution occurs when harmful substances contaminate our environment, affecting human health and ecosystem functioning. Major forms include air pollution from vehicle emissions and industrial processes, water pollution from chemicals and waste, soil contamination from pesticides and improper waste disposal, and emerging issues like light and noise pollution. Learning about pollution sources helps us develop cleaner technologies and more sustainable practices.",
    
    "Sustainable Living": "Discover practical ways to lead a more sustainable lifestyle through conscious consumption, waste reduction, and energy efficiency. Sustainable living means making choices that minimize negative environmental impact while meeting our needs. This includes reducing energy consumption, minimizing waste, conserving water, choosing eco-friendly products, supporting local and organic food systems, using sustainable transportation, and advocating for environmental policies. Small daily changes collectively create significant positive impacts on our planet.",
    
    "Conservation": "Learn about crucial efforts to protect natural resources, restore habitats, and preserve the environment for future generations. Conservation encompasses the careful management and protection of our planet's natural resources—forests, oceans, wildlife, soil, and water. It includes establishing protected areas, restoring damaged ecosystems, preventing extinction of endangered species, combating illegal wildlife trade, and promoting sustainable resource use. Conservation efforts integrate scientific research, policy development, community engagement, and traditional knowledge to ensure ecological balance and human well-being."
  };

  const categoryTags = {
    "Climate Change": ["science", "ecosystems", "policy", "solutions"],
    "Biodiversity": ["ecosystems", "species", "conservation", "marine"],
    "Pollution": ["air quality", "water", "microplastics", "chemicals"],
    "Sustainable Living": ["food", "zero waste", "energy", "transportation"],
    "Conservation": ["wildlife", "forests", "oceans", "community"]
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTopic(null);
    setShowIntro(false);
  };
  
  const handleTopicSelect = (topic: string) => {
    setActiveTopic(topic);
    // We could use this to filter articles by topic in the future
    console.log(`Selected topic: ${topic} in category: ${selectedCategory}`);
  };

  return (
    <div className="space-y-8">
      {showIntro ? (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-md">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">Welcome to Environmental Education</h1>
            <p className="mb-4 text-gray-700">
              Discover our comprehensive collection of articles and resources to deepen your understanding of environmental issues and sustainable practices.
            </p>
            <p className="mb-6 text-gray-700">
              Browse through categories below, click on articles that interest you, and expand your environmental knowledge. Each article provides valuable insights on how to contribute to a healthier planet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(categoryImages).map(([category, imageUrl]) => (
                <Card 
                  key={category} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={category} 
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium">{category}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-green-800">{selectedCategory}</h1>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowIntro(true)}
                    size="sm"
                    className="text-sm"
                  >
                    View All Categories
                  </Button>
                </div>
                <p className="text-gray-700">{categoryDescriptions[selectedCategory as keyof typeof categoryDescriptions]}</p>
                <div className="flex flex-wrap gap-2">
                  {categoryTags[selectedCategory as keyof typeof categoryTags].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <TabsList className="w-full h-auto flex flex-wrap mb-6 bg-gray-100 p-1">
              {Object.keys(categoryImages).map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex-grow py-2 data-[state=active]:bg-white data-[state=active]:text-green-800"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.keys(categoryImages).map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <TopicGuides 
                  category={category} 
                  onTopicSelect={handleTopicSelect} 
                />
                <EducationalContent 
                  initialCategory={category} 
                  initialTopic={category === selectedCategory ? activeTopic : undefined} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
}
