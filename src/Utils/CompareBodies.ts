import Product from '../modules/Products/models/Product';

export default function compareBodies(
  data1: Product[],
  data2: Product[],
): boolean {
  if (!data1 || !data2) {
    return false;
  }

  const searching = data1.some(item1 =>
    data2.find(item2 => item1.name === item2.name),
  );
  return searching;
}
