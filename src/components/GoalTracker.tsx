import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Calendar, TrendingUp, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export const GoalTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      deadline: "2024-12-31",
      category: "Savings"
    },
    {
      id: 2,
      title: "Vacation to Japan",
      targetAmount: 5000,
      currentAmount: 2300,
      deadline: "2024-08-15",
      category: "Travel"
    },
    {
      id: 3,
      title: "New Laptop",
      targetAmount: 2500,
      currentAmount: 1800,
      deadline: "2024-06-01",
      category: "Tech"
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    category: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category || "General"
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", targetAmount: "", deadline: "", category: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Goal Created",
      description: `${goal.title} has been added to your goals`,
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-success";
    if (progress >= 50) return "text-financial-blue";
    return "text-warning";
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-foreground">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Financial Goals
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Track your progress towards financial milestones
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create New Goal</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Set a new financial goal to track your progress
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title" className="text-foreground">Goal Title</Label>
                  <Input
                    id="goal-title"
                    placeholder="e.g., Emergency Fund"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-amount" className="text-foreground">Target Amount ($)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="10000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-foreground">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">Category (Optional)</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Savings, Travel, Investment"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <Button onClick={handleAddGoal} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          
          return (
            <div key={goal.id} className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{goal.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {goal.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                    </div>
                  </div>
                </div>
                {progress >= 100 && (
                  <Trophy className="h-5 w-5 text-success" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={`font-medium ${getProgressColor(progress)}`}>
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-3" />
                <div className="flex justify-between text-xs">
                  <span className={`${getProgressColor(progress)}`}>
                    {progress.toFixed(1)}% complete
                  </span>
                  <span className="text-muted-foreground">
                    ${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                  </span>
                </div>
              </div>

              {progress < 100 && daysRemaining > 0 && (
                <div className="mt-3 p-3 bg-primary/5 rounded border border-primary/10">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-primary mr-2" />
                    <span className="text-foreground">
                      Save ${((goal.targetAmount - goal.currentAmount) / daysRemaining).toFixed(0)} per day to reach your goal
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {goals.length === 0 && (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No financial goals set yet</p>
            <p className="text-sm text-muted-foreground">Create your first goal to start tracking your progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};