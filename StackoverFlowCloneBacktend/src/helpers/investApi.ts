import axios from 'axios';
import { API_BASE_URL } from '../constants';

export const fetchTagDesc = async (tags: string[]): Promise<any> => {
  const url = `${API_BASE_URL}/tags/${tags}/wikis?site=stackoverflow`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    json: true,
  };

  const response = await axios.get(url, options)
    .then((json) => json.data.items)
    .catch((err) => {
      console.log('error:', err);
    });

  return response;
};

/**
 * @description - This function prepares an array of objects to be inserted into tags schema
 * @param {tags} - array of strings
 * @param {response} - array of objects
 * @returns {resp} - array of objects
 */
export const prepareTags = (tags: string[], response: any[]): any[] => {
  const resp = [];

  for (const tag of tags) {
    const foundTag = response.length && response.find((t: any) => t.tag_name === tag.toLowerCase());
    const obj = {
      tagname: tag,
      description: '',
    };

    if (!foundTag) {
      obj.description = `A ${tag} is a keyword or term assigned to a piece of information`;
    } else {
      obj.description = foundTag.excerpt;
    }
    resp.push(obj);
  }
  return resp;
};
