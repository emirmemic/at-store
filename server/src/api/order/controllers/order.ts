/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::order.order");
// import { Context } from "koa";

// interface IUser {
//   id: number;
//   [key: string]: any;
// }

// export default {
//   /**
//    * Fetch all orders for the currently logged in user.
//    */
//   async find(ctx: Context): Promise<void> {
//     const user: IUser | undefined = ctx.state.user;
//     if (!user) {
//       ctx.unauthorized("You must be logged in to view your orders");
//       return;
//     }

//     try {
//       // Fetch orders filtered by the current user id.
//       const orders = await strapi.entityService.findMany("api::order.order", {
//         filters: {
//           user: {
//             id: user.id,
//           },
//         },
//         // Populate any relations as needed.
//         populate: ["products"],
//       });

//       ctx.body = orders;
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       ctx.throw(500, "Error retrieving orders");
//     }
//   },

//   /**
//    * Fetch a single order for the currently logged in user.
//    */
//   async findOne(ctx: Context): Promise<void> {
//     const { id } = ctx.params;
//     const user: IUser | undefined = ctx.state.user;
//     if (!user) {
//       ctx.unauthorized("You must be logged in to view your orders");
//       return;
//     }

//     try {
//       // Fetch the specific order (with any specified relations)
//       const orders = await strapi.entityService.findMany("api::order.order", {
//         filters: {
//           id: id,
//           user: {
//             id: user.id,
//           },
//         },
//         populate: ["products", "user"],
//       });

//       if (!orders || orders.user.id !== user.id) {
//         ctx.unauthorized("You are not allowed to access this order");
//         return;
//       }

//       ctx.body = orders;
//     } catch (error) {
//       console.error("Error fetching the order:", error);
//       ctx.throw(500, "Error retrieving the order");
//     }
//   },
// };
