"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true; // Assuming the user is logged in for testing

  return (
    <nav className="flex items-center justify-between w-full mb-16 pt-3">
      <div className="flex items-center gap-2">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </div>

      {/*Desktop Navigation */}
      <div className="sm:flex">
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt'>
              <p className='black_btn'>Create Posts</p>
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile'/>  
            </Link>  
          </div>

            
        ) : (
          <></>
        )}
      </div>
    </nav>
  )
}

export default Nav;
