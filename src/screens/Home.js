import React, { useEffect, useState } from "react";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import api from "../Config";
import SortDropdown from "../components/SortDropdown";

const Home = () => {
  const [items, setItems] = useState([]); // Store API data
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered items
  const [loading, setLoading] = useState(false); // Track loading state
  const [page, setPage] = useState(1); // Pagination or infinite scroll tracking
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get(`/data?page=${page}&size=12`); // Fetch items with pagination
  //       const newItems = response.data;
  //       setItems((prevItems) => [...prevItems, ...newItems]); // Append new items
  //       setFilteredItems((prevItems) => [...prevItems, ...newItems]); // Append to filtered items
  //     } catch (error) {
  //       console.error("Error fetching API data:", error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItems();
  // }, [page]);

  useEffect(() => {
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/data?page=${page}&size=12`); // Fetch items with pagination
      const newItems = response.data;

      setItems((prevItems) => {
        const uniqueItems = [
          ...prevItems,
          ...newItems.filter((newItem) =>
            !prevItems.some((prevItem) => prevItem.id === newItem.id)
          ),
        ];
        return uniqueItems;
      });

      setFilteredItems((prevItems) => {
        const uniqueItems = [
          ...prevItems,
          ...newItems.filter((newItem) =>
            !prevItems.some((prevItem) => prevItem.id === newItem.id)
          ),
        ];
        return uniqueItems;
      });
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
      setFilteredItems(items); // If the search term is empty, show all items
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

  const handleSortChange = (sortOption) => {
  let sortedItems = [...filteredItems];
  if (sortOption === "highPrice") {
    sortedItems.sort((a, b) => b.price - a.price); // Sort by higher price
  } else if (sortOption === "lowPrice") {
    sortedItems.sort((a, b) => a.price - b.price); // Sort by lower price
  } else {
    sortedItems.sort((a, b) => a.title.localeCompare(b.title)); // Sort by Item Name
  }
  setFilteredItems(sortedItems); // Update filtered items after sorting
};


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page number to load more data
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="black-screen">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Find the items you're looking for"
          onSearch={handleSearch}
        />
      </div>
      <div className="filter-container-inhome">
        <Filter onFilterChange={handleFilterChange}/>
        <SortDropdown onSortChange={handleSortChange} />

      </div>
      <div className="content-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="grid-item">
            <img src={item.imagePath} alt={item.title} />
            <div className="grid-details">
              <div className="grid-info">
                <h3>{item.title}</h3>
                <p>Created by: {item.creator}</p>
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
