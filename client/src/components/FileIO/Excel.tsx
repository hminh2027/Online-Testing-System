import { InboxOutlined } from '@ant-design/icons';
import type { DraggerProps } from 'antd/es/upload/Dragger';
import { Button, Modal, Typography, Upload } from 'antd';
import { useToggle } from 'react-use';
import { useCallback, type ReactNode } from 'react';
import { utils, writeFile } from 'xlsx';
import { importExcel } from '@/libs';

interface ExcelUploaderProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  table?: ReactNode;
  handleOk: () => void;
}
export function ExcelUploader<T>({ data, setData, table, handleOk }: ExcelUploaderProps<T>) {
  const [isModalOpen, toggleModal] = useToggle(false);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleCustomRequest: DraggerProps['customRequest'] = async (info) => {
    const { file } = info;

    if (info.file) {
      const rawData = (await importExcel(file)) as [];

      setData(rawData);
    }
  };

  const handleCancel = () => {
    setData([]);
    toggleModal(false);
  };

  return (
    <>
      <Button onClick={toggleModal} block type="primary">
        Import Excel
      </Button>
      <Modal
        centered
        closable
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Nhập"
        cancelText="Huỷ"
        title="Import Excel"
        width={1500}
      >
        {data.length > 0 && table ? (
          table
        ) : (
          <>
            <Upload.Dragger
              maxCount={1}
              style={{ width: '100%' }}
              fileList={[]}
              customRequest={handleCustomRequest}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>Đăng tải file Excel vào đây</p>
            </Upload.Dragger>
            <Typography.Text>
              Tải file mẫu{' '}
              <Typography.Link
                href="https://res.cloudinary.com/minh2027/raw/upload/v1699172441/Testing%20Folder/ols-question-sample-excel_jkdek8.xlsx"
                download
              >
                Excel
              </Typography.Link>{' '}
              và điền theo format
            </Typography.Text>
          </>
        )}
      </Modal>
    </>
  );
}

interface ExcelExporterProps {
  fileName?: string;
}

export function ExcelExporter({ fileName }: ExcelExporterProps) {
  const xport = useCallback(() => {
    const table = document.getElementById('Table2XLSX');
    const wb = utils.table_to_book(table);

    writeFile(wb, 'SheetJSTable.xlsx');
  });

  return (
    <>
      <table id="Table2XLSX" style={{ border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black' }} rowSpan={3}>
              SheetJS Table Export
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black' }}>Author</td>
            <td>ID</td>
            <td>你好!</td>
          </tr>
          <tr>
            <td>SheetJS</td>
            <td>7262</td>
            <td>வணக்கம்!</td>
          </tr>
        </tbody>
      </table>
      <button onClick={xport}>
        <b>Export XLSX!</b>
      </button>
    </>
  );
}

export default function Excel() {
  return <div>Excel</div>;
}

Excel.Uploader = ExcelUploader;
Excel.Exporter = ExcelExporter;
