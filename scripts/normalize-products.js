// This script normalizes all product JSON files in public/products/ by adding createdAt and popularityScore fields.
// Run with: node scripts/normalize-products.js

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function randomPopularity() {
  return Math.floor(Math.random() * 1000) + 1;
}

function normalizeProduct(product) {
  // Add createdAt if missing
  if (!product.createdAt) {
    product.createdAt = randomDate(new Date(2022, 0, 1), new Date());
  }
  // Add popularityScore if missing
  if (!product.popularityScore) {
    product.popularityScore = randomPopularity();
  }
  return product;
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (ext !== '.json') return;
  const data = fs.readFileSync(filePath, 'utf-8');
  let arr;
  try {
    arr = JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse', filePath);
    return;
  }
  if (!Array.isArray(arr)) return;
  const normalized = arr.map(normalizeProduct);
  fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2), 'utf-8');
  console.log('Normalized', filePath);
}

fs.readdirSync(PRODUCTS_DIR).forEach(file => {
  processFile(path.join(PRODUCTS_DIR, file));
}); 