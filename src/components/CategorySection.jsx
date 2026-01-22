import "./CategorySection.css";

export default function CategorySection({ category, children }) {
  return (
    <section className="category-section">
      {category && <h2 className="category-title">{category}</h2>}
      <ul className="category-list" role="list">
        {children}
      </ul>
    </section>
  );
}
