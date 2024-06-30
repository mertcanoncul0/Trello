import { Card, List } from "@prisma/client";

export type listWithCards = List & { cards: Card[] };
export type cardWithList = Card & { list: List };