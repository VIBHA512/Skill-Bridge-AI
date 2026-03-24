import { ArrowLeft, Target, TrendingUp, BookOpen, CheckCircle2, AlertTriangle, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  ],
  recommendations: [
    "Complete a full-stack web development bootcamp",
    "Build 3-5 portfolio projects with source code on GitHub",
    "Practice coding challenges on LeetCode or HackerRank daily",
    "Contribute to open-source projects to gain real-world experience",
    "Get certified in cloud fundamentals (AWS/Azure/GCP)",
  ],
  roadmap: [
    { month: "Month 1-2", tasks: ["Master JavaScript fundamentals", "Learn Git & GitHub", "Build first web project"] },
    { month: "Month 3-4", tasks: ["Learn React or similar framework", "Study data structures", "Start coding challenges"] },
    { month: "Month 5-6", tasks: ["Build portfolio projects", "Learn API development", "Apply for internships"] },
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
  ],
  recommendations: [
    "Lead a cross-functional project to demonstrate leadership",
    "Study system design through case studies and mock interviews",
    "Mentor junior developers to build management skills",
    "Take a strategic leadership or MBA-style course",
    "Present at tech conferences or write technical blog posts",
  ],
  roadmap: [
    { month: "Month 1-2", tasks: ["Study system design patterns", "Start mentoring 2-3 juniors", "Read 'Staff Engineer' by Will Larson"] },
    { month: "Month 3-4", tasks: ["Lead a cross-team initiative", "Take leadership training", "Build internal tools/frameworks"] },
    { month: "Month 5-6", tasks: ["Present at internal tech talks", "Drive architectural decisions", "Apply for target roles"] },
  ],
};

const AnalysisResults = ({ type, name, onBack }: AnalysisResultsProps) => {
  const data = type === "fresher" ? fresherData : experiencedData;

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "text-destructive";
    return "text-primary";
  };

  const getProgressColor = (level: number) => {
    if (level < 35) return "[&>div]:bg-destructive";
    if (level < 60) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-primary";
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Start Over
        </button>

        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {name ? `${name}'s` : "Your"} Skill Analysis
          </h1>
          <p className="text-muted-foreground">AI-powered career insights and personalized roadmap</p>
        </div>

        {/* Overall Score */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-muted-foreground text-sm mb-3">Overall Readiness Score</p>
          <div className="text-5xl font-bold text-gradient mb-2">{data.overallScore}%</div>
          <Progress value={data.overallScore} className={`h-2 bg-secondary mt-4 ${getProgressColor(data.overallScore)}`} />
        </div>

        {/* Skill Gaps */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Skill Gap Analysis
          </h2>
          <div className="space-y-4">
            {data.skillGaps.map((gap) => (
              <div key={gap.skill}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-foreground">{gap.skill}</span>
                  <span className={`text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                    {gap.priority === "high" ? (
                      <span className="inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> High Priority</span>
                    ) : (
                      <span className="inline-flex items-center gap-1"><Star className="w-3 h-3" /> Medium</span>
                    )}
                  </span>
                </div>
                <Progress value={gap.level} className={`h-2 bg-secondary ${getProgressColor(gap.level)}`} />
                <p className="text-xs text-muted-foreground mt-1">Current proficiency: {gap.level}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Recommendations
          </h2>
          <div className="space-y-3">
            {data.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="bg-card border border-border rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Learning Roadmap
          </h2>
          <div className="space-y-6">
            {data.roadmap.map((phase, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold text-foreground mb-2">{phase.month}</h3>
                <ul className="space-y-1.5">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-sm text-muted-foreground">• {task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
