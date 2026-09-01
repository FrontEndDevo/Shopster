type RenderListProps<T> = {
  records: T[];
  handleRenderList: (record: T) => React.ReactNode;
};

// Apply Typescript Generics to render any list of items depending on its type.
const RenderList = <T,>({ records, handleRenderList }: RenderListProps<T>) => {
  return (
    <>
      {records.length > 0 &&
        records.map((record: T) => handleRenderList(record))}
    </>
  );
};

export default RenderList;
