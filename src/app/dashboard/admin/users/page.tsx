"use client";
import {
  Search,
  Users,
  ShieldCheck,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { getAllUsers, type AdminUser } from "@/lib/actions/admin";

type UserRole = "student" | "tutor" | "admin";

const roleStyles: Record<UserRole, string> = {
  student: "bg-blue-100 text-blue-700",
  tutor: "bg-purple-100 text-purple-700",
  admin: "bg-amber-100 text-amber-700",
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load users.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleRoleChange = (userId: string, role: UserRole) => {
    // TODO: Call the protected admin role-update API.
    setUsers((previous) =>
      previous.map((user) => (user._id === userId ? { ...user, role } : user)),
    );
  };

  const studentCount = users.filter((user) => user.role === "student").length;
  const tutorCount = users.filter((user) => user.role === "tutor").length;
  const adminCount = users.filter((user) => user.role === "admin").length;

  return (
    <main className="min-h-screen space-y-6 bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <Badge variant="secondary" className="mb-3">
            Admin Dashboard
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View registered users and manage their platform roles.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <h3 className="mt-2 text-2xl font-bold">{users.length}</h3>
              </div>
              <Users className="size-9 text-blue-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-500">Students</p>
                <h3 className="mt-2 text-2xl font-bold">{studentCount}</h3>
              </div>
              <GraduationCap className="size-9 text-blue-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-500">Tutors</p>
                <h3 className="mt-2 text-2xl font-bold">{tutorCount}</h3>
              </div>
              <BookOpen className="size-9 text-purple-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-slate-500">Admins</p>
                <h3 className="mt-2 text-2xl font-bold">{adminCount}</h3>
              </div>
              <ShieldCheck className="size-9 text-amber-600" />
            </CardContent>
          </Card>
        </div>

        {/* User Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Registered Users</CardTitle>
                <p className="mt-1 text-sm text-slate-500">
                  Manage user accounts and assigned roles.
                </p>
              </div>

              <Badge variant="outline">{filteredUsers.length} users</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading ? (
              <p className="py-8 text-center text-muted-foreground">
                Loading users...
              </p>
            ) : error ? (
              <p className="py-8 text-center text-destructive">{error}</p>
            ) : (
              <>
                {/* Keep your existing search, filter, and table JSX here */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name or email..."
                      className="pl-9"
                    />
                  </div>

                  <Select
                    value={roleFilter}
                    onValueChange={(value) => setRoleFilter(value ?? "all")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="tutor">Tutors</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">
                          Manage Role
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                              {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                              <Badge
                                className={roleStyles[user.role]}
                                variant="secondary"
                              >
                                {user.role}
                              </Badge>
                            </TableCell>

                            <TableCell className="text-right">
                              <Select
                                value={user.role}
                                onValueChange={(value) => {
                                  if (
                                    value === "student" ||
                                    value === "tutor" ||
                                    value === "admin"
                                  ) {
                                    handleRoleChange(user._id, value);
                                  }
                                }}
                              >
                                <SelectTrigger className="ml-auto w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="student">
                                    Student
                                  </SelectItem>
                                  <SelectItem value="tutor">Tutor</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-32 text-center text-slate-500"
                          >
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminUsersPage;
