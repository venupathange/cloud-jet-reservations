
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, CreditCard, Calendar, Users } from "lucide-react";

export default function DashboardOverview() {
  const { user } = useAuth();
  const isAdmin = user?.userType === 'admin';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, {user?.email}! {isAdmin ? 'Manage your airline system below.' : 'Manage your bookings and flights below.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Total Flights' : 'Booked Flights'}
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdmin ? '24' : '2'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAdmin ? '+5 since last month' : 'Next flight in 3 days'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Total Bookings' : 'Wallet Balance'}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdmin ? '312' : '$1,250.00'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAdmin ? '+18% from last month' : 'Last transaction 2 days ago'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Active Planes' : 'Miles Earned'}
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdmin ? '18' : '4,320'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAdmin ? '2 in maintenance' : '+1,200 miles this month'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Total Customers' : 'Reviews Submitted'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdmin ? '573' : '3'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAdmin ? '+7% from last month' : 'Last reviewed 1 month ago'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isAdmin ? 'Recent Bookings' : 'Upcoming Flights'}</CardTitle>
            <CardDescription>
              {isAdmin ? 'Recent flight bookings across the system.' : 'Your upcoming travel plans.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAdmin ? (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">CJ-1245 • New York to London</p>
                  </div>
                  <span className="text-sm">$430.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-gray-500">CJ-3782 • Paris to Dubai</p>
                  </div>
                  <span className="text-sm">$720.00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-sm text-gray-500">CJ-9012 • Tokyo to Sydney</p>
                  </div>
                  <span className="text-sm">$850.00</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">New York to London</p>
                    <p className="text-sm text-gray-500">CJ-1245 • June 15, 2025 • 9:30 AM</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Confirmed</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">London to Paris</p>
                    <p className="text-sm text-gray-500">CJ-2347 • June 22, 2025 • 2:15 PM</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Confirmed</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {isAdmin ? 'Customer Reviews' : 'Wallet Transactions'}
            </CardTitle>
            <CardDescription>
              {isAdmin ? 'Recent customer feedback received.' : 'Recent transactions from your wallet.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAdmin ? (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">Emily Williams</p>
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">"Excellent service and comfortable flight!"</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">Michael Brown</p>
                      <div className="flex ml-2">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">"Good experience but the meal could be better."</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Flight Booking - CJ-1245</p>
                    <p className="text-sm text-gray-500">June 2, 2025</p>
                  </div>
                  <span className="text-red-500">-$430.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Wallet Top-up</p>
                    <p className="text-sm text-gray-500">May 28, 2025</p>
                  </div>
                  <span className="text-green-500">+$500.00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">Miles Conversion</p>
                    <p className="text-sm text-gray-500">May 15, 2025</p>
                  </div>
                  <span className="text-green-500">+$120.00</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
