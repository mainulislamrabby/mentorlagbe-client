
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage?: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
  description: string;
}

interface TuitionTableProps {
  tuitions: Tuition[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

const approvalStyles = {
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  approved: "bg-green-100 text-green-700 hover:bg-green-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

const TuitionCard = ({
  tuitions,
  onEdit,
  onDelete,
  onToggleStatus,
}: TuitionTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-65">Tuition</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tuitions.map((tuition) => (
            <TableRow key={tuition._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {tuition.bannerImage ? (
                    <Image
                      src={tuition.bannerImage}
                      alt={tuition.title}
                      width={64}
                      height={48}
                      className="h-12 w-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-500">
                      No Image
                    </div>
                  )}

                  <div className="min-w-0 space-y-1">
                    <p className="max-w-55 truncate font-medium text-slate-900">
                      {tuition.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tuition.subject} · {tuition.classLevel} · {tuition.mode}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin size={14} />
                  {tuition.location}
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={13} />
                  {tuition.daysPerWeek} days/week
                </p>
              </TableCell>

              <TableCell>
                <span className="font-semibold text-blue-600">
                  ৳{tuition.monthlyFee.toLocaleString("en-BD")}
                </span>
                <p className="text-xs text-slate-500">per month</p>
              </TableCell>

              <TableCell>
                <Badge className={approvalStyles[tuition.approvalStatus]}>
                  {tuition.approvalStatus}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={tuition.isActive ? "default" : "secondary"}
                >
                  {tuition.isActive ? "Active" : "Closed"}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(tuition._id)}
                    title="Edit tuition"
                  >
                    <Pencil size={15} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      onToggleStatus(tuition._id, tuition.isActive)
                    }
                    title={tuition.isActive ? "Close tuition" : "Activate tuition"}
                  >
                    <Power size={15} />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete(tuition._id)}
                    title="Delete tuition"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TuitionCard;
