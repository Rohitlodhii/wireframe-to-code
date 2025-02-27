/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {  getModelName } from '@/lib/models'
import {  Loader, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'


const Details = ({ record ,setRegenrate  ,setNewPrompt ,regenrate , isLoading  } : any) => {

    // const [isShown , setIsHidden] = useState();
    const [imgLoading, setImageLoading] = useState(true);
    const AiModel = getModelName(record.aiModel);

  return (
    <div className={`w-72   flex flex-col rounded-sm  gap-4 p-4 h-screen shadow-lg bg-zinc-100`}>



        <div className='flex flex-col mb-4 mt-1'>
            <h2 className='md:text-xl  text-lg font-semibold'>DrawCypher</h2>
            <p className='text-muted-foreground text-xs'>Image to code</p>
        </div>
        <div className='h-44 p-2 border bg-white border-muted-foreground   flex items-center rounded-md  justify-center'>
                {imgLoading && (
                    <Loader className='animate-spin' />
                )}
                    <Image src={record.imageUrl}  onLoad={()=> setImageLoading(false)} alt='WireFrame'   className={`${imgLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`} width={"400"} height={"400"}/>
  
        </div>

        <div className='flex flex-col gap-2'>
            <p className='text-lg text-muted-foreground font-medium'>Model Selected </p>
             <div className='py-2 bg-white w-full border border-muted-foreground text-muted-foreground rounded-md px-4'>
                {AiModel}
             </div>
        </div>

        <div className='flex flex-col gap-2'>
        <p className='text-lg text-muted-foreground  font-medium'>Your Prompt</p>
            <Textarea className='w-full h-32 text-muted-foreground bg-white ' onChange={(e)=>setNewPrompt(e.target.value)}  defaultValue={record.info} />
        </div>

        <div className='my-2'>
            <Button disabled={isLoading} variant={"outline"} onClick={()=>setRegenrate(!regenrate)} className='w-full  flex gap-2 items-center justify-center'><RefreshCcw/>  Regenrate Code</Button>
        </div>
    </div>
  )
}

export default Details