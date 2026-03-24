import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeUploadProps {
  onSkillsExtracted: (skills: string) => void;
}

const MOCK_EXTRACTED_SKILLS: Record<string, string> = {
  default: "JavaScript, HTML, CSS, React, Node.js, Git, REST APIs, Agile, Communication, Problem Solving",
  pdf: "Python, Data Analysis, SQL, Machine Learning, TensorFlow, Statistics, Excel, Tableau, Research, Team Collaboration",
  doc: "Java, Spring Boot, Microservices, AWS, Docker, Kubernetes, CI/CD, System Design, Mentoring, Project Management",
};

const ResumeUpload = ({ onSkillsExtracted }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setParsed(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setParsed(false);
    }
  };

  const handleParse = () => {
    if (!file) return;
    setParsing(true);
    setTimeout(() => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "default";
      const skills = MOCK_EXTRACTED_SKILLS[ext] || MOCK_EXTRACTED_SKILLS.default;
      onSkillsExtracted(skills);
      setParsing(false);
      setParsed(true);
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setParsed(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground block">Upload Resume (optional)</label>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors group"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
            <p className="text-sm text-muted-foreground">
              Drag & drop your resume or <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            key="file-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-secondary/50 border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button onClick={clearFile} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {parsed ? (
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-4 h-4" />
                Skills extracted and auto-filled!
              </div>
            ) : (
              <button
                onClick={handleParse}
                disabled={parsing}
                className="w-full py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                {parsing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Extracting skills...
                  </span>
                ) : (
                  "Extract Skills from Resume"
                )}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUpload;
