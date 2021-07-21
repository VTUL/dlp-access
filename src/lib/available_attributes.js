export const available_attributes = {
  archive: [
    {
      field: "identifier",
      required: ["iawa", "swva", "default", "podcasts"]
    },
    { field: "belongs_to", required: [] },
    { field: "bibliographic_citation", required: [] },
    { field: "creator", required: [] },
    { field: "custom_key", required: [] },
    { field: "format", required: [] },
    { field: "language", required: [] },
    { field: "location", required: [] },
    { field: "medium", required: [] },
    { field: "resource_type", required: [] },
    { field: "related_url", required: [] },
    { field: "rights_holder", required: [] },
    { field: "rights_statement", required: [] },
    { field: "source", required: [] },
    { field: "start_date", required: [] },
    { field: "tags", required: [] }
  ],
  collection: [
    { field: "size", required: [] },
    { field: "creator", required: [] },
    { field: "rights_statement", required: [] },
    { field: "date", required: [] },
    { field: "subject", required: [] },
    { field: "language", required: [] },
    {
      field: "identifier",
      required: ["iawa", "swva", "default", "podcasts"]
    },
    { field: "bibliographic_citation", required: [] },
    { field: "rights_holder", required: [] },
    { field: "related_url", required: [] }
  ]
};
