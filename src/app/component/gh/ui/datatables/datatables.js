function colHandle(raw) {
  return typeof raw == "object"
    ? raw
    : {
        name: raw,
        label: raw,
        options: {
          filter: false,
          sort: true,
        },
      };
}

export { colHandle };
