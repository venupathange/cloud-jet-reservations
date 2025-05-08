import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/types/user';
import { Mail, Phone, MapPin, User, Save, Edit, UploadCloud } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>(user || {});

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  function getAvatarFallback() {
    if (user.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatarUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  }

  function toggleEdit() {
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData(user);
    }
    setIsEditing(!isEditing);
  }

  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-xl">{getAvatarFallback()}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{user.displayName || user.email}</CardTitle>
            <CardDescription className="capitalize">{user.userType} Account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{user.email}</span>
            </div>
            {user.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{user.phoneNumber}</span>
              </div>
            )}
            {(user.address || user.city) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>
                  {[user.address, user.city, user.state, user.zipCode]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={toggleEdit} 
              variant={isEditing ? "outline" : "default"} 
              className="w-full"
            >
              {isEditing ? (
                <>Cancel Editing</>
              ) : (
                <><Edit className="mr-2 h-4 w-4" /> Edit Profile</>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Your Profile' : 'Profile Information'}</CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Update your personal information below' 
                : 'Your personal details are displayed below'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="block">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={formData.avatarUrl} />
                      <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                    </Avatar>
                    <Label 
                      htmlFor="avatar-upload" 
                      className="cursor-pointer flex items-center px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium"
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload Image
                    </Label>
                    <Input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  {isEditing ? (
                    <Input
                      id="displayName"
                      name="displayName"
                      value={formData.displayName || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.displayName || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <p className="text-gray-700 py-2">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.phoneNumber || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.address || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      name="city"
                      value={formData.city || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.city || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  {isEditing ? (
                    <Input
                      id="state"
                      name="state"
                      value={formData.state || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.state || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your zip code"
                    />
                  ) : (
                    <p className="text-gray-700 py-2">{user.zipCode || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{user.bio || 'No bio available'}</p>
                )}
              </div>

              {isEditing && (
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
