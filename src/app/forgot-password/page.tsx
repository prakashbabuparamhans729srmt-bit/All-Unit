'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AishaLogo } from '@/components/icons/AishaLogo';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordPage = () => {
  const { toast } = useToast();

  const handleResetRequest = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd handle the password reset logic here.
    toast({
      title: "Password Reset Link Sent",
      description: "If an account exists for this email, you will receive a password reset link shortly.",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AishaLogo width={40} height={40} />
          </div>
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>No problem. Enter your email address and we'll send you a link to reset it.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetRequest}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
            <p className="text-muted-foreground">
                Remembered your password?{' '}
                <Link href="/login" className="underline font-medium text-primary">
                    Sign in
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
