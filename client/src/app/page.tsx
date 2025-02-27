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
      <div className="display text-blue-dark">Display</div>
      <div className="heading-1 text-blue-dark">Heading 1</div>
      <div className="heading-2 text-blue-dark">Heading 2</div>
      <div className="heading-3 text-blue-dark">Heading 3</div>
      <div className="heading-3-regular text-blue-dark">Heading 3 Regular</div>
      <div className="heading-4 text-blue-dark">Heading 4</div>
      <div className="paragraph-1 text-blue-dark">Paragraph 1</div>
      <div className="paragraph-2 text-blue-dark">Paragraph 2</div>
      <div className="paragraph-3 text-blue-dark">Paragraph 3</div>
      <div className="paragraph-4 text-blue-dark">Paragraph 4</div>
      <div className="paragraph-5 text-blue-dark">Paragraph 5</div>
      <div className="paragraph-6 text-blue-dark">Paragraph 6</div>
      <div className="button-1 text-blue-dark">Button 1</div>
      <div className="button-2 text-blue-dark">Button 2</div>
    </>
    // <div>
    //   {blocks.map((block: Block, index: number) => {
    //     return blockRenderer(block, index);
    //   })}
    // </div>
  );
}
