'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');
    };

    const handleInputChange = (e) => {
        setPost({ ...post, prompt: e.target.value })
    };
    
  return (
    <section className='w-full h-full max-w-full flex-start, flex-col'>
        <h1 className='head_text text-left'
        >
            <span className='blue_gradient'>
                Chat
            </span>
        </h1>
        <form onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'
        >
            <label>
                <textarea
                    value={post.prompt}
                    onChange={handleInputChange}
                    placeholder='Write your prompt here...'
                    rows={1}
                    required
                    className='mt-2 flex w-full rounded p-3 text-xs leading-tight text-opacity-100 text-gray-500 max-h-80 overflow-x-hidden overflow-y-auto'
                >
                </textarea>
                <div className='flex justify-end items-center'>
                    <button className='send_btn'
                        type='submit'
                    >
                        <Image
                            src={'/assets/icons/send.svg'}
                            width={16}
                            height={16}
                            alt='send icon'
                        />
                    </button>
                </div>
            </label>
        </form>
    </section>


  )
}

export default Chat