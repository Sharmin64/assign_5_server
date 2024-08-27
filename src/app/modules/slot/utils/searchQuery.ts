import { AnyObject, Types } from "mongoose";

export const createSearchQuery = async (
  paramsId: undefined | string,
  query: AnyObject
): Promise<AnyObject> => {
  let searchQuery: AnyObject = {};
  if (!paramsId && query.length < 1) {
    searchQuery = { isBooked: "available" };
  } else if (!paramsId || query.length >= 1) {
    searchQuery = { ...query, isBooked: "available" };
  } else if (paramsId || query.length >= 1) {
    searchQuery = {
      _id: new Types.ObjectId(paramsId),
      ...query,
      isBooked: "available",
    };
  }

  return searchQuery;
};
