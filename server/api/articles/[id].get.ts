import { getArchiveDetail } from "../../utils/microcms";
export default defineEventHandler(event => getArchiveDetail(event, "articles"));
