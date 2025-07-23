import { flexible } from '@blog/utils';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 根据路由设置不同的 flexible 参数
const FlexibleWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // 根据不同路由设置不同的设计稿宽度
    const flexibleConfig = {
      '/16': 16, // 首页使用 16px 作为基准
      '/100': 100, // 关于页面使用 32px 作为基准
    };

    const designWidth = flexibleConfig[location.pathname] || 16;
    flexible(designWidth);
  }, [location.pathname]);

  return children;
};

export default FlexibleWrapper;
