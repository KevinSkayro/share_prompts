'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const Chat = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const promptId = useSearchParams().get('promptId');
    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if (promptId) fetchPrompt();
    }, [promptId]);
    
  return (
    <div>
        <h1>Chat</h1>
        <h2>{ post.prompt }</h2>
        <h2>{ post.tag }</h2>
    </div>


  )
}

export default Chat