/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      bibliographic_citation
      rights_holder
      custom_key
      collection_category
      visibility
      thumbnail_path
      parent_collection
      create_date
      modified_date
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
          contributor
          custom_key
          parent_collection
          item_category
          visibility
          thumbnail_path
          manifest_url
          create_date
          modified_date
        }
        nextToken
      }
    }
  }
`;

export const getCollectionByCustomKey = `query searchCollection($customKey: String) {
  searchCollections(
    filter: {
      custom_key: {
          eq: $customKey
      }
    },
    sort: {
      field: identifier, 
      direction: asc
    }
  ){
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
      bibliographic_citation
      rights_holder
      custom_key
      collection_category
      visibility
      thumbnail_path
      parent_collection
      create_date
      modified_date
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
          contributor
          custom_key
          parent_collection
          item_category
          visibility
          thumbnail_path
          manifest_url
          create_date
          modified_date
        }
      }
    }
    nextToken
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
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        archives {
          nextToken
        }
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
      contributor
      custom_key
      parent_collection
      item_category
      visibility
      thumbnail_path
      manifest_url
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
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        archives {
          nextToken
        }
      }
    }
  }
`;

export const getArchiveByCustomKey = `query searchArchive($customKey: String) {
  searchArchives(filter: {
      custom_key: {
          eq: $customKey
      }
  })
  {
    items {
      id
      title
      description
      identifier
      belongs_to
      bibliographic_citation
      contributor
      creator
      custom_key
      format
      language
      location
      medium
      resource_type
      related_url
      rights_holder
      rights_statement
      source
      circa
      start_date
      end_date
      tags
      parent_collection
      manifest_url
    }
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
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
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
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
        }
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
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        archives {
          nextToken
        }
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
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
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
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
        }
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
        bibliographic_citation
        rights_holder
        custom_key
        collection_category
        visibility
        thumbnail_path
        parent_collection
        create_date
        modified_date
        archives {
          nextToken
        }
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
        contributor
        custom_key
        parent_collection
        item_category
        visibility
        thumbnail_path
        manifest_url
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
          bibliographic_citation
          rights_holder
          custom_key
          collection_category
          visibility
          thumbnail_path
          parent_collection
          create_date
          modified_date
        }
      }
      nextToken
      total
    }
  }
`;
