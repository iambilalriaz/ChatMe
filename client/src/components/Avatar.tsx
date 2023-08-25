import classNames from 'classnames';

const Avatar = ({ imageURL, size }: { imageURL: string; size?: number }) => {
  return (
    <div
      className={classNames({
        'h-12 w-12': !size,
      })}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img src={imageURL} alt='User Avatar' />
    </div>
  );
};

export default Avatar;
