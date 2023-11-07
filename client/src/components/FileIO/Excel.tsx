import { InboxOutlined } from '@ant-design/icons';
import type { DraggerProps } from 'antd/es/upload/Dragger';
import { Button, Modal, Typography, Upload } from 'antd';
import { useToggle } from 'react-use';
import type { ReactNode } from 'react';
import { exportExcel, importExcel } from '@/libs';
import { transformExcelQuestions } from '@/utils';

interface ExcelUploaderProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  table: ReactNode;
  handleOk: () => void;
}
export function ExcelUploader<T>({ data, setData, table, handleOk }: ExcelUploaderProps<T>) {
  const [isModalOpen, toggleModal] = useToggle(false);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleCustomRequest: DraggerProps['customRequest'] = async (info) => {
    const { file } = info;

    if (info.file) {
      const rawData = (await importExcel(file)) as [];

      const finalData = transformExcelQuestions(rawData) as [];

      setData(finalData);
    }
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
        onCancel={toggleModal}
        onOk={handleOk}
        okText="Nhập"
        cancelText="Huỷ"
        title="Import Excel"
      >
        {data.length > 0 ? (
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
  fileName: string;
  data: [];
}

export function ExcelExporter({ fileName, data }: ExcelExporterProps) {
  const handleExport = () => {
    exportExcel(fileName, data);
  };

  return (
    <Button onClick={handleExport} block>
      Export Excel
    </Button>
  );
}

export default function Excel() {
  return <div>Excel</div>;
}

Excel.Uploader = ExcelUploader;
Excel.Exporter = ExcelExporter;
