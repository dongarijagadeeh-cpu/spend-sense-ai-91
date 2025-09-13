import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  CreditCard,
  PiggyBank,
  AlertTriangle,
  Plus
} from "lucide-react";
import { SpendingChart } from "./SpendingChart";
import { ExpenseForm } from "./ExpenseForm";
import { GoalTracker } from "./GoalTracker";
import { BudgetAlerts } from "./BudgetAlerts";
import heroImage from "@/assets/financial-hero.jpg";

export const FinancialDashboard = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 45.99, category: "Food", description: "Grocery shopping", date: "2024-01-15", ai_categorized: true },
    { id: 2, amount: 120.00, category: "Transportation", description: "Gas station", date: "2024-01-14", ai_categorized: true },
    { id: 3, amount: 89.99, category: "Entertainment", description: "Movie tickets", date: "2024-01-13", ai_categorized: true }
  ]);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBudget = 2000;
  const budgetUsed = (totalSpent / monthlyBudget) * 100;

  const stats = [
    {
      title: "Total Balance",
      value: "$12,345.67",
      change: "+2.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Monthly Spending",
      value: `$${totalSpent.toFixed(2)}`,
      change: "-5.2%",
      trend: "down",
      icon: CreditCard
    },
    {
      title: "Savings Goal",
      value: "78%",
      change: "+12%",
      trend: "up",
      icon: PiggyBank
    },
    {
      title: "Budget Remaining",
      value: `$${(monthlyBudget - totalSpent).toFixed(2)}`,
      change: `${budgetUsed.toFixed(1)}% used`,
      trend: budgetUsed > 80 ? "down" : "up",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Financial Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-powered expense tracking and predictive analytics
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="spending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="spending" className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Monthly Spending Trends</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI-categorized expenses and spending patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SpendingChart expenses={expenses} />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Budget Progress</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Monthly budget: ${monthlyBudget}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Spent</span>
                        <span className="text-foreground font-medium">${totalSpent.toFixed(2)}</span>
                      </div>
                      <Progress value={budgetUsed} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{budgetUsed.toFixed(1)}% used</span>
                        <span className="text-muted-foreground">${(monthlyBudget - totalSpent).toFixed(2)} remaining</span>
                      </div>
                    </div>
                    {budgetUsed > 80 && (
                      <div className="flex items-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                        <span className="text-sm text-destructive">
                          You've used {budgetUsed.toFixed(1)}% of your monthly budget
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predictions">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Predictive Analytics</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      AI-powered spending forecasts and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <h4 className="font-semibold text-foreground mb-2">This Month Forecast</h4>
                        <p className="text-2xl font-bold text-primary">${(totalSpent * 2.1).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Based on current trends</p>
                      </div>
                      <div className="p-4 bg-success/5 rounded-lg border border-success/10">
                        <h4 className="font-semibold text-foreground mb-2">Potential Savings</h4>
                        <p className="text-2xl font-bold text-success">$127.50</p>
                        <p className="text-sm text-muted-foreground">If you reduce dining out by 20%</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">AI Insights</h4>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="mr-2">High Confidence</Badge>
                        <span className="text-sm text-muted-foreground">
                          Your grocery spending typically increases by 15% during weekends
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="mr-2">Medium Confidence</Badge>
                        <span className="text-sm text-muted-foreground">
                          Transportation costs are 23% higher than similar users in your area
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals">
                <GoalTracker />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Expense Form and Alerts */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI will automatically categorize your expense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseForm 
                  onAddExpense={(expense) => {
                    setExpenses([...expenses, { ...expense, id: Date.now(), ai_categorized: true }]);
                  }} 
                />
              </CardContent>
            </Card>

            <BudgetAlerts />

            {/* Recent Transactions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {expenses.slice(-3).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {expense.category}
                        </Badge>
                        {expense.ai_categorized && (
                          <Badge variant="secondary" className="text-xs">
                            AI Categorized
                          </Badge>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">${expense.amount}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};