import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Server, Cloud, Zap, Shield, Globe } from "lucide-react";
import { toast } from "sonner";

interface HostingSuggestion {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  pricing: string;
  bestFor: string[];
  type: "shared" | "vps" | "dedicated" | "cloud" | "cdn";
}

const examplePrompts = [
  "I need hosting for a small WordPress blog with low traffic",
  "Looking for scalable hosting for a React app with global users",
  "Need enterprise-grade hosting for an e-commerce site with high traffic",
  "Want cheap hosting for a personal portfolio website",
  "Need hosting with AI/ML capabilities for a data science project"
];

export const HostingWizard = () => {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<HostingSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const getHostingSuggestions = async (userPrompt: string) => {
    setIsLoading(true);
    
    // Simulate AI processing with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock hosting suggestions based on keywords in prompt
    const mockSuggestions: HostingSuggestion[] = [];
    
    // Budget-friendly options
    if (userPrompt.toLowerCase().includes('cheap') || userPrompt.toLowerCase().includes('budget') || userPrompt.toLowerCase().includes('affordable')) {
      mockSuggestions.push(
        {
          name: "Hostinger",
          description: "Ultra-affordable shared hosting with excellent value",
          pros: ["Very cheap", "Free domain", "Good performance", "24/7 support"],
          cons: ["Limited resources", "Shared environment"],
          pricing: "$1.99-$8.99/month",
          bestFor: ["Personal sites", "Small projects", "Beginners"],
          type: "shared"
        },
        {
          name: "Namecheap",
          description: "Budget hosting with free website builder",
          pros: ["Low cost", "Free website builder", "Easy setup", "cPanel included"],
          cons: ["Basic features", "Limited bandwidth"],
          pricing: "$1.58-$4.88/month",
          bestFor: ["Small websites", "First-time users", "Basic blogs"],
          type: "shared"
        },
        {
          name: "InfinityFree",
          description: "Completely free hosting with no ads",
          pros: ["100% free", "No ads", "PHP & MySQL", "Free SSL"],
          cons: ["Limited resources", "No phone support", "Basic features"],
          pricing: "Free",
          bestFor: ["Testing", "Learning", "Small personal sites"],
          type: "shared"
        }
      );
    }
    
    // WordPress hosting
    if (userPrompt.toLowerCase().includes('wordpress') || userPrompt.toLowerCase().includes('blog')) {
      mockSuggestions.push(
        {
          name: "WP Engine",
          description: "Premium managed WordPress hosting",
          pros: ["WordPress optimized", "Automatic updates", "Daily backups", "CDN included"],
          cons: ["More expensive", "WordPress only"],
          pricing: "$25-$400/month",
          bestFor: ["Professional WordPress sites", "High-traffic blogs"],
          type: "cloud"
        },
        {
          name: "Bluehost",
          description: "WordPress recommended hosting provider",
          pros: ["WordPress recommended", "Free domain", "One-click install", "24/7 support"],
          cons: ["Upselling", "Renewal rates increase"],
          pricing: "$2.75-$13.95/month",
          bestFor: ["WordPress beginners", "Small to medium blogs"],
          type: "shared"
        }
      );
    }
    
    // Frontend/React hosting
    if (userPrompt.toLowerCase().includes('react') || userPrompt.toLowerCase().includes('frontend') || userPrompt.toLowerCase().includes('static')) {
      mockSuggestions.push(
        {
          name: "Vercel",
          description: "Platform for frontend frameworks with edge functions",
          pros: ["Easy deployment", "Global CDN", "Serverless functions", "Git integration"],
          cons: ["Limited backend", "Bandwidth limits"],
          pricing: "Free - $20/month",
          bestFor: ["React apps", "Next.js", "Static sites"],
          type: "cloud"
        },
        {
          name: "Netlify",
          description: "Platform for modern web projects",
          pros: ["Continuous deployment", "Form handling", "Edge functions", "Free tier"],
          cons: ["Build time limits", "Limited server-side"],
          pricing: "Free - $19/month",
          bestFor: ["JAMstack sites", "Static generators", "Frontend apps"],
          type: "cloud"
        },
        {
          name: "GitHub Pages",
          description: "Free static site hosting from GitHub",
          pros: ["Completely free", "Git integration", "Custom domains", "HTTPS"],
          cons: ["Static only", "Public repos only on free tier"],
          pricing: "Free",
          bestFor: ["Documentation", "Portfolios", "Open source projects"],
          type: "cloud"
        }
      );
    }
    
    // Enterprise/High-traffic
    if (userPrompt.toLowerCase().includes('enterprise') || userPrompt.toLowerCase().includes('high traffic') || userPrompt.toLowerCase().includes('scalable')) {
      mockSuggestions.push(
        {
          name: "AWS",
          description: "Enterprise cloud platform with comprehensive services",
          pros: ["Highly scalable", "Global infrastructure", "Enterprise features", "99.99% uptime"],
          cons: ["Complex setup", "Can be expensive", "Learning curve"],
          pricing: "Pay-as-you-go",
          bestFor: ["Enterprise apps", "High traffic", "Complex architectures"],
          type: "cloud"
        },
        {
          name: "Google Cloud Platform",
          description: "Google's enterprise cloud platform",
          pros: ["AI/ML tools", "Global network", "Kubernetes native", "BigQuery"],
          cons: ["Complex pricing", "Learning curve"],
          pricing: "Pay-as-you-go",
          bestFor: ["AI/ML projects", "Data analytics", "Enterprise apps"],
          type: "cloud"
        },
        {
          name: "Microsoft Azure",
          description: "Microsoft's cloud computing platform",
          pros: ["Enterprise integration", "Hybrid cloud", "AI services", "Global reach"],
          cons: ["Complex management", "Pricing complexity"],
          pricing: "Pay-as-you-go",
          bestFor: ["Enterprise apps", "Microsoft stack", "Hybrid solutions"],
          type: "cloud"
        }
      );
    }
    
    // VPS/Dedicated hosting
    if (userPrompt.toLowerCase().includes('vps') || userPrompt.toLowerCase().includes('dedicated') || userPrompt.toLowerCase().includes('control')) {
      mockSuggestions.push(
        {
          name: "DigitalOcean",
          description: "Simple cloud computing for developers",
          pros: ["Developer-friendly", "Predictable pricing", "SSD storage", "Good documentation"],
          cons: ["No managed services", "Technical knowledge required"],
          pricing: "$4-$960/month",
          bestFor: ["Developers", "Custom applications", "Full control"],
          type: "vps"
        },
        {
          name: "Vultr",
          description: "High-performance SSD cloud servers",
          pros: ["Fast SSD storage", "Multiple locations", "Hourly billing", "Competitive pricing"],
          cons: ["No managed support", "Technical setup required"],
          pricing: "$2.50-$640/month",
          bestFor: ["Performance apps", "Gaming servers", "Custom setups"],
          type: "vps"
        },
        {
          name: "Linode",
          description: "Virtual private servers with excellent support",
          pros: ["Great support", "Transparent pricing", "High performance", "Developer tools"],
          cons: ["Technical knowledge needed", "No Windows"],
          pricing: "$5-$960/month",
          bestFor: ["Linux applications", "Development", "Small to medium apps"],
          type: "vps"
        }
      );
    }
    
    // E-commerce hosting
    if (userPrompt.toLowerCase().includes('ecommerce') || userPrompt.toLowerCase().includes('shop') || userPrompt.toLowerCase().includes('store')) {
      mockSuggestions.push(
        {
          name: "Shopify",
          description: "Complete e-commerce platform",
          pros: ["All-in-one solution", "Payment processing", "Mobile apps", "Themes"],
          cons: ["Transaction fees", "Limited customization", "Monthly costs"],
          pricing: "$29-$299/month",
          bestFor: ["Online stores", "Drop shipping", "Digital products"],
          type: "cloud"
        },
        {
          name: "WooCommerce (SiteGround)",
          description: "WordPress e-commerce with optimized hosting",
          pros: ["WordPress integration", "Customizable", "Many plugins", "Good performance"],
          cons: ["Requires maintenance", "Security responsibility"],
          pricing: "$2.99-$14.99/month",
          bestFor: ["WordPress stores", "Custom e-commerce", "Content + commerce"],
          type: "shared"
        }
      );
    }
    
    // CDN and performance
    if (userPrompt.toLowerCase().includes('cdn') || userPrompt.toLowerCase().includes('fast') || userPrompt.toLowerCase().includes('performance')) {
      mockSuggestions.push(
        {
          name: "Cloudflare",
          description: "Global CDN and security platform",
          pros: ["Global CDN", "DDoS protection", "Free tier", "Performance optimization"],
          cons: ["Can be complex", "Some features are paid"],
          pricing: "Free - $200/month",
          bestFor: ["Performance optimization", "Security", "Global reach"],
          type: "cdn"
        },
        {
          name: "KeyCDN",
          description: "High-performance content delivery network",
          pros: ["Pay-as-you-go", "HTTP/2", "Real-time analytics", "Global network"],
          cons: ["Technical setup", "No free tier"],
          pricing: "$0.04/GB",
          bestFor: ["Media delivery", "API acceleration", "Global content"],
          type: "cdn"
        }
      );
    }
    
    // Default suggestions if no specific keywords found
    if (mockSuggestions.length === 0) {
      mockSuggestions.push(
        {
          name: "DigitalOcean",
          description: "Developer-friendly cloud platform with simple pricing",
          pros: ["Simple pricing", "Good documentation", "SSD storage", "Developer tools"],
          cons: ["Limited enterprise features", "No phone support"],
          pricing: "$5-$640/month",
          bestFor: ["Developers", "Small to medium apps", "Startups"],
          type: "vps"
        },
        {
          name: "Netlify",
          description: "Modern hosting for static sites and JAMstack apps",
          pros: ["Git-based deployment", "Form handling", "Edge functions", "Great DX"],
          cons: ["Static sites only", "Function limitations"],
          pricing: "Free - $45/month",
          bestFor: ["Static sites", "JAMstack", "Frontend apps"],
          type: "cdn"
        }
      );
    }
    
    setSuggestions(mockSuggestions);
    setIsLoading(false);
    toast.success("Hosting suggestions generated!");
  };

  // Scroll to results when suggestions are updated
  useEffect(() => {
    if (suggestions.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter your hosting requirements");
      return;
    }
    getHostingSuggestions(prompt);
  };

  const getTypeIcon = (type: HostingSuggestion["type"]) => {
    switch (type) {
      case "shared": return <Server className="w-4 h-4" />;
      case "vps": return <Cloud className="w-4 h-4" />;
      case "dedicated": return <Shield className="w-4 h-4" />;
      case "cloud": return <Zap className="w-4 h-4" />;
      case "cdn": return <Globe className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: HostingSuggestion["type"]) => {
    switch (type) {
      case "shared": return "bg-warning-orange/20 text-warning-orange border-warning-orange/30";
      case "vps": return "bg-cloud-blue/20 text-cloud-blue border-cloud-blue/30";
      case "dedicated": return "bg-success-green/20 text-success-green border-success-green/30";
      case "cloud": return "bg-cloud-purple/20 text-cloud-purple border-cloud-purple/30";
      case "cdn": return "bg-tech-glow/20 text-tech-glow border-tech-glow/30";
      default: return "bg-secondary/50 text-secondary-foreground border-secondary";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Hosting Advisor</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Find Your Perfect Host
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Describe your project needs and get personalized hosting recommendations powered by AI
        </p>
      </div>

      {/* Input Form */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Describe Your Hosting Needs
          </CardTitle>
          <CardDescription>
            Tell us about your project, expected traffic, budget, and any specific requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Example: I'm building a React e-commerce app expecting 10k users/month, need good performance and SEO, budget around $50/month..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none border-border/50 bg-background/50"
            />
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Your Needs...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Get Hosting Recommendations
                </>
              )}
            </Button>
          </form>

          {/* Example Prompts */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
            <div className="grid gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors text-sm border border-border/30"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {suggestions.length > 0 && (
        <div ref={resultsRef} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Recommended Hosting Solutions</h2>
            <p className="text-muted-foreground">Based on your requirements, here are the best options:</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        {suggestion.name}
                        <Badge variant="outline" className={getTypeColor(suggestion.type)}>
                          {getTypeIcon(suggestion.type)}
                          {suggestion.type.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">{suggestion.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-success-green mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {suggestion.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1 h-1 bg-success-green rounded-full" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warning-orange mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {suggestion.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1 h-1 bg-warning-orange rounded-full" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Pricing</p>
                        <p className="text-primary font-bold">{suggestion.pricing}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Best for:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.bestFor.map((use, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};