const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export default function formatRupiah(price) {
  return typeof price === 'number'
    ? rupiahFormatter.format(price).replace(/\s/g, '')
    : price;
}