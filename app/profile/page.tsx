'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { User, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const Button = ({
  variant = 'secondary',
  children,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
}) => (
  <button
    className={`rounded-full px-6 py-3 flex items-center ${
      variant === 'primary'
        ? 'bg-green-500 text-white hover:bg-green-600'
        : 'bg-neutral-700 text-white hover:bg-neutral-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function ProfilePage() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabaseClient.auth.getSession();
      if (session?.session?.user) {
        setUser(session.session.user);
      } else {
        router.push('/');
      }
      setLoading(false);
    };

    fetchUser();
  }, [supabaseClient, router]);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <div className="text-white">Татаж байна...</div>;
  }

  if (!user) {
    return <div className="text-white">Хэрэглэгч олдсонгүй</div>;
  }

  const profileImageUrl =
    user?.user_metadata?.avatar_url || '/images/profile/default-avatar.png';

  return (
    <div className="bg-neutral-900 text-white h-full rounded-lg overflow-hidden shadow-lg">
      {/* Dynamic Background Image */}
      <div
        className="relative w-full h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url(${profileImageUrl})`,
          filter: 'blur(20px) brightness(0.5)',
        }}
      ></div>

      {/* Profile Section */}
      <main className="relative p-6 sm:p-8 sm:-mt-40 -mt-60">
        <div className="flex items-center space-x-6 sm:space-x-8 p-6">
          {/* Profile Image */}
          <Image
            src={profileImageUrl}
            alt="User Avatar"
            width={192}
            height={192}
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full shadow-lg object-cover"
          />
          {/* User Information */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold">
              {user?.user_metadata?.full_name || 'Таны нэр'}
            </h1>
            <p className="text-lg text-gray-400 mt-1">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Тавтай морил, {user?.user_metadata?.full_name || 'хэрэглэгч'}!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button variant="primary">Edit Profile</Button>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
