import QQSearch from "./components/QQSearch/index";
import './index.scss';

const Search: React.FC = () => {
  return (
    <div className="page-search">
      <h1>QQ号查询</h1>
      <QQSearch />
    </div>
  );
}

export default Search;