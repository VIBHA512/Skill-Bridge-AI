import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RoleDropdown from "@/components/RoleDropdown";
import ResumeUpload from "@/components/ResumeUpload";
import AnalysisResults from "@/components/AnalysisResults";
import ChatBot from "@/components/ChatBot";

const ExperiencedFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [form, setForm] = useState({
    name: "",
    currentRole: "",
    yearsOfExperience: "",
    targetRole: "",
    currentSkills: "",
    challenges: "",
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
      <>
        <AnalysisResults
          type="experienced"
          name={form.name}
          desiredRole={form.targetRole}
          currentSkills={form.currentSkills}
          onBack={() => navigate("/")}
        />
        <ChatBot />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full relative z-10"
      >
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
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? "bg-accent" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {step === 1 ? "Your professional profile" : "Growth objectives"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {step === 1 ? "Tell us about your current experience" : "Where do you want to take your career?"}
          </p>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <Label className="text-foreground mb-2 block">Full Name</Label>
              <Input placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Current Role</Label>
              <Input placeholder="e.g., Senior Software Engineer" value={form.currentRole} onChange={(e) => setForm({ ...form, currentRole: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Years of Experience</Label>
              <Input placeholder="e.g., 5" type="number" value={form.yearsOfExperience} onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <ResumeUpload onSkillsExtracted={(skills) => setForm({ ...form, currentSkills: skills })} />
            <Button onClick={() => setStep(2)} className="w-full bg-accent text-accent-foreground hover:opacity-90">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <RoleDropdown type="experienced" value={form.targetRole} onChange={(val) => setForm({ ...form, targetRole: val })} />
            <div>
              <Label className="text-foreground mb-2 block">Current Skills & Expertise</Label>
              <Textarea placeholder="e.g., React, Node.js, AWS, team leadership" value={form.currentSkills} onChange={(e) => setForm({ ...form, currentSkills: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-[100px]" />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Key Challenges</Label>
              <Textarea placeholder="e.g., transitioning to management, system design" value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-[100px]" />
            </div>
            <Button onClick={handleAnalyze} disabled={loading} className="w-full bg-accent text-accent-foreground hover:opacity-90">
              {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>) : (<><Sparkles className="w-4 h-4 mr-2" /> Analyze My Career</>)}
            </Button>
          </motion.div>
        )}
      </motion.div>
      <ChatBot />
    </div>
  );
};

export default ExperiencedFlow;
