/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = `query GetCollection($id: ID!) {
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
export const listCollections = `query ListCollections(
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
export const getArchive = `query GetArchive($id: ID!) {
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
export const listArchives = `query ListArchives(
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
export const collectionByIdentifier = `query CollectionByIdentifier(
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
    total
    nextToken
  }
}
`;
export const archiveByIdentifier = `query ArchiveByIdentifier(
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
export const searchCollections = `query SearchCollections(
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
    total
    nextToken
  }
}
`;
export const searchArchives = `query SearchArchives(
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
  }
}
`;
