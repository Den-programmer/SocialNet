import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.scss';

const { Title, Text } = Typography;

const ErrorPage: React.FC = () => {
  return (
    <div className={classes.error_page}>
      <div className={classes.error_content}>
        <Title level={2}>Sorry, this page was not found!</Title>
        <Text strong style={{ color: '#5f5f5f', fontSize: 18 }}>
          Try to go to the <Link className={classes.navlink} to="/Profile">profile page</Link>!
        </Text>
      </div>
    </div>
  );
};

export default ErrorPage