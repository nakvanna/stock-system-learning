import {InputCursorPaginationOption} from "./cursor-pagination";

export async function applyPaginationInactive(model: any, options: InputCursorPaginationOption): Promise<any> {
    try {
        //valid
        const {after, first, condition, groupBy} = options
        const pare_condition = JSON.parse(condition)
        const conditions = pare_condition ? pare_condition : {}
        const criteria = after
            ? {
                _id: {
                    $lt: after,
                },
                status: false,
                ...conditions
            }
            : {
                status: false,
                ...conditions
            };

        let totalCount: number;
        let items: any[];
        if (groupBy) {
            items = await model.aggregate()
                .match(criteria)
                .sort({_id: -1})
                .limit(first + 1)
                .group({
                    _id: `$${groupBy}`,
                    id: {$last: "$_id"},
                })
                .project({
                    "_id": "$id",
                    [groupBy]: "$_id"
                });
            const count = await model.aggregate()
                .match(criteria)
                .group({
                    _id: `$${groupBy}`,
                })
                .count('total')
            ;
            totalCount = count[0].total
        } else {
            totalCount = await model.find(criteria).countDocuments()
            items = await model.find(criteria)
                .sort({_id: -1})
                .limit(first + 1)
                .lean()
                .exec();
        }
        //check if empty array
        if (!items.length) {
            return {
                totalCount: 0,
                pageInfo: {
                    hasNextPage: false,
                    endCursor: null
                },
                edges: null,
            }
        }
        const hasNextPage = items.length > first - 1;
        //take out last one
        if (hasNextPage) {
            items = items.slice(0, items.length - 1);
        }
        const edges = items.map(r => ({
            cursor: r._id,
            node: r,
        }));
        const {length} = edges;
        return {
            totalCount,
            pageInfo: {
                hasNextPage,
                endCursor: edges[length - 1].cursor
            },
            edges,
        }
    } catch (e) {
        //if error
        return {
            totalCount: 0,
            pageInfo: {
                hasNextPage: false,
                endCursor: null
            },
            edges: null,
        }
    }
}
