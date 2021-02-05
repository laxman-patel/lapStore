import { GraphQLClient } from "graphql-request";

const endpoint =
  "https://api-eu-central-1.graphcms.com/v2/ckkj5ae29l3ir01uv0xxg4sy0/master";

const graphCms = new GraphQLClient(endpoint);

export default graphCms;
