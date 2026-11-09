export const getVariantAttributes = (variant) => {
  const attributes = variant?.attribute || variant?.attributes || {};

  if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) {
    return {};
  }

  return attributes;
};

export const getAttributeOptions = (variants = []) => {
  const structure = {};

  variants.forEach((variant) => {
    const attributes = getVariantAttributes(variant);

    Object.entries(attributes).forEach(([name, value]) => {
      if (!name || value == null) return;

      if (!structure[name]) {
        structure[name] = [];
      }

      if (!structure[name].some((item) => String(item) === String(value))) {
        structure[name].push(value);
      }
    });
  });

  return structure;
};

export const findMatchingVariant = (
  variants = [],
  selectedAttributes = {},
  attributeOptions = {}
) => {
  const requiredAttributes = Object.keys(attributeOptions);
  const selectedKeys = Object.keys(selectedAttributes);

  if (
    requiredAttributes.length === 0 ||
    requiredAttributes.some((key) => selectedAttributes[key] == null)
  ) {
    return null;
  }

  return variants.find((variant) => {
    const attributes = getVariantAttributes(variant);

    return requiredAttributes.every(
      (key) =>
        String(attributes[key]) === String(selectedAttributes[key])
    );
  }) || null;
};

export const getVariantImages = (variant, product) => {
  if (variant?.images?.length > 0) {
    return variant.images;
  }

  return product?.images || (product?.image ? [product.image] : []);
};

export const getVariantPrice = (variant, product) => {
  const price = variant?.price;

  if (typeof price === 'number') return price;
  if (typeof price?.amount === 'number') return price.amount;

  return typeof product?.price === 'number'
    ? product.price
    : product?.price?.amount ?? 0;
};

export const getVariantId = (variant) => {
  return variant?._id || variant?.id || null;
};

export const getVariantStock = (variant) => {
  return Number(variant?.stock ?? 0);
};
