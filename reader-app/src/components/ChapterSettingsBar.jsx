import React from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ChapterSettingsBar = () => {
  return (
    <div className="chapter-header">
      <ArrowLeftOutlined className="arrows" />
      <ArrowRightOutlined className="arrows" />
    </div>
  );
};

export default ChapterSettingsBar;
