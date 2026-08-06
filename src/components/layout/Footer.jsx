import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>{t('footer.line')}</p>
        <p className="site-footer__sedi">
          <Link to="/reserveren?sede=den-haag">{t('common.denHaag')}</Link>
          <span aria-hidden="true">·</span>
          <Link to="/reserveren?sede=leiden">{t('common.leiden')}</Link>
        </p>
        <p className="site-footer__note">Roberta & Giuseppe</p>
      </div>
    </footer>
  );
}
