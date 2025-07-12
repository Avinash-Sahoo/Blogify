import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import "./stylesheet/CallToAction.css";
import { useNavigate } from "react-router-dom";

const features = [
  "AI-powered content suggestions",
  "Reader engagement analytics",
  "Community of helpful bloggers",
  "Built-in problem identification tools",
  "SEO optimization features",
  "Success story tracking",
];

const CallToAction = () => {
  const navigate = useNavigate()
  return (
    <div className="cta-section text-center text-white py-5">
      <div className="container">
        <h2 className="fw-bold">Ready to Start Helping Others?</h2>
        <p className="fs-5 mb-4">
          Join our community of problem-solving bloggers and start creating content
          that makes a real difference in people's lives.
        </p>

        <div className="call bg-white text-dark rounded-4 shadow p-4 mb-4 d-inline-block">
          <div className="row row-cols-1 row-cols-md-2 g-3 text-start">
            {features.map((feature, index) => (
              <div className="col d-flex align-items-center" key={index}>
                <FaCheckCircle className="text-success me-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
<div className="d-flex justify-content-center">
<button className="d-flex justify-content-center align-items-center
 btn btn-light px-4 py-2 fw-semibold rounded-pill mb-2" onClick={()=>navigate("/blogs")}>
          Start Your Problem-Solving Blog <span><FaArrowRight className="ms-2" /></span> 
        </button>
</div>
        

        <p className="text-white-50 mt-1 small">
          Free forever • No credit card required • 2-minute setup
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
