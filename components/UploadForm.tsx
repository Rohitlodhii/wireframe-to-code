"use client"
import React, { useState } from 'react'
import FileUploadDropzone from './ImageUploadContaienr'
import { Button } from './ui/button'

import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader, WandSparkles } from 'lucide-react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebase'


const UploadForm = () => {

    const [files, setFiles] = useState<File[] | null>([]);
    const [ info , setInfo] = useState<string>("");
    const [isLoading , setIsLoading] = useState(false);

    const onConvert = async () => {
        setIsLoading(true);
        if(files){
        const fileName = Date.now().toString();
        const imageRef = ref(storage , 'Wireframe/'+fileName);
      
            await uploadBytes(imageRef , files[0]).then((resp)=>{
                console.log("Image Uploaded" , resp)
            })

            const imageUrl = await getDownloadURL(imageRef);
            console.log(imageUrl);
        } else{
            console.log("Select some file bro and dont see logs it for dev only");
        }
        
        
        setIsLoading(false);
        
    }

  
  return (
    <div className='w-full gap-10 h-screen flex flex-col items-center justify-center'>
        <div className='md:text-2xl text-base font-semibold tracking-tight'>Convert WireFrame into React Code</div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
         <FileUploadDropzone files={files} setFiles={setFiles} />
        
        <div className='p-10 flex flex-col shadow-md rounded-sm justify-center  gap-6'>
           
            <Label>Additional Info about Image</Label>
            <Textarea value={info} onChange={(e)=>setInfo(e.target.value)} className='w-44 md:w-72 placeholder:text-sm' placeholder='Make it beautifull and minimal..'/>
            

        </div>
        </div>
        <div className=''>

            {
                isLoading ?
                <Button className='flex items-center justify-center gap-4' disabled={true}><Loader className='aniamte-spin' /> Loading..</Button> :
                <Button onClick={()=>onConvert()} disabled={files?.length == 0} className='flex items-center justify-center gap-4'> <WandSparkles/> Generate React Code</Button>
            }

           
        </div>

    </div>
  )
}

export default UploadForm