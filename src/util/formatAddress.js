export default function (address) {
  const lines = [];
  let line;

  if (address.street) {
    line = [];
    if (address.houseNumber) {
      line.push(address.houseNumber);
    }
    line.push(address.street);
    lines.push(line.join(' '));
  }

  if (address.city || address.postalCode) {
    line = [];
    if (address.city) line.push(address.city);
    if (address.postalCode) line.push(address.postalCode);
    lines.push(line.join(' '));
  }
  return lines.join(', ');
}
