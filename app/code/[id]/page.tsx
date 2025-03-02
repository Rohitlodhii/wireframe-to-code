/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useImageStore from "@/store/user";
// import { ArrowLeft, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Details from "../_components/Details";
import CodeEditor from "../_components/CodeEditor";
import useMobileScreen from "@/hooks/useMobile";
import Constant from "@/data/Constant";
import { ArrowLeft, Loader } from "lucide-react";

export interface RECORD {
  uuid: string;
  info: string;
  imageUrl: string;
  aiModel: string;
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [codeResp, setCodeResp] = useState<string>("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState(false);

  const [regenrate , setRegenrate] = useState(false);
  const [newPrompt ,setNewPrompt]= useState("");

  const [error , setError] = useState(false);

  

  const { id } = useParams<{ id: string }>();

  // const {isMobile} = useMobileScreen();

  const getImage = useImageStore((store) => store.getImage);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      GetRecordInfo();
    }
  }, [id]);

  const GetRecordInfo = async () => {
    console.log("Run..");
    setIsReady(false);
    setCodeResp("");
    setIsLoading(true);

    const imageData = getImage(id); 
    setRecord(imageData!);

    if (imageData) {
     await GenerateCode(imageData);
    }


  };

  const RegenerateCode = async ({ newprompt }: any) => {
    try {
      setIsLoading(true);
      setIsReady(false);
  
      const res = await fetch("/api/regenrate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: newprompt + ":" + Constant.PROMPT + codeResp,
          model: record?.aiModel,
        }),
      });
  
      if (!res.body) throw new Error("No response body");
  
      setCodeResp("");
      setIsLoading(false);
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const text = decoder.decode(value).replace("```typescript", "").replace("```", "");
        setCodeResp((prev) => prev + text);
        console.log(text);
      }
  
      setIsReady(true);
    } catch (error) {
      console.error("Error regenerating code:", error);
      setError(true);
     
    }
  };
  


  // useEffect(()=>{
  //   RegenerateCode(newPrompt);
  // } ,[regenrate]);

  const GenerateCode = async (resp: RECORD) => {
    try {
      setIsLoading(true);
  
      const res = await fetch("/api/code-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: resp.info + ":" + Constant.PROMPT,
          model: resp.aiModel,
          imageUrl: resp.imageUrl,
        }),
      });
  
      if (!res.body) throw new Error("No response body");
  
      setIsLoading(false);
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const text = decoder.decode(value).replace("```typescript", "").replace("```", "");
        setCodeResp((prev) => prev + text);
        console.log(text);
      }
  
      setIsReady(true);
    } catch (error) {
      console.error("Error generating code:", error);
      setError(true);
      
    }
  };
  

  
 


  return (
    <>
 
    
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div >
      <Details setRegenrate={setRegenrate} 
        newPrompt={newPrompt} 
        setNewPrompt={setNewPrompt}
        regenrate={regenrate}
        record={getImage(id)}
        isLoading={isLoading}
        isReady={isReady}
        />

      </div>
      <div className="col-span-4">

      <div className='flex flex-col'>
    <div className="h-12 md:h-14 px-4 w-full shadow-sm flex items-center justify-between ">
    <div className='flex items-center justify-center mx-2 pb-4 md:pb-0'>
            <ArrowLeft className='cursor-pointer ' />
        </div>
    </div>

      {isLoading ? (
        <div className="flex flex-col gap-2 items-center justify-center h-[70vh] m-5 border border-black  rounded-md overflow-hidden bg-slate-700">
            <Loader className="animate-spin text-white" />
            {error ? (
              <div className="text-white">API LIMIT REACHED BRO.. TRY To reload page</div>
            ) : 
            
            <div className="text-white ">Connecting to ai</div>
            }
        </div>
      ) : 
      
      <CodeEditor codeResp = {codeResp} isReady={isReady} isLoading={isLoading} />
      }
 </div>

      </div>
     

    </div>

    </>
  );
};

export default Page;
