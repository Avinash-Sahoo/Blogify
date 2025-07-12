
import {
  BsSearch,
  BsPencil,
  BsPeople,
  BsTrophy,
} from "react-icons/bs";
import "./stylesheet/ProblemSolvingSteps.css";

const ProblemSolvingSteps = () => {
  const steps = [
    {
      icon: <BsSearch />,
      step: "01",
      title: "Identify Problems",
      description:
        "Use our research tools to discover what challenges your audience faces. Find trending issues and underserved topics.",
    },
    {
      icon: <BsPencil />,
      step: "02",
      title: "Create Solutions",
      description:
        "Write comprehensive, actionable content using our problem-solving templates and writing guidance.",
    },
    {
      icon: <BsPeople />,
      step: "03",
      title: "Engage Readers",
      description:
        "Publish your content and actively engage with readers. Respond to comments and gather feedback.",
    },
    {
      icon: <BsTrophy />,
      step: "04",
      title: "Track Impact",
      description:
        "Monitor how your content helps readers. Celebrate success stories and iterate based on results.",
    },
  ];

  return (
    <div className="problem container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">How to Create Problem-Solving Content</h2>
        <p className="text-muted fs-5">
          Follow our proven 4-step process to create blog posts that genuinely help your readers overcome challenges.
        </p>
      </div>

      <div className="row g-4">
        {steps.map((step, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="step-card text-center p-4 h-100 bg-white border rounded-4 shadow-sm">
              <div className="position-relative d-inline-block mb-3">
                <div className="step-icon text-primary">{step.icon}</div>
                <span className="step-badge">{step.step}</span>
              </div>
              <h5 className="fw-semibold">{step.title}</h5>
              <p className="text-muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemSolvingSteps;
