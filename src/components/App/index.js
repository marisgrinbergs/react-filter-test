import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const App = () => {
const [datas, setDatas] = useState([]);
const [searchName, setSearchName] = useState("");
const [pageNumber, setPageNumber] = useState(0);
const pageVisited = 20 * pageNumber;
const pageCount = Math.ceil(datas.length / 20);

const displayDatas = datas.slice(pageVisited, pageVisited + 20).filter(data => (data.fields.tco_libelle.toLowerCase().includes(searchName.toLowerCase()))).map((data, i) => {
  return (
<div className="App-Array_datas" key={i}>
<h3>Libellé : {data.fields.tco_libelle}</h3>
<h3>Ville : {data.fields.ville}</h3>
<h3>Code Costal : {data.fields.code_postal}</h3>
</div>
)});

const changePage = ({selected}) => {
  setPageNumber(selected);
}

useEffect(() => {
  axios.get(`https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&q=&rows=993&sort=code_postal&facet=dea_fermeture&facet=ville`, {}, { withCredentials: true })
  .then((response) => {
          setDatas(response.data.records);
          });
},[]);
  return (
    <div className="App">
      <input
          className="searchBar"
          type="text"
          placeholder="Entrez le nom de votre commerce"
          onChange={(event) => {
          setSearchName(event.target.value);
        }}/>
      <ReactPaginate 
        previousLabel={"<-"}
        nextLabel={"->"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        activeClassName={"paginationActive"}
      />
      <div className="App-Array">
      {displayDatas}
      </div>
    </div>
  );
}

export default App;
