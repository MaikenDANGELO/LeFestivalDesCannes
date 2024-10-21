import { prestataires } from "./data";
function getAllPrestataires() {
    return { error: 0, data: prestataires };
}
export default {
    getAllPrestataires,
};