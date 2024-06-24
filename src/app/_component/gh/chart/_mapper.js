export const mapper = {
  IS,
};

function IS(raw) {
  return raw?.reduce(
    (a, b) => {
      if (b.amount <= 0) {
        a.expense += b.amount;
      } else {
        a.income += b.amount;
      }

      return a;
    },
    { expense: 0, income: 0 }
  );
}
