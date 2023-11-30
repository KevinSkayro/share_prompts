'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    //if not logged in redirect to homepage
    useEffect(() => {
        if (!session) router.push('/');
    }, [session]);

    const [prompts, setPrompts] = useState([]);
    
    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/prompts`);
            const data = await response.json();
            setPrompts(data);
        }
         if (session?.user.id) fetchPrompts();
    }, [session?.user.id]);

    const handleEdit = (prompt) => {
        router.push(`/updatePrompt?id=${prompt._id}`);
    }

    const handleDelete = async (prompt) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${prompt._id.toString()}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setPrompts((prevPrompts) => prevPrompts.filter((prevPrompt) => prevPrompt._id !== prompt._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
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