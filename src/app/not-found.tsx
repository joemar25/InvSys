'use client'

import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    const router = useRouter()

    const handleReturnHome = () => {
        router.push('/')
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-4'>
            <h1 className='text-4xl font-bold'>404</h1>
            <h2 className='text-xl text-muted-foreground'>Page Not Found</h2>
            <p className='text-center text-muted-foreground max-w-[500px] mt-4'>
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button variant={'outline'} className='gap-2' onClick={handleReturnHome}>
                <Home size={16} />
                Return Home
            </Button>
        </div>
    )
}