import React from 'react'

import Markdown from 'react-markdown'


const parseSection = (section:string)=>{
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
      <div key={index}>
      <Markdown>{section.join('\n')}</Markdown>
      <br />
      </div>
    )
  })}
    </div>
  )
}

export default SummaryCard