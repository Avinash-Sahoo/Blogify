
import {
  BsBullseye,
  BsPeople,
  BsGraphUpArrow,
  BsBook,
  BsSearch,
  BsShare,
} from "react-icons/bs";
import "./stylesheet/HelpfulContent.css"

const HelpfulContent = () => {
  const features = [
    {
      icon: <BsBullseye className="icon-style" size="2rem" />,
      title: "Problem-Focused Writing",
      description:
        "Our AI-powered tools help you identify real problems your audience faces and create targeted solutions.",
    },
    {
      icon: <BsPeople className="icon-style" size="2rem" />,
      title: "Community Feedback",
      description:
        "Connect with readers who need help. Get feedback on your drafts and validate your content ideas.",
    },
    {
      icon: <BsGraphUpArrow className="icon-style" size="2rem"/>,
      title: "Impact Analytics",
      description:
        "Track how your posts are helping readers. See engagement, problem-resolution rates, and reader success stories.",
    },
    {
      icon: <BsBook className="icon-style" size="2rem"/>,
      title: "Content Templates",
      description:
        "Use proven templates for how-to guides, troubleshooting articles, and step-by-step tutorials.",
    },
    {
      icon: <BsSearch className="icon-style" size="2rem" />,
      title: "SEO Optimization",
      description:
        "Built-in SEO tools ensure your helpful content reaches people searching for solutions.",
    },
    {
      icon: <BsShare className="icon-style" size="2rem"/>,
      title: "Easy Distribution",
      description:
        "Share your problem-solving content across multiple platforms with one click.",
    },
  ];

  return (
    <div className="container helpful">
      <div className="text-center mb-5">
        <h2 className="helpful_head fw-bold">Everything You Need to Create Helpful Content</h2>
        <p className="helpful_para text-muted fs-5">
          Our platform provides all the tools and guidance you need to write blogs that
          genuinely solve problems and help your readers succeed.
        </p>
      </div>
      <div className="row g-4">
        {features.map((feature, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card-hover border rounded-4 p-4 h-100 shadow-sm bg-white">
              <div className="mb-4">{feature.icon}</div>
              <h5 className="fw-semibold">{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpfulContent;
