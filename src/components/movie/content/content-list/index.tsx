import React from 'react';

import styles from './content-list.module.scss';
import Link from 'next/link';

interface Link {
  id: string;
  title: string;
  href: string;
}

interface Props {
  name: string;
  links: Link[];
}

export const ContentList: React.FC<Props> = ({ name, links }) => {
  return (
    <div className={styles.list}>
      <p className={styles.name}>{name}</p>
      <div className={styles.links}>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.href} className={styles.link}>
              {link.title}
            </Link>
            {links.length > index + 1 ? ', ' : ''}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
