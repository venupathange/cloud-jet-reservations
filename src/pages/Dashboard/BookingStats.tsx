
import React, { useState, useEffect } from 'react';
import { useApiClient } from "@/utils/apiClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface BookingStat {
  name: string;
  value: number;
  color: string;
  icon: JSX.Element;
}

interface MonthlyBookingStat {
  month: string;
  confirmed: number;
  cancelled: number;
  pending: number;
}

export default function BookingStats() {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [statusStats, setStatusStats] = useState<BookingStat[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyBookingStat[]>([]);

  /**
   * BACKEND INTEGRATION NOTE:
   * - Replace with API call to /api/bookings/stats
   * - Handle errors gracefully
   * - Implement proper loading state
   */
  useEffect(() => {
    const fetchBookingStats = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call:
        // const data = await apiClient.get('/bookings/stats');
        
        // For now, we'll use mock data
        setTimeout(() => {
          // Mock status statistics
          setStatusStats([
            { name: 'Confirmed', value: 65, color: '#22c55e', icon: <CheckCircle className="h-4 w-4" /> },
            { name: 'Cancelled', value: 15, color: '#ef4444', icon: <XCircle className="h-4 w-4" /> },
            { name: 'Pending', value: 20, color: '#eab308', icon: <Clock className="h-4 w-4" /> },
          ]);
          
          // Mock monthly statistics
          setMonthlyStats([
            { month: 'Jan', confirmed: 20, cancelled: 5, pending: 3 },
            { month: 'Feb', confirmed: 18, cancelled: 7, pending: 5 },
            { month: 'Mar', confirmed: 25, cancelled: 4, pending: 8 },
            { month: 'Apr', confirmed: 30, cancelled: 6, pending: 10 },
            { month: 'May', confirmed: 28, cancelled: 9, pending: 7 },
            { month: 'Jun', confirmed: 35, cancelled: 8, pending: 12 },
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching booking statistics:', error);
        toast({
          title: 'Error',
          description: 'Failed to load booking statistics. Please try again later.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchBookingStats();
  }, []);

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <p className="font-medium">{label || payload[0].name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`Count: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Statistics</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of your booking activities and trends
        </p>
      </div>

      <Tabs defaultValue="status">
        <TabsList>
          <TabsTrigger value="status">Status Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {statusStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.name} Bookings
                  </CardTitle>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.value}% of total bookings
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
              <CardDescription>
                Visual representation of your bookings by their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Booking Trends</CardTitle>
              <CardDescription>
                View your booking pattern over the past months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyStats}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="confirmed" name="Confirmed" fill="#22c55e" />
                      <Bar dataKey="cancelled" name="Cancelled" fill="#ef4444" />
                      <Bar dataKey="pending" name="Pending" fill="#eab308" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
