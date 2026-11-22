"use client";

import { useEffect, useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from "@/lib/actions/profile";

import { uploadBannerImage } from "@/lib/actions/tutor";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isPending || !session?.user) return;

    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
        setName(data.name || "");
        setPhone(data.phone || "");
        setBio(data.bio || "");
        setImage(data.image || "");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isPending, session?.user]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadBannerImage(file);

      setImage(imageUrl);

      toast.success("Profile image uploaded.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      await updateProfile({
        name,
        phone,
        bio,
        image,
      });

      toast.success("Profile updated successfully.");

      setProfile((previous) =>
        previous
          ? {
              ...previous,
              name,
              phone,
              bio,
              image,
            }
          : previous,
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center text-sm text-red-600">
        Unable to load your profile.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Account Settings
          </Badge>

          <h1 className="text-3xl font-bold text-slate-900">Update Profile</h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your personal information and profile picture.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar className="size-24 border">
                  <AvatarImage src={image || ""} alt={name} />
                  <AvatarFallback>
                    <UserRound className="size-8" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <Label htmlFor="profileImage">Profile Picture</Label>

                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Upload an image using ImgBB.
                  </p>

                  {uploading && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                      <Loader2 className="size-3 animate-spin" />
                      Uploading image...
                    </p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input id="email" value={profile.email} disabled />

                <p className="text-xs text-slate-500">
                  Your email address cannot be changed from this page.
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>

                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="01XXXXXXXXX"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>

                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Tell students a little about yourself..."
                  rows={5}
                />
              </div>

              {/* Role + Plan */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Account Role</p>

                  <p className="mt-1 font-semibold capitalize text-slate-900">
                    {profile.role}
                  </p>
                </div>

                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Subscription Plan</p>

                  <p className="mt-1 font-semibold capitalize text-slate-900">
                    {profile.plan}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={saving || uploading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving && <Loader2 className="mr-2 size-4 animate-spin" />}

                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;
