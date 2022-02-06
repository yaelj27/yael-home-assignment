import { Launch } from '../Home/Launch';
import './LaunchBox.css';

export function LanchBox(props: { launch: Launch }) {
  const { launch } = props;
  return <div className='launch-box'>
    <div>
      <div className='launch-box-img' style={{ backgroundImage: `url(${launch.image})` }} />
      {launch.url &&
        <div
          className="copy-clipboard"
          onClick={() => { navigator.clipboard.writeText(window.location.href + launch.url) }} >
          share</div>
      }
    </div>

    <div className='launch-box-text'>
      <div className='launch-box-row'>
        <div className='row-lable'>Name:</div>
        <div className='row-value'>{launch.name} </div>
      </div>
      <div className='launch-box-row'>
        <div className='row-lable'>status:</div>
        <div className='row-value'>{launch.status} </div>
      </div>
      <div className='launch-box-row'>
        <div className='row-lable'>Mission Description:</div>
        <div className='row-value'>{launch.missionDescription} </div>
      </div>
    </div>

  </div>
}

