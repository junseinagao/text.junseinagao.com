import { render, screen } from "@testing-library/react";
import Index from "./_index";

describe("index", () => {
  it("Show title", () => {
    render(<Index />);
    expect(screen.getByText("Welcome to Remix")).toBeInTheDocument();
  });
});
