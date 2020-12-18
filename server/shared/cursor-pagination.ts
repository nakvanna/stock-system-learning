import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class InputCursorPaginationOption {
  @Field()
  first: number;
  @Field()
  after: string;
  @Field(() => GraphQLJSON)
  condition: string;
  @Field({ nullable: true })
  groupBy: string | null;
}

export function CursorPagination<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String, { nullable: true })
    cursor: string;

    @Field(() => classRef, { nullable: true })
    node: T;
  }

  @ObjectType(`${classRef.name}PageInfo`)
  abstract class PageInfo {
    @Field(() => Boolean, { nullable: true })
    hasNextPage: boolean;

    @Field(() => String, { nullable: true })
    endCursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class CursorPaginationType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int, { nullable: true })
    totalCount: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo: string;
  }

  return CursorPaginationType;
}

export async function applyPagination(
  model: any,
  options: InputCursorPaginationOption,
): Promise<any> {
  try {
    //valid
    const { after, first, condition, groupBy } = options;
    const pare_condition = JSON.parse(condition);
    const conditions = pare_condition ? pare_condition : {};
    const criteria = after
      ? {
          _id: {
            $lt: after,
          },
          status: true,
          ...conditions,
        }
      : {
          status: true,
          ...conditions,
        };

    let totalCount: number;
    let items: any[];
    if (groupBy) {
      items = await model
        .aggregate()
        .match(criteria)
        .sort({ _id: -1 })
        .limit(first + 1)
        .group({
          _id: `$${groupBy}`,
          id: { $last: '$_id' },
        })
        .project({
          _id: '$id',
          [groupBy]: '$_id',
        });
      const count = await model
        .aggregate()
        .match(criteria)
        .group({
          _id: `$${groupBy}`,
        })
        .count('total');
      totalCount = count[0].total;
    } else {
      totalCount = await model.find(criteria).countDocuments();
      items = await model
        .find(criteria)
        .sort({ _id: -1 })
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
          endCursor: null,
        },
        edges: null,
      };
    }
    const hasNextPage = items.length > first - 1;
    //take out last one
    if (hasNextPage) {
      items = items.slice(0, items.length - 1);
    }
    const edges = items.map((r) => ({
      cursor: r._id,
      node: r,
    }));
    const { length } = edges;
    return {
      totalCount,
      pageInfo: {
        hasNextPage,
        endCursor: edges[length - 1].cursor,
      },
      edges,
    };
  } catch (e) {
    //if error
    return {
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
      edges: null,
    };
  }
}
