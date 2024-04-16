/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment Video on FileField {\n  video {\n    streamingUrl\n    mp4High: mp4Url(res: high)\n    mp4Med: mp4Url(res: medium)\n    mp4Low: mp4Url(res: low)\n    duration\n    framerate\n    thumbJpg: thumbnailUrl(format: jpg)\n    thumbPng: thumbnailUrl(format: png)\n    thumbGif: thumbnailUrl(format: gif)\n  }\n}\n\nfragment FeaturedMedia on FileField {\n  ...Video\n  ...Image\n}\n\nfragment Partner on PartnershipRecord {\n  client\n  featuredMedia {\n    ...FeaturedMedia\n  }\n  service\n  imageAlignment\n  yearStarted\n}\n\nquery AboutPage {\n  aboutPage {\n    cardSection {\n      title\n      subtitle\n      textContent\n    }\n    longStandingPartnerships {\n      ...Partner\n    }\n  }\n}": types.VideoFragmentDoc,
    "query ApproachPage {\n  approachPage {\n    postProjectCards {\n      title\n      subtitle\n      textContent\n    }\n  }\n}": types.ApproachPageDocument,
    "query HomePage {\n  homePage {\n    headline\n    headerLogo {\n      url\n    }\n  }\n}": types.HomePageDocument,
    "fragment Person on PersonRecord {\n  id\n  name\n  jobTitle\n  headshot {\n    ...Image\n    ...Video\n  }\n  inOfficeVideo {\n    ...Image\n    ...Video\n  }\n  outOfOfficeVideo {\n    ...Image\n    ...Video\n  }\n}\n\nquery GetAllPeople {\n  allPeople {\n    ...Person\n  }\n}": types.PersonFragmentDoc,
    "query GetProject($slug: String) {\n  project(filter: {slug: {eq: $slug}}) {\n    ...Project\n  }\n}\n\nquery GetLatestProject {\n  allProjects(first: \"1\", orderBy: _createdAt_DESC) {\n    ...ProjectThumb\n  }\n}\n\nfragment ProjectOnWorkPage on ProjectRecord {\n  ...ProjectThumb\n  category\n  client\n  slug\n  year\n  service\n  featuredImage {\n    ...Image\n  }\n  featuredVideo\n  alignment\n  themeColour {\n    hex\n  }\n}\n\nfragment ProjectThumb on ProjectRecord {\n  projectName\n  projectUrl\n  category\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n}\n\nfragment Image on FileField {\n  responsiveImage {\n    alt\n    src\n    sizes\n    base64\n    height\n    title\n    width\n  }\n}\n\nfragment Project on ProjectRecord {\n  category\n  client\n  id\n  slug\n  platform\n  projectName\n  projectUrl\n  year\n  service\n  alignment\n  themeColour {\n    hex\n  }\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n  flexibleContent {\n    ...DoubleImage\n    ...TextTwoColumn\n    ...TextSingle\n    ...SingleImage\n    ...Quote\n  }\n}\n\nfragment DoubleImage on DoubleImageBlockRecord {\n  id\n  imageRight {\n    alt\n    ...Video\n    ...Image\n  }\n  videoRight\n  heightRight\n  imageLeft {\n    alt\n    ...Video\n    ...Image\n    url\n  }\n  videoLeft\n  heightLeft\n}\n\nfragment TextTwoColumn on TextTwoColumnBlockRecord {\n  id\n  textRightColumn {\n    blocks\n    links\n    value\n  }\n  textLeftColumn {\n    blocks\n    links\n    value\n  }\n}\n\nfragment TextSingle on TextSingleBlockRecord {\n  id\n  textBlockAlignment\n  textSingle {\n    blocks\n    links\n    value\n  }\n}\n\nfragment SingleImage on SingleImageBlockRecord {\n  id\n  fullwidth\n  image {\n    url\n    ...Video\n    ...Image\n  }\n  video\n}\n\nfragment Quote on QuoteBlockRecord {\n  id\n  quote {\n    value\n    links\n    blocks\n  }\n  quotee\n}": types.GetProjectDocument,
    "query getAllProjects {\n  allProjects {\n    ...ProjectOnWorkPage\n  }\n}": types.GetAllProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Video on FileField {\n  video {\n    streamingUrl\n    mp4High: mp4Url(res: high)\n    mp4Med: mp4Url(res: medium)\n    mp4Low: mp4Url(res: low)\n    duration\n    framerate\n    thumbJpg: thumbnailUrl(format: jpg)\n    thumbPng: thumbnailUrl(format: png)\n    thumbGif: thumbnailUrl(format: gif)\n  }\n}\n\nfragment FeaturedMedia on FileField {\n  ...Video\n  ...Image\n}\n\nfragment Partner on PartnershipRecord {\n  client\n  featuredMedia {\n    ...FeaturedMedia\n  }\n  service\n  imageAlignment\n  yearStarted\n}\n\nquery AboutPage {\n  aboutPage {\n    cardSection {\n      title\n      subtitle\n      textContent\n    }\n    longStandingPartnerships {\n      ...Partner\n    }\n  }\n}"): (typeof documents)["fragment Video on FileField {\n  video {\n    streamingUrl\n    mp4High: mp4Url(res: high)\n    mp4Med: mp4Url(res: medium)\n    mp4Low: mp4Url(res: low)\n    duration\n    framerate\n    thumbJpg: thumbnailUrl(format: jpg)\n    thumbPng: thumbnailUrl(format: png)\n    thumbGif: thumbnailUrl(format: gif)\n  }\n}\n\nfragment FeaturedMedia on FileField {\n  ...Video\n  ...Image\n}\n\nfragment Partner on PartnershipRecord {\n  client\n  featuredMedia {\n    ...FeaturedMedia\n  }\n  service\n  imageAlignment\n  yearStarted\n}\n\nquery AboutPage {\n  aboutPage {\n    cardSection {\n      title\n      subtitle\n      textContent\n    }\n    longStandingPartnerships {\n      ...Partner\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ApproachPage {\n  approachPage {\n    postProjectCards {\n      title\n      subtitle\n      textContent\n    }\n  }\n}"): (typeof documents)["query ApproachPage {\n  approachPage {\n    postProjectCards {\n      title\n      subtitle\n      textContent\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HomePage {\n  homePage {\n    headline\n    headerLogo {\n      url\n    }\n  }\n}"): (typeof documents)["query HomePage {\n  homePage {\n    headline\n    headerLogo {\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Person on PersonRecord {\n  id\n  name\n  jobTitle\n  headshot {\n    ...Image\n    ...Video\n  }\n  inOfficeVideo {\n    ...Image\n    ...Video\n  }\n  outOfOfficeVideo {\n    ...Image\n    ...Video\n  }\n}\n\nquery GetAllPeople {\n  allPeople {\n    ...Person\n  }\n}"): (typeof documents)["fragment Person on PersonRecord {\n  id\n  name\n  jobTitle\n  headshot {\n    ...Image\n    ...Video\n  }\n  inOfficeVideo {\n    ...Image\n    ...Video\n  }\n  outOfOfficeVideo {\n    ...Image\n    ...Video\n  }\n}\n\nquery GetAllPeople {\n  allPeople {\n    ...Person\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProject($slug: String) {\n  project(filter: {slug: {eq: $slug}}) {\n    ...Project\n  }\n}\n\nquery GetLatestProject {\n  allProjects(first: \"1\", orderBy: _createdAt_DESC) {\n    ...ProjectThumb\n  }\n}\n\nfragment ProjectOnWorkPage on ProjectRecord {\n  ...ProjectThumb\n  category\n  client\n  slug\n  year\n  service\n  featuredImage {\n    ...Image\n  }\n  featuredVideo\n  alignment\n  themeColour {\n    hex\n  }\n}\n\nfragment ProjectThumb on ProjectRecord {\n  projectName\n  projectUrl\n  category\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n}\n\nfragment Image on FileField {\n  responsiveImage {\n    alt\n    src\n    sizes\n    base64\n    height\n    title\n    width\n  }\n}\n\nfragment Project on ProjectRecord {\n  category\n  client\n  id\n  slug\n  platform\n  projectName\n  projectUrl\n  year\n  service\n  alignment\n  themeColour {\n    hex\n  }\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n  flexibleContent {\n    ...DoubleImage\n    ...TextTwoColumn\n    ...TextSingle\n    ...SingleImage\n    ...Quote\n  }\n}\n\nfragment DoubleImage on DoubleImageBlockRecord {\n  id\n  imageRight {\n    alt\n    ...Video\n    ...Image\n  }\n  videoRight\n  heightRight\n  imageLeft {\n    alt\n    ...Video\n    ...Image\n    url\n  }\n  videoLeft\n  heightLeft\n}\n\nfragment TextTwoColumn on TextTwoColumnBlockRecord {\n  id\n  textRightColumn {\n    blocks\n    links\n    value\n  }\n  textLeftColumn {\n    blocks\n    links\n    value\n  }\n}\n\nfragment TextSingle on TextSingleBlockRecord {\n  id\n  textBlockAlignment\n  textSingle {\n    blocks\n    links\n    value\n  }\n}\n\nfragment SingleImage on SingleImageBlockRecord {\n  id\n  fullwidth\n  image {\n    url\n    ...Video\n    ...Image\n  }\n  video\n}\n\nfragment Quote on QuoteBlockRecord {\n  id\n  quote {\n    value\n    links\n    blocks\n  }\n  quotee\n}"): (typeof documents)["query GetProject($slug: String) {\n  project(filter: {slug: {eq: $slug}}) {\n    ...Project\n  }\n}\n\nquery GetLatestProject {\n  allProjects(first: \"1\", orderBy: _createdAt_DESC) {\n    ...ProjectThumb\n  }\n}\n\nfragment ProjectOnWorkPage on ProjectRecord {\n  ...ProjectThumb\n  category\n  client\n  slug\n  year\n  service\n  featuredImage {\n    ...Image\n  }\n  featuredVideo\n  alignment\n  themeColour {\n    hex\n  }\n}\n\nfragment ProjectThumb on ProjectRecord {\n  projectName\n  projectUrl\n  category\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n}\n\nfragment Image on FileField {\n  responsiveImage {\n    alt\n    src\n    sizes\n    base64\n    height\n    title\n    width\n  }\n}\n\nfragment Project on ProjectRecord {\n  category\n  client\n  id\n  slug\n  platform\n  projectName\n  projectUrl\n  year\n  service\n  alignment\n  themeColour {\n    hex\n  }\n  featuredImage {\n    ...Image\n    ...Video\n  }\n  featuredVideo\n  flexibleContent {\n    ...DoubleImage\n    ...TextTwoColumn\n    ...TextSingle\n    ...SingleImage\n    ...Quote\n  }\n}\n\nfragment DoubleImage on DoubleImageBlockRecord {\n  id\n  imageRight {\n    alt\n    ...Video\n    ...Image\n  }\n  videoRight\n  heightRight\n  imageLeft {\n    alt\n    ...Video\n    ...Image\n    url\n  }\n  videoLeft\n  heightLeft\n}\n\nfragment TextTwoColumn on TextTwoColumnBlockRecord {\n  id\n  textRightColumn {\n    blocks\n    links\n    value\n  }\n  textLeftColumn {\n    blocks\n    links\n    value\n  }\n}\n\nfragment TextSingle on TextSingleBlockRecord {\n  id\n  textBlockAlignment\n  textSingle {\n    blocks\n    links\n    value\n  }\n}\n\nfragment SingleImage on SingleImageBlockRecord {\n  id\n  fullwidth\n  image {\n    url\n    ...Video\n    ...Image\n  }\n  video\n}\n\nfragment Quote on QuoteBlockRecord {\n  id\n  quote {\n    value\n    links\n    blocks\n  }\n  quotee\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAllProjects {\n  allProjects {\n    ...ProjectOnWorkPage\n  }\n}"): (typeof documents)["query getAllProjects {\n  allProjects {\n    ...ProjectOnWorkPage\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;