"use client"
import React, { useState } from 'react'
import FileUploadDropzone from './ImageUploadContaienr'
import { Button } from './ui/button'

import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader, WandSparkles } from 'lucide-react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from "uuid";
import useImageStore from '@/store/user'
import { Select, SelectContent,  SelectItem,  SelectTrigger, SelectValue } from './ui/select'


const UploadForm = () => {

    const { addImage } = useImageStore();

    const [files, setFiles] = useState<File[] | null>([]);
    const [ info , setInfo] = useState<string>("");
    const [isLoading , setIsLoading] = useState(false);
    const [aiModel , setModelName] = useState("geminipro");

    const router = useRouter();

    const onConvert = async () => {
        setIsLoading(true);
        if(files){
        const fileName = uuidv4();
        const imageRef = ref(storage , 'Wireframe/'+fileName);
      
            await uploadBytes(imageRef , files[0]).then((resp)=>{
                console.log("Image Uploaded" , resp)
            })

            const imageUrl = await getDownloadURL(imageRef);
            addImage(fileName, imageUrl, info ,aiModel);

            router.push(`/code/${fileName}`)
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
        <div>
            <Select defaultValue={aiModel} onValueChange={(value)=>setModelName(value)}>
            <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Ai Model" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="geminipro">Gemini 2 Pro</SelectItem>
    <SelectItem value="geminiflash">Gemini 2 Flash</SelectItem>
    <SelectItem value="deepr1">DeepSeek R1</SelectItem>
    <SelectItem value="deepv3">DeepSeek V3</SelectItem>
    <SelectItem value="meta">Meta Llama 3.3</SelectItem>
    <SelectItem value="qwen">Qwen VL Plus</SelectItem>
  </SelectContent>
            </Select>
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