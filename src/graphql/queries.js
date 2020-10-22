/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchObjects = /* GraphQL */ `
  query SearchObjects(
    $allFields: String
    $sort: SearchableObjectSortInput
    $filter: SearchableObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    searchObjects(
      allFields: $allFields
      sort: $sort
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        visibility
        heirarchy_path
        thumbnail_path
        parent_collection
        create_date
        modified_date
        ... on Collection {
          collection_category
          collectionmap_id
          collectionmap {
            id
            collection_id
            map_object
            create_date
            modified_date
            createdAt
            updatedAt
          }
          archives {
            nextToken
          }
          createdAt
          updatedAt
        }
        ... on Archive {
          tags
          resource_type
          medium
          format
          repository
          reference
          contributor
          item_category
          manifest_url
          collection {
            id
            title
            identifier
            description
            creator
            source
            circa
            start_date
            end_date
            subject
            location
            rights_statement
            language
            related_url
            provenance
            belongs_to
            bibliographic_citation
            rights_holder
            custom_key
            collection_category
            visibility
            thumbnail_path
            parent_collection
            create_date
            modified_date
            heirarchy_path
            collectionmap_id
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const fulltextCollections = /* GraphQL */ `
  query FulltextCollections(
    $allFields: String
    $filter: SearchableCollectionFilterInput
    $sort: SearchableCollectionSortInput
    $limit: Int
    $nextToken: String
  ) {
    fulltextCollections(
      allFields: $allFields
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const fulltextArchives = /* GraphQL */ `
  query FulltextArchives(
    $allFields: String
    $filter: SearchableArchiveFilterInput
    $sort: SearchableArchiveSortInput
    $limit: Int
    $nextToken: String
  ) {
    fulltextArchives(
      allFields: $allFields
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        tags
        creator
        source
        circa
        start_date
        end_date
        subject
        rights_statement
        language
        resource_type
        belongs_to
        location
        medium
        bibliographic_citation
        rights_holder
        format
        related_url
        provenance
        repository
        reference
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
        heirarchy_path
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      title
      identifier
      description
      creator
      source
      circa
      start_date
      end_date
      subject
      location
      rights_statement
      language
      related_url
      provenance
      belongs_to
      bibliographic_citation
      rights_holder
      custom_key
      collection_category
      visibility
      thumbnail_path
      parent_collection
      create_date
      modified_date
      heirarchy_path
      collectionmap_id
      collectionmap {
        id
        collection_id
        map_object
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      archives {
        items {
          id
          title
          identifier
          description
          tags
          creator
          source
          circa
          start_date
          end_date
          subject
          rights_statement
          language
          resource_type
          belongs_to
          location
          medium
          bibliographic_citation
          rights_holder
          format
          related_url
          provenance
          repository
          reference
          contributor
          custom_key
          parent_collection
          item_category
          visibility
          thumbnail_path
          manifest_url
          heirarchy_path
          create_date
          modified_date
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCollectionmap = /* GraphQL */ `
  query GetCollectionmap($id: ID!) {
    getCollectionmap(id: $id) {
      id
      collection_id
      map_object
      create_date
      modified_date
      collection {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCollectionmaps = /* GraphQL */ `
  query ListCollectionmaps(
    $filter: ModelCollectionmapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionmaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        collection_id
        map_object
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArchive = /* GraphQL */ `
  query GetArchive($id: ID!) {
    getArchive(id: $id) {
      id
      title
      identifier
      description
      tags
      creator
      source
      circa
      start_date
      end_date
      subject
      rights_statement
      language
      resource_type
      belongs_to
      location
      medium
      bibliographic_citation
      rights_holder
      format
      related_url
      provenance
      repository
      reference
      contributor
      custom_key
      parent_collection
      item_category
      visibility
      thumbnail_path
      manifest_url
      heirarchy_path
      create_date
      modified_date
      collection {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listArchives = /* GraphQL */ `
  query ListArchives(
    $filter: ModelArchiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArchives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        identifier
        description
        tags
        creator
        source
        circa
        start_date
        end_date
        subject
        rights_statement
        language
        resource_type
        belongs_to
        location
        medium
        bibliographic_citation
        rights_holder
        format
        related_url
        provenance
        repository
        reference
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
        heirarchy_path
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const collectionByIdentifier = /* GraphQL */ `
  query CollectionByIdentifier(
    $identifier: String
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    collectionByIdentifier(
      identifier: $identifier
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const archiveByIdentifier = /* GraphQL */ `
  query ArchiveByIdentifier(
    $identifier: String
    $sortDirection: ModelSortDirection
    $filter: ModelArchiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    archiveByIdentifier(
      identifier: $identifier
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        tags
        creator
        source
        circa
        start_date
        end_date
        subject
        rights_statement
        language
        resource_type
        belongs_to
        location
        medium
        bibliographic_citation
        rights_holder
        format
        related_url
        provenance
        repository
        reference
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
        heirarchy_path
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchCollections = /* GraphQL */ `
  query SearchCollections(
    $filter: SearchableCollectionFilterInput
    $sort: SearchableCollectionSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCollections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        creator
        source
        circa
        start_date
        end_date
        subject
        location
        rights_statement
        language
        related_url
        provenance
        belongs_to
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        heirarchy_path
        collectionmap_id
        collectionmap {
          id
          collection_id
          map_object
          create_date
          modified_date
          createdAt
          updatedAt
        }
        archives {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchCollectionmaps = /* GraphQL */ `
  query SearchCollectionmaps(
    $filter: SearchableCollectionmapFilterInput
    $sort: SearchableCollectionmapSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCollectionmaps(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collection_id
        map_object
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchArchives = /* GraphQL */ `
  query SearchArchives(
    $filter: SearchableArchiveFilterInput
    $sort: SearchableArchiveSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchArchives(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        identifier
        description
        tags
        creator
        source
        circa
        start_date
        end_date
        subject
        rights_statement
        language
        resource_type
        belongs_to
        location
        medium
        bibliographic_citation
        rights_holder
        format
        related_url
        provenance
        repository
        reference
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
        heirarchy_path
        create_date
        modified_date
        collection {
          id
          title
          identifier
          description
          creator
          source
          circa
          start_date
          end_date
          subject
          location
          rights_statement
          language
          related_url
          provenance
          belongs_to
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
          heirarchy_path
          collectionmap_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      analyticsID
      assetBasePath
      browseCollections
      contact
      displayedAttributes
      homePage
      searchPage
      siteColor
      siteId
      siteName
      sitePages
      siteTitle
      createdAt
      updatedAt
    }
  }
`;
export const listSites = /* GraphQL */ `
  query ListSites(
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        analyticsID
        assetBasePath
        browseCollections
        contact
        displayedAttributes
        homePage
        searchPage
        siteColor
        siteId
        siteName
        sitePages
        siteTitle
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const siteBySiteId = /* GraphQL */ `
  query SiteBySiteId(
    $siteId: String
    $sortDirection: ModelSortDirection
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    siteBySiteId(
      siteId: $siteId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        analyticsID
        assetBasePath
        browseCollections
        contact
        displayedAttributes
        homePage
        searchPage
        siteColor
        siteId
        siteName
        sitePages
        siteTitle
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      userEmail
      siteID
      event
      createdAt
      updatedAt
    }
  }
`;
export const listHistorys = /* GraphQL */ `
  query ListHistorys(
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userEmail
        siteID
        event
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
