import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Home from "./Home";
import { fetchData } from "../api"; // Mock API

jest.mock("../api");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search bar and filter components", async () => {
    fetchData.mockResolvedValueOnce({ data: { items: [] } });

    await act(async () => {
      render(<Home />);
    });

    expect(
      screen.getByPlaceholderText("Find the items you're looking for")
    ).toBeInTheDocument();

    expect(screen.getByText((content) => content.includes("Filter"))).toBeInTheDocument();
  });

  it("fetches and displays items from the API", async () => {
    const mockItems = [{ name: "Item 1" }, { name: "Item 2" }];
    fetchData.mockResolvedValueOnce({ data: { items: mockItems } });

    await act(async () => {
      render(<Home />);
    });

    const elements = screen.getAllByRole("heading");
    expect(elements).toHaveLength(mockItems.length);
  });

  it("sorts items by price or name", async () => {
    const mockItems = [
      { name: "B Item", price: 100 },
      { name: "A Item", price: 50 },
    ];
    fetchData.mockResolvedValueOnce({ data: { items: mockItems } });

    await act(async () => {
      render(<Home />);
    });

    // Simulate sort interaction
    fireEvent.mouseDown(screen.getByLabelText("Sort By"));
    fireEvent.click(screen.getByText("Item Name"));

    const sortedTitles = screen.getAllByRole("heading").map((el) => el.textContent);
    expect(sortedTitles).toEqual(["A Item", "B Item"]);
  });
});
