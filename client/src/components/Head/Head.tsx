import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export function Head({ title = '', description = '' }: HeadProps = {}) {
  return (
    <Helmet
      title={title ? `${title} | Ứng dụng quản lý lớp học trực tuyến` : undefined}
      defaultTitle="Ứng dụng quản lý lớp học trực tuyến"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
}
