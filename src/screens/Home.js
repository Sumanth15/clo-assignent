import React, { useEffect, useState } from "react";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import api from "../Config";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/data?page=${page}&size=12`);
        const newItems = response.data;
        setItems((prevItems) => [...prevItems, ...newItems]);
        setFilteredItems((prevItems) => [...prevItems, ...newItems]);
      } catch (error) {
        console.error("Error fetching API data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  const handleFilterChange = ({ pricingOptions, priceRange }) => {
    const filtered = items.filter((item) => {
      const matchesPriceRange =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesPricingOption =
        pricingOptions.length === 0 || pricingOptions.includes(item.pricingOption);
      return matchesPriceRange && matchesPricingOption;
    });
    setFilteredItems(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredItems(items);
    } else {
      const lowerCaseTerm = term.toLowerCase();
      const filtered = items.filter(
        (item) =>
          item.creator.toLowerCase().includes(lowerCaseTerm) ||
          item.title.toLowerCase().includes(lowerCaseTerm)
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="black-screen">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Find the items you're looking for"
          onSearch={handleSearch}
        />
      </div>
      <div className="filter-container-inhome">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="content-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="grid-item">
            <img src={item.imagePath} alt={item.title} />
            <div className="grid-details">
              <div className="grid-info">
                <h3>{item.title}</h3>
                <p>{item.creator}</p>
              </div>
              <div className="grid-pricing">
                <p>
                  {item.pricingOption === 0
                    ? "Free"
                    : item.pricingOption === 1
                    ? "View Only"
                    : `Paid: $${item.price}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
