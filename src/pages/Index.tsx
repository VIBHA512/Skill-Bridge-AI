import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, Sparkles, ArrowRight, MessageSquare, Upload, Target, TrendingUp, Users, Brain, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ChatBot from "@/components/ChatBot";

const features = [
  { icon: Brain, title: "AI Skill Analysis", desc: "Get deep insights into your skill gaps with AI-powered assessment", color: "text-primary" },
  { icon: Upload, title: "Resume Parsing", desc: "Upload your resume and let AI extract and analyze your skills automatically", color: "text-accent" },
  { icon: Target, title: "Personalized Roadmap", desc: "Receive a tailored learning path based on your career goals", color: "text-primary" },
  { icon: MessageSquare, title: "AI Career Advisor", desc: "Chat with our AI for real-time career guidance and advice", color: "text-accent" },
  { icon: TrendingUp, title: "Industry Insights", desc: "Stay updated with trending skills and in-demand roles", color: "text-primary" },
  { icon: Shield, title: "Skill Validation", desc: "Benchmark your skills against industry standards", color: "text-accent" },
];

const stats = [
  { value: "50K+", label: "Skills Analyzed" },
  { value: "200+", label: "Career Roles" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "10K+", label: "Users Guided" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(175 80% 50%), transparent 70%)" }} />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(265 80% 65%), transparent 70%)" }} />

      {/* Header */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SkillBridge AI</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/fresher")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fresher</button>
          <button onClick={() => navigate("/experienced")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Experienced</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/60 border border-border rounded-full px-4 py-1.5 mb-6 text-xs text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" /> AI-Powered Career Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-5 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SkillBridge AI
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Your AI-powered career companion for skill gap analysis,
            resume insights, and professional growth
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6 max-w-3xl w-full mb-20"
        >
          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/fresher")}
            className="bg-card border border-border rounded-2xl p-8 text-left card-hover group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(175 80% 50%), transparent 70%)" }} />
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 glow-border">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>I'm a Fresher</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Just starting your career journey? Get personalized guidance on essential skills, entry-level opportunities, and learning roadmaps.
            </p>
            <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/experienced")}
            className="bg-card border border-border rounded-2xl p-8 text-left card-hover group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(265 80% 65%), transparent 70%)" }} />
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 glow-border-accent">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>I'm Experienced</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Ready to level up? Discover advanced skills, leadership opportunities, and strategic career paths to accelerate your growth.
            </p>
            <span className="text-accent text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Advance Your Career <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl w-full mb-24"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything you need to <span className="text-gradient">level up</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Powerful AI-driven tools to analyze, plan, and accelerate your career
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={item}
                className="bg-card border border-border rounded-xl p-6 card-hover"
              >
                <feat.icon className={`w-8 h-8 ${feat.color} mb-4`} />
                <h3 className="text-base font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 text-center text-xs text-muted-foreground">
          <p>© 2026 SkillBridge AI. Empowering careers with artificial intelligence.</p>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default Index;
