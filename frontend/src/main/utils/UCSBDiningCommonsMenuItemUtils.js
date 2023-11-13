import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
    window.location.reload();
}

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/UCSBDiningCommonsMenuItem",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

