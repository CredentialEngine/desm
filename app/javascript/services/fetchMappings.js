import apiRequest from './api/apiRequest';

const fetchMappings = async (filter) => {
  return await apiRequest({
    url: '/api/v1/mappings' + (filter ? '?filter=' + filter : ''),
    method: 'get',
    successResponse: 'mappings',
  });
};

export default fetchMappings;
