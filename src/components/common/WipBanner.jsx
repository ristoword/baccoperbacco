import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function WipBanner({ title, text, badge }) {
  const { t } = useLanguage();

  return (
    <div className="wip" role="status">
      <p className="wip__badge">{badge || 'Work in progress'}</p>
      <h1 className="wip__title">{title}</h1>
      {text ? <p className="wip__text">{text}</p> : null}
      <Link className="btn btn--ghost" to="/">
        {t('common.backHome')}
      </Link>
    </div>
  );
}
