import { useEffect } from 'react';
import { siteLinks } from '../config/siteLinks';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

function upsertMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, key] = attribute.split(':');
    element.setAttribute(name, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export function Seo({ title, description, path = '' }: SeoProps) {
  useEffect(() => {
    const fullTitle =
      title === 'Qortal'
        ? 'Qortal | Community-owned digital infrastructure'
        : `${title} | Qortal`;
    const canonical = `${siteLinks.site}${path}`;
    document.title = fullTitle;
    upsertMeta('meta[name="description"]', 'name:description', description);
    upsertMeta('meta[property="og:title"]', 'property:og:title', fullTitle);
    upsertMeta(
      'meta[property="og:description"]',
      'property:og:description',
      description
    );
    upsertMeta('meta[property="og:url"]', 'property:og:url', canonical);
    upsertMeta('meta[name="twitter:title"]', 'name:twitter:title', fullTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      'name:twitter:description',
      description
    );

    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [description, path, title]);

  return null;
}
