import { create } from "zustand";
import { managementApi } from "../api/managementApi";

const useDataTable = create((set) => ({
  tests: null,
  categories: null,
  rowSelection: {},
  setRowSelection: (values) => {
    if (typeof values === "function") {
      set((state) => ({ rowSelection: values(state.rowSelection) }));
    } else set({ rowSelection: values });
  },
  fetchTests: async (userId) => {
    const data = await managementApi.getTestByUserId(userId);
    const categories = await managementApi.getALlWithCategory();
    set({
      tests: data.test,
      categories: categories,
    });
  },
  setTests: (tests) => {
    set({
      tests,
    });
  },
  deleteTests: async (tests) => {
    set((state) => ({
      tests: state.tests.reduce((acc, test, index) => {
        if (state.rowSelection[index] === true) return acc;
        return [...acc, test];
      }, []),
      rowSelection: {},
    }));
    await Promise.all(tests.map((test) => managementApi.deleteTest(test.code)));
  },
}));
export { useDataTable };

// const tests = [
//   {
//     code: "QKLOSS",
//     title: "Bài kiểm tra enim reiciendis delectus",
//     description:
//       "Mô tả bài kiểm tra Repellat id dolores similique occaecati sit fugiat aperiam nemo facere. Nam vel debitis corporis consequatur rem quod fuga eligendi dicta. Reiciendis autem nemo unde assumenda laboriosam veritatis eligendi. Officiis ratione occaecati quidem placeat quia fugit autem. Pariatur aspernatur vitae praesentium ipsam.",
//     image_url: null,
//     duration: 60,
//     number_of_questions: 5,
//     start_time: "2023-04-07T02:16:33.930Z",
//     end_time: "2023-03-01T08:55:17.829Z",
//     attempt_limit: 2,
//     is_public: true,
//     is_mix: false,
//     is_show_answer: true,
//     is_camera_required: false,
//     created_at: "2023-05-13T12:00:40.063Z",
//     userId: 4,
//     categoryId: 1,
//     User: {
//       id: 4,
//       email: "vhminh20210@gmail.com",
//       name: "Judy Bahringer",
//       password:
//         "$2b$10$nOZzoGR7..5ybArcWY/3AOpL2hXZHntcgGipBv82GbpJcVn7HWhbm",
//       avatar_url: "",
//       credit: 100,
//     },
//   },
// ];
