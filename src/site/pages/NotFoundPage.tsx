import { Link } from 'react-router-dom';
import { Icon } from '../Icons';
import { Seo } from '../Seo';

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <Seo
        title="Page not found"
        description="The requested Qortal.org page could not be found."
      />
      <span className="eyebrow">404 / Route not found</span>
      <h1>This path is not part of the network map.</h1>
      <p>
        Return home or use the main navigation to continue exploring Qortal.
      </p>
      <Link className="button button--primary" to="/">
        Return home <Icon name="arrow" />
      </Link>
    </section>
  );
}
