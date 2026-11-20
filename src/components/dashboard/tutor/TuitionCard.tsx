import {
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Tuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
}

interface TuitionCardProps {
  tuition: Tuition;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

const TuitionCard = ({
  tuition,
  onEdit,
  onDelete,
  onToggleStatus,
}: TuitionCardProps) => {
  const approvalStyles = {
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    approved: "bg-green-100 text-green-700 hover:bg-green-100",
    rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  };

  return (
    <Card className="gap-0 border-0 shadow-sm">
      <CardHeader className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <CardTitle className="text-base font-bold text-slate-900">
            {tuition.title}
          </CardTitle>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{tuition.subject}</Badge>
            <Badge variant="outline">{tuition.classLevel}</Badge>
            <Badge variant="outline">{tuition.mode}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={approvalStyles[tuition.approvalStatus]}>
            {tuition.approvalStatus.charAt(0).toUpperCase() +
              tuition.approvalStatus.slice(1)}
          </Badge>

          <Badge
            className={
              tuition.isActive
                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                : "bg-slate-200 text-slate-600 hover:bg-slate-200"
            }
          >
            {tuition.isActive ? "Active" : "Closed"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-4">
        <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <BookOpen size={17} className="text-blue-600" />
            <span>{tuition.subject}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="text-blue-600" />
            <span>{tuition.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="text-blue-600" />
            <span>{tuition.daysPerWeek} days per week</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={17} className="text-blue-600" />
            <span>
              Posted: {new Date(tuition.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-bold text-blue-600">
            ৳{tuition.monthlyFee.toLocaleString("en-BD")}
            <span className="ml-1 text-xs font-normal text-slate-500">
              / month
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(tuition._id)}
            >
              <Pencil size={15} />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(tuition._id, tuition.isActive)}
            >
              <Power size={15} />
              {tuition.isActive ? "Close" : "Activate"}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(tuition._id)}
            >
              <Trash2 size={15} />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TuitionCard;
