'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
    console.log(data)
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((prompt) => (
                <PromptCard 
                    key={prompt._id}
                    post={prompt}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            console.log(data);
            setPrompts(data);
        }
        fetchPrompts();
    }, []);
  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input className='search_input peer' 
                type="text"
                placeholder='Search for tag or username'
                value={searchText}
                onChange={handleSearchChange} 
                required
            />
        </form>

        <PromptCardList
            data={prompts}
            handleTagClick={() => {}}
        />
    </section>
  )
}

export default Feed