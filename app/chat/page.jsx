'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Chat = () => {
    const router = useRouter();
    const { data: session } = useSession();

    
  return (
    <div>Chat</div>
  )
}

export default Chat