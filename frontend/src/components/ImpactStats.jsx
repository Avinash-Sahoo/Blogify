
import {
  BsPeople,
  BsFileText,
  BsHeart,
  BsGraphUpArrow,
} from "react-icons/bs";
import "./stylesheet/ImpactStats.css";

const ImpactStats = () => {
  const stats = [
    {
      icon: <BsPeople />,
      value: "50,000+",
      label: "Active Bloggers",
      sub: "Creating helpful content daily",
    },
    {
      icon: <BsFileText />,
      value: "2M+",
      label: "Problem-Solving Posts",
      sub: "Published and helping readers",
    },
    {
      icon: <BsHeart />,
      value: "10M+",
      label: "People Helped",
      sub: "Real problems solved",
    },
    {
      icon: <BsGraphUpArrow />,
      value: "95%",
      label: "Success Rate",
      sub: "Readers find solutions",
    },
  ];

  return (
    <div className="impact-section py-5 text-white text-center">
      <div className="container">
        <h2 className="fw-bold">Making a Real Impact Together</h2>
        <p className="fs-5 mb-5">
          Our community of problem-solving bloggers is creating content that genuinely
          changes lives every day.
        </p>
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div className="col-6 col-lg-3" key={index}>
              <div className="mb-3 d-flex justify-content-center">
                <div className="impact-icon">{stat.icon}</div>
              </div>
              <h4 className="fw-bold">{stat.value}</h4>
              <p className="mb-1">{stat.label}</p>
              <small className="text-light">{stat.sub}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
