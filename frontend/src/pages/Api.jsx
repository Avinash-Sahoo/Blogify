import { useEffect, useState } from 'react'

const Api = () => {
    const [value , setValue] = useState([])
    const [apiSize , setApiSize] = useState(1)

    //  const handleApi = async()=>{
          
    //         const response = await fetch("https://api.potterdb.com/v1/characters")
    //         const result = await response.json()
    //         console.log(result)
    //     }

         const handlePaginationApi = async()=>{
          
            const response = await fetch(`https://api.potterdb.com/v1/characters?page[size]=${25*apiSize}`)
            const result = await response.json()
            console.log(result.data)
            setValue(result.data)
        }

        const handleClick = ()=>{

            let more = apiSize + 1

            setApiSize(more)

            

        }



    useEffect(()=>{
      
       handlePaginationApi()
        // handleApi()


    },[apiSize])



  return (
    <div>
        {
            value.map((el,index)=>(

                <h1 key={index}>{el.attributes.name}</h1>

            ))
            
        }

        {
            (apiSize<4)?<button onClick={handleClick}>Load more</button> : null
        }

        

        {/* <button onClick={handleClick}>Load more</button> */}
        {/* <h1>Api</h1> */}
        {/* <input type="text" name="" id="" value={value} onChange={(e)=>setValue(e.target.value)}/> */}
      
    </div>
  )
}

export default Api
