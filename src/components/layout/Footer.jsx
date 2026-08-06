import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Bacco Perbacco — Trattoria Italiana</p>
        <p className="site-footer__sedi">
          <Link to="/reserveren?sede=den-haag">Den Haag</Link>
          <span aria-hidden="true">·</span>
          <Link to="/reserveren?sede=leiden">Leiden</Link>
        </p>
        <p className="site-footer__note">Roberta & Giuseppe</p>
      </div>
    </footer>
  );
}
