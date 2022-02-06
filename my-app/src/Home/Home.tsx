
import { useEffect, useRef, useState } from 'react';
import { LanchBox } from '../Launch Box/LaunchBox';
import { Launch } from './Launch';
import { getAllInfo, useAsync } from './HomeMainHook';
import useDebounce from './debounceHook';
import './Home.css';
import '../Loader.css';
import { Item } from '../Item/Item';

export function HomeScreen() {
  const { execute, value, isPrevios, toggleIsPrevios, status, offset, setOffset } = useAsync(getAllInfo);
  const valueArray: Launch[] = value;
  const [searchstringValue, setValue] = useState("");
  const debouncedValue = useDebounce<string>(searchstringValue, 1000);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      execute(isPrevios, searchstringValue)
    else {
      isMounted.current = true;
    }
  }, [debouncedValue]);

  let arrowLeftClassName: string;
  let arrowRightClassName: string;
  if (isPrevios) {
    arrowLeftClassName = "arrow left " + (valueArray.length === 0 ? "disable" : "");
    arrowRightClassName = "arrow right " + (offset === 0 ? "disable" : "");
  } else {
    arrowLeftClassName = "arrow left " + (offset === 0 ? "disable" : "");
    arrowRightClassName = "arrow right " + (valueArray.length === 0 ? "disable" : "");
  }


  return (
    <div className="home">
      <div className='home-header'>
        <div
          className="toggle-prev-upcoming"
          onClick={() => {
            toggleIsPrevios();
            setOffset(0);
            execute(!isPrevios, searchstringValue);
          }}
        >
          {isPrevios ? "Show Upcomin" : "Show Previous"}
        </div>
        <div className="launch-search">
          <div className="launch-search-title">search: </div>
          <input
            type="search"
            className="launch-search-input"
            value={searchstringValue}
            onChange={(e) => {
              setOffset(0);
              setValue(e.target.value)
            }

            }
          />
        </div>
      </div>
      {status === "pending" && <div className="loader"></div>}
      {status === "success" &&
        <>
          <div className='nev-buttons'>
            <div
              className={arrowLeftClassName}
              onClick={() => {
                if (arrowLeftClassName.indexOf('disable') < 0) {
                  const newOffset = isPrevios ? offset + 20 : offset - 20;
                  setOffset(newOffset)
                  execute(isPrevios, searchstringValue, newOffset)
                }
              }}
            />
            <div
              className={arrowRightClassName}
              onClick={() => {
                if (arrowRightClassName.indexOf('disable') < 0) {
                  const newOffset = isPrevios ? offset - 20 : offset + 20;
                  setOffset(newOffset)
                  execute(isPrevios, searchstringValue, newOffset)
                }
              }}
            />
          </div>
          <div className="launch-list">
            {valueArray.length > 0 ? valueArray.map((value) => <LanchBox launch={value} key={value.id} />) :
              <div style={{ marginTop: '20px' }}>There are no items to show :( </div>
            }
          </div>
        </>
      }
      {status === "error" && <div>Oooops something Went wrong, try refresh :)</div>}
    </div>)
}
