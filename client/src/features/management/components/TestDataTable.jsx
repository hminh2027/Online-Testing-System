import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverAnchor,
  PopoverCloseButton,
  PopoverContent,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns/esm";
import { vi } from "date-fns/esm/locale";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { TestStatus } from "../../../constants";
import { useAuth } from "../../auth/stores/useAuth";
import { useDataTable } from "../stores/useDataTable";
import { DataTable } from "./DataTable";
import AppAlertDialog from "./dialogs/AlertDialog";

const TestDataTable = () => {
  const [user] = useAuth((state) => [state.user]);
  const [tests, fetchTests] = useDataTable(
    (state) => [state.tests, state.fetchTests],
    shallow
  );
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const columns = [
    {
      id: "select",
      cell: ({ row }) => {
        return (
          <Checkbox
            colorScheme="teal"
            isDisabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            isChecked={row.getIsSelected()}
          />
        );
      },
      header: ({ table }) => (
        <Checkbox
          colorScheme="teal"
          onChange={table.getToggleAllRowsSelectedHandler()}
          isChecked={table.getIsAllRowsSelected()}
        />
      ),
    },
    columnHelper.accessor("code", {
      cell: (info) => info.getValue(),
      header: "Mã bài",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "Tiêu đề",
    }),
    columnHelper.accessor("duration", {
      cell: (info) => info.getValue(),
      header: "Thời lượng (phút)",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("number_of_questions", {
      cell: (info) => info.getValue(),
      header: "Số câu",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("start_time", {
      cell: (info) =>
        format(new Date(info.getValue()), "HH:mm - dd/MM/yyyy", {
          locale: vi,
        }),
      header: "Bắt đầu",
    }),
    columnHelper.accessor("end_time", {
      cell: (info) => {
        if (
          new Date(null).toISOString() ==
          new Date(info.getValue()).toISOString()
        )
          return "Không giới hạn";
        return format(new Date(info.getValue()), "HH:mm - dd/MM/yyyy", {
          locale: vi,
        });
      },
      header: "Kết thúc",
    }),
    {
      id: "status",
      cell: ({ row }) => {
        const endTime = row.original.end_time;
        const startTime = row.original.start_time;
        const status =
          (endTime && new Date(endTime) < new Date() && TestStatus.finished) ||
          (new Date(startTime) > new Date() && TestStatus.pending) ||
          TestStatus.running;
        return (
          <Badge
            colorScheme={
              (status === TestStatus.finished && "red") ||
              (status === TestStatus.running && "green") ||
              "orange"
            }
          >
            {status}
          </Badge>
        );
      },
      header: "Trạng thái",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Flex justifyContent="space-between">
          <Button
            onClick={() => handleEdit(row.original.code)}
            colorScheme="teal"
          >
            Sửa
          </Button>
        </Flex>
      ),
      header: "Hành động",
    },
  ];

  useEffect(() => {
    (async () => {
      if (user && user.id) await fetchTests(user.id);
    })();
  }, [fetchTests, user]);

  const handleEdit = (testCode) => {
    navigate(`/management/test/${testCode}/edit`);
  };

  return (
    <>
      {tests && tests.length > 0 && (
        <DeletePopover>
          <Box bg="white" p="5" borderRadius="xl">
            <DataTable columns={columns} data={tests} />
          </Box>
        </DeletePopover>
      )}
      {tests && tests.length === 0 && (
        <Box bg="white" p="5" borderRadius="xl">
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            Không có dữ liệu để hiện thị
          </Text>
        </Box>
      )}
      {!tests && (
        <Flex bg="white" p="5" borderRadius="xl" justifyContent="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
};

const DeletePopover = ({ children }) => {
  const [tests, rowSelection, setRowSelection, deleteTests] = useDataTable(
    (state) => [
      state.tests,
      state.rowSelection,
      state.setRowSelection,
      state.deleteTests,
    ]
  );

  const handleDelete = async () => {
    await deleteTests(tests.filter((test, index) => rowSelection[index]));
  };
  const selectionCount = Object.keys(rowSelection).length;
  return (
    <Popover
      isOpen={selectionCount > 0}
      placement="top"
      arrowSize={10}
      matchWidth
      offset={[0, 0]}
    >
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent w="full" mb={2.5} py={2} px={9}>
        <Flex justifyContent="space-between">
          <Flex justifyContent="center" alignItems="center">
            <PopoverCloseButton
              pos="static"
              size="md"
              onClick={() => setRowSelection({})}
            />
            <Text ml={10} fontSize="xl">
              Đã chọn {selectionCount}
            </Text>
          </Flex>

          <AppAlertDialog resource="bài kiểm tra" handleDelete={handleDelete} />
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default TestDataTable;
