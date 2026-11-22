"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  getAdminTransactions,
  type AdminTransaction,
} from "@/lib/actions/admin";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getAdminTransactions();

        setTransactions(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load transactions.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Admin Panel
          </Badge>

          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>

          <p className="mt-2 text-sm text-slate-500">
            View all successful MentorLagbe Pro subscription payments.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-blue-600" />
              Stripe Payments
            </CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex min-h-60 items-center justify-center">
                <Loader2 className="size-8 animate-spin text-blue-600" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-semibold text-slate-900">
                  No transactions yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Successful Pro subscriptions will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Payment Date</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction._id}>
                        <TableCell className="font-medium">
                          {transaction.userName}
                        </TableCell>

                        <TableCell>{transaction.userEmail}</TableCell>

                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {transaction.userRole}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            {transaction.planName}
                          </Badge>
                        </TableCell>

                        <TableCell className="font-semibold">
                          {transaction.amount.toFixed(2)}{" "}
                          {transaction.currency.toUpperCase()}
                        </TableCell>

                        <TableCell>
                          <span className="block max-w-55 truncate font-mono text-xs text-slate-500">
                            {transaction.transactionId}
                          </span>
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {transaction.paidAt
                            ? format(
                                new Date(transaction.paidAt),
                                "dd MMM yyyy, hh:mm a",
                              )
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminTransactionsPage;
