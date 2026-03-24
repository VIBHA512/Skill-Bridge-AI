import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12 animate-fade-in">
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
          SkillBridge AI
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Your AI-powered career companion for skill gap analysis and professional growth
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={() => navigate("/fresher")}
          className="bg-card border border-border rounded-xl p-8 text-left card-hover group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-3">I'm a Fresher</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Just starting your career journey? Get personalized guidance on essential skills, entry-level opportunities, and learning roadmaps.
          </p>
          <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Your Journey <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        <button
          onClick={() => navigate("/experienced")}
          className="bg-card border border-border rounded-xl p-8 text-left card-hover group cursor-pointer animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-3">I'm Experienced</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Ready to level up? Discover advanced skills, leadership opportunities, and strategic career paths to accelerate your growth.
          </p>
          <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Advance Your Career <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Index;
