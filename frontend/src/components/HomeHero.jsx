import { PenTool} from "lucide-react";
import { useNavigate } from "react-router-dom";
const HomeHero = () => {
  const navigate = useNavigate()
  return (
        <div className="container text-center mt-5 px-2" style={{padding: "6rem 0"}} >
        <div className="mb-4 text-center d-flex justify-content-center">
          <span className="fs-1 text-primary"><PenTool className="text-primary" size="4rem"/></span>
        </div>
        <h1 className="fw-bold display-5 display-md-4 "style={{fontSize: "2.6rem"}}>
          Write Blogs That <br />
          <span className="text-primary" style={{fontSize: "2.6rem"}}>Solve Real Problems</span>
        </h1>
        <p className="lead mt-4 mx-auto fw-normal" style={{ maxWidth: "720px", color : "#4b5563",fontWeight:"300" }}>
          Join thousands of bloggers creating helpful content that makes a
          difference. Our platform helps you craft problem-solving articles that
          genuinely help your readers overcome challenges and achieve their
          goals.
        </p>
        <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="btn btn-dark btn-lg" onClick={()=>navigate("/write")}>
           Start Writing Today →
          </button>
          <button className="btn btn-outline-secondary btn-lg" onClick={()=>navigate("/blogs")} >
            Explore Success Stories
          </button>
        </div>
        <p className="mt-4 text-muted small">
          Join 50,000+ bloggers • No credit card required • Free forever plan
        </p>
      </div>
  )
}

export default HomeHero
