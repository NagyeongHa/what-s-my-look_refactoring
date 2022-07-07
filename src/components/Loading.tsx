import '../styles/Loading.css';

function Loading() {
  return (
    <>
      <div className='progress-title'>Please waiting...</div>

      <div className='progress-container'>
        <div className='progress-border'>
          <div className='progress-bar'></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
