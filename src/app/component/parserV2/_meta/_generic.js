export function getDefaultAllocation(amount, allocation) {
  return amount < 0
    ? allocation?.find((d) => d?.name == "General Expense").id
    : allocation?.find((d) => d?.name == "General Income").id;
}
