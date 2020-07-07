/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchObjects = /* GraphQL */ `
  query SearchObjects(
    $allFields: String
    $sort: SearchableObjectSortInput
    $filter: SearchableObjectFilterInput
    $limit: Int
    $nextToken: String
    $category: String
  ) {
    searchObjects(
      allFields: $allFields
      sort: $sort
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      category: $category
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
        thumbnail_path
        parent_collection
        create_date
        modified_date
        ... on Collection {
          subject
          collection_category
          archives {
            nextToken
          }
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
          }
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
        archives {
          nextToken
        }
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
        }
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
          create_date
          modified_date
        }
        nextToken
      }
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
        archives {
          nextToken
        }
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
        }
      }
      nextToken
      total
    }
  }
`;
