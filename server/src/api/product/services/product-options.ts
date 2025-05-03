
import type {
  ApiColorColor,
  ApiMemoryMemory,
  ApiModelModel,
} from '../../../../types/generated/contentTypes';

type Option<T> = T & { defaultProduct: { id: number; productLink: string; name?: string } };
type Product = {
  id: number;
  name: string;
  productLink: string;
  keyboard?: string | null;
  braceletSize?: string | null;
  ancModel?: string | null;
  screenSize?: string | null;
  wifiModel?: string | null;
  color?: { id: number } & ApiColorColor['attributes'];
  memory?: { id: number } & ApiMemoryMemory['attributes'];
  model?: { id: number } & ApiModelModel['attributes'];
};

export default ({ strapi }) => ({
  async buildOptions(productTypeId: string) {
    const products = await strapi.entityService.findMany(
      'api::product.product',
      {
        filters: { productTypeId },
        status: 'published',
        populate: ['color', 'memory', 'model'],
        fields: [
          'id',
          'name',
          'productLink',
          'keyboard',
          'braceletSize',
          'ancModel',
          'screenSize',
          'wifiModel',
        ],
      },
    ) as Product[];

    const colorMap = new Map<number, Option<any>>();
    const memoryMap = new Map<number, Option<any>>();
    const keyboardMap = new Map<string, Option<{ value: string }>>();
    const braceletSizeMap = new Map<string, Option<{ value: string }>>();
    const ancModelMap = new Map<string, Option<{ value: string }>>();
    const screenSizeMap = new Map<string, Option<{ value: string }>>();
    const wifiModelMap = new Map<string, Option<{ value: string }>>();

    for (const product of products) {
      const { keyboard, braceletSize, ancModel, screenSize, color, memory, model, productLink, name, id, wifiModel } = product;
      if (color && !colorMap.has(color.id)) {
        colorMap.set(color.id, {
          ...color,
          defaultProduct: { id, productLink, name },
        });
      }
      if (memory && !memoryMap.has(memory.id)) {
        memoryMap.set(memory.id, {
          ...memory,
          defaultProduct: { id, productLink, name },
        });
      }

      const scalars: Array<[string | null, Map<string, Option<{ value: string }>>]> = [
        [keyboard, keyboardMap],
        [braceletSize, braceletSizeMap],
        [ancModel, ancModelMap],
        [screenSize, screenSizeMap],
        [wifiModel, wifiModelMap],
      ];
      for (const [val, map] of scalars) {
        if (val && !map.has(val)) map.set(val, { value: val, defaultProduct: { id, productLink, name } });
      }
    }

    return {
      productTypeId,
      availableColors: [...colorMap.values()],
      availableMemories: [...memoryMap.values()],
      availableKeyboards: [...keyboardMap.values()],
      availableBraceletSizes: [...braceletSizeMap.values()],
      availableAncModels: [...ancModelMap.values()],
      availableScreenSizes: [...screenSizeMap.values()],
      availableWifiModels: [...wifiModelMap.values()],
    }
  },
});
