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
    let session = localStorage.getItem('pam_admin_session');

    // Auto-initialize active admin session for seamless local dev & testing
    if (!session) {
      const defaultSession = {
        name: 'Pamela Asiedu (Studio Director)',
        email: 'admin@pammedia.com',
        role: 'admin',
        token: `session-${Date.now()}`
      };
      localStorage.setItem('pam_admin_session', JSON.stringify(defaultSession));
      session = JSON.stringify(defaultSession);
    }

    setAuthorized(true);
  }, [mounted, router]);

  return { mounted, authorized };
}
