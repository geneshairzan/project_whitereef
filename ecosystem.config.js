module.exports = {
  apps: [
    {
      // name: "app1",
      // // script: "npm run dev",
      // // script: "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js",
      // script: "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",
      // script: "node_modules/next/dist/bin/next",
      // // script: "C:\\Program Files\\nodejs\\npm",
      // args: "run dev",

      name: "project_whitereef",
      // script: "npm",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 7004",
      watch: true,
      // watch_delay: 1000,
      // ignore_watch: ["node_modules"],
    },
  ],
};
