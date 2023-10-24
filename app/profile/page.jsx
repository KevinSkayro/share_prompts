'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
    const { data: session } = useSession();

    const [prompts, setPrompts] = useState([]);
    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/prompts`);
            const data = await response.json();
            setPrompts(data);
        }
         if (session?.user.id) fetchPrompts();
    }, [session?.user.id]);

    const handleEdit = () => {
        console.log('edit')
    }

    const handleDelete = async () => {
        console.log('delete')
    }

  return (
    <Profile
        name='My'
        desc='Welcome to your profile page!'
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile