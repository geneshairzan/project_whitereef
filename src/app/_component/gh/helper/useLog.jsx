import { fetcher } from "./useFetch";

export default function useLog(params) {
  async function post(data) {
    let res = fetcher({
      url: "log",
      data: data,
    });
  }
  return { post };
}
