export type TupleNum<TItem, P extends number> = [TItem, ...TItem[]] & {
  length: P;
};
