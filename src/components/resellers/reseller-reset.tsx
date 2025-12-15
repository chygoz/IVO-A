'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { resetReseller } from '@/actions/resellers/reset';
import { toast } from '@/lib/toast';

export default function ResellerReset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter a reseller email.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetReseller(email);
      console.log(response, "response")
      if (response.error) {
        throw new Error(response.details);
      }

      toast({
        title: 'Success',
        description: `Reseller account for ${email} has been reset.`,
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reset reseller account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reseller Account Reset</h1>
        <p className="text-gray-500 mb-8">
          Enter the email address of the reseller to reset their account.
        </p>

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Reseller email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleReset} disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Account'}
          </Button>
        </div>
      </div>
    </div>
  );
}