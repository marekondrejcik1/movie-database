import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  test("renders title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const title = screen.getByText("Fancy Movie Database");
    expect(title).toBeInTheDocument();
  });

  test("renders buttons for pages", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Search Movies")).toBeInTheDocument();
    expect(screen.getByText("Favourites")).toBeInTheDocument();
  });
});
