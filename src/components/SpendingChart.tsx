import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  ai_categorized: boolean;
}

interface SpendingChartProps {
  expenses: Expense[];
}

export const SpendingChart = ({ expenses }: SpendingChartProps) => {
  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

  // Generate mock daily spending data for trend line
  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    spending: Math.random() * 100 + 20,
    predicted: Math.random() * 120 + 30
  }));

  const COLORS = [
    'hsl(var(--financial-green))',
    'hsl(var(--financial-blue))', 
    'hsl(var(--financial-emerald))',
    'hsl(var(--financial-teal))',
    'hsl(var(--success))',
    'hsl(var(--warning))'
  ];

  return (
    <div className="space-y-8">
      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Spending by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="amount"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((item, index) => (
              <div key={item.category} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-muted-foreground">{item.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Category Amounts</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Spending Trend */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-4">Daily Spending Trend & Predictions</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`, 
                name === 'spending' ? 'Actual' : 'Predicted'
              ]}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="spending" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              name="spending"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--financial-blue))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'hsl(var(--financial-blue))', strokeWidth: 2, r: 4 }}
              name="predicted"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary" />
            <span className="text-sm text-muted-foreground">Actual Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-financial-blue border-dashed border-t" />
            <span className="text-sm text-muted-foreground">AI Predictions</span>
          </div>
        </div>
      </div>
    </div>
  );
};