import apiRequest from './api/apiRequest';

const fetchDomains = async (queryParams = {}) => {
  const response = await apiRequest({
    url: '/api/v1/domains',
    method: 'get',
    successResponse: 'domains',
    queryParams,
  });

  if (!response.error) {
    return {
      domains: response.domains.map((domain) => {
        return {
          id: domain.id,
          uri: domain.uri,
          name: domain.pref_label,
          definition: domain.definition,
          spine: domain['spine?'],
          spineId: domain.spine?.id,
        };
      }),
    };
  }
  return response;
};

export default fetchDomains;
