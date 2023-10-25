'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data && data.map((prompt) => (
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
        // Handle search input change here
    }

    const fetchPrompts = async () => {
        try {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPrompts(data);
        } catch (error) {
            // Handle fetch error
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);
    
    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    className='search_input peer' 
                    type="text"
                    placeholder='Search for tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                />
            </form>

            {prompts.length > 0 ? (
                <PromptCardList
                    data={prompts}
                    handleTagClick={() => {}}
                />
            ) : (
                <div>Loading or no data available.</div>
            )}
        </section>
    );
}

export default Feed;
