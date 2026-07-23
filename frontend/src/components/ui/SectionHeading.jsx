export default function SectionHeading({ id, title, description }) {
  return (
    <header className="section-heading">
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
