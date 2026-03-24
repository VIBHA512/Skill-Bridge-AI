import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AnalysisResults from "@/components/AnalysisResults";

const FresherFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [form, setForm] = useState({
    name: "",
    education: "",
    fieldOfStudy: "",
    desiredRole: "",
    currentSkills: "",
    interests: "",
  });

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 2500);
  };

  if (showResults) {
    return (
      <AnalysisResults
        type="fresher"
        name={form.name}
        desiredRole={form.desiredRole}
        currentSkills={form.currentSkills}
        onBack={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <button
          onClick={() => (step === 1 ? navigate("/") : setStep(step - 1))}
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {step === 1 ? "Tell us about yourself" : "Your career goals"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {step === 1
              ? "We'll use this to personalize your skill analysis"
              : "Help us understand where you want to go"}
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <Label className="text-foreground mb-2 block">Full Name</Label>
              <Input
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Education Level</Label>
              <Input
                placeholder="e.g., B.Tech in Computer Science"
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Field of Study</Label>
              <Input
                placeholder="e.g., Computer Science, Business"
                value={form.fieldOfStudy}
                onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-primary-foreground hover:opacity-90"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <Label className="text-foreground mb-2 block">Desired Role</Label>
              <Input
                placeholder="e.g., Frontend Developer, Data Analyst"
                value={form.desiredRole}
                onChange={(e) => setForm({ ...form, desiredRole: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Current Skills</Label>
              <Textarea
                placeholder="e.g., HTML, CSS, basic Python, Excel"
                value={form.currentSkills}
                onChange={(e) => setForm({ ...form, currentSkills: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-[100px]"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Interests & Passions</Label>
              <Textarea
                placeholder="e.g., AI, web development, data visualization"
                value={form.interests}
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> Analyze My Skills
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FresherFlow;
