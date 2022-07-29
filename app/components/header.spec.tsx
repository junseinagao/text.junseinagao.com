import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("タイトルが表示されてる", () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText("text.junseinagao.com")).toBeInTheDocument();
  });
  it("タイトルがルートへのリンクを持つ", () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(screen.getByText("text.junseinagao.com")).toHaveAttribute(
      "href",
      "/"
    );
  });
});
