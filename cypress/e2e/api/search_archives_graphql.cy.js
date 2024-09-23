const searchArchivesQuery = `
  query SearchCollectionItems(
      $parent_id: String!
      $limit: Int
      $sort: [SearchableArchiveSortInput]
      $nextToken: String
  ) {
      searchArchives(
          filter: { heirarchy_path: { eq: $parent_id }, visibility: { eq: true } }
          sort: $sort
          limit: $limit
          nextToken: $nextToken
      ) {
          items {
              id
              title
              description
              start_date
              custom_key
              identifier
              description
              tags
              creator
              create_date
          }
          total
          nextToken
      }
  }

`;

describe("searchArchives query default sorting", () => {
  it("Archives sorted by 'title' in asc order by default", () => {
    const variables = {
      limit: 5,
      parent_id: "5335870d-834c-4fcf-8831-c508d525d24e"
    };
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);
      expect(items[0].title).to.eq('"La Fragua" Housing, Bogotá');
      expect(items[0].custom_key).to.eq("ark:/53696/0t03jc8x");

      expect(items[1].title).to.eq('"La Fragua" Housing, Bogotá');
      expect(items[1].custom_key).to.eq("ark:/53696/pp439d2v");

      expect(items[2].title).to.eq('"La Fragua" Housing, Bogotá');
      expect(items[2].custom_key).to.eq("ark:/53696/zs07c17h");

      expect(items[3].title).to.eq(
        '"Mixto" Construction, San José, Costa Rica'
      );
      expect(items[3].custom_key).to.eq("ark:/53696/9b46ts2m");

      expect(items[4].title).to.eq(
        "Aceria (steelworks), Paz de Rio, Boyacá Department, Colombia"
      );
      expect(items[4].custom_key).to.eq("ark:/53696/9s971p34");
    });
  });
});

describe("searchArchives query sort by 'title' in desc order", () => {
  it("Archives sorted by 'title' in desc order", () => {
    const variables = {
      limit: 5,
      parent_id: "5335870d-834c-4fcf-8831-c508d525d24e",
      sort: [
        {
          field: "title",
          direction: "desc"
        }
      ]
    };
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);
      expect(items[0].title).to.eq(
        "near Castilla, Tolima Department, Colombia"
      );
      expect(items[0].custom_key).to.eq("ark:/53696/3f027g2q");

      expect(items[1].title).to.eq("de Roux & Bermudez, Architects");
      expect(items[1].custom_key).to.eq("ark:/53696/dw53tj8c");

      expect(items[2].title).to.eq("Yugoslavia - General View");
      expect(items[2].custom_key).to.eq("ark:/53696/v558mw2v");

      expect(items[3].title).to.eq(
        "Yoyogi National Gym, Tokyo, by Kenzo Tange"
      );
      expect(items[3].custom_key).to.eq("ark:/53696/m7862h44");

      expect(items[4].title).to.eq(
        "Yoyogi National Gym, Tokyo, by Kenzo Tange"
      );
      expect(items[4].custom_key).to.eq("ark:/53696/wr87bc8q");
    });
  });
});

describe("searchArchives query sort by 'start_date' in asc order", () => {
  it("Archives sorted by 'start_date' in desc order", () => {
    const variables = {
      limit: 5,
      parent_id: "5335870d-834c-4fcf-8831-c508d525d24e",
      sort: [
        {
          field: "start_date",
          direction: "asc"
        }
      ]
    };
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);
      expect(items[0].custom_key).to.eq("ark:/53696/5178425k");
      expect(items[0].start_date).to.eq("1941");

      expect(items[1].custom_key).to.eq("ark:/53696/3k152j9g");
      expect(items[1].start_date).to.eq("1951/08/31");

      expect(items[2].custom_key).to.eq("ark:/53696/7s99555j");
      expect(items[2].start_date).to.eq("1951/08/31");

      expect(items[3].custom_key).to.eq("ark:/53696/zw79ss32");
      expect(items[3].start_date).to.eq("1951/08/31");

      expect(items[4].custom_key).to.eq("ark:/53696/7h861j7t");
      expect(items[4].start_date).to.eq("1952");
    });
  });
});

describe("searchArchives query sort by 'start_date' in desc order", () => {
  let nextToken = null;
  const variables = {
    limit: 5,
    parent_id: "5335870d-834c-4fcf-8831-c508d525d24e",
    sort: [
      {
        field: "start_date",
        direction: "desc"
      }
    ]
  };
  it("Archives sorted by 'start_date' in desc order", () => {
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      let items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);

      expect(items[0].custom_key).to.eq("ark:/53696/0g13pc4h");
      expect(items[0].start_date).to.eq("1974/09/21");

      expect(items[1].custom_key).to.eq("ark:/53696/0r93t886");
      expect(items[1].start_date).to.eq("1974/09/21");

      expect(items[2].custom_key).to.eq("ark:/53696/0t755908");
      expect(items[2].start_date).to.eq("1974/09/21");

      expect(items[3].custom_key).to.eq("ark:/53696/0w77c591");
      expect(items[3].start_date).to.eq("1974/09/21");

      expect(items[4].custom_key).to.eq("ark:/53696/1400365w");
      expect(items[4].start_date).to.eq("1974/09/21");

      nextToken = res.body.data.searchArchives.nextToken;
      expect(nextToken).to.exist.to.eq(
        "148953600000::key::ark:/53696/1400365w"
      );
    });
  });
  it("Get next page of results with pagination token", () => {
    variables["nextToken"] = nextToken;
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);

      expect(items[0].custom_key).to.eq("ark:/53696/1k683z9z");
      expect(items[0].start_date).to.eq("1974/09/21");

      expect(items[1].custom_key).to.eq("ark:/53696/1r37pq0j");
      expect(items[1].start_date).to.eq("1974/09/21");

      expect(items[2].custom_key).to.eq("ark:/53696/23330w0w");
      expect(items[2].start_date).to.eq("1974/09/21");

      expect(items[3].custom_key).to.eq("ark:/53696/2k39k93k");
      expect(items[3].start_date).to.eq("1974/09/21");

      expect(items[4].custom_key).to.eq("ark:/53696/2q226d4f");
      expect(items[4].start_date).to.eq("1974/09/21");
    });
  });
});

describe("searchArchives query sort by a nullable field (create_date)", () => {
  let nextToken = null;
  const variables = {
    limit: 5,
    parent_id: "5335870d-834c-4fcf-8831-c508d525d24e",
    sort: [
      {
        field: "create_date",
        direction: "asc"
      }
    ],
    nextToken: null
  };
  it("Archives sorted by custom key in asc order", () => {
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);

      expect(items[0].custom_key).to.eq("ark:/53696/0000wx1j");
      expect(items[1].custom_key).to.eq("ark:/53696/0011b16b");
      expect(items[2].custom_key).to.eq("ark:/53696/0153q61n");
      expect(items[3].custom_key).to.eq("ark:/53696/0163sb8f");
      expect(items[4].custom_key).to.eq("ark:/53696/0244qp4c");

      nextToken = res.body.data.searchArchives.nextToken;
      expect(nextToken).to.exist.to.eq("NULL_FIELD::key::ark:/53696/0244qp4c");
    });

    it("Paginate results with nextToken", () => {
      variables["nextToken"] = nextToken;
      cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
        expect(res.status).to.eq(200);
        const items = res.body.data.searchArchives.items;
        expect(items).to.exist;
        expect(items).to.have.lengthOf(5);

        expect(items[0].custom_key).to.eq("ark:/53696/0343q64r");
        expect(items[1].custom_key).to.eq("ark:/53696/0353qt22");
        expect(items[2].custom_key).to.eq("ark:/53696/0398419c");
        expect(items[3].custom_key).to.eq("ark:/53696/0475vn9z");
        expect(items[4].custom_key).to.eq("ark:/53696/0495531q");
      });
    });
  });
});
