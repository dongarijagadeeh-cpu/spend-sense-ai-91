import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Bell,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

interface BudgetAlert {
  id: number;
  type: "warning" | "success" | "info" | "error";
  title: string;
  message: string;
  category?: string;
  amount?: number;
  timestamp: string;
}

export const BudgetAlerts = () => {
  const alerts: BudgetAlert[] = [
    {
      id: 1,
      type: "warning",
      title: "Budget Alert",
      message: "You've spent 85% of your monthly dining budget",
      category: "Food & Dining",
      amount: 340,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "success",
      title: "Savings Goal",
      message: "Great job! You're ahead of schedule on your emergency fund",
      category: "Savings",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "info",
      title: "Spending Insight",
      message: "Your transportation costs are 15% lower this month",
      category: "Transportation",
      amount: 45,
      timestamp: "2 days ago"
    },
    {
      id: 4,
      type: "error",
      title: "Budget Exceeded",
      message: "You've exceeded your entertainment budget by $75",
      category: "Entertainment",
      amount: 75,
      timestamp: "3 days ago"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "secondary";
      case "success":
        return "default";
      case "error":
        return "destructive";
      case "info":
      default:
        return "outline";
    }
  };

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "success":
        return "border-success/20 bg-success/5";
      case "error":
        return "border-destructive/20 bg-destructive/5";
      case "info":
      default:
        return "border-info/20 bg-info/5";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Bell className="h-4 w-4 mr-2 text-primary" />
          Budget Alerts
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Real-time notifications about your spending patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <Alert 
            key={alert.id} 
            className={`border ${getAlertBorderColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {alert.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </span>
                </div>
                
                <AlertDescription className="text-sm text-muted-foreground mb-2">
                  {alert.message}
                </AlertDescription>
                
                <div className="flex items-center gap-2">
                  {alert.category && (
                    <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                      {alert.category}
                    </Badge>
                  )}
                  {alert.amount && (
                    <Badge variant="outline" className="text-xs">
                      ${alert.amount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Alert>
        ))}
        
        {/* Quick Stats */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">This Month Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">Goals On Track</span>
              </div>
              <p className="text-lg font-bold text-primary">3/4</p>
            </div>
            <div className="p-3 bg-success/5 rounded-lg border border-success/10">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">Money Saved</span>
              </div>
              <p className="text-lg font-bold text-success">$127</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};