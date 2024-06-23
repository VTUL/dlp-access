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
  it("Archives sorted by title in asc order by default", () => {
    const variables = {
      limit: 5,
      parent_id: "4172836b-4760-423c-bb4e-c5215e069d76"
    };
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);
      expect(items[0].title).to.eq("Abaeis nicippe ((Cramer, 1779))");
      expect(items[1].title).to.eq("Abaeis nicippe ((Cramer, 1779))");
      expect(items[2].title).to.eq("Achalarus lyciades ((Geyer, [1832]))");
      expect(items[3].title).to.eq("Achalarus lyciades ((Geyer, [1832]))");
      expect(items[4].title).to.eq("Achalarus lyciades ((Geyer, [1832]))");
    });
  });
});

describe("searchArchives query sort by title by desc order", () => {
  it("Archives sorted by title in desc order", () => {
    const variables = {
      limit: 5,
      parent_id: "4172836b-4760-423c-bb4e-c5215e069d76",
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
      expect(items[0].title).to.eq("speyeria idalia ((Drury, 1773))");
      expect(items[1].title).to.eq("moduza (Moore, 1881)");
      expect(items[2].title).to.eq("hes");
      expect(items[3].title).to.eq("Zerene cesonia ((Stoll, 1790))");
      expect(items[4].title).to.eq("Xylocopa virginica ((Linnaeus, 1771))");
    });
  });
});

describe("searchArchives query sort by start_date by asc order", () => {
  it("Archives sorted by title in desc order", () => {
    const variables = {
      limit: 5,
      parent_id: "4172836b-4760-423c-bb4e-c5215e069d76",
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
      expect(items[0].id).to.eq("5965bd54-6958-4a87-8c3d-024b716bc482");
      expect(items[0].start_date).to.eq("1874/08/13");

      expect(items[1].id).to.eq("81675218-2bd6-45cb-972a-318b6f076d43");
      expect(items[1].start_date).to.eq("1876/07/20");

      expect(items[2].id).to.eq("80323649-2160-458a-ab92-4a9596c9e760");
      expect(items[2].start_date).to.eq("1889/07/03");

      expect(items[3].id).to.eq("950254d0-8b29-4d4a-806b-3ec5a837f4ce");
      expect(items[3].start_date).to.eq("1894/08/02");

      expect(items[4].id).to.eq("559bcb88-14c9-4cc9-a587-a2b5c7b6fd7d");
      expect(items[4].start_date).to.eq("1895/08/02");
    });
  });
});

describe("searchArchives query sort by start_date by desc order", () => {
  let nextToken = null;
  const variables = {
    limit: 5,
    parent_id: "4172836b-4760-423c-bb4e-c5215e069d76",
    sort: [
      {
        field: "start_date",
        direction: "desc"
      }
    ]
  };
  it("Archives sorted by title in desc order", () => {
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      let items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);

      expect(items[0].id).to.eq("0e894be0-9a70-456e-bd58-682c9a9943a0");
      expect(items[0].start_date).to.eq("2019/09/05");

      expect(items[1].id).to.eq("257c59d2-c2c0-4144-82e1-91e846fe10cf");
      expect(items[1].start_date).to.eq("2018/08/14");

      expect(items[2].id).to.eq("7af4c0f2-5279-4ba8-8062-31f95c50674b");
      expect(items[2].start_date).to.eq("2018/08/14");

      expect(items[3].id).to.eq("d858803d-73df-4724-a7ac-c205f266cff4");
      expect(items[3].start_date).to.eq("2018/08/14");

      expect(items[4].id).to.eq("916b1668-ae83-4f81-9ddd-56cc01f9b473");
      expect(items[4].start_date).to.eq("2018/08/14");

      nextToken = res.body.data.searchArchives.nextToken;
      expect(nextToken).to.exist.to.eq(
        "1534204800000::key::ark:/53696/ss07hm3g"
      );
    });
  });
  it("Paginate results with nextToken", () => {
    variables["nextToken"] = nextToken;
    cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
      expect(res.status).to.eq(200);
      const items = res.body.data.searchArchives.items;
      expect(items).to.exist;
      expect(items).to.have.lengthOf(5);

      expect(items[0].id).to.eq("d6c01b8c-ab24-4018-bf38-5061203f15c4");
      expect(items[0].start_date).to.eq("2018/08/13");

      expect(items[1].id).to.eq("e315eefa-6425-447f-99ca-3df0fdecfd1e");
      expect(items[1].start_date).to.eq("2018/08/13");

      expect(items[2].id).to.eq("58b724e3-f9bc-418a-bf86-526be1251f33");
      expect(items[2].start_date).to.eq("2018/08/13");

      expect(items[3].id).to.eq("b00a2cf8-f569-4b5c-b1b8-8acec70af9ad");
      expect(items[3].start_date).to.eq("2018/08/13");

      expect(items[4].id).to.eq("0edc34fa-9899-457b-9cad-2152065038e0");
      expect(items[4].start_date).to.eq("2018/08/13");
    });
  });
});

describe("searchArchives query sort by a null field (creator)", () => {
  let nextToken = null;
  const variables = {
    limit: 5,
    parent_id: "4172836b-4760-423c-bb4e-c5215e069d76",
    sort: [
      {
        field: "creator",
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

      expect(items[0].id).to.eq("7b52b83a-4509-46cd-84b5-c296f554f3a8");
      expect(items[0].custom_key).to.eq("ark:/53696/0046p295");

      expect(items[1].id).to.eq("539885c3-bdaf-4b23-8a86-39c2e1615861");
      expect(items[1].custom_key).to.eq("ark:/53696/0057rw0d");

      expect(items[2].id).to.eq("b251e06e-9015-42f5-97a5-642c1dca2a18");
      expect(items[2].custom_key).to.eq("ark:/53696/0194fs3t");

      expect(items[3].id).to.eq("f2c08f0b-0171-49b7-9f57-84e002b78bdc");
      expect(items[3].custom_key).to.eq("ark:/53696/0267d54x");

      expect(items[4].id).to.eq("05878b4f-6cff-4433-b2fb-f050ba0a08fa");
      expect(items[4].custom_key).to.eq("ark:/53696/0270450w");

      nextToken = res.body.data.searchArchives.nextToken;
      expect(nextToken).to.exist.to.eq("NULL_FIELD::key::ark:/53696/0270450w");
    });

    it("Paginate results with nextToken", () => {
      variables["nextToken"] = nextToken;
      cy.graphqlRequest(searchArchivesQuery, variables).then((res) => {
        expect(res.status).to.eq(200);
        const items = res.body.data.searchArchives.items;
        expect(items).to.exist;
        expect(items).to.have.lengthOf(5);

        expect(items[0].id).to.eq("96dcdec6-1309-4c49-a58e-019b4479fbbd");
        expect(items[0].custom_key).to.eq("ark:/53696/0318mv04");

        expect(items[1].id).to.eq("32725f42-dc95-4214-8bbc-ab7a134e379a");
        expect(items[1].custom_key).to.eq("ark:/53696/0326tc5f");

        expect(items[2].id).to.eq("21dbb27a-e1d6-4428-bf26-62a87560a846");
        expect(items[2].custom_key).to.eq("ark:/53696/0366j31q");

        expect(items[3].id).to.eq("c7746e9b-3fb8-477f-be54-6b4bdc84a923");
        expect(items[3].custom_key).to.eq("ark:/53696/0413w83z");

        expect(items[4].id).to.eq("493f1e39-2099-4c74-b889-1cefd5f84f7d");
        expect(items[4].custom_key).to.eq("ark:/53696/0448df2p");
      });
    });
  });
});
