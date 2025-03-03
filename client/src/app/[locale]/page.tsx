// import qs from "qs";
// import { notFound } from "next/navigation";

// import { fetchAPI } from "@/lib/fetch-api";
// import { getStrapiURL } from "@/lib/utils";
// import { blockRenderer } from "@/lib/block-renderer";
// import { Block } from "@/lib/types";

// const homePageQuery = qs.stringify({
//   populate: {
//     blocks: {
//       on: {
//         "blocks.hero": {
//           populate: {
//             image: {
//               fields: ["url", "alternativeText"],
//             },
//             links: true,
//           },
//         },
//         "blocks.card-carousel": {
//           populate: {
//             cards: true,
//           },
//         },
//         "blocks.heading": true,
//       },
//     },
//   },
// });

// async function loader() {
//   // const authToken = process.env.STRAPI_API_TOKEN;
//   const BASE_URL = getStrapiURL();
//   const path = "/api/home-page";
//   const url = new URL(path, BASE_URL);

//   url.search = homePageQuery;

//   const data = await fetchAPI(url.href, {
//     method: "GET",
//   });

//   if (!data?.data) notFound();

//   const blocks = data?.data?.blocks || [];
//   return { blocks };
// }

export default async function HomeRoute() {
  // const data = await loader();
  // const blocks = data.blocks;
  return (
    <>
      <div className="display">Display</div>
      <div className="heading-1">Heading 1</div>
      <div className="heading-2">Heading 2</div>
      <div className="heading-3">Heading 3</div>
      <div className="heading-4">Heading 4</div>
      <div className="heading-5">Heading 5</div>
      <div className="title">Title 1</div>
      <div className="paragraph-1">Paragraph 1</div>
      <div className="paragraph-2">Paragraph 2</div>
      <div className="paragraph-3">Paragraph 3</div>
      <div className="paragraph-4">Paragraph 4</div>
      <div className="paragraph-5">Paragraph 5</div>
      <div className="paragraph-6">Paragraph 6</div>
      <div className="navigation">Navigation Text</div>
      <div className="button-1">Button 1</div>
      <div className="button-2">Button 2</div>
    </>
    // <div>
    //   {blocks.map((block: Block, index: number) => {
    //     return blockRenderer(block, index);
    //   })}
    // </div>
  );
}
