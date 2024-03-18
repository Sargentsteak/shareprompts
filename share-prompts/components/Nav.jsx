"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession(); // Assuming the user is logged in for testing

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {

    const setUpProviders = async () => {
       const response = await getProviders();

      setProviders(response)
    }

    setUpProviders();

  }, []);
  return (
    <nav className="flex items-center justify-between w-full mb-16 pt-3">
      <div className="flex items-center gap-2">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </div>

      {/*Desktop Navigation */}
      <div className=" hidden sm:flex">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt'>
              <p className='black_btn'>Create Posts</p>
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile' onClick={() => settoggleDropdown((prev) => !prev)} />
            </Link>



          </div>


        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (

              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>

            ))}

          </>
        )}
      </div>

      {/* /////Mobile Navigation///// */}
      <div className='sm:hidden flex relative '>
        {session?.user ? (
          <div className="flex">
            <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full cursor-pointer'
              alt='profile'
              onClick={() => settoggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href='/profile' className='dropdown_link' onClick={() => settoggleDropdown(false)}>
                  My profile
                </Link>

                <Link href='/profile' className='dropdown_link' onClick={() => settoggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button type="button" onClick={() => {
                  settoggleDropdown(false);
                  signOut();
                }} className='mt-5 w-full black_btn'>Sign Out

                </button>
              </div>

            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>



    </nav>
  )
}

export default Nav;
