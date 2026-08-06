import { Link } from 'react-router-dom';

export default function WipBanner({ title, text }) {
  return (
    <div className="wip" role="status">
      <p className="wip__badge">Work in progress</p>
      <h1 className="wip__title">{title}</h1>
      {text ? <p className="wip__text">{text}</p> : null}
      <Link className="btn btn--ghost" to="/">
        Terug naar home
      </Link>
    </div>
  );
}
