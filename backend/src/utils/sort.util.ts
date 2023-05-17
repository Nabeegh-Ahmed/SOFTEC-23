
import { SortProps } from "../schemas/shared.schema";

export const sortListByKey = <T>(dataList: T[], sortProps: SortProps) => {
    const sortBy = sortProps.sortBy as keyof T;
    const order = sortProps.order;

    const sortedDataList = dataList.sort((a, b) => {
        if (a && b) {
            const valueA = a[sortBy]!;
            const valueB = b[sortBy]!;
            return (valueA > valueB ? 1 : -1) * order;
        }
        return 0;
    });

    return sortedDataList;
}
