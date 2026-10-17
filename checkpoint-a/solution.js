import { findAllOrders, findOrderById } from "./orders-db.js";
import { seedForThisRepo } from "./lib/seed.js";
import { deriveSpec } from "./lib/spec.js";

function getSpec() {
  return deriveSpec(seedForThisRepo());
}

export async function loadOrders() {
  return await findAllOrders();
}

export function myOrders(orders) {
  const spec = getSpec();
  return orders.filter(
    (order) => order.city === spec.city && order.status === spec.status
  );
}

export function summarize(orders) {
  const spec = getSpec();
  return spec.summary.compute(orders);
}

export async function describeOrder(id) {
  try {
    const order = await findOrderById(id);
    const spec = getSpec();
    return spec.label.build(order);
  } catch {
    const spec = getSpec();
    return spec.missing.build(id);
  }
}

export function toJsonLines(orders) {
  const spec = getSpec();
  return JSON.stringify(
    orders.map((order) => {
      const picked = {};
      for (const field of spec.fields) {
        picked[field] = order[field];
      }
      return picked;
    })
  );
}
