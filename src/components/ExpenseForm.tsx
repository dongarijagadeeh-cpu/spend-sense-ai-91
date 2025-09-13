import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Sparkles } from "lucide-react";

interface ExpenseFormProps {
  onAddExpense: (expense: { amount: number; category: string; description: string; date: string }) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const categories = [
    "Food & Dining",
    "Transportation", 
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Health & Fitness",
    "Travel",
    "Education",
    "Other"
  ];

  const handleAICategory = async () => {
    if (!description) {
      toast({
        title: "Description Required",
        description: "Please enter a description for AI categorization",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI categorization
    setTimeout(() => {
      const aiCategories: { [key: string]: string } = {
        "grocery": "Food & Dining",
        "restaurant": "Food & Dining",
        "uber": "Transportation",
        "gas": "Transportation", 
        "movie": "Entertainment",
        "netflix": "Entertainment",
        "gym": "Health & Fitness",
        "amazon": "Shopping",
        "electricity": "Bills & Utilities",
        "phone": "Bills & Utilities"
      };

      const descLower = description.toLowerCase();
      let suggestedCategory = "Other";
      
      for (const [keyword, cat] of Object.entries(aiCategories)) {
        if (descLower.includes(keyword)) {
          suggestedCategory = cat;
          break;
        }
      }
      
      setCategory(suggestedCategory);
      setIsProcessing(false);
      
      toast({
        title: "AI Categorization Complete",
        description: `Suggested category: ${suggestedCategory}`,
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0]
    });

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    
    toast({
      title: "Expense Added",
      description: "Your expense has been tracked successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-background border-border text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground">Description</Label>
        <div className="relative">
          <Textarea
            id="description"
            placeholder="e.g., Grocery shopping at Whole Foods"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background border-border text-foreground pr-10"
            rows={3}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAICategory}
            disabled={!description || isProcessing}
            className="absolute top-2 right-2 h-8 w-8 p-0"
          >
            {isProcessing ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Click the AI button for automatic categorization
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-background border-border text-foreground">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={!amount || !description || !category}
      >
        Add Expense
      </Button>
    </form>
  );
};