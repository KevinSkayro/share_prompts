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

    const [data, setData] = useState('');

    const [messageHistory, setMessageHistory] = useState([]);

    const promptId = useSearchParams().get('promptId');
    useEffect(() => {
        const fetchPrompt = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch prompt');
                }
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.error('Error fetching prompt:', error);
            }
        }
        if (promptId) fetchPrompt();

    }, [promptId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!promptId) return alert('Prompt ID not found');

        setMessageHistory((prevHistory) => [
            ...prevHistory,
            { type: 'user', content: post.prompt },
        ]);
        
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prompt');
            }

            const data = await response.json();
            setData(data.message.content);

            // Update message history with AI response
            setMessageHistory((prevHistory) => [
                ...prevHistory,
                { type: 'assistant', content: data.message.content },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const newPrompt = e.target.value;
        setPost({ ...post, prompt: newPrompt })
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
        {/* chat response and message history */}
        <div className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'>
                {messageHistory.map((message, index) => (
                    <div>
                        <div key={index} className={`flex justify-between items-center ${message.type === 'ai' ? 'ai-message' : 'user-message'}`}>
                            <div className='flex items-center'>
                                {message.type === 'assistant' && (
                                    <Image src={'/assets/icons/copy.svg'} width={24} height={24} alt='robot icon' />
                                )}

                                <p className='text-xs text-gray-500 ml-2'>{message.type === 'assistant' ? 'AI' : 'User'}</p>
                            </div>
                            <p className='text-xs text-gray-500'>{message.type === 'assistant' ? '1:23 PM' : '1:23 PM'}</p>

                        </div>
                        <p className='text-xs text-gray-500'>
                        {message.content}
                        </p>
                    </div>
                ))}
                    

                
                {/* Display the latest AI response */}
                {/* {data && (
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <Image src={'/assets/icons/copy.svg'} width={24} height={24} alt='robot icon' />
                            <p className='text-xs text-gray-500 ml-2'>AI</p>
                        </div>
                        <p className='text-xs text-gray-500'>1:23 PM</p>
                    </div>
                )}
                <p className='text-xs text-gray-500'>
                    {data}
                </p> */}
        </div>
    </section>


  )
}

export default Chat