import "./stylesheet/SuccessStories.css";

const testimonials = [
  {
    initials: "SC",
    name: "Sarah Chen",
    title: "Tech Blogger",
    rating: 5,
    content:
      "BlogHelper transformed how I approach content creation. My tutorials now actually help people solve their coding problems, and the engagement has tripled!",
    tag: "3x more engagement",
  },
  {
    initials: "MJ",
    name: "Marcus Johnson",
    title: "DIY Enthusiast",
    rating: 5,
    content:
      "The problem-identification tools are incredible. I've helped over 1,000 people fix their home improvement issues thanks to the structured approach.",
    tag: "1,000+ people helped",
  },
  {
    initials: "LR",
    name: "Lisa Rodriguez",
    title: "Fitness Coach",
    rating: 5,
    content:
      "My fitness blog went from generic advice to targeted solutions. Readers now achieve real results, and I’ve built a community of 50,000 followers.",
    tag: "50K followers gained",
  },
  {
    initials: "DK",
    name: "David Kim",
    title: "Financial Advisor",
    rating: 5,
    content:
      "The analytics show exactly how my money management posts help readers. It's rewarding to see people actually improve their financial situations.",
    tag: "95% reader satisfaction",
  },
  {
    initials: "ET",
    name: "Emma Thompson",
    title: "Career Coach",
    rating: 5,
    content:
      "My career advice articles now provide actionable solutions. I've helped hundreds land their dream jobs using the problem-solving framework.",
    tag: "200+ job placements",
  },
  {
    initials: "AR",
    name: "Alex Rivera",
    title: "Mental Health Advocate",
    rating: 5,
    content:
      "Creating content that genuinely helps people with mental health challenges has been my passion. This platform makes it possible to reach and help more people.",
    tag: "Positive impact daily",
  },
];

const SuccessStories = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-2">
        Success Stories from Problem-Solving Bloggers
      </h2>
      <p className="text-center text-muted mb-4">
        See how creators like you are making a real difference in people's lives
        through helpful, solution-focused content.
      </p>
      <div className="row g-4">
        {testimonials.map((t, i) => (
          <div className="col-md-4" key={i}>
            <div className="card p-4 success-card h-100">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: 40, height: 40 }}>
                  {t.initials}
                </div>
                <div>
                  <div className="fw-semibold">{t.name}</div>
                  <div className="text-muted small">{t.title}</div>
                </div>
              </div>
              <div className="text-warning mb-2">
                {"★".repeat(t.rating)}
              </div>
              <blockquote className="text-muted" style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
                {t.content}
              </blockquote>
              <div className="bg-light text-primary fw-semibold mt-3 px-3 py-2 rounded small d-inline-block">
                {t.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;

