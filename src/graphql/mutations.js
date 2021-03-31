/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollection = /* GraphQL */ `
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      collection_category
      collectionmap_id
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      heirarchy_path
      id
      identifier
      language
      location
      modified_date
      ownerinfo
      parent_collection
      provenance
      related_url
      rights_holder
      rights_statement
      source
      start_date
      subject
      thumbnail_path
      title
      visibility
      explicit
      collectionmap {
        collection_id
        create_date
        id
        map_object
        modified_date
        collection {
          belongs_to
          bibliographic_citation
          circa
          collection_category
          collectionmap_id
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          heirarchy_path
          id
          identifier
          language
          location
          modified_date
          ownerinfo
          parent_collection
          provenance
          related_url
          rights_holder
          rights_statement
          source
          start_date
          subject
          thumbnail_path
          title
          visibility
          explicit
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      archives {
        items {
          belongs_to
          bibliographic_citation
          circa
          contributor
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          extent
          format
          heirarchy_path
          id
          identifier
          item_category
          language
          location
          manifest_file_characterization
          manifest_url
          medium
          modified_date
          parent_collection
          provenance
          reference
          related_url
          repository
          resource_type
          rights_holder
          rights_statement
          source
          start_date
          subject
          tags
          thumbnail_path
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection($input: UpdateCollectionInput!) {
    updateCollection(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      collection_category
      collectionmap_id
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      heirarchy_path
      id
      identifier
      language
      location
      modified_date
      ownerinfo
      parent_collection
      provenance
      related_url
      rights_holder
      rights_statement
      source
      start_date
      subject
      thumbnail_path
      title
      visibility
      explicit
      collectionmap {
        collection_id
        create_date
        id
        map_object
        modified_date
        collection {
          belongs_to
          bibliographic_citation
          circa
          collection_category
          collectionmap_id
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          heirarchy_path
          id
          identifier
          language
          location
          modified_date
          ownerinfo
          parent_collection
          provenance
          related_url
          rights_holder
          rights_statement
          source
          start_date
          subject
          thumbnail_path
          title
          visibility
          explicit
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      archives {
        items {
          belongs_to
          bibliographic_citation
          circa
          contributor
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          extent
          format
          heirarchy_path
          id
          identifier
          item_category
          language
          location
          manifest_file_characterization
          manifest_url
          medium
          modified_date
          parent_collection
          provenance
          reference
          related_url
          repository
          resource_type
          rights_holder
          rights_statement
          source
          start_date
          subject
          tags
          thumbnail_path
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection($input: DeleteCollectionInput!) {
    deleteCollection(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      collection_category
      collectionmap_id
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      heirarchy_path
      id
      identifier
      language
      location
      modified_date
      ownerinfo
      parent_collection
      provenance
      related_url
      rights_holder
      rights_statement
      source
      start_date
      subject
      thumbnail_path
      title
      visibility
      explicit
      collectionmap {
        collection_id
        create_date
        id
        map_object
        modified_date
        collection {
          belongs_to
          bibliographic_citation
          circa
          collection_category
          collectionmap_id
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          heirarchy_path
          id
          identifier
          language
          location
          modified_date
          ownerinfo
          parent_collection
          provenance
          related_url
          rights_holder
          rights_statement
          source
          start_date
          subject
          thumbnail_path
          title
          visibility
          explicit
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      archives {
        items {
          belongs_to
          bibliographic_citation
          circa
          contributor
          create_date
          creator
          custom_key
          description
          display_date
          end_date
          extent
          format
          heirarchy_path
          id
          identifier
          item_category
          language
          location
          manifest_file_characterization
          manifest_url
          medium
          modified_date
          parent_collection
          provenance
          reference
          related_url
          repository
          resource_type
          rights_holder
          rights_statement
          source
          start_date
          subject
          tags
          thumbnail_path
          title
          visibility
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createCollectionmap = /* GraphQL */ `
  mutation CreateCollectionmap($input: CreateCollectionmapInput!) {
    createCollectionmap(input: $input) {
      collection_id
      create_date
      id
      map_object
      modified_date
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCollectionmap = /* GraphQL */ `
  mutation UpdateCollectionmap($input: UpdateCollectionmapInput!) {
    updateCollectionmap(input: $input) {
      collection_id
      create_date
      id
      map_object
      modified_date
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCollectionmap = /* GraphQL */ `
  mutation DeleteCollectionmap($input: DeleteCollectionmapInput!) {
    deleteCollectionmap(input: $input) {
      collection_id
      create_date
      id
      map_object
      modified_date
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createArchive = /* GraphQL */ `
  mutation CreateArchive($input: CreateArchiveInput!) {
    createArchive(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      contributor
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      extent
      format
      heirarchy_path
      id
      identifier
      item_category
      language
      location
      manifest_file_characterization
      manifest_url
      medium
      modified_date
      parent_collection
      provenance
      reference
      related_url
      repository
      resource_type
      rights_holder
      rights_statement
      source
      start_date
      subject
      tags
      thumbnail_path
      title
      visibility
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateArchive = /* GraphQL */ `
  mutation UpdateArchive($input: UpdateArchiveInput!) {
    updateArchive(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      contributor
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      extent
      format
      heirarchy_path
      id
      identifier
      item_category
      language
      location
      manifest_file_characterization
      manifest_url
      medium
      modified_date
      parent_collection
      provenance
      reference
      related_url
      repository
      resource_type
      rights_holder
      rights_statement
      source
      start_date
      subject
      tags
      thumbnail_path
      title
      visibility
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteArchive = /* GraphQL */ `
  mutation DeleteArchive($input: DeleteArchiveInput!) {
    deleteArchive(input: $input) {
      belongs_to
      bibliographic_citation
      circa
      contributor
      create_date
      creator
      custom_key
      description
      display_date
      end_date
      extent
      format
      heirarchy_path
      id
      identifier
      item_category
      language
      location
      manifest_file_characterization
      manifest_url
      medium
      modified_date
      parent_collection
      provenance
      reference
      related_url
      repository
      resource_type
      rights_holder
      rights_statement
      source
      start_date
      subject
      tags
      thumbnail_path
      title
      visibility
      collection {
        belongs_to
        bibliographic_citation
        circa
        collection_category
        collectionmap_id
        create_date
        creator
        custom_key
        description
        display_date
        end_date
        heirarchy_path
        id
        identifier
        language
        location
        modified_date
        ownerinfo
        parent_collection
        provenance
        related_url
        rights_holder
        rights_statement
        source
        start_date
        subject
        thumbnail_path
        title
        visibility
        explicit
        collectionmap {
          collection_id
          create_date
          id
          map_object
          modified_date
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        archives {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSite = /* GraphQL */ `
  mutation CreateSite($input: CreateSiteInput!) {
    createSite(input: $input) {
      analyticsID
      assetBasePath
      browseCollections
      contact
      displayedAttributes
      groups
      homePage
      id
      lang
      miradorOptions
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
export const updateSite = /* GraphQL */ `
  mutation UpdateSite($input: UpdateSiteInput!) {
    updateSite(input: $input) {
      analyticsID
      assetBasePath
      browseCollections
      contact
      displayedAttributes
      groups
      homePage
      id
      lang
      miradorOptions
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
export const deleteSite = /* GraphQL */ `
  mutation DeleteSite($input: DeleteSiteInput!) {
    deleteSite(input: $input) {
      analyticsID
      assetBasePath
      browseCollections
      contact
      displayedAttributes
      groups
      homePage
      id
      lang
      miradorOptions
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
export const createHistory = /* GraphQL */ `
  mutation CreateHistory($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      event
      groups
      id
      siteID
      userEmail
      createdAt
      updatedAt
    }
  }
`;
export const updateHistory = /* GraphQL */ `
  mutation UpdateHistory($input: UpdateHistoryInput!) {
    updateHistory(input: $input) {
      event
      groups
      id
      siteID
      userEmail
      createdAt
      updatedAt
    }
  }
`;
export const deleteHistory = /* GraphQL */ `
  mutation DeleteHistory($input: DeleteHistoryInput!) {
    deleteHistory(input: $input) {
      event
      groups
      id
      siteID
      userEmail
      createdAt
      updatedAt
    }
  }
`;
