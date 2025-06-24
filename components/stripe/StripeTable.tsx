'use client'
import { User } from '@supabase/supabase-js';
import React from 'react';

// Temporarily disabled all Stripe functionality to prevent DOM errors
// This component will be re-enabled when Crem payment integration is complete

type Props = {
  user: User;
}

const StripePricingTable = ({ user }: Props) => {
  // Completely disable all Stripe functionality for now
  return (
    <div className='flex flex-1 flex-col w-full items-center justify-center p-8'>
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Payment System Temporarily Disabled</h2>
        <p className="text-muted-foreground">
          We are currently updating our payment system. Please check back later.
        </p>
        <p className="text-sm text-muted-foreground">
          Current user: {user.email}
        </p>
      </div>
    </div>
  );
}

export default StripePricingTable;
