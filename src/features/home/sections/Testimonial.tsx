export function Testimonial() {
  return (
    <section className="home-testimonial">
      <div className="home-testimonial-card">
        <div className="home-stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <blockquote>
          “It used to take two hours a day on manual records. Now that time goes back to my
          patients.”
        </blockquote>
        <p className="home-testimonial-byline">
          Clinic Owner <span>·</span> Chennai
        </p>
      </div>
    </section>
  )
}
