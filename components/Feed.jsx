'use client';
import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';
import Image from 'next/image';
const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            { data.map((prompt) => (
                <PromptCard 
                    key={prompt._id}
                    post={prompt}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};
const Feed = () => {
    const [allPrompts, setAllPrompts] = useState([]);
  
    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
  
    const fetchPrompts = async () => {
        const response = await fetch('/api/prompt', {
            cache: 'no-store',
            next: { revalidate: 10 },
        });
        const data = await response.json();
    
        setAllPrompts(data);
    };
  
    useEffect(() => {
        fetchPrompts();
    }, []);
  
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i'); // 'i' for case-insensitive search
        return allPrompts.filter(
            (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
    };
  
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        setSearchLoading(true);
 
        setSearchTimeout(
            setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
            setSearchLoading(false);
            }, 100)
        );
    };
  
    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };
  
    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* if data is not available yet, show loading */}
            {(!allPrompts.length || searchLoading) && (
                <div className='flex-center mt-16'>
                    <Image
                        src='/assets/icons/loader.svg'
                        width={50}
                        height={50}
                        alt='loading icon'
                    />
                </div>
            )}

            {/* show searched text or all results */}
            {!searchLoading && (searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList 
                    data={allPrompts}
                    handleTagClick={handleTagClick} 
                />
            ))}
        </section>
    );
};
export default Feed;