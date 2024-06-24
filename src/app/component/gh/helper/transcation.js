export const trans = {
  sortDateAsc: (a, b) => {
    return new Date(a.date) < new Date(b.date) ? -1 : 1;
  },
  sortDateDsc: (a, b) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  },

  groupByTransName: (array) => {
    let result = [];

    array?.map((d) => {
      if (!d) return;
      let index = result.findIndex((dx) => dx.key == d?.category?.name);
      if (index < 0)
        result.push({
          key: d?.category?.name,
          data: [d],
        });
      else {
        result[index].data.push(d);
      }
    });

    return result;
  },
};
