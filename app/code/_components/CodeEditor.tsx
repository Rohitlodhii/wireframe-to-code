/* eslint-disable @typescript-eslint/no-explicit-any */

import Constant from "@/data/Constant";
import { Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import {  dracula } from "@codesandbox/sandpack-themes";

import React from 'react'

const CodeEditor = ({codeResp ,isReady} :any) => {
  return (
    
    <div className="m-5 border border-black  rounded-md overflow-hidden">
   { isReady ? <Sandpack   theme={dracula}
      template="react"
      options={{
        showNavigator :true ,
        showTabs:true ,
        editorHeight: 600, // default - 300
        externalResources : ["https://cdn.tailwindcss.com"]
      }}

      customSetup={{
        dependencies : {
          ...Constant.DEPENDANCY
        }
      }}

      files={{
        "/App.js" : {
          code :`${codeResp.replace('jsx' , '')}`,
          active:true
        }
      }}

      /> :

      <SandpackProvider template="react" theme={dracula}
        files={{
          "/app.js" : {
            code :`${codeResp}`,
            active:true
          }
        }}
        customSetup={{
          dependencies : {
            ...Constant.DEPENDANCY
          }
        }}
        options={{
          externalResources : ["https://cdn.tailwindcss.com"]
        }}
      >
        <SandpackLayout >
          <SandpackCodeEditor showTabs={true} style={{
            height : '70vh'
          }} />
        </SandpackLayout>
      </SandpackProvider>

    }
    </div>
   
  )
}

export default CodeEditor