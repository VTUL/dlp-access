export const mock_site = {
  browseCollections: JSON.stringify({
    filter: {
      field: "subject",
      values: ["All", "Architecture"]
    },
    sort: [
      { field: "title", direction: "asc" },
      { field: "start_date", direction: "desc" }
    ]
  }),
  siteId: "default",
  siteTitle: "Test Site",
  title: "Test Site",
  displayedAttributes: JSON.stringify({
    collection: [
      {
        field: "identifier",
        label: ["Identifier"]
      },
      {
        field: "description",
        label: ["Description", "Another Description"]
      }
    ]
  }),
  siteOptions: JSON.stringify({
    collectionPageSettings: {
      viewOption: "grid",
      itemsPosition: "1"
    },
    redirectURL: "http://idn.lib.vt.edu",
    requiredAttributes: {
      archive: ["identifier"],
      collection: ["identifier"]
    },
    socialMedia: [
      "Facebook",
      "Pinterest",
      "Email",
      "Reddit",
      "Twitter",
      "Whatsapp"
    ]
  })
};
