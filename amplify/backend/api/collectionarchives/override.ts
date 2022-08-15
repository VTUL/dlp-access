import { AmplifyApiGraphQlResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
  resources.opensearch.OpenSearchDomain.elasticsearchClusterConfig = {
    ...resources.opensearch.OpenSearchDomain.elasticsearchClusterConfig,
    instanceCount: 3
  }
  resources.opensearch.OpenSearchDomain.ebsOptions = {
    ebsEnabled: true,
    volumeSize: 20
  }
}
