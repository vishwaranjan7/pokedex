// css import
import useDebounce from "../../hooks/useDebouncing";
import "../Search/Search.css";
function Search({updateSearchTerm}) {

  const debounceCallBack=useDebounce((e) => updateSearchTerm(e.target.value))
  return (
    <div className="searchBar">
      <input
        id="search-wraper"
        type="text"
        placeholder="Pokemon name ..."
        onChange={debounceCallBack}
      />
    </div>
  );
}

export default Search;
