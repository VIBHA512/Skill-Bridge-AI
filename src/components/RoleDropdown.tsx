import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoleDropdownProps {
  value: string;
  onChange: (value: string) => void;
  type: "fresher" | "experienced";
}

const FRESHER_ROLES = [
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "fullstack-developer", label: "Full Stack Developer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "mobile-developer", label: "Mobile App Developer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "cybersecurity-analyst", label: "Cybersecurity Analyst" },
  { value: "cloud-engineer", label: "Cloud Engineer" },
  { value: "ml-engineer", label: "ML Engineer" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "technical-writer", label: "Technical Writer" },
];

const EXPERIENCED_ROLES = [
  { value: "senior-engineer", label: "Senior Software Engineer" },
  { value: "staff-engineer", label: "Staff Engineer" },
  { value: "principal-engineer", label: "Principal Engineer" },
  { value: "engineering-manager", label: "Engineering Manager" },
  { value: "vp-engineering", label: "VP of Engineering" },
  { value: "cto", label: "CTO" },
  { value: "tech-lead", label: "Tech Lead" },
  { value: "architect", label: "Solutions Architect" },
  { value: "data-engineering-lead", label: "Data Engineering Lead" },
  { value: "product-director", label: "Product Director" },
  { value: "ai-ml-lead", label: "AI/ML Lead" },
  { value: "security-lead", label: "Security Lead" },
  { value: "platform-engineer", label: "Platform Engineer" },
  { value: "sre-manager", label: "SRE Manager" },
  { value: "consultant", label: "Technology Consultant" },
];

const RoleDropdown = ({ value, onChange, type }: RoleDropdownProps) => {
  const roles = type === "fresher" ? FRESHER_ROLES : EXPERIENCED_ROLES;

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">
        {type === "fresher" ? "Desired Role" : "Target Role"}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-border text-foreground">
          <SelectValue placeholder="Select a role..." />
        </SelectTrigger>
        <SelectContent className="bg-card border-border max-h-[250px]">
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value} className="text-foreground hover:bg-secondary focus:bg-secondary">
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleDropdown;
