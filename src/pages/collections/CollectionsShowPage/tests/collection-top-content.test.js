import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CollectionTopContent } from "../CollectionTopContent";
import * as FunctionalFileGetter from "../../../../lib/FunctionalFileGetter";
import { mock_site } from "../../../../fixtures/mock_site";
import { mock_collection } from "../../../../fixtures/mock_collection";

describe("CollectionsTopContent component", () => {
  const collectionOptions = JSON.parse(mock_collection.collectionOptions);
  const site = mock_site;
  const setup = (view = "default") => {
    if (view === "podcasts") {
      site.siteId = "podcasts";
      jest
        .spyOn(FunctionalFileGetter, "getFile")
        .mockResolvedValueOnce(collectionOptions.webFeed);
    }
    jest
      .spyOn(FunctionalFileGetter, "getFile")
      .mockResolvedValueOnce(mock_collection.thumbnail_path);
    render(
      <CollectionTopContent
        collectionImg={mock_collection.thumbnail_path}
        site={site}
        collectionTitle={mock_collection.title}
        creator={mock_collection.creator}
        updatedAt={mock_collection.updatedAt}
        description={mock_collection.description}
        customKey="xxxxj22hdemo"
        collectionOptions={collectionOptions}
      />
    );
  };
  it("displays CollectionsTopContent page with collection description", async () => {
    setup();
    expect(await screen.findByRole("img")).toHaveAttribute(
      "src",
      mock_collection.thumbnail_path
    );
    expect(
      screen.getByRole("heading", { name: "Test Collection" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Created by: Test Creator/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Last updated: Mon Mar 01 2021 13:00:00 GMT-0500 \(Eastern Standard Time\)/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Test collection description/i)
    ).toBeInTheDocument();
  });
  it("displays podcast links and RSS link for podcasts", async () => {
    setup("podcasts");
    const RSSbutton = await screen.findByRole("button", { name: /RSS Feed/i });
    expect(RSSbutton).toBeVisible();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://amazon.com");
  });
});
