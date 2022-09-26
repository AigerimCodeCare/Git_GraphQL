import axios, { AxiosResponse } from 'axios';
import Repository, { RepositoryResponse } from './GithubRepo';

const  ACCESS_TOKEN  = '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';

const GRAPHQL_URL = 'https://api.github.com/graphql';

const REPO_ONE_QUERY = `query User($login: String!, $name:String!) {
  user(login: $login, name: $name) {
      repository(orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, first: 100) {
          totalCount
          nodes {
            name
            owner {
            login
            }
            description
        }
    }
}`;

type GraphQLRepositoriesResponse = {
  data : {
    user : {
      repositories : RepositoryResponse
    }
  }
};


export default async function getRepository(login: string, name:string) : Promise<Repository> {
  const config = {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN === undefined ? '' : ACCESS_TOKEN}`,
    },
  };
  const response : AxiosResponse<GraphQLRepositoriesResponse> = await axios.post(GRAPHQL_URL,
    { query: REPO_ONE_QUERY, variables: { login, name } }, config);
  return new Repository(response?.data?.data?.user.repositories);
}
