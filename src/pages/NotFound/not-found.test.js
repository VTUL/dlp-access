import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

describe("404 Not Found page", () => {
  it("displays the page's title and link to the homepage", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Page Not Found/i,
      })
    ).toBeVisible();
    expect(
      screen.getByText(/Oops! That page couldn't be found./i)
    ).toBeVisible();
    const link = screen.getByRole("link", { name: "homepage" });
    expect(link).toBeVisible();
    expect(link).toHaveAttribute("href", "/");
  });
});
