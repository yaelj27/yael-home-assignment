
import { useEffect } from 'react';
import { Launch } from '../Home/Launch';
import { LanchBox } from '../Launch Box/LaunchBox';
import { getItemInfo, useAsyncSingleItem } from './GetSingleItemHook';

import './Item.css';
import '../Loader.css';

export function Item(url: string) {
  const { execute, value, status } = useAsyncSingleItem(getItemInfo);

  useEffect(() => {
    execute(url)
  }, []);

  return (
    <div className="item">
      {status === "pending" && <div className="loader"></div>}
      {status === "success" && value && value.id && <div className="launch-list">
        <LanchBox launch={value} key={value.id} />
      </div>}
      {status === "error" && <div>Oooops something Went wrong, try refresh :)</div>}
    </div>)
}
