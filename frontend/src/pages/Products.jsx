import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utilis/toast"
import { useEffect, useState } from "react"
import axios from "axios"


const Products = () => {

    const navigate = useNavigate()
    const [products,setProducts] = useState([])

    const handleLogout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
        handleSuccess("Logout SuccessFully")
        setTimeout(()=>{

            navigate("/login")
            
        },1000)
    }
    const handleProducts = ()=>{

    axios.get("https://blogify-api-lake.vercel.app/products",{
            headers : {
                "authentication" : localStorage.getItem("token")
            }
        }).then((response)=>{
           let {success} = response.data
           if(success === false){
            localStorage.removeItem("token")
            localStorage.removeItem("loggedInUser")
            navigate("/login")
           }
            setProducts(response.data)
            
        }).catch((err)=>{
            return handleError(err)
        })
    }

    useEffect(()=>{

        handleProducts()

    },[])
  return (
      <>


    <header className="p-3 bg-dark text-white">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <span className="fs-4 text-white">AshCode</span>
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 align-items-center justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
          <li><Link to="/products" className="nav-link px-2 text-secondary">Products</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">Pricing</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">FAQs</Link></li>
          <li><Link to="#" className="nav-link px-2 text-white">About</Link></li>
        </ul>


        {
          (localStorage.getItem("token")) ? 
          <div className="text-end">
          {/* <button type="button" className="btn btn-outline-light me-2">Login</button> */}
          <button onClick={handleLogout} type="button" className="btn btn-warning">Logout</button>
        </div>
           :
          <div className="text-end">
          <button type="button" className="btn btn-outline-light me-2" onClick={()=>navigate("/login")}>Login</button>
          <button type="button" className="btn btn-warning" onClick={()=>navigate("/signup")}>Sign-up</button>
        </div>

        }

        
      </div>
    </div>
  </header>

  <h1 className='my-5 text-center'>Welcome to Products page</h1>
    
    {
      
      (!products[0]) ? <h1 className='text-center'>No Products Found</h1>
      : products.map((el,index)=>(
      <div className="box" key={index}>

      <h3>{el.product}</h3>
      <h4>{el.Price}</h4>

      </div>
      

     ))
      
    }
    
    <ToastContainer/>
    </>
  )
}

export default Products
