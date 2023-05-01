import Loader from '../components/loader/Loader';

export const RenderLoader = ({ conditions }) => {
  if (conditions.join(' || ')) return <Loader />;
};
