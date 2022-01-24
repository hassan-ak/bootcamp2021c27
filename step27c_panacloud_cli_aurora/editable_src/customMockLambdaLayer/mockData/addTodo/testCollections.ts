import { TestCollection } from "./testCollectionsTypes";

export const testCollections: TestCollection = {
  fields: {
    addTodo: [
      {
        arguments: {
          todo: {
            id: "01",
            title: "Sadie",
          },
        },
        response: {
          id: "01",
          title: "Bonnie",
        },
      },
    ],
  },
};
