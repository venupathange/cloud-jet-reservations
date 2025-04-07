
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Search, CreditCard } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock wallet data
const MOCK_WALLETS = [
  {
    userId: 'user1',
    userName: 'John Doe',
    email: 'john@example.com',
    balance: 2500.00,
  },
  {
    userId: 'user2',
    userName: 'Jane Smith',
    email: 'jane@example.com',
    balance: 1200.50,
  },
  {
    userId: 'user3',
    userName: 'Alex Johnson',
    email: 'alex@example.com',
    balance: 800.75,
  },
  {
    userId: 'user4',
    userName: 'Sarah Williams',
    email: 'sarah@example.com',
    balance: 3500.25,
  }
];

export default function WalletsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wallets, setWallets] = useState(MOCK_WALLETS);

  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFunds = (userId: string, amount: number) => {
    // In a real app, this would make an API call
    const updatedWallets = wallets.map(wallet => 
      wallet.userId === userId ? { ...wallet, balance: wallet.balance + amount } : wallet
    );
    
    setWallets(updatedWallets);
    
    toast({
      title: "Funds Added",
      description: `$${amount} has been added to ${
        wallets.find(w => w.userId === userId)?.userName
      }'s wallet.`,
    });
  };

  const handleViewTransactions = (userId: string) => {
    // In a real app, this would navigate to a details page or open a modal
    toast({
      title: "View Transactions",
      description: `Viewing transactions for user ${userId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Wallets</h1>
        <p className="text-gray-500">
          Manage all customer wallet balances and transactions.
        </p>
      </div>

      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search by customer name or email..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWallets.length > 0 ? (
          filteredWallets.map((wallet) => (
            <Card key={wallet.userId} className="overflow-hidden hover:shadow-lg transition">
              <CardHeader className="bg-gray-50 pb-2">
                <CardTitle className="flex items-center">
                  <div className="bg-airline-blue text-white p-2 rounded-full mr-2">
                    <User className="h-4 w-4" />
                  </div>
                  {wallet.userName}
                </CardTitle>
                <p className="text-sm text-gray-500">{wallet.email}</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between p-4 bg-airline-blue/10 rounded-lg mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <h3 className="text-2xl font-bold">${wallet.balance.toFixed(2)}</h3>
                  </div>
                  <CreditCard className="h-10 w-10 text-airline-blue opacity-70" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleViewTransactions(wallet.userId)}
                  >
                    Transactions
                  </Button>
                  <Button 
                    className="bg-airline-blue hover:bg-airline-navy"
                    onClick={() => handleAddFunds(wallet.userId, 100)}
                  >
                    Add Funds
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <CreditCard className="h-12 w-12 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">No wallets found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
