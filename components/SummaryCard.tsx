import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Markdown from 'react-markdown'


const parseSection = (section:String)=>{
  const [title,content] = section.split("\n")
  return {title,content}
}



const SummaryCard = ({summary}:{summary:string}) => {

  //  console.log({summary})

  const sections= summary.split("\n#").map((sections)=>sections.split("\n"))
  

  return (
    <div >
      
  {sections.map((section, index)=>{
    return(
      <>
      <Markdown key={index}>{section.join('\n')}</Markdown>
      <br />
      </>
    )
  })}
    </div>
  )
}

export default SummaryCard