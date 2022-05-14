import QQSearch from "./components/QQSearch/index.tsx";
import './index.scss';

const Search = () => {
  return (
    <div className="page-search">
      <h1>QQ号查询</h1>
      <QQSearch></QQSearch>
    </div>
  );
}
  
export default Search;