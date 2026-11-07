import { getArchiveList } from "../../utils/microcms";
export default defineEventHandler(event => getArchiveList(event, "notifications"));
