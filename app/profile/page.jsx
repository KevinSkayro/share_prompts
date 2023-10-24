'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
    const { data: session } = useSession();

    const [prompts, setPrompts] = useState([]);
    console.log(session?.user.id)
    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/prompts`);
            const data = await response.json();
            console.log(data);
            setPrompts(data);
            console.log(prompts)
        }
         if (session?.user.id) fetchPrompts();
    }, [session?.user.id]);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

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