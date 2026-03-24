import { ArrowLeft, Target, TrendingUp, BookOpen, CheckCircle2, AlertTriangle, Star, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

interface AnalysisResultsProps {
  type: "fresher" | "experienced";
  name: string;
  desiredRole: string;
  currentSkills: string;
  onBack: () => void;
}

const fresherData = {
  overallScore: 42,
  skillGaps: [
    { skill: "JavaScript/TypeScript", level: 30, priority: "high" as const },
    { skill: "React/Frontend Frameworks", level: 15, priority: "high" as const },
    { skill: "Version Control (Git)", level: 45, priority: "medium" as const },
    { skill: "Data Structures & Algorithms", level: 35, priority: "high" as const },
    { skill: "API Development", level: 20, priority: "medium" as const },
    { skill: "Database Fundamentals", level: 25, priority: "medium" as const },
  ],
  recommendations: [
    "Complete a full-stack web development bootcamp",
    "Build 3-5 portfolio projects with source code on GitHub",
    "Practice coding challenges on LeetCode or HackerRank daily",
    "Contribute to open-source projects to gain real-world experience",
    "Get certified in cloud fundamentals (AWS/Azure/GCP)",
    "Join tech communities and attend meetups for networking",
  ],
  roadmap: [
    { month: "Month 1-2", tasks: ["Master JavaScript fundamentals", "Learn Git & GitHub workflows", "Build first web project", "Start a daily coding habit"] },
    { month: "Month 3-4", tasks: ["Learn React or similar framework", "Study data structures & algorithms", "Start solving coding challenges", "Build 2 portfolio projects"] },
    { month: "Month 5-6", tasks: ["Learn API development (REST/GraphQL)", "Study cloud fundamentals", "Contribute to open-source", "Apply for internships & entry-level roles"] },
  ],
  topSkills: [
    { skill: "Communication", current: 70, required: 75 },
    { skill: "Problem Solving", current: 45, required: 85 },
    { skill: "Programming", current: 30, required: 80 },
    { skill: "Teamwork", current: 65, required: 70 },
    { skill: "Adaptability", current: 60, required: 75 },
    { skill: "Technical Writing", current: 35, required: 55 },
  ],
};

const experiencedData = {
  overallScore: 68,
  skillGaps: [
    { skill: "System Design", level: 45, priority: "high" as const },
    { skill: "Team Leadership", level: 55, priority: "high" as const },
    { skill: "Architecture Patterns", level: 50, priority: "medium" as const },
    { skill: "Strategic Planning", level: 35, priority: "high" as const },
    { skill: "Cross-team Collaboration", level: 60, priority: "medium" as const },
    { skill: "Mentoring & Coaching", level: 50, priority: "medium" as const },
  ],
  recommendations: [
    "Lead a cross-functional project to demonstrate leadership",
    "Study system design through case studies and mock interviews",
    "Mentor junior developers to build management skills",
    "Take a strategic leadership or MBA-style course",
    "Present at tech conferences or write technical blog posts",
    "Build a personal brand through content creation",
  ],
  roadmap: [
    { month: "Month 1-2", tasks: ["Study system design patterns", "Start mentoring 2-3 juniors", "Read 'Staff Engineer' by Will Larson", "Document architectural decisions"] },
    { month: "Month 3-4", tasks: ["Lead a cross-team initiative", "Take leadership training course", "Build internal tools or frameworks", "Start writing technical blog posts"] },
    { month: "Month 5-6", tasks: ["Present at internal/external tech talks", "Drive major architectural decisions", "Apply for target senior roles", "Build professional network strategically"] },
  ],
  topSkills: [
    { skill: "Technical Depth", current: 85, required: 90 },
    { skill: "System Design", current: 45, required: 85 },
    { skill: "Leadership", current: 55, required: 90 },
    { skill: "Communication", current: 70, required: 85 },
    { skill: "Strategy", current: 35, required: 80 },
    { skill: "Mentoring", current: 50, required: 80 },
  ],
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const AnalysisResults = ({ type, name, onBack }: AnalysisResultsProps) => {
  const data = type === "fresher" ? fresherData : experiencedData;
  const accentClass = type === "fresher" ? "text-primary" : "text-accent";

  const radarData = data.topSkills.map((s) => ({
    subject: s.skill,
    current: s.current,
    required: s.required,
  }));

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-destructive/15 text-destructive">
          <AlertTriangle className="w-3 h-3" /> High Priority
        </span>
      );
    }
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 ${accentClass}`}>
        <Star className="w-3 h-3" /> Medium
      </span>
    );
  };

  const getProgressColor = (level: number) => {
    if (level < 35) return "[&>div]:bg-destructive";
    if (level < 60) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-primary";
  };

  const handleDownload = () => {
    toast.success("Report download started! (Demo mode)");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "My SkillBridge AI Analysis", text: `Check out my skill analysis — overall score: ${data.overallScore}%!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12 relative">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Start Over
          </button>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground hover:bg-secondary/80 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={handleShare} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground hover:bg-secondary/80 transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        <motion.div variants={item} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {name ? `${name}'s` : "Your"} Skill Analysis
          </h1>
          <p className="text-muted-foreground">AI-powered career insights and personalized roadmap</p>
        </motion.div>

        {/* Score + Radar side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={item} className="bg-card border border-border rounded-2xl p-6 text-center flex flex-col justify-center">
            <p className="text-muted-foreground text-sm mb-3">Overall Readiness Score</p>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(220, 15%, 13%)" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={type === "fresher" ? "hsl(175, 80%, 50%)" : "hsl(265, 80%, 65%)"} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(data.overallScore / 100) * 327} 327`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{data.overallScore}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {data.overallScore < 50 ? "Room for growth — follow your roadmap!" : "Good progress — keep pushing forward!"}
            </p>
          </motion.div>

          <motion.div variants={item} className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Skill Radar</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220, 15%, 20%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name="Required" dataKey="required" stroke="hsl(0, 0%, 40%)" fill="hsl(0, 0%, 40%)" fillOpacity={0.1} strokeDasharray="4 4" />
                <Radar name="Current" dataKey="current" stroke={type === "fresher" ? "hsl(175, 80%, 50%)" : "hsl(265, 80%, 65%)"} fill={type === "fresher" ? "hsl(175, 80%, 50%)" : "hsl(265, 80%, 65%)"} fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-3 h-0.5 rounded-full" style={{ background: type === "fresher" ? "hsl(175, 80%, 50%)" : "hsl(265, 80%, 65%)" }} /> Current
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-3 h-0.5 rounded-full bg-muted-foreground" style={{ borderTop: "2px dashed" }} /> Required
              </span>
            </div>
          </motion.div>
        </div>

        {/* Skill Gaps */}
        <motion.div variants={item} className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Target className={`w-5 h-5 ${accentClass}`} /> Skill Gap Analysis
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {data.skillGaps.map((gap) => (
              <div key={gap.skill}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-foreground">{gap.skill}</span>
                  {getPriorityBadge(gap.priority)}
                </div>
                <Progress value={gap.level} className={`h-2 bg-secondary ${getProgressColor(gap.level)}`} />
                <p className="text-xs text-muted-foreground mt-1">Current: {gap.level}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={item} className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <TrendingUp className={`w-5 h-5 ${accentClass}`} /> Recommendations
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-start bg-secondary/40 rounded-xl p-3">
                <CheckCircle2 className={`w-4 h-4 ${accentClass} mt-0.5 shrink-0`} />
                <p className="text-sm text-muted-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Roadmap */}
        <motion.div variants={item} className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <BookOpen className={`w-5 h-5 ${accentClass}`} /> Learning Roadmap
          </h2>
          <div className="space-y-6">
            {data.roadmap.map((phase, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ background: type === "fresher" ? "hsl(175, 80%, 50%)" : "hsl(265, 80%, 65%)" }} />
                <h3 className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{phase.month}</h3>
                <ul className="space-y-1.5">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex gap-2 items-start">
                      <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalysisResults;
