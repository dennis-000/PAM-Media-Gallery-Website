'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMounted } from './use-mounted';

export function useAuthProtection() {
  const mounted = useMounted();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const session = localStorage.getItem('pam_admin_session');
    if (!session) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [mounted, router]);

  return { mounted, authorized };
}
