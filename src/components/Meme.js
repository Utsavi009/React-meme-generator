import React from 'react'

const Meme = ({infos, loading}) => {
  /*Working*/
      if(loading){
          return <h1>The page is still loading</h1>
      }
       /*Working*/
    return (
        <div>   
          {infos.map((info, index)=> {
              return (
                <div>
                  <h1>image</h1>
                <img key={index} src={info.url} />
                </div>
              )
            })}
        </div>
    )
}

export default Meme;