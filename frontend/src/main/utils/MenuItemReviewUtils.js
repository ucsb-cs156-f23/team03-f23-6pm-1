import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    if(cell.row.values.id != undefined){
        return {
            url: "/api/menuitemreview",
            method: "DELETE",
            params: {
                id: cell.row.values.id
            }
        }
    }
    return {
        url: "/api/menuitemreview",
        method: "DELETE",
        params: {}
    }
}

