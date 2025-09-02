import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  Play, 
  CheckCircle, 
  XCircle, 
  Pause,
  LucideIcon
} from "lucide-react";

export type JobStatus = "queued" | "running" | "completed" | "failed" | "paused";

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig: Record<JobStatus, {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  icon: LucideIcon;
  className: string;
}> = {
  queued: {
    label: "Queued",
    variant: "outline",
    icon: Clock,
    className: "border-warning text-warning"
  },
  running: {
    label: "Running",
    variant: "default",
    icon: Play,
    className: "bg-gradient-primary text-primary-foreground"
  },
  completed: {
    label: "Completed",
    variant: "secondary",
    icon: CheckCircle,
    className: "bg-success/10 text-success border-success/20"
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20"
  },
  paused: {
    label: "Paused",
    variant: "outline",
    icon: Pause,
    className: "border-muted-foreground text-muted-foreground"
  }
};

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "inline-flex items-center space-x-1 px-2 py-1",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  );
}