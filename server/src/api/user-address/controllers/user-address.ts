import type { Strapi } from '@strapi/types/dist/core';
import { factories } from '@strapi/strapi';

type AddressInput = {
  label?: unknown;
  address?: unknown;
  city?: unknown;
  postalCode?: unknown;
  country?: unknown;
  isDefault?: unknown;
};

const toTrimmedString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const pickAddressData = (payload: AddressInput) => {
  return {
    label: toTrimmedString(payload.label),
    address: toTrimmedString(payload.address),
    city: toTrimmedString(payload.city),
    postalCode: toTrimmedString(payload.postalCode),
    country: toTrimmedString(payload.country),
    isDefault: Boolean(payload.isDefault),
  } as {
    label: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
};

const ensureOwnership = async (
  strapi: Strapi,
  documentId: string,
  userId: number
) => {
  const address = await strapi
    .documents('api::user-address.user-address')
    .findOne({
      documentId,
      populate: { user: true },
    });

  if (!address) {
    return null;
  }

  if (!address.user || address.user.id !== userId) {
    throw new Error('UNAUTHORIZED');
  }

  return address;
};

const updateUserDefaultAddress = async (
  strapi: Strapi,
  userId: number,
  newDefault: string | null
) => {
  const existingUser = await strapi
    .documents('plugin::users-permissions.user')
    .findFirst({
      filters: { id: userId },
    });

  if (!existingUser) return;

  await strapi.documents('plugin::users-permissions.user').update({
    documentId: existingUser.documentId,
    data: {
      address: newDefault ?? '',
    },
  });
};

const unsetOtherDefaults = async (
  strapi: Strapi,
  userId: number,
  excludeDocumentId?: string
) => {
  const addresses = await strapi
    .documents('api::user-address.user-address')
    .findMany({
      filters: {
        user: {
          id: userId,
        },
        ...(excludeDocumentId
          ? {
              documentId: {
                $ne: excludeDocumentId,
              },
            }
          : {}),
      },
    });

  await Promise.all(
    addresses
      .filter((address) => address.isDefault)
      .map((address) =>
        strapi.documents('api::user-address.user-address').update({
          documentId: address.documentId,
          data: { isDefault: false },
        })
      )
  );
};

const fetchUserAddresses = async (strapi: Strapi, userId: number) =>
  strapi.documents('api::user-address.user-address').findMany({
    filters: {
      user: {
        id: userId,
      },
    },
    sort: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
  });

export default factories.createCoreController(
  'api::user-address.user-address',
  ({ strapi }) => ({
    async find(ctx) {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      const addresses = await fetchUserAddresses(strapi, user.id);

      return { data: addresses };
    },

    async findOne(ctx) {
      const { user } = ctx.state;
      const { id } = ctx.params;

      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      if (!id) {
        return ctx.badRequest('ID adrese je obavezan');
      }

      try {
        const address = await ensureOwnership(strapi, id, user.id);
        if (!address) {
          return ctx.notFound('Adresa nije pronađena');
        }
        return { data: address };
      } catch (error) {
        if ((error as Error).message === 'UNAUTHORIZED') {
          return ctx.unauthorized('Nemate pravo na ovu adresu');
        }
        return ctx.badRequest('Greška pri dohvaćanju adrese');
      }
    },

    async create(ctx) {
      const { user } = ctx.state;
      const payload = ctx.request.body?.data as AddressInput | undefined;

      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      if (!payload) {
        return ctx.badRequest('Podaci o adresi su obavezni');
      }

      const sanitizedPayload = pickAddressData(payload);

      if (!sanitizedPayload.label) {
        return ctx.badRequest('Naziv adrese je obavezan');
      }

      if (!sanitizedPayload.address) {
        return ctx.badRequest('Adresa je obavezna');
      }

      const existingAddresses = await strapi
        .documents('api::user-address.user-address')
        .findMany({
          filters: { user: { id: user.id } },
        });

      const shouldBeDefault =
        sanitizedPayload.isDefault || existingAddresses.length === 0;

      if (shouldBeDefault) {
        await unsetOtherDefaults(strapi, user.id);
      }

      const newAddress = await strapi
        .documents('api::user-address.user-address')
        .create({
          data: {
            ...sanitizedPayload,
            isDefault: shouldBeDefault,
            user: user.id,
          },
        });

      if (shouldBeDefault) {
        await updateUserDefaultAddress(strapi, user.id, newAddress.address);
      }

      const addresses = await fetchUserAddresses(strapi, user.id);

      return ctx.created({ data: addresses });
    },

    async update(ctx) {
      const { user } = ctx.state;
      const { id } = ctx.params;
      const payload = ctx.request.body?.data as AddressInput | undefined;

      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      if (!id) {
        return ctx.badRequest('ID adrese je obavezan');
      }

      if (!payload) {
        return ctx.badRequest('Podaci o adresi su obavezni');
      }

      let existingAddress;
      try {
        existingAddress = await ensureOwnership(strapi, id, user.id);
      } catch (error) {
        if ((error as Error).message === 'UNAUTHORIZED') {
          return ctx.unauthorized('Nemate pravo na ovu adresu');
        }
        return ctx.badRequest('Greška pri ažuriranju adrese');
      }

      if (!existingAddress) {
        return ctx.notFound('Adresa nije pronađena');
      }

      const sanitizedPayload = pickAddressData({
        ...existingAddress,
        ...payload,
      });

      if (!sanitizedPayload.label) {
        return ctx.badRequest('Naziv adrese je obavezan');
      }

      if (!sanitizedPayload.address) {
        return ctx.badRequest('Adresa je obavezna');
      }

      const willBeDefault =
        sanitizedPayload.isDefault || existingAddress.isDefault;

      if (sanitizedPayload.isDefault && !existingAddress.isDefault) {
        await unsetOtherDefaults(strapi, user.id, existingAddress.documentId);
      }

      const updated = await strapi
        .documents('api::user-address.user-address')
        .update({
          documentId: existingAddress.documentId,
          data: {
            ...sanitizedPayload,
            isDefault: willBeDefault,
          },
        });

      if (willBeDefault) {
        await updateUserDefaultAddress(strapi, user.id, updated.address);
      }

      const addresses = await fetchUserAddresses(strapi, user.id);

      return { data: addresses };
    },

    async delete(ctx) {
      const { user } = ctx.state;
      const { id } = ctx.params;

      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      if (!id) {
        return ctx.badRequest('ID adrese je obavezan');
      }

      let existingAddress;
      try {
        existingAddress = await ensureOwnership(strapi, id, user.id);
      } catch (error) {
        if ((error as Error).message === 'UNAUTHORIZED') {
          return ctx.unauthorized('Nemate pravo na ovu adresu');
        }
        return ctx.badRequest('Greška pri brisanju adrese');
      }

      if (!existingAddress) {
        return ctx.notFound('Adresa nije pronađena');
      }

      await strapi.documents('api::user-address.user-address').delete({
        documentId: existingAddress.documentId,
      });

      if (existingAddress.isDefault) {
        const remainingAddresses = await strapi
          .documents('api::user-address.user-address')
          .findMany({
            filters: { user: { id: user.id } },
            sort: [{ createdAt: 'asc' }],
          });

        const nextDefault = remainingAddresses[0];

        if (nextDefault) {
          await strapi.documents('api::user-address.user-address').update({
            documentId: nextDefault.documentId,
            data: { isDefault: true },
          });
          await updateUserDefaultAddress(strapi, user.id, nextDefault.address);
        } else {
          await updateUserDefaultAddress(strapi, user.id, null);
        }
      }

      const addresses = await fetchUserAddresses(strapi, user.id);

      return ctx.send({ data: addresses });
    },

    async setDefault(ctx) {
      const { user } = ctx.state;
      const { id } = ctx.params;

      if (!user) {
        return ctx.unauthorized('Morate biti prijavljeni za ovu akciju');
      }

      if (!id) {
        return ctx.badRequest('ID adrese je obavezan');
      }

      let existingAddress;
      try {
        existingAddress = await ensureOwnership(strapi, id, user.id);
      } catch (error) {
        if ((error as Error).message === 'UNAUTHORIZED') {
          return ctx.unauthorized('Nemate pravo na ovu adresu');
        }
        return ctx.badRequest('Greška pri ažuriranju adrese');
      }

      if (!existingAddress) {
        return ctx.notFound('Adresa nije pronađena');
      }

      await unsetOtherDefaults(strapi, user.id, existingAddress.documentId);

      const updated = await strapi
        .documents('api::user-address.user-address')
        .update({
          documentId: existingAddress.documentId,
          data: { isDefault: true },
        });

      await updateUserDefaultAddress(strapi, user.id, updated.address);

      const addresses = await fetchUserAddresses(strapi, user.id);

      return { data: addresses };
    },
  })
);
