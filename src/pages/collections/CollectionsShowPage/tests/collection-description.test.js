import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CollectionDescription } from "../CollectionDescription";
import userEvent from "@testing-library/user-event";
import { mock_site } from "src/fixtures/mock_site";

describe("CollectionsShowPage component", () => {
  const setup = (description = ["Test description", "Test description 2"]) => {
    render(
      <CollectionDescription
        description={description === "undefined" ? undefined : description}
        site={mock_site}
      />
    );
  };
  it("displays Collection Description component", async () => {
    setup();
    expect(screen.getByRole("heading", { name: /Description/i })).toBeVisible();
    expect(screen.getByText("Test description")).toBeVisible();
    expect(
      screen.getByRole("button", { name: /\[more\]/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /\[less\]/i })
    ).toBeInTheDocument();
  });

  it("expands and collapses description", async () => {
    setup();
    const moreButton = screen.getByRole("button", { name: /\[more\]/i });
    const lessButton = screen.getByRole("button", { name: /\[less\]/i });

    await userEvent.click(moreButton);
    expect(
      await screen.findByRole("heading", { name: /Another Description/i })
    ).toBeVisible();
    expect(screen.getByText("Test description 2")).toBeVisible();

    await userEvent.click(lessButton);
    expect(
      screen.queryByRole("heading", { name: /Another Description/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Test description 2")).not.toBeInTheDocument();
  });

  it("Does not display buttons if description is not truncated", async () => {
    setup(["Test description"]);
    expect(screen.queryByRole("button", { name: /\[more\]/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /\[less\]/i })).toBeNull();
  });

  it("Does not display if description is empty array", () => {
    setup([]);
    expect(screen.queryByRole("heading", { name: /Description/i })).toBeNull();
  });

  it("Does not display if description is undefined", () => {
    setup("undefined");
    expect(screen.queryByRole("heading", { name: /Description/i })).toBeNull();
  });
});
