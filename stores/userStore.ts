import { useState } from 'react';

export const useUserStore = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
  });

  return { userData, setUserData };
}; 