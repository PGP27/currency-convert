import { useApp } from '~/context/AppContext/AppContext';
import Select from '~/components/Select/Select';
import Input from '~/components/Input/Input';

const Home = () => {
  const { currencies } = useApp();

  return (
    <div>
      <Select defaultValue='Brazilian Real' options={Object.values(currencies)} />
      <Input />
    </div>
  );
};

export default Home;
